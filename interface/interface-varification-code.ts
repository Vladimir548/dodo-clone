import {IUser} from "@/interface/interface-user";

export interface IVerificationCode {
    id: number;
    userId: number;
    code: string;
    createdAt: Date;
    user: IUser;
}