'use client'
import {Title} from "@/components/shared/Title";
import {FilterCheckbox} from "@/components/shared/filters/FilterChecbox";
import {RangeSlider} from "@/components/shared/filters/FilterRangeSlider";
import {Input} from "@/components/ui/input";
import {NumericFormat} from "react-number-format";
import {min} from "@floating-ui/utils";
import {CheckboxFiltersGroup, FiltersListCheckbox} from "@/components/shared/filters/FiltersListChecbox";

export default function Filter() {
    return (
        <div className={'w-[250px]'}>
            <Title text={'Фильтрация'} size={"md"} className={'font-bold'}/>

            <div className={'flex flex-col gap-y-3 pt-3 border-b pb-4 '}>
                <FilterCheckbox text={'Новинки'} value={'1'}/>
                <FilterCheckbox text={'Можно собирать'} value={'2'}/>
            </div>
            <div className="pt-4">
                <Title text={'Цена от и до:'} size={"xs"} className={'font-bold'}/>
                <div className={'pt-4'}>
                    <div className={'flex items-center gap-x-4 pb-5'}>
                        <NumericFormat  customInput={Input} min={0} value={0} suffix={'₽'} />
                        <NumericFormat customInput={Input} max={2000} value={2000} suffix={'₽'}/>
                    </div>
                    <RangeSlider value={[0,2000]}  min={0} max={2000} step={10}/>
                </div>
            </div>
            <div className="">
                <FiltersListCheckbox  title={'Ингридиенты'}  items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                    { text: '40 см', value: '40' },
                ]} />
            </div>

        </div>
    );
};