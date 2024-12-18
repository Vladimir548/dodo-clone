'use client'

import { FiltersListCheckbox } from '@/components/shared/filters/FiltersListChecbox'
import { DATADOUGHTYPE } from '@/data/dough-type'
import { useFiltersStore } from '@/store/filters'

export default function FilterDough() {
	const { doughs, toggleDough } = useFiltersStore(state => ({
		doughs: state.dough,
		toggleDough: (id: number) => state?.toggleDough(id),
	}))

	const item = DATADOUGHTYPE.map(dough => ({
		value: String(dough.id),
		text: dough.name,
	}))
	return (
		<div className={'py-4 border-b'}>
			<FiltersListCheckbox
				selected={doughs.map(val => val.id)}
				onClickCheckbox={toggleDough}
				name={'dough'}
				title={'Тесто'}
				defaultItems={item}
				items={item?.length ? item : []}
			/>
		</div>
	)
}
