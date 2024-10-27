import {Control, FieldValues, Path} from "react-hook-form";

export interface IHookForm<T extends FieldValues> {
    control: Control<T>;
    field:Path<T>

}
