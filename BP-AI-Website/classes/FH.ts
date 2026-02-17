import { Device } from "./Device";
import { MyUser } from "./MyUser";
import FHT, { FHPicture } from "./templates/FHT";
import { AdminSettings } from "./templates/AdminSettings";
import {
  FieldValue,
  runTransaction,
  Transaction,
  WriteBatch,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import notify from "@/myfunctions/notify";
import { SocialMediaPost } from "@/app/z/SocialMedia/SocialMediaPost";
import { SocialMediaComment } from "@/app/z/SocialMedia/SocialMediaComment";
import LogDevice from "./LogDevice";
import Patient from "./Patient";
import PatientRecord from "./PatientRecord";
import Physician from "./Physician";

class MyUserFHT extends FHT<MyUser> {
  collectionName = "user";
  Picture = new FHPicture((id) => `user/${id}/profile_picture.jpg`);
}

class DeviceFHT extends FHT<Device> {
  collectionName = "device";
}

class AdminSettingsFHT extends FHT<AdminSettings> {
  collectionName = "admin";
}

class SocialMediaPostFHT extends FHT<SocialMediaPost> {
  collectionName = "post";
}

class SocialMediaCommentFHT extends FHT<SocialMediaComment> {
  collectionName = "comment";
}

class LogDeviceFHT extends FHT<LogDevice> {
  collectionName = "log_device";
}

class PatientFHT extends FHT<Patient> {
  collectionName = "patient";
}

class PatientRecordFHT extends FHT<PatientRecord> {
  collectionName: string;

  constructor(patientId: string) {
    super();
    this.collectionName = `patient/${patientId}/record`;
  }
}

class PhysicianFHT extends FHT<Physician> {
  collectionName = "physician";
}

// class MyUserLogFHT extends FHT<MyUserLog> {
//   collectionName: string;

//   constructor(userId: string) {
//     super();
//     this.collectionName = `user/${userId}/log`;
//   }
// }


export default abstract class FH {
  static AdminSettings = new AdminSettingsFHT();
  static MyUser = new MyUserFHT();
  static Device = new DeviceFHT();
  static SocialMediaPost = new SocialMediaPostFHT();
  static SocialMediaComment = new SocialMediaCommentFHT();
  static LogDevice = new LogDeviceFHT();
  static Patient = new PatientFHT();
  static PatientRecord(patientId: string) {
    return new PatientRecordFHT(patientId);
  }
  static Physician = new PhysicianFHT();

  static async Batch(
    name: string,
    functions: (batch: WriteBatch) => Promise<void>,
    fhOptions?: FHOptions
  ) {
    try {
      const batch = writeBatch(db);
      await functions(batch);
      await batch.commit();

      if (fhOptions?.onSuccess) {
        fhOptions.onSuccess(name);
      }
    } catch (e) {
      console.log(`Failed to ${name}: ${e}`);
      notify(`Failed to ${name}`);

      if (fhOptions?.onError) {
        fhOptions.onError(e);
      }
    }
  }

  static async Transaction(
    name: string,
    functions: (transaction: Transaction) => Promise<void>,
    fhOptions?: FHOptions
  ) {
    try {
      await runTransaction(db, async (transaction) => {
        await functions(transaction);
      });

      if (fhOptions?.onSuccess) {
        fhOptions.onSuccess(name);
      }
    } catch (e) {
      console.log(`Failed to ${name}: ${e}`);
      notify(`Failed to ${name}`);

      if (fhOptions?.onError) {
        fhOptions.onError(e);
      }
    }
  }
}

export type FHType<T> = {
  [K in keyof T]?: T[K] extends any[]
  ? FieldValue | T[K]
  : T[K] extends number
  ? FieldValue | number
  : T[K];
};

export type FHOptions = {
  onSuccess?: (id: string) => void;
  onError?: (e: any) => void;
};
