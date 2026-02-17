import { db, storage } from "@/app/firebase";
import notify from "@/myfunctions/notify";
import {
  QueryFieldFilterConstraint,
  deleteDoc,
  doc,
  getDoc,
  query as firebaseQuery,
  onSnapshot,
  setDoc,
  updateDoc,
  collection,
  QueryCompositeFilterConstraint,
  runTransaction,
  writeBatch,
  WriteBatch,
  Transaction,
  QueryDocumentSnapshot,
  QueryConstraint,
  orderBy,
  endBefore,
  limitToLast,
  startAfter,
  limit,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FHType } from "../FH";

export type UpdateOption = {
  success?: string;
  onSuccess?: () => void;
  batch?: WriteBatch;
  transaction?: Transaction;
};
/**
 * Firebase Helper Template
 */
export default abstract class FHT<T extends { id: string }> {
  abstract collectionName: string;
  //! Get
  async get(id: string, updateOption?: UpdateOption) {
    if (!id) return null;
    const docRef = doc(db, this.collectionName, id);
    let docSnap;
    if (updateOption?.transaction) {
      docSnap = await updateOption.transaction.get(docRef);
    } else {
      docSnap = await getDoc(docRef);
    }
    if (updateOption?.success)
      notify(updateOption.success, { type: "success" });
    if (updateOption?.onSuccess) updateOption.onSuccess();
    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      return null;
    }
  }

  //! Get Multiple Objects by IDs
  async getIds(ids: string[]) {
    const data: T[] = [];
    for (const id of ids) {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        data.push(docSnap.data() as T);
      }
    }
    return data;
  }

  //! GET ALL
  async getAll(updateOption?: UpdateOption) {
    const q = collection(db, this.collectionName);
    const querySnapshot = await getDocs(q);
    const data: T[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as T);
    });
    if (updateOption?.success)
      notify(updateOption.success, { type: "success" });
    if (updateOption?.onSuccess) updateOption.onSuccess();

    return data;
  }

  //! Watch
  watch(id: string | undefined, callback: (data: T | null) => void) {
    if (!id) {
      callback(null);
      return () => { };
    }

    const docRef = doc(db, this.collectionName, id);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as T);
      } else {
        callback(null);
      }
    });
  }

  //! Watch Query
  // query parameter could be many QueryFieldFilterConstraint,
  watchQuery(
    callback: (data: T[]) => void,
    compoundQuery?: QueryCompositeFilterConstraint,
    ...query: QueryConstraint[]
  ) {
    let q;
    if (compoundQuery)
      q = firebaseQuery(collection(db, this.collectionName), compoundQuery);
    else q = firebaseQuery(collection(db, this.collectionName), ...query);
    return onSnapshot(q, (querySnapshot) => {
      const data: T[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as T);
      });

      callback(data);
    });
  }

  //! Watch Pagination
  watchPagination(
    pageNum: number,
    callback: (
      data: T[],
      firstDoc: QueryDocumentSnapshot<T> | null,
      lastDoc: QueryDocumentSnapshot<T> | null,
      hasPrev: boolean,
      hasNext: boolean,
    ) => void,
    orderKey: keyof T,
    direction: "asc" | "desc",
    ...queries: QueryConstraint[]
  ) {
    const q = firebaseQuery(
      collection(db, this.collectionName),
      orderBy(String(orderKey), direction),
      ...queries
    );

    return onSnapshot(q, async (querySnapshot) => {
      const data: T[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as T);
      });

      if (data.length === 0) {
        callback([], null, null, false, false);
        return;
      }

      const firstDoc = querySnapshot.docs[0] as QueryDocumentSnapshot<T>;
      const lastDoc = querySnapshot.docs[
        querySnapshot.docs.length - 1
      ] as QueryDocumentSnapshot<T>;

      //! HAS PREV
      // const prevQ = firebaseQuery(
      //   collection(db, this.collectionName),
      //   orderBy(String(orderKey), direction),
      //   endBefore(firstDoc),
      //   limitToLast(1),
      // );

      // const docSnapshot = await getDocs(prevQ);
      // const hasPrev = docSnapshot.docs.length > 0;
      const hasPrev = pageNum > 1;

      //! HAS NEXT
      const nextQ = firebaseQuery(
        collection(db, this.collectionName),
        orderBy(String(orderKey), direction),
        ...queries,
        startAfter(lastDoc),
        limit(1),
      );

      const docSnapshot2 = await getDocs(nextQ);
      const hasNext = docSnapshot2.docs.length > 0;

      callback(data, firstDoc, lastDoc, hasPrev, hasNext);
    });
  }
  //! Update
  async update(
    obj: T | string | null | undefined,
    new_fields: FHType<T>,
    updateOption?: UpdateOption
  ) {
    if (!obj) return false;
    const obj_id = typeof obj === "string" ? obj : obj.id;
    try {
      const docRef = doc(db, this.collectionName, obj_id);
      if (updateOption?.batch) {
        updateOption?.batch.update(docRef, { ...new_fields } as DocumentData);
        return true;
      } else if (updateOption?.transaction) {
        updateOption?.transaction.update(docRef, {
          ...new_fields,
        } as DocumentData);
        return true;
      } else {
        await updateDoc(docRef, { ...new_fields } as DocumentData);
        if (updateOption?.success)
          notify(updateOption?.success, { type: "success" });

        if (updateOption?.onSuccess) updateOption.onSuccess();
        return true;
      }
    } catch (e) {
      console.log(`Error updating ${this.collectionName}: ${e}`);
      notify(`Error updating ${this.collectionName}`);
      return false;
    }
  }

  //! Create
  async create(obj: T, updateOption?: UpdateOption) {
    try {
      const docRef = doc(db, this.collectionName, obj.id);
      if (updateOption?.batch) {
        updateOption?.batch.set(docRef, obj);
      } else if (updateOption?.transaction) {
        updateOption?.transaction.set(docRef, obj);
      } else {
        await setDoc(docRef, obj);
        if (updateOption?.success)
          notify(updateOption?.success, { type: "success" });
        if (updateOption?.onSuccess) updateOption.onSuccess();
      }
    } catch (e) {
      console.log(`Error adding ${this.collectionName}: ${e}`);
      notify(`Error adding ${this.collectionName}`);
    }
  }

  //! Create all
  async createAll(
    obj: T[],
    updateOption?: UpdateOption
  ) {
    try {
      const batch = writeBatch(db);
      for (const item of obj) {
        const docRef = doc(db, this.collectionName, item.id);
        batch.set(docRef, item);
      }
      batch.commit();
      if (updateOption?.success)
        notify(updateOption?.success, { type: "success" });
      if (updateOption?.onSuccess) updateOption.onSuccess();
    } catch (e) {
      console.log(`Error adding ${this.collectionName}: ${e}`);
      notify(`Error adding ${this.collectionName}`);
    }
  }

  //! Delete
  async delete(
    obj: T | string | null | undefined,
    updateOption?: UpdateOption
  ) {
    if (!obj) return;
    const obj_id = typeof obj === "string" ? obj : obj.id;

    try {
      const docRef = doc(db, this.collectionName, obj_id);
      if (updateOption?.batch) {
        updateOption?.batch.delete(docRef);
      } else if (updateOption?.transaction) {
        updateOption?.transaction.delete(docRef);
      } else {
        await deleteDoc(docRef);
        if (updateOption?.success)
          notify(updateOption?.success, { type: "success" });
        if (updateOption?.onSuccess) updateOption.onSuccess();
      }
    } catch (e) {
      console.log(`Error removing ${this.collectionName}: ${e}`);
      notify(`Error removing ${this.collectionName}`);
    }
  }

  async deleteAll(
    updateOption?: UpdateOption
  ) {
    try {
      const q = collection(db, this.collectionName);
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      if (updateOption?.success)
        notify(updateOption?.success, { type: "success" });
      if (updateOption?.onSuccess) updateOption.onSuccess();
    } catch (e) {
      console.log(`Error removing ${this.collectionName}: ${e}`);
      notify(`Error removing ${this.collectionName}`);
    }
  }

  async deleteAndCreateAll(
    obj: T[],
    updateOption?: UpdateOption
  ) {
    try {
      const batch = writeBatch(db);
      const q = collection(db, this.collectionName);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      for (const item of obj) {
        const docRef = doc(db, this.collectionName, item.id);
        batch.set(docRef, item);
      }
      await batch.commit();
      if (updateOption?.success)
        notify(updateOption?.success, { type: "success" });
      if (updateOption?.onSuccess) updateOption.onSuccess();
    } catch (e) {
      console.log(`Error removing ${this.collectionName}: ${e}`);
      notify(`Error removing ${this.collectionName}`);
    }
  }

  //! Exists
  async exists(id: string) {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  //! Transaction
  async transaction(
    id: string,
    callback: (data: T | null) => Promise<Partial<T>>
  ) { }
}

export class FHPicture {
  private idToURL: (id: string) => string;

  constructor(idToURL: (id: string) => string) {
    this.idToURL = idToURL;
  }

  //! Create
  async create(id: string, imgFile: File, onSuccess?: () => void) {
    const storageRef = ref(storage, this.idToURL(id));

    try {
      await uploadBytes(storageRef, imgFile, {
        contentType: "image/jpeg",
      });
      onSuccess?.();
    } catch (e) {
      console.log(`Error uploading picture: ${e}`);
      notify("Error uploading picture");
    }
  }

  //! Get
  async get(id: string) {
    const storageRef = ref(storage, this.idToURL(id));
    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.log(`Error getting picture: ${e}`);
      notify("Error getting picture");
    }
  }

  //! Delete
  async delete(id: string, onSuccess?: () => void) {
    const storageRef = ref(storage, this.idToURL(id));
    try {
      await deleteObject(storageRef);
      onSuccess?.();
    } catch (e) {
      console.log(`Error deleting picture: ${e}`);
      notify("Error deleting picture");
    }
  }
}

export class FHPictures {
  private idToURL: (id: string) => string;

  constructor(idToURL: (id: string) => string) {
    this.idToURL = idToURL;
  }

  //! Get
  async get(id: string): Promise<[string, string][] | undefined> {
    const listRef = ref(storage, this.idToURL(id));
    try {
      const listResult = await listAll(listRef);
      const listItems = listResult.items;

      const pictures: [string, string][] = [];
      for (const item of listItems) {
        pictures.push([item.name.split(".")[0], await getDownloadURL(item)]);
      }
      return pictures;
    } catch (e) {
      console.log(`Error getting pictures: ${e}`);
      notify("Error getting pictures");
    }
  }
}

export class FHFile {
  private idToURL: (id: string) => string;

  constructor(idToURL: (id: string) => string) {
    this.idToURL = idToURL;
  }

  //! Create
  async create(id: string, file: File, onSuccess?: () => void) {
    const storageRef = ref(storage, this.idToURL(id));

    try {
      await uploadBytes(storageRef, file);
      onSuccess?.();
    } catch (e) {
      console.log(`Error uploading file: ${e}`);
      notify("Error uploading file");
    }
  }

  //! Get
  async get(id: string) {
    const storageRef = ref(storage, this.idToURL(id));
    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.log(`Error getting file: ${e}`);
      notify("Error getting file");
    }
  }

  //! Get Metadata
  async getMetadata(id: string) {
    const storageRef = ref(storage, this.idToURL(id));
    try {
      const metadata = await getMetadata(storageRef);
      return metadata;
    } catch (e) {
      console.log(`Error getting file metadata: ${e}`);
      notify("Error getting file metadata");
    }
  }

  //! Delete
  async delete(id: string, onSuccess?: () => void) {
    const storageRef = ref(storage, this.idToURL(id));
    try {
      await deleteObject(storageRef);
      onSuccess?.();
    } catch (e) {
      console.log(`Error deleting file: ${e}`);
      notify("Error deleting file");
    }
  }
}

export class FHFiles {
  private idToURL: (id: string) => string;

  constructor(idToURL: (id: string) => string) {
    this.idToURL = idToURL;
  }

  //! Get
  async get(id: string): Promise<[string, string][] | undefined> {
    const listRef = ref(storage, this.idToURL(id));
    try {
      const listResult = await listAll(listRef);
      const listItems = listResult.items;

      const files: [string, string][] = [];
      for (const item of listItems) {
        files.push([item.name.split(".")[0], await getDownloadURL(item)]);
      }
      return files;
    } catch (e) {
      console.log(`Error getting files: ${e}`);
      notify("Error getting files");
    }
  }
}
