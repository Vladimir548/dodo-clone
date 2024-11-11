
import {IProduct} from "@/interface/interface-product";
import {TypeDough} from "@/interface/enums";


export const ProductService = {
   sizeForPizza(data: IProduct | undefined,selectedDough:TypeDough) {
       if (data){
        const getAvailableSize = data.productVariant.filter(variant =>
            variant.doughName === selectedDough).map(currentVariant  => currentVariant.sizes)[0].map(size => size.sizeId)
               return getAvailableSize.shift();
       }
   },
    isSizeTypeDough(data: IProduct | undefined,selectedDough:TypeDough,sizeId:number){
       return !data?.productVariant?.find(find => find?.doughName === selectedDough)?.sizes.some(type => type.sizeId === sizeId)
    },

    hasCurrentSize(data: IProduct | undefined,selectedDough:TypeDough,selectedSize:number | undefined){
       return data?.productVariant.filter(variant =>
            variant.doughName === selectedDough).map(type => type.sizes.some(size => size.sizeId === selectedSize))[0]
    },
    calcSumPrice(data: IProduct | undefined,selectedSize:number | undefined,selectedDough?:TypeDough,selectedVariant?:number){
        if(selectedDough) {
       return data?.productVariant
           .filter(val => val.doughName === selectedDough)
           .map(val => val.sizes
               .find(val => val.sizeId === selectedSize)?.price)
           .find(val => val !== undefined) ?? 0
        } else {
            return data?.productVariant.find(variant => variant.productAttribute.id === selectedVariant)?.sizes.find(size => size.id === selectedSize)?.price
        }
    },
    setDefaultSize (data:IProduct | undefined,selectedVariant:number | undefined) {
        if (data){
            const getAvailableSize = data.productVariant.find(variant => variant.productAttribute.id === selectedVariant)?.sizes.map(size => size.id)
               
            if(getAvailableSize) return getAvailableSize.shift();
        }
    },
    setDefaultVariantProduct (data:IProduct | undefined) {
        if(data) {
            const selectedVariant = data.productVariant[0].productAttribute.id 
            return selectedVariant
        }
    }
}