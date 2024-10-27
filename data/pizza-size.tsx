import {PizzaSize} from "@/interface/enums";

interface IPizzaSize {
    value:PizzaSize
    size:string
}

export const DATAPIZZASIZE:IPizzaSize[]=[
    {
        value:PizzaSize.SMALL,
        size:'25 См',
    },
    {
        value:PizzaSize.MEDIUM,
        size:'30 См',
    },
    {
        value:PizzaSize.LARGE,
        size:'35 См',
    },

]