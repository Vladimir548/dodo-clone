import { Carrot, IconNode, LayoutGrid, Pizza, Ruler } from 'lucide-react'

interface IDashboardNav {
	label: string
	url: string
	icon: IconNode
}

export const DASHBOARDNAV = [
	{
		label: 'Категории',
		url: '/dashboard/category',
		icon: LayoutGrid,
	},
	{
		label: 'Ингредиенты',
		url: '/dashboard/ingredient',
		icon: Carrot,
	},
	{
		label: 'Продукты',
		url: '/dashboard/product',
		icon: Pizza,
	},
	{
		label: 'Параметры',
		url: '/dashboard/parameter',
		icon: Ruler,
	},

	{
		label: 'Варианты',
		url: '/dashboard/variant',
		icon: Ruler,
	},
]
