'use client'

import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import usePriceIngredients from "@/hooks/usePriceIngredients";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QueryCartItem} from "@/app/api/query-cart-item";
import {IProduct} from "@/interface/interface-product";
import { TypeDough} from "@/interface/enums";
import {toast} from "react-toastify";
import {IAddItemCart} from "@/interface/interface-add-item-cart";


interface IProductPrice {
    price: number  | undefined;
    data:IProduct,
    selectDough?:TypeDough,
    selectSize:number | undefined

}

export default function ProductButtonPrice({price,data,selectSize,selectDough}:IProductPrice) {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationKey:['set-cart-item'],
        mutationFn:(dto:IAddItemCart)=>QueryCartItem.create(dto),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['cart-id'],
            })
            toast.success(`${data.name} добавлен в корзину`);
        },
        onError:()=>{
            toast.error('Ошибка при добавлении в корзину');
        }
    })
    const productVariantId = selectDough ?  data.productVariant.find(val => val.doughName === selectDough)?.id : data.productVariant[0].id
    

    const sizeId =selectDough ? data.productVariant.find(val => val.doughName === selectDough)?.sizes.find(size => size.sizeId === selectSize)?.id 
    : data?.productVariant[0].sizes.find(size => size.id === selectSize)?.id

    const {sumPrice,ingredients} = usePriceIngredients()

    const totalPrice = Number(price) + Number(sumPrice)
    const cartId = useCurrentUser()?.cartId
    const userId = useCurrentUser()?.userId

    const addToCart =()=>{
        const objItem:IAddItemCart={
            ingredientIds:ingredients,
            productId:data.id,
            cartId,
            productVariantId,
            sizeId,
        }
        mutate(objItem)
    }
     return (
         <>
             {userId ? (
        <div className={'w-full flex gap-x-2 items-center'}>
            <Button onClick={addToCart}  className={'w-full flex gap-x-2 items-center text-lg h-12 '}>
                <span><ShoppingCart/></span>
                <span>В корзину</span>
                <b>{totalPrice} ₽</b>
            </Button>
        </div>
             ) : (
                 <Link href={'/auth?type=login'} className={'w-full flex gap-x-2 items-center'}>
                     <Button  className={'w-full flex gap-x-2 items-center text-lg h-12 '}>
                         <>
                             <span><ShoppingCart/></span>
                             <span>В корзину</span>
                             <b>{totalPrice} ₽</b>
                         </>
                     </Button>
                 </Link>
             )}
         </>
     );
};