'use client'
import {Title} from "@/components/shared/Title";
import FilterIngredient from "@/components/shared/filters/FilterIngredient";
import FilterPrice from "@/components/shared/filters/FilterPrice";
import FilterSize from "@/components/shared/filters/FilterSize";
import {useQueryFilters} from "@/hooks/useQueryFilters";
import {useFilters} from "@/hooks/useFilters";
import FilterDough from "@/components/shared/filters/FilterDough";
import {TypeProduct} from "@/interface/enums";


export default function Filter({categoryId,typeCategory}:{categoryId:number,typeCategory:TypeProduct}) {

    const filters = useFilters();

    useQueryFilters(filters);


    return (
        <div className={'w-[250px]'}>
            <Title text={'Фильтрация'} size={"md"} className={'font-bold'}/>

            <div className={' pt-4 border-b pb-4 '}>
                {typeCategory === TypeProduct.PIZZA && (
                <FilterDough selected={filters.pizzaTypes} onClickCheckbox={filters.setPizzaTypes}/>
                )}
            </div>
            <div className={' pt-4 border-b pb-4 '}>
                <FilterSize categoryId={categoryId} selected={filters.sizes} onClickCheckbox={filters.setSizes} />
            </div>
            <div className="pt-4 border-b pb-4">
               <FilterPrice categoryId={categoryId}  priceTo={filters.prices.priceTo} priceFrom={filters.prices.priceFrom} setPrices={filters.setPrices} />
            </div>
            <div className="pt-4">
                <FilterIngredient selected={filters.selectedIngredients} onClickCheckbox={filters.setSelectedIngredients} />
            </div>

        </div>
    );
};