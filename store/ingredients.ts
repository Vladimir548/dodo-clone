import { create } from 'zustand'

interface IIngredient {
	ingredients: number[]
	toggleIngredients: (ingredient: number) => void
	clearIngredients: () => void
}

export const useIngredientsStore = create<IIngredient>()(set => ({
	ingredients: [],
	toggleIngredients: ingredient =>
		set(state => {
			const isCheckIngredient = state.ingredients.includes(ingredient)

			const updateIngredient = isCheckIngredient
				? state.ingredients.filter(id => id !== ingredient)
				: [...state.ingredients, ingredient]

			return { ingredients: updateIngredient }
		}),
	clearIngredients: () => set({ ingredients: [] }),
}))
