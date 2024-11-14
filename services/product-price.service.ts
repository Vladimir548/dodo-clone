import { TypeDough } from "@/interface/enums";
import { IProduct } from "@/interface/interface-product";

export const ProductPriceService = {
  selectedSize(
    data: IProduct | undefined,
    selectedDough: TypeDough | undefined,
    selectedSize: number | undefined,
    selectedVariant: number | undefined
  ) {
    if (selectedDough) {
      return data?.productVariant
        .find((val) => val.doughName === selectedDough)
        ?.sizes.find((size) => size.sizeId === selectedSize)?.id;
    } else {
      return data?.productVariant
        .find((variant) => variant.productAttribute.id === selectedVariant)
        ?.sizes.find((size) => size.id === selectedSize)?.id;
    }
  },
  selectedVariant(
    data: IProduct | undefined,
    selectedDough: TypeDough | undefined,
    selectedVariant: number | undefined
  ) {
    if (selectedDough) {
      return data?.productVariant.find((val) => val.doughName === selectedDough)
        ?.id;
    } else {
      return data?.productVariant.find(
        (variant) => variant.productAttribute.id === selectedVariant
      )?.id;
    }
  },

  calcTotalSum(
    price: number | undefined,
    totalIngredients?: number | undefined
  ) {
    if (!price) return 0;
    if (totalIngredients) {
      return Number(price) + Number(totalIngredients);
    } else {
      return Number(price);
    }
  },
};
