import { TypeDough } from '@/interface/enums'

export interface ITypeDough {
	id: number
	value: TypeDough
	name: string
}

export const DATADOUGHTYPE: ITypeDough[] = [
	{
		id: 1,
		value: TypeDough.TRADITIONAL,
		name: 'Традиционное',
	},
	{
		id: 2,
		value: TypeDough.THIN,
		name: 'Тонкое',
	},
]
