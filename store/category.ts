import { TypeProduct } from '@/interface/enums'
import { create } from 'zustand'

interface State {
	activeCategory: string | null
	activeCategoryId: number | null
	typeProduct: TypeProduct | null
	clickCategory: string | null
	setClickCategory: (activeId: string | null) => void
	setActiveCategory: (activeId: string) => void
	setActiveCategoryId: (activeId: number | null) => void
	setActiveType: (type: TypeProduct | null) => void
}

export const useCategoryStore = create<State>()(set => ({
	activeCategory: null,
	activeCategoryId: null,
	typeProduct: null,
	clickCategory: null,
	setActiveCategory: (activeCategory: string) =>
		set(() => ({ activeCategory: activeCategory })),
	setActiveCategoryId: id => set(() => ({ activeCategoryId: id })),
	setActiveType: type => set(() => ({ typeProduct: type })),
	setClickCategory: (clickCategory: string | null) =>
		set(() => ({ clickCategory: clickCategory })),
}))
