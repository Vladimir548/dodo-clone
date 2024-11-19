import { create } from 'zustand'

interface State {
	activeSlug: string | null
	clickSlug: string | null
	setClickSlug: (activeId: string | null) => void
	setActiveSlug: (activeId: string) => void
}

export const useCategoryStore = create<State>()(set => ({
	activeSlug: null,
	clickSlug: null,
	setActiveSlug: (activeSlug: string) =>
		set(state => {
			state.activeSlug = activeSlug
			return { ...state }
		}),
	setClickSlug: (clickSlug: string | null) =>
		set(() => ({ clickSlug: clickSlug })),
}))
