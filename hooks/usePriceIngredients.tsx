
import {useQuery} from "@tanstack/react-query";
import {QueryIngredient} from "@/app/api/query-ingredient";
import {useFilters} from "@/store/filters";
import {useMemo} from "react";

export default function usePriceIngredients() {


    const ingredients = useFilters(state => state.ingredients);
    const {data} = useQuery({
        queryKey:['all-ingredients'],
        queryFn:()=>QueryIngredient.all()
    })
    const sumPrice = useMemo(() => {
        return  data?.reduce((acc, val) => {
            if (ingredients.some(ingr => ingr === val.id)) {
                acc += val.price
            }
            return acc
        }, 0)
    }, [ingredients,data]);

    return {sumPrice,ingredients}
};