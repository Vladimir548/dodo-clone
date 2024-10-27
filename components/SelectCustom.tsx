'use client'

import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Control, Controller, FieldValues, Path} from "react-hook-form";


interface ISelectCustom<T extends FieldValues> {
    label: string;
    renderItems:  React.ReactNode;
    control: Control<T>;
    field:Path<T>

}
export default function SelectCustom<T extends FieldValues>({label,renderItems,control,field}: ISelectCustom<T>) {


    return (
        <div>
            <label className={'text-primary'}>{label}</label>
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <Select onValueChange={ onChange} value={value}  >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={label} />
                        </SelectTrigger>
                        <SelectContent>
                            {renderItems}
                        </SelectContent>
                    </Select>
                )}
                name={field}
            />
        </div>
    );
};