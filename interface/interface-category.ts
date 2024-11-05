import {IProduct} from "@/interface/interface-product";


export interface ICategory {
    id: number;
    name: string;
    slug:string
    createdAt: Date;
    updatedAt: Date;
    products: IProduct[];
}