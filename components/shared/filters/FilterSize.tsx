'use client'


import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {QueryProportion} from "@/app/api/query-proportion";
import {useQuery} from "@tanstack/react-query";


interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    categoryId:number
}

export default function FilterSize({selected,onClickCheckbox,categoryId}: IProps) {
     const {data,isPending} = useQuery({
         queryKey:['size-by-type',categoryId],
         queryFn:()=>QueryProportion.byCategory(categoryId)
     })
     console.log(categoryId)
    const item = data?.map(size => ({value: String(size.id), text: size.value}))
    return (
        <div>
            <FiltersListCheckbox loading={isPending} selected={selected} onClickCheckbox={onClickCheckbox}   name={'size'}  title={'Размеры'} defaultItems={item}  items={item?.length ?  item : []} />
        </div>
    );
};