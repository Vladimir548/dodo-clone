'use client'

import { QueryProduct } from '@/app/api/query-product'
import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
import { IProductsSub } from '@/interface/interface-product-variant'
import { ProductService } from '@/services/product.service'
import { useChangeKit } from '@/store/change-kit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

function SubProductChangeVariant({
	variant,
}: {
	variant: IProductsSub[] | undefined
}) {
	const info = useChangeKit(state => state.infoProduct)
	const defaultInfo = useChangeKit(state => state.defaultProduct)
	const changeVariant = useChangeKit(state => state.changeVariant)

	const { data } = useQuery({
		queryKey: ['get-all-product-by-type', info?.type],
		queryFn: () => QueryProduct.byType(info?.type),
	})

	const product = useMemo(() => {
		return data?.find(variant => variant.id === info?.productId)
	}, [info, data])

	const { setSelectedVariant, selectedVariant } = useGetSizeAndVariant({})

	const getValueVariant = ProductService.getVariant(product, selectedVariant)
	const getImageVariant = ProductService.getImage(product, selectedVariant)
	const getNewVariantId = ProductService.getVariantId(product, selectedVariant)

	useEffect(() => {
		if (selectedVariant) {
			changeVariant(
				selectedVariant,
				getValueVariant,
				getImageVariant,
				getNewVariantId
			)
		}
	}, [selectedVariant, changeVariant])

	return (
		<div className=''>
			<ChooseVariant
				setSelectVariant={setSelectedVariant}
				data={product}
				defaultVariantProps={defaultInfo?.variantTypesId}
			/>
		</div>
	)
}

export default SubProductChangeVariant
