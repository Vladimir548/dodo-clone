'use client'


import CartItemCard from "@/components/cart/CartItemCard";
import {ICartItemResponse} from "@/interface/interface-cart-item";
import {Skeleton} from "@/components/ui/skeleton";

export default function CartItemList({items,isPending}:{items:ICartItemResponse,isPending:boolean}) {
    return (
        <ul className={'flex flex-col gap-y-2 '}>
            {!isPending ? (
            <>
            {items?.map(item => (
               <CartItemCard key={item.id} item={item}/>
            ))}
            </>
            ) : (
                <Skeleton count={5} className={'w-full h-[110px]'} />
            )}
        </ul>
    );
};