'use client'


import {Title} from "@/components/shared/Title";
import {NumericFormat} from "react-number-format";
import {Input} from "@/components/ui/input";
import {RangeSlider} from "@/components/shared/filters/FilterRangeSlider";

import {useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
interface PriceProps {
    priceFrom: number | undefined,
    priceTo: number | undefined,
  
}
interface IProps extends PriceProps {
    setPrices: (name: keyof PriceProps, value: number) => void;
    categoryId:number
}
export default function FilterPrice({priceTo,priceFrom,setPrices,categoryId}:IProps) {

    const {data, isPending} = useQuery({
        queryKey: ['all-product',categoryId],
        queryFn: () => QueryProduct.maxPrice(categoryId),
        enabled:!!categoryId
    })
    const [localPrice,setLocalPrice]= useState<PriceProps>({priceFrom: 0, priceTo: 0})
    useEffect(() => {
        if (data) {
            setLocalPrice({ priceFrom: 0, priceTo: Number(data) });
        }
    }, [data]);
    const updatePrices = (prices: number[]) => {
        setPrices('priceFrom', prices[0]);
        setPrices('priceTo', prices[1]);
    };
    if (isPending) {
        return (
            <div>
                <Skeleton count={1} className={'w-1/2 dark:bg-primary h-7'}/>
                <div className={'pt-4 pb-4'}>
                    <div className={'flex items-center gap-x-4 pb-5'}>
                        <Skeleton count={1} className={'h-10 dark:bg-primary w-full'}/>
                        <Skeleton count={1} className={'h-10 dark:bg-primary w-full'}/>
                    </div>
                    <Skeleton count={1} className={'w-full dark:bg-primary h-1'}/>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Title text={'Цена'} size={"xs"} className={'font-bold'}/>
            <div className={'pt-4'}>
                <div className={'flex items-center gap-x-4 pb-5'}>
                    <NumericFormat isAllowed={(values) => {
                        const {value} = values;
                        if(priceFrom &&  Number(value) >  priceFrom) {
                            if( Number(value) > Number(data)) {
                                setPrices('priceFrom', Number(data))
                                return false
                            }
                            return  true
                        }
                        if(Number(value) ===0) {
                        return false
                        }
                            setPrices('priceFrom', 0)
                            return  true
                    }} onValueChange={(values) => setPrices('priceFrom', Number(values.value))} customInput={Input}
                                   value={priceFrom ?? localPrice.priceFrom} min={0} suffix={' ₽'} prefix={'От '}/>

                    <NumericFormat isAllowed={(values) => {
                        const { value } = values;
                        const numberValue = Number(value);
                        if (numberValue > Number(data)) {
                            setPrices('priceTo', Number(data))

                            return false;
                        }
                        if (numberValue < 1) {
                            setPrices('priceTo', 0)
                            return false;
                        }
                        return true;
                    }}
                                   onValueChange={(values) => setPrices('priceTo', Number(values.value))} customInput={Input}
                                   value={priceTo ?? Number(data)} max={Number(data)}  prefix={'До '} suffix={' ₽'} />
                </div>
                <RangeSlider onValueChange={updatePrices} value={[priceFrom ?? 0, Number(priceTo) ? Number(priceTo) : Number(localPrice.priceTo) ] } min={0} max={Number(data)}
                             step={10}/>
            </div>
        </div>
    );
};