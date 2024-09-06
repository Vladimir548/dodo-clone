import {IProductVariant} from "@/interface/interface-product-variant";
import {TypePizza} from "@/interface/enums";

export interface IPizzaType {
    id: number;
    name: TypePizza;
    productVariants: IProductVariant[];
}