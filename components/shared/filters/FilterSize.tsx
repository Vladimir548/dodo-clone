'use client'


import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {QueryProportion} from "@/app/api/query-proportion";
import {useQuery} from "@tanstack/react-query";
import {TypeProduct} from "@/interface/enums";


interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    type:TypeProduct
}

export default function FilterSize({selected,onClickCheckbox,type}: IProps) {
     const {data,isPending} = useQuery({
         queryKey:['size-by-type'],
         queryFn:()=>QueryProportion.byType(TypeProduct[type])
     })
    const item = data?.map(size => ({value: size.id, text: size.proportion}))
    return (
        <div>
            <FiltersListCheckbox selected={selected} onClickCheckbox={onClickCheckbox}   name={'size'}  title={'Размеры'} defaultItems={item}  items={item?.length ?  item : []} />
        </div>
    );
};