import { TypeProduct } from '@/interface/enums'

interface ITypeProduct {
	value: TypeProduct
	name: string
}

export const DATAPRODUCTYPE: ITypeProduct[] = [
	{
		value: TypeProduct.PIZZA,
		name: 'Пицца',
	},
	{
		value: TypeProduct.DRINKS,
		name: 'Напиток',
	},
	{
		value: TypeProduct.COMBO,
		name: 'Комбо',
	},
	{
		value: TypeProduct.SNACKS,
		name: 'Закуска',
	},
	{
		value: TypeProduct.SAUCES,
		name: 'Соус',
	},
	{
		value: TypeProduct.DESSERTS,
		name: 'Десерт',
	},
	{
		value: TypeProduct.PIZZA_HALF,
		name: 'Пицца из половинок',
	},
]
