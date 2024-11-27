'use client'

import { QueryProportion } from '@/app/api/query-proportion'
import { FiltersListCheckbox } from '@/components/shared/filters/FiltersListChecbox'
import { useFiltersStore } from '@/store/filters'
import { useQuery } from '@tanstack/react-query'

interface IProps {
	onClickCheckbox?: (id: number) => void
	selected?: number[]
	categoryId: number | null
	slug?: string
}

export default function FilterSize({ categoryId }: IProps) {
	const { data, isPending } = useQuery({
		queryKey: ['size-by-type', categoryId],
		queryFn: () => QueryProportion.byCategory(categoryId),
		enabled: !!categoryId,
	})
	const { toggleSizes, sizes, currentCategory } = useFiltersStore(state => ({
		toggleSizes: (id: number) => state.toggleSizes(id),
		sizes: state.sizes,
		currentCategory: state.currentCategory,
	}))

	const item = data?.map(size => ({ value: String(size.id), text: size.value }))
	return (
		<div>
			<FiltersListCheckbox
				loading={isPending}
				selected={sizes?.[currentCategory]}
				onClickCheckbox={toggleSizes}
				name={'size'}
				title={'Размеры'}
				defaultItems={item}
				items={item?.length ? item : []}
			/>
		</div>
	)
}
