'use client'

import {Option} from "rc-select";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {IHookForm} from "@/interface/interface-hook-form";
import {FieldValues} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {QuerySize} from "@/app/api/query-proportion";
import {TypeProduct} from "@/interface/enums";

interface ISize<T extends FieldValues> extends IHookForm<T>{
    type:TypeProduct | undefined
}

export default function SelectSize<T extends FieldValues>({field,control,type}:ISize<T>) {

    const {data} = useQuery({
        queryKey:['by-type-size',type],
        queryFn:()=> QuerySize.byType(type),
        enabled:!!type
    })
    return (
        <div>
            <MultipleSelect field={field} control={control} label={'Выберите размер или объем'} option={data?.map((val) => ( <Option key={val.id} value={val.id}>
                {val.size}
            </Option>))}/>
        </div>
    );
};