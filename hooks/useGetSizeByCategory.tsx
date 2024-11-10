
'use client'



import {useQuery} from "@tanstack/react-query";
import {QueryProportion} from "@/app/api/query-proportion";

export default function useGetSizeByCategory(categoryId: number | undefined) {

    const {data,isPending} = useQuery({
        queryKey:['get-size-by-category', categoryId],
        queryFn:()=>QueryProportion.byCategory(categoryId),
        enabled:!!categoryId
    })

    return {data,isPending}

};