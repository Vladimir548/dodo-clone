import {ICartItem} from "@/interface/interface-cart-item";
import {IProduct} from "@/interface/interface-product";
import {PizzaSize, TypeDough} from "@/interface/enums";


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
}
export interface ISize {
    id: number;
    price: number;
    weight: number;
    size:string

}