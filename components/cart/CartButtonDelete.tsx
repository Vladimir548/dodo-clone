'use client'
import {Trash} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QueryCartItem} from "@/app/api/query-cart-item";
import useCurrentUser from "@/hooks/useCurrentUser";
import {toast} from "react-toastify";

export default function CartButtonDelete({id,size}:{id:number,size?:number}) {
    const cartId =useCurrentUser()?.cartId
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationKey:['delete-item',id,cartId],
        mutationFn:()=>QueryCartItem.remove(id,cartId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['cart-id'],
            })
            toast.success('Товар удален', {
                position:'bottom-left'
            });
        },
        onError:()=>{
            toast.error('Ошибка при удалении товара' ,{
                position:'bottom-left'
            });
        }
    })

    return (
        <button onClick={()=>mutate()}
            className={' text-red-600'}>
            <Trash className={'duration-300 ease-in-out hover:fill-red-600'} size={size ? size : 18}/>
        </button>
    );
};