import {create} from "zustand";
import {TypeDough} from "@/interface/enums";

interface IFilters {
    sizes: number[];
    toggleSizes:(sizeId:number) => void;
    ingredients:number[],
    toggleIngredients:(ingredientId:number) => void;
    dough:TypeDough[],
    toggleDough:(dough:TypeDough) => void;
    priceFrom:number | null,
    priceTo:number | null,
}

export const useFilters = create<IFilters>()((set) => ({
    sizes:[],
    toggleSizes:(sizeId:number) => set((state) => {
        const sizesList = state.sizes.some((size) => size === sizeId);
        if (!sizesList) {
            return { ...state, sizes: [...state.sizes, sizeId] };
        } else {
            return {
                ...state,
                sizes:state.sizes.filter((size) => size !== sizeId),
            };
        }
}),
    ingredients:[],
    toggleIngredients:(ingredientId:number) => set((state) => {
        const ingredientList = state.ingredients.some(ingredient => ingredient === ingredientId);

        if (!ingredientList) {
            return {...state, ingredients:[...state.ingredients,ingredientId]}
        }
        else  {
            return  {
                ...state,
                ingredients: state.ingredients.filter(ingredient => ingredient !== ingredientId)
            }
        }
    }),
    dough:[],
    toggleDough:(doughType:TypeDough)=>set((state) =>{
        const doughList = state.dough.some(dough => dough === doughType)

        if (!doughList) {
            return {...state,dough:[...state.dough,doughType]}
        }else{
            return  {
                ...state,
                dough:state.dough.filter(dough => dough !== doughType),
            }
        }
    }),
    priceFrom:null,
    priceTo:null
}))