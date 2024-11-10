'use client'

import {FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";
import {DATADOUGHTYPE} from "@/data/dough-type";
import {useFilters} from "@/hooks/useFilters";
import {useQueryFilters} from "@/hooks/useQueryFilters";
interface IProps {
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
}

export default function FilterDough({selected,onClickCheckbox}: IProps) {

    const item = DATADOUGHTYPE.map(dough => ({value:dough.value,text:dough.name}));
    const filters = useFilters()
    useQueryFilters(filters);
    return (
        <div>
                <FiltersListCheckbox selected={selected} onClickCheckbox={onClickCheckbox} name={'dough'} title={'Тесто'}
                                     defaultItems={item} items={item?.length ? item : []}/>
        </div>
    );
};