import {IProductVariant} from "@/interface/interface-product-variant";


export interface IPizzaType {
    id: number;
    name: TypePizza;
    productVariants: IProductVariant[];
}

interface TypePizza {
    value:string,
    name: string,
}