

export interface IAddItemCart {

    productId:number
    ingredientIds: number[];
    cartId: number | undefined;
    productVariantId: number | undefined;
    sizeId: number | undefined;
}