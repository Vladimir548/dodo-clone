import {IProduct} from "@/interface/interface-product";
import {TypeProduct} from "@/interface/enums";


export interface ICategory {
    id: number;
    name: string;
    slug:string
    type:TypeProduct
    createdAt: Date;
    updatedAt: Date;
    products: IProduct[];
}