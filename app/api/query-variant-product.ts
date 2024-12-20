import { axiosData } from '@/app/api/axios/axios'
import { IProductVariant } from '@/interface/interface-product-variant'

export const QueryVariantProduct = {
	async create(dto: IProductVariant) {
		console.log('dto', dto)
		const formData = new FormData()
		formData.append('productId', dto.productId.toString())
		if (dto.parameterId) {
			formData.append('parameterId', dto.parameterId.toString())
		}
		formData.append('quantity', String(dto.quantity))
		if (dto?.productAttribute.name) {
			formData.append('attributeName', dto?.productAttribute.name)
		}
		if (dto.sizes) {
			formData.append('sizes', JSON.stringify(dto.sizes))
		}

		if (dto.productsSub) {
			formData.append('productsSub', JSON.stringify(dto.productsSub))
		}

		formData.append('file', dto?.image)

		const { data } = await axiosData.post('/product-variant/create', formData)
		return data as IProductVariant
	},
}
