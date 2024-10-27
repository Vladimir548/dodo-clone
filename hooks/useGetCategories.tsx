'use client'




import {useQuery} from "@tanstack/react-query";
import {QueryCategory} from "@/app/api/query-category";


export const useGetCategories = () => {

    const {data,isPending} = useQuery({
        queryKey: ['all-categories'],
        queryFn: () => QueryCategory.all()
    })
    return  {data,isPending}
}