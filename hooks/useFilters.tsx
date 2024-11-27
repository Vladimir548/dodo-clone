import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSet } from 'react-use'

export interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string
	sizes: string
	ingredients: string
}

export interface Filters {
	sizes: Set<string>
	pizzaTypes: Set<string>
	selectedIngredients: Set<string>
	prices: PriceProps
}

export interface IReturnFilter extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setPizzaTypes: (value: string) => void
	setSizes: (value: string) => void
	setSelectedIngredients: (value: string) => void
	setCategory: (value: number | null) => void
}

export const useFilters = (): IReturnFilter => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	)

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	)

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	)

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})
	const [category, setCategory] = useState<number | null>(null)
	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}))
	}

	return React.useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			category,
			setCategory,
			setPrices: updatePrice,
			setPizzaTypes: togglePizzaTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices, category]
	)
}
