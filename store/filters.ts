import { create } from 'zustand'

interface PriceProps {
	priceFrom: number | null
	priceTo: number | null
}

export interface IFiltersStore {
	currentCategory: string
	setCurrentCategory: (category: string) => void
	addFilterByCategory?: (key: string, obj: string) => void
	sizes: Record<string, number[]> | null
	toggleSizes: (sizeId: number) => void
	ingredients: Record<string, number[]> | null
	toggleIngredients: (ingredientId: number) => void
	clearIngredients: () => void
	dough: number[]
	toggleDough: (id: number) => void
	prices: Record<string, PriceProps> | null
	setPrices: (name: keyof PriceProps, price: number | null) => void
}

export const useFiltersStore = create<IFiltersStore>()(set => ({
	currentCategory: '',
	setCurrentCategory: (category: string) => set({ currentCategory: category }),
	sizes: null,
	toggleSizes: (sizeId: number) =>
		set(state => {
			if (!state.currentCategory) return { ...state }

			const sizes = state.sizes?.[state.currentCategory] || []
			const checkSizes = sizes.includes(sizeId)
			const updateSize = checkSizes
				? sizes.filter(id => id !== sizeId)
				: [...sizes, sizeId]

			return {
				sizes: {
					...state.sizes,
					[state.currentCategory]: updateSize,
				},
			}
		}),
	ingredients: null,
	toggleIngredients: (ingredientId: number) =>
		set(state => {
			if (!state.currentCategory) return { ...state }
			const ingredients = state.ingredients?.[state.currentCategory] || []
			const checkIngredient = ingredients.includes(ingredientId)

			const updateIngredient = checkIngredient
				? ingredients.filter(id => id !== ingredientId)
				: [...ingredients, ingredientId]

			return {
				ingredients: {
					...state.ingredients,
					[state.currentCategory]: updateIngredient,
				},
			}
		}),
	clearIngredients: () =>
		set(state => {
			if (state.ingredients) {
				state.ingredients[state.currentCategory] = []
			}
			return { ...state }
		}),
	dough: [],
	toggleDough: (doughType: number) =>
		set(state => {
			const checkDough = state.dough?.includes(doughType)
			const updateDough = checkDough
				? state.dough.filter(val => val !== doughType)
				: [...state.dough, doughType]

			return { dough: updateDough }
		}),
	prices: null,
	setPrices: (name: keyof PriceProps, price: number | null) =>
		set(state => {
			if (!state.currentCategory) return { ...state }
			const currentPrices = state?.prices?.[state.currentCategory] || {
				priceFrom: null,
				priceTo: null,
			}

			if (price || price === 0) {
				return {
					prices: {
						...state.prices,
						[state.currentCategory]: {
							...state.prices?.[state.currentCategory],
							...currentPrices,
							[name]: price,
						},
					},
				}
			}
			return { ...state }
		}),
}))
