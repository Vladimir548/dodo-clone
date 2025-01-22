'use client'

import { QueryVariant } from '@/app/api/query-variant'
import { FiltersListCheckbox } from '@/components/shared/filters/FiltersListChecbox'
import { TypeProduct } from '@/interface/enums'
import { useFiltersStore } from '@/store/filters'
import { useQuery } from '@tanstack/react-query'

export default function FilterDough() {
	const { doughs, toggleDough } = useFiltersStore(state => ({
		doughs: state.dough,
		toggleDough: (id: number) => state?.toggleDough(id),
	}))
	const { data } = useQuery({
		queryKey: ['variant-by-type'],
		queryFn: () => QueryVariant.byType(TypeProduct.PIZZA),
	})

	const item = data?.map(dough => ({
		value: String(dough.id),
		text: dough.value ?? '',
	}))
	return (
		<div className={'py-4 border-b'}>
			<FiltersListCheckbox
				selected={doughs}
				onClickCheckbox={toggleDough}
				name={'dough'}
				title={'Тесто'}
				defaultItems={item ?? []}
				items={item ?? []}
			/>
		</div>
	)
}
