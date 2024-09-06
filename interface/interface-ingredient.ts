import {IProduct} from "@/interface/interface-product";
import {ICartItem} from "@/interface/interface-cart-item";

export interface IIngredient {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    cartItems: ICartItem[];
    products: IProduct[];
}