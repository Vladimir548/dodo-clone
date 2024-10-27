'use client'


import {useEffect, useState} from "react";

export const useDeliveryPrice = (price:number | undefined) => {
    const [deliveryPrice, setDeliveryPrice] = useState<string>('Бесплатно');
    useEffect(()=>{
        if (price) {
            if (price >= 769) {
                setDeliveryPrice('Бесплатно');
            } else if (price >= 650) {
                setDeliveryPrice('50 ₽');
            } else if (price >= 500) {
                setDeliveryPrice('100 ₽');
            } else if (price >= 1) {
                setDeliveryPrice('300 ₽');
            }
        }
    },[price]);
    return deliveryPrice
}