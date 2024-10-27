import {TypeDough} from "@/interface/enums";

interface ITypeDough {
    value:TypeDough
    name:string
}

export const DATADOUGHTYPE:ITypeDough[]=[
    {
        value:TypeDough.TRADITIONAL,
        name:'Традиционное',
    },
    {
        value:TypeDough.THIN,
        name:'Тонкое',
    },

]