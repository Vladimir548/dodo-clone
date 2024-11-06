'use client'

import Container from "@/components/shared/Container";
import Image from "next/image";
import {URL_API} from "@/constants";
import {useEffect, useState} from "react";
import {Title} from "@/components/shared/Title";
import {IProduct} from "@/interface/interface-product";
import useGetSizeByCategory from "@/hooks/useGetSizeByCategory";
import {Button} from "@/components/ui/button";
import {ProductService} from "@/services/product.service";


interface IProductId {
    modalClass?:boolean
    data:IProduct
}

export default function ProductIdAll({modalClass,data}:IProductId) {
    const {data:sizesByCategory} =useGetSizeByCategory(data?.categoryId)
    const [selectedSize,setSelectedSize] = useState<number>()
    const defaultSize = ProductService.setDefaultSize(data)

    useEffect(()=>{
            setSelectedSize(defaultSize)
    },[data])

    return (
        <Container
            className={`text-white w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${modalClass && 'pt-0'} `}>
            <div className={' relative  flex justify-center items-center  '}>
                <Image alt={data?.name ?? 'image'}
                       src={`${URL_API}/${data?.productVariant[0].image}`}
                width={400} height={400}
                />
            </div>
            <div className={'flex flex-col gap-y-3'}>
                <Title size={'lg'} className={'font-bold text-black dark:text-white'} text={data?.name ?? ''}/>
                <div className={'flex gap-x-2 text-black/70 dark:text-white/70 '}>
                    <span>{sizesByCategory?.find(val => val.id === selectedSize)?.value}</span>
                    {/*<span>{DATADOUGHTYPE.find(val => val.value === typeDough)?.name.toLowerCase()} тесто</span>*/}
                    {/*<span>{data?.productVariant.filter(val => val.doughName === typeDough)?.map(val => val.sizes?.find(val => val.sizeId === selectSize)?.weight)} г</span>*/}
                </div>

                {data.productVariant[0].sizes?.map(val => {
                    return (
                        <Button
                            variant={"outline"} onClick={() => setSelectedSize(val.id)}
                            className={`w-full  border-2 ${selectedSize === val.id && 'bg-primary text-white'} border-primary  rounded-lg hover:border-primary font-bold`}
                            key={val.id}>{val.proportion.value}</Button>
                    )
                })}
            </div>
        </Container>
    );
};