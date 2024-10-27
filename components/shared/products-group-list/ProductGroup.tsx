'use client'


import {useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";
import ProductCard from "@/components/shared/products-group-list/ProductCard";
import {Skeleton} from "@/components/ui/skeleton";

export default function ProductGroup({id}: { id: number }) {

    const {data, isPending} = useQuery({
        queryKey: ['get-by-category', id],
        queryFn: () => QueryProduct.byCategory(id)
    })
    if(isPending) return  (
        <div  className={'grid grid-cols-3 gap-4 '}>
                <Skeleton count={9}  className={'w-full dark:bg-primary h-[450px]'}/>
        </div>
    )
    return (
        <div className={'grid grid-cols-3 gap-4  '}>
                    {data?.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
        </div>
    );
};