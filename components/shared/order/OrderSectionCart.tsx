'use client'
import {Title} from "@/components/shared/Title";
import OrderItemCard from "@/components/shared/order/OrderItemCard";
import {ICartItemResponse} from "@/interface/interface-cart-item";
import ButtonClearCart from "@/components/ButtonClearCart";
import {Skeleton} from "@/components/ui/skeleton";

interface ISectionItem {
    items:ICartItemResponse,
    isPending:boolean
}

export default function OrderSectionCart({items,isPending}:ISectionItem) {

    return (
        <div className={'border border-primary rounded-md p-3 '}>
            <div className={'flex justify-between items-center border-b border-gray-500 py-2'}>
                <Title className={'font-bold'} text={'1. Корзина'}/>
                <ButtonClearCart/>
            </div>
            <ul className={'flex flex-col gap-y-2 pt-2 max-h-[500px] overflow-y-auto  scrollbar '}>
                {!isPending ? (
                <>
                {items?.map((item) => (
                    <li className={'border-b border-gray-700 last:border-none w-full pr-2'}  key={item.id}>
                            <OrderItemCard item={item}/>
                    </li>
                ))}
                </>
                ) : (
                    <Skeleton count={5} className={'w-full h-[80px]'} />
                )}
            </ul>

        </div>
    );
};
