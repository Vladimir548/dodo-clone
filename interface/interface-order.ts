import {OrderStatus} from "@/interface/enums";
import {IUser} from "@/interface/interface-user";
import {ICartItem} from "@/interface/interface-cart-item";

type CartItemJson = {
    cartId: number;
    productVariantId: number;
    productId: number;
    sizeId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

export interface IOrder {
    id: number;
    userId: number;
    totalAmount: number;
    status?: OrderStatus;
    paymentId?: string;
    items: CartItemJson[] | undefined;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
}