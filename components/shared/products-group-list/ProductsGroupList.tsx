'use client'

import ProductGroup from "@/components/shared/products-group-list/ProductGroup";

import LayoutIntersection from "@/app/(root)/LayoutIntersection";
import {Skeleton} from "@/components/ui/skeleton";
import {useGetCategories} from "@/hooks/useGetCategories";
import Filter from "../filters/Filter";
import { Suspense } from "react";
export default function ProductsGroupList() {
    const {data,isPending} = useGetCategories()
    console.log(data)
    if(isPending) return  (
        <div  className={'grid grid-cols-3 gap-4 '}>
                <Skeleton count={9} className={'w-full dark:bg-primary h-[450px]'}/>
        </div>
    )
    return (
        <div className={'w-full flex flex-col gap-y-20'}>
            {data?.map(val => (
                <LayoutIntersection id={val.id} key={val.id} >
                    <div className="flex gap-x-[80px]">
                        <div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Filter/>
                        </Suspense>
                        </div>
                        <div className="w-full">
                            <ProductGroup id={val.id}/>
                        </div>
                    </div>
                </LayoutIntersection>
            ))}
        </div>
    );
};