


'use client'

import {useQuery} from "@tanstack/react-query";
import { FieldValues} from "react-hook-form";
import {QueryIngredient} from "@/app/api/query-ingredient";

import  { Option } from 'rc-select';
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {IHookForm} from "@/interface/interface-hook-form";
import {TypeProduct} from "@/interface/enums";
interface IIngredient<T extends FieldValues> extends IHookForm<T>{
    type:TypeProduct | undefined
}
export default function SelectIngredient<T extends  FieldValues>({field,control,type}:IIngredient<T>) {
    const {data} = useQuery({
        queryKey:['by-type-ingredient',type],
        queryFn:()=> QueryIngredient.byType(type),
        enabled:!!type
    })
    return (
        <div>

            <MultipleSelect field={field} control={control} label={'Выберите ингредиенты'} option={data?.map((val) => ( <Option key={val.id} value={val.id}>
                {val.name}
            </Option>))}/>
        </div>
    );
};