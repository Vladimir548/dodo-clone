import {ICart} from "@/interface/interface-cart";
import {IProductVariant} from "@/interface/interface-product-variant";
import {IIngredient} from "@/interface/interface-ingredient";

export interface ICartItem {
    id: number;
    cartId: number;
    productVariantId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    cart: ICart;
    productVariant: IProductVariant;
    ingredients: IIngredient[];
}