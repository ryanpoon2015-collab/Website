import notify from "@/myfunctions/notify";
import { useRef, useState } from "react";
import { useF, useS } from "./useReactHooks";

export type DropdownField = {
    value: string | undefined;
    setValue: (value: string | undefined) => void;
    verify: () => boolean;
    error: boolean;
    label: string;
    options: { value: string; label: string }[];
};

export const useDropdownField = (label: string, options: string[]): DropdownField => {
    const [value, setValue] = useS<string | undefined>();
    const [error, setError] = useState(false);
    const verify = () => {
        if (!value) {
            notify(`Please select an option for ${label}`);
            setError(true);
            return false;
        }
        setError(false);
        return true;
    };

    const formattedOptions = options.map((option) => ({
        value: option,
        label: option,
    }));

    return {
        value,
        setValue,
        verify,
        error,
        label,
        options: formattedOptions,
    };
};
