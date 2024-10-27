import {IUser} from "@/interface/interface-user";
import {ICartItem} from "@/interface/interface-cart-item";

export interface ICart {
    id: number;
    userId: number;
    totalAmount: number;
    amountGoods:number;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
    items: ICartItem[];
    _count:Count
}
export interface Count {
    items: number
}