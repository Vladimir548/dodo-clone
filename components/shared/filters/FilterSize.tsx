'use client'

import {useQuery} from "@tanstack/react-query";
import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {QuerySize} from "@/app/api/query-size";
import {DATAPIZZASIZE} from "@/data/pizza-size";


interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
}

export default function FilterSize({selected,onClickCheckbox}: IProps) {
    // const {data,isPending} = useQuery({
    //     queryKey:['size-by-type'],
    //     queryFn:()=>QuerySize.byType('PIZZA')
    // })
    const item = DATAPIZZASIZE?.map(size => ({value: size.value, text: size.size}))
    return (
        <div>
            <FiltersListCheckbox selected={selected} onClickCheckbox={onClickCheckbox}   name={'size'}  title={'Размеры'} defaultItems={item}     items={item?.length ?  item : []} />
        </div>
    );
};