import { Constants } from "@/classes/Constants";
import myFetch from "./myFetch";

export default async function nodemcuFetch(
  command: string,
  callback: (response: string) => void,
  query: Record<string, any> = {},
  final: () => void = () => { }
) {
  try {
    // console.log("1");
    const res = await myFetch<string>(
      `${Constants.NodeMCUIP}/${command}`,
      "GET",
      query,
      {},
      "json",
      "json",
    );
    // console.log("2");

    if (!res) {
      throw new Error("Error fetching data");
    }

    //! Success
    // callback(res); // TODO: FIX UNCOMMENT
  } catch (error) {
    console.log(`Error fetching ${command} with error ${error}`);
  } finally {
    final();
  }
}
