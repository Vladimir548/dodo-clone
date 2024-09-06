import {ICartItem} from "@/interface/interface-cart-item";
import {IPizzaType} from "@/interface/interface-pizza-type";
import {IProduct} from "@/interface/interface-product";

export interface IProductVariant {
    id: number;
    price: number;
    size?: string;
    quantity?: number;
    productId: number;
    image: string;
    cartItems: ICartItem[];
    pizzaTypes: IPizzaType[];
    product: IProduct;
}