import {IProduct} from "@/interface/interface-product";
import {ICartItem} from "@/interface/interface-cart-item";
import {TypeProduct} from "@/interface/enums";

export interface IIngredient {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    cartItems: ICartItem[];
    products: IProduct[];
    file:File
    typeProduct:TypeProduct[]
}