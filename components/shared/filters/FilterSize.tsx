'use client'


import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {QueryProportion} from "@/app/api/query-proportion";
import {useQuery} from "@tanstack/react-query";
import {TypeProduct} from "@/interface/enums";
import { DATAPIZZASIZE } from "@/data/pizza-size";


interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    type:number
}

export default function FilterSize({selected,onClickCheckbox,type}: IProps) {
     const {data,isPending} = useQuery({
         queryKey:['size-by-type'],
         queryFn:()=>QueryProportion.byType(type)
     })
    const item = data?.map(size => ({value: String(size.id), text: size.value}))
    return (
        <div>
            <FiltersListCheckbox loading={isPending} selected={selected} onClickCheckbox={onClickCheckbox}   name={'size'}  title={'Размеры'} defaultItems={item}  items={item?.length ?  item : []} />
        </div>
    );
};