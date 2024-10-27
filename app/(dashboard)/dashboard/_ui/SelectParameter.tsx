'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryParameter} from "@/app/api/query-parameter";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";
import {FieldValues} from "react-hook-form";
import {IHookForm} from "@/interface/interface-hook-form";
import {TypeProduct} from "@/interface/enums";
interface IParameter<T extends FieldValues> extends IHookForm<T>{
    type:TypeProduct | undefined
}

export default function SelectParameter<T extends FieldValues>({field,control,type}:IParameter<T>) {
    const {data} = useQuery({
        queryKey:['by-type-parameter',type],
        queryFn:()=> QueryParameter.byType(type),
        enabled:!!type
    })
    return (
        <div>
            <SelectCustom label={'Масса'} renderItems={data?.map(val => (
                <SelectItem key={val.id} value={String(val.id)}>{val.parameter}</SelectItem>
            ))} control={control} field={field}/>
        </div>
    );
};