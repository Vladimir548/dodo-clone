'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";

export default function useTypeProduct(id:number | string) {

    const {data} = useQuery({
        queryKey:['get-id-product',id],
        queryFn:()=>QueryProduct.id(id),
        enabled:!!id
    })

    return {type:data?.typeProduct}
};