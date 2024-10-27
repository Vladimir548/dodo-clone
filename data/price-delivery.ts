
interface IPriceDelivery {
    price:string,
    from:number
}

export const DATAPRICEDELIVERY:IPriceDelivery[] = [
    {
        from:1,
        price:'300 ₽'
    },
    {
        from:500,
        price:'100 ₽'
    },
    {
        from:650,
        price:'50 ₽'
    },
    {
        from:769,
        price:'Бесплатно'
    },
]