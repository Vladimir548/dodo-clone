import { QueryIngredient } from '@/app/api/query-ingredient'
import { useIngredientsStore } from '@/store/ingredients'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function usePriceIngredients() {
	const ingredients = useIngredientsStore(state => state.ingredients)

	const { data } = useQuery({
		queryKey: ['all-ingredients'],
		queryFn: () => QueryIngredient.all(),
	})
	const sumPrice = useMemo(() => {
		return data?.reduce((acc, val) => {
			if (ingredients?.some((ingredient: number) => ingredient === val.id)) {
				acc += val.price
			}
			return acc
		}, 0)
	}, [ingredients, data])

	return { sumPrice, ingredients }
}
