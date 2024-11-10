import {ICartItem} from "@/interface/interface-cart-item";
import {IProduct} from "@/interface/interface-product";
import {PizzaSize, TypeDough} from "@/interface/enums";
import {IProportion} from "@/interface/IProportion";
import {IProductAttribute} from "@/interface/interface-product-attribute";
import {IIngredient} from "@/interface/interface-ingredient";


export interface IProductVariant {
    id: number;
    parameterId:number
    quantity?: number;
    productId: number;
    image: string;
    cartItems: ICartItem[];
    sizes: ISize[];
    product: IProduct;
    doughName?:TypeDough
    file:File
    productAttribute: IProductAttribute
}
export interface ISize {
    id: number;
    price: number;
    weight: string;
    sizeId:number
    ingredientIds?:number[]
    proportion:IProportion

}