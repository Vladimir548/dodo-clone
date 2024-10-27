'use client'



import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QueryCartItem} from "@/app/api/query-cart-item";
import useCurrentUser from "@/hooks/useCurrentUser";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {toast} from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"
export default function ButtonClearCart() {
    const cartId = useCurrentUser()?.cartId

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationKey:['clear-all-cart',cartId],
        mutationFn:()=>QueryCartItem.removeAll(cartId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['cart-id'],
            })
            toast.success('Корзина очищена');
        },
        onError:()=>{
            toast.error('Ошибка');
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  variant={"without"} className={'flex items-center gap-x-2 duration-300 ease-linear text-red-600 hover:text-red-800'}>
                    <Trash2 size={21} /> Очистить корзину
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] backdrop-blur-lg rounded-md">
                <DialogHeader>
                    <DialogTitle className={'text-red-600 pb-3'}>Очистить корзину?</DialogTitle>
                    <DialogDescription className={'text-white text-md'}>
                        Вы уверены, что хотите удалить все товары из корзины? Это действие нельзя будет отменить.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'default'}>Отмена</Button>
                    </DialogClose>
                    <Button className={''} variant={'destructive'} onClick={()=>mutate()}>Очистить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};