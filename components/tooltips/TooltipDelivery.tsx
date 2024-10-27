'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button";
import {Info} from "lucide-react";
import {Title} from "@/components/shared/Title";
import {DATAPRICEDELIVERY} from "@/data/price-delivery";
export default function TooltipDelivery() {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button><Info size={14} /></button>
                </TooltipTrigger>
                <TooltipContent className={'max-w-[400px]'}>
                   <Title className={'pb-2'} text={'Стоимость доставки'}/>
                    <p className={'dark:text-white/80 text-black/70 pb-1'}>Эта цена помогает нам доставлять наши горячие и вкусные пиццы очень быстро</p>
                    <ul>
                        {DATAPRICEDELIVERY.map(price => (
                            <li className={'dark:text-secondary-white gap-y-2 text-secondary-black flex justify-between items-center border-b border-gray-500'} key={price.price}>
                                <span>Заказ от {price.from} ₽</span>
                                <span>{price.price}</span>
                            </li>
                        ))}
                    </ul>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};