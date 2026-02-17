import { FHContext } from "@/app/templates/FH_Wrapper";
import { useC, useF, useS } from "../../../hooks/useReactHooks";
import { useBluetooth } from "./useBluetooth";

let intervalId: NodeJS.Timer | null = null;

export function useBLEContinuous<N extends number>({ intervalS, willRead, writeData }:
    {
        intervalS: number,
        willRead: boolean,
        writeData: any[]
    }): [ReturnType<typeof useBluetooth>, (string | undefined)[]] {

    const { Bluetooth } = useC(FHContext);
    const [readData, setReadData] = useS<string[]>([]);
    const willWrite = writeData.length > 0;

    useF(() => {
        let isMounted = true;
        let isExecuting = false;

        intervalId = setInterval(async () => {
            if (!isMounted || isExecuting) return;
            isExecuting = true;
            const start = performance.now(); // EXECUTION TIME (MS)
            try {
                if (willRead) {
                    const data = await Bluetooth.read();
                    if (!isMounted) return;
                    if (!data) return;
                    setReadData(data.split(","));
                }

                if (willWrite) {
                    await Bluetooth.write(writeData.join(","));
                    if (!isMounted) return;
                }
                const end = performance.now(); // EXECUTION TIME (MS)
                console.log(`Execution time: ${Number(end - start).toFixed(0)} ms`); // EXECUTION TIME (MS)
            } finally {
                isExecuting = false;
            }

        }, intervalS * 1000); // 1 second interval

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            isMounted = false;
        }

    }, [Bluetooth, writeData, intervalS]);

    return [Bluetooth, readData];
}


// Utility type to build a tuple of length N
type BuildTuple<
    N extends number,
    T = unknown,
    R extends unknown[] = []
> = R['length'] extends N ? R : BuildTuple<N, T, [...R, T]>;

