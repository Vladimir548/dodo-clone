


'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryCategory} from "@/app/api/query-category";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";
import {Control, FieldValues, Path} from "react-hook-form";

interface ISelect<T extends FieldValues> {

    control: Control<T>;
    field:Path<T>

}
export default function SelectCategory<T extends  FieldValues>({field,control}:ISelect<T>) {
    const {data} = useQuery({
        queryKey:['all-category'],
        queryFn:()=> QueryCategory.all()
    })

    return (
        <div>
            <SelectCustom label={'Категория'} renderItems={data?.map(val => (
                <SelectItem key={val.id} value={(val.id).toString()}>{val.name}</SelectItem>
            ))} control={control} field={field}/>
        </div>
    );
};