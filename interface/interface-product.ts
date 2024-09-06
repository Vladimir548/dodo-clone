import {TypeProduct} from "@/interface/enums";
import {ICategory} from "@/interface/interface-category";
import {IProductVariant} from "@/interface/interface-product-variant";
import {IIngredient} from "@/interface/interface-ingredient";

export interface IProduct {
    id: number;
    name: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    typeProduct: TypeProduct;
    category: ICategory;
    productVariant: IProductVariant[];
    ingredients: IIngredient[];
}