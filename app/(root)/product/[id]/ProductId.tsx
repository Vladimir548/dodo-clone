'use client'

import Container from "@/components/shared/Container";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";
import {Button} from "@/components/ui/button";
import {DATADOUGHTYPE} from "@/data/dough-type";
import {useEffect, useState} from "react";
import {PizzaSize, TypeDough} from "@/interface/enums";
import {DATAPIZZASIZE} from "@/data/pizza-size";
import {Title} from "@/components/shared/Title";
import ImageProduct from "@/components/ImageProduct";
import ProductIngredients from "@/components/shared/product/ProductIngredients";
import ProductButtonPrice from "@/components/shared/product/ProductButtonPrice";
import {QueryCartItem} from "@/app/api/query-cart-item";
import {ICartItem} from "@/interface/interface-cart-item";

interface IProductId {
    modalClass?:boolean
}

export default function ProductId({modalClass}:IProductId) {
    const {id} = useParams<{ id: string }>()
    const {data, isPending} = useQuery({
        queryKey: ['get-product-id', id],
        queryFn: () => QueryProduct.id(id)
    })

    const [typeDough, setTypeDough] = useState<TypeDough>(TypeDough.TRADITIONAL)
    const [selectSize, setSelectSize] = useState<PizzaSize>(PizzaSize.MEDIUM)

    useEffect(() => {
        const haveSize = data?.productVariant.filter(val => val.doughName === typeDough).map(val => val.sizes?.find(val => val.size)?.size).filter(Boolean)
        if (haveSize && haveSize.length > 0) {
            const selectedSize = haveSize[0]; // Берем первый элемент или нужный
            if (!data?.productVariant.some(val =>
                val.doughName === typeDough &&
                val.sizes.some(size => size.size === selectSize)
            )) {
                setSelectSize(PizzaSize[selectedSize as keyof typeof PizzaSize]);
            }
        }
    }, [selectSize, typeDough, data])

    if (!data) return null
    return (
        <Container className={`text-white w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${modalClass && 'pt-0'} `}>
            <div className={' relative  flex justify-center items-center  '}>
                <ImageProduct isLoading={isPending} alt={data?.name}
                              src={data?.productVariant?.find(val => val.doughName === typeDough)?.image} sizes={[
                    {'SMALL': 400},
                    {'MEDIUM': 450},
                    {'LARGE': 500},
                ]} size={selectSize}/>
            </div>
            <div className={'flex flex-col gap-y-3  '}>
                <Title size={'lg'} className={'font-bold text-black dark:text-white'} text={data?.name ?? ''}/>
                <div className={'flex gap-x-2 text-black/70 dark:text-white/70 '}>
                    <span>{DATAPIZZASIZE.find(val => val.value === selectSize)?.size}</span>
                    <span>{DATADOUGHTYPE.find(val => val.value === typeDough)?.name.toLowerCase()} тесто</span>
                    <span>{data?.productVariant.filter(val => val.doughName === typeDough)?.map(val => val.sizes?.find(val => val.size === selectSize)?.weight)} г</span>
                </div>
                <div className={` ${modalClass && ' pr-3 h-[400px]  scrollbar overflow-auto'}  flex flex-col gap-y-2`}>
                    <p className={'text-black/70 dark:text-gray-200'}>{data?.ingredients.map(val => val.name).join(', ')}</p>
                    <div
                        className={'flex justify-between p-1 gap-x-1 w-full border-2 border-primary font-bold rounded-lg '}>
                        {DATAPIZZASIZE.map(val => {
                            return (
                                <Button
                                    disabled={!data?.productVariant?.find(find => find?.doughName === typeDough)?.sizes.some(type => type.size === val.value)}
                                    variant={"outline"} onClick={() => setSelectSize(val.value)}
                                    className={`w-full  border-2 ${selectSize === val.value && 'bg-primary text-white'} border-primary  rounded-lg hover:border-primary font-bold`}
                                    key={val.size}>{val.size}</Button>
                            )
                        })}
                    </div>
                    <div className={'flex  border-2 border-primary  p-1 gap-x-1 rounded-lg'}>
                        {DATADOUGHTYPE.map(val => (
                            <Button disabled={!data?.productVariant.find(find => find.doughName === val.value)}
                                    onClick={() => setTypeDough(val?.value)}
                                    className={`w-full  border-2 ${typeDough === val.value && 'bg-primary text-white'} border-primary  rounded-lg hover:border-primary font-bold`}
                                    variant={'outline'} key={val.value}>
                                {val.name}
                            </Button>
                        ))}
                    </div>
                    <div>
                        <ProductIngredients type={data?.typeProduct}/>
                    </div>
                </div>
                <ProductButtonPrice
                    data={data} selectSizePizza={selectSize} selectDough={typeDough}
                    price={data.productVariant
                        .filter(val => val.doughName === typeDough)
                        .map(val => val.sizes
                        .find(val => val.size === selectSize)?.price)
                        .find(val => val !== undefined) ?? 0}/>
            </div>
        </Container>
    );
};