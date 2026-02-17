import { Timestamp } from "firebase/firestore";

export const timestampsToDate = (input: any): any => {
  const output = { ...input };
  for (const key in output) {
    if (output[key] instanceof Timestamp) {
      output[key] = output[key].toDate(); // Converts Timestamp to Date
    }
  }
  return output;
};
