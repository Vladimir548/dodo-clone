import {OrderStatus} from "@/interface/enums";
import {IUser} from "@/interface/interface-user";

export interface IOrder {
    id: number;
    userId: number;
    totalAmount: number;
    status: OrderStatus;
    paymentId?: string;
    items: any; // JSON type in Prisma is represented as `any` in TypeScript
    fullName: string;
    email: string;
    phone: string;
    address: string;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
}