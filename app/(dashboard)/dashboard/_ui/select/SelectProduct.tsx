'use client'

import {useQuery} from "@tanstack/react-query";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";
import {QueryProduct} from "@/app/api/query-product";
import {FieldValues} from "react-hook-form";
import {IHookForm} from "@/interface/interface-hook-form";


export default function SelectProduct<T extends  FieldValues>({field,control}:IHookForm<T>) {
    const {data} = useQuery({
        queryKey:['all-product'],
        queryFn:()=> QueryProduct.all()
    })

    return (
        <div>
            <SelectCustom field={field} control={control} label={'Выберите продукт'} renderItems={data?.map((val) => (
                <SelectItem key={val.id} value={String(val.id)}>
                {val.name}
            </SelectItem>))}/>
        </div>
    );
};