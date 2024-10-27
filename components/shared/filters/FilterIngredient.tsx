'use client'

import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {useQuery} from "@tanstack/react-query";
import {QueryIngredient} from "@/app/api/query-ingredient";
import {useQueryFilters} from "@/hooks/useQueryFilters";
import {useFilters} from "@/hooks/useFilters";

interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
}

export default function FilterIngredient({selected,onClickCheckbox}: IProps) {

    const {data,isPending} = useQuery({
        queryKey:['all-ingredients'],
        queryFn:()=>QueryIngredient.all()
    })
    const item = data?.map(ingredient => ({value: String(ingredient.id), text: ingredient.name}))
    return (
        <div>
            <FiltersListCheckbox selected={selected} onClickCheckbox={onClickCheckbox}   name={'ingredient'}  title={'Ингредиенты'} defaultItems={item} loading={isPending}    items={item?.length ?  item : []} />
        </div>
    );
};