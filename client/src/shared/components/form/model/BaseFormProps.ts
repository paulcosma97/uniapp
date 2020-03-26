import {LegacyRef} from "react";

export default interface BaseFormProps<T extends Record<string, any>> {
    errors: Record<keyof T, { message: string }>;
    refs: Record<keyof T, LegacyRef<HTMLInputElement>>;
    handleSubmit: (...args: any) => any;
    submitFailed: boolean;
}