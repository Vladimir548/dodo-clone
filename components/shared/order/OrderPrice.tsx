'use client'

import TooltipDelivery from "@/components/tooltips/TooltipDelivery";
import {useDeliveryPrice} from "@/hooks/useDeliveryPrice";
import useDefinitionGoods from "@/hooks/useDefinitionGoods";
import {Button} from "@/components/ui/button";
import {Package, Truck} from "lucide-react";
import {InputCustom} from "@/components/shared/InputCustom";
import {Skeleton} from "@/components/ui/skeleton";

interface Props {
    count:number
    totalAmount:number
    amountGoods:number,
    isPending:boolean
}

export default function OrderPrice({count,totalAmount,amountGoods,isPending}:Props) {

    const priceDelivery = useDeliveryPrice(amountGoods)
    const definitionGoods = useDefinitionGoods(count)

    return (
        <div className={'w-[350px] border border-primary rounded-md p-3'}>
            <div className={' flex flex-col gap-y-3'}>
                <div className={'flex flex-col gap-y-3 border-b pb-2 border-gray-500 '}>
                    <p className={'  flex items-center justify-between '}>
                        {!isPending ? (
                        <span className={'flex items-center gap-x-2 '}><Package size={16} />  {count} {definitionGoods}</span>
                        ) : <Skeleton count={1} className={'w-1/2 h-[30px]'} />}
                        {!isPending ? (
                        <b>{amountGoods} ₽</b>
                        ) : <Skeleton count={1} className={'w-1/3 h-[30px]'} />}
                        </p>
                    <p className={'  flex items-center justify-between '}>
                        {!isPending ? (
                        <span className={'flex items-center gap-x-2'}><Truck size={16} /> Доставка <TooltipDelivery/></span>
                        ) : <Skeleton count={1} className={'w-1/2 h-[30px]'} />}
                        {!isPending ? (
                        <b>{priceDelivery}</b>
                        ) :<Skeleton count={1} className={'w-1/3 h-[30px]'} /> }
                    </p>

                    <div>
                        <InputCustom placeholder={'У меня есть промокод'}/>
                    </div>
                </div>
                <div className=" flex items-center justify-between  text-lg">
                    Сумма заказа
                    <div className="flex-1 border-b border-dashed border-b-neutral-400 relative top-2 mx-2"/>
                    {!isPending ? (
                    <b className="text-nowrap text-primary">{totalAmount} ₽</b>
                    ): <Skeleton count={1} className={'w-1/3 h-[30px]'} />}
                </div>

                <Button type={"submit"} className={'text-lg'}>Оформить заказ</Button>
            </div>
        </div>
    );
};