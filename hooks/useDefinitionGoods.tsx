'use client'
import {useEffect, useState} from "react";

export default function useDefinitionGoods(count:number | undefined) {
    const [definitionGoods, setDefinitionGoods] = useState<string>('товар');
    useEffect(()=>{
        if (count) {
            if (count === 1) {
                setDefinitionGoods('товар')
            } else if (count >= 5 || count === 0) {
                setDefinitionGoods('товаров')
            } else if (count >= 2) {
                setDefinitionGoods('товара')
            }
        }
    },[count]);
    return definitionGoods
};