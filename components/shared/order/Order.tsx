'use client'
import Container from "@/components/shared/Container";
import OrderSectionCart from "@/components/shared/order/OrderSectionCart";
import OrderSectionPersonalData from "@/components/shared/order/OrderSectionPersonalData";
import OrderSectionAddressDelivery from "@/components/shared/order/OrderSectionAddressDelivery";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QueryCart} from "@/app/api/query-cart";
import OrderPrice from "@/components/shared/order/OrderPrice";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {Title} from "@/components/shared/Title";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {IOrder} from "@/interface/interface-order";
import {ICartItem} from "@/interface/interface-cart-item";
import {QueryOrder} from "@/app/api/query-order";
import {toast} from "react-toastify";
import {useEffect} from "react";


export default function Order() {
    const userId = useCurrentUser()?.userId
    const {data, isPending} = useQuery({
        queryKey: ['cart-id', userId],
        queryFn: () => QueryCart.getById(userId),
        enabled: !!userId,
    })
    const {mutate} = useMutation({
        mutationKey: ['order-id', userId],
        mutationFn: (data:IOrder) => QueryOrder.create(data),
        onSuccess:()=> {
            toast.success('Заказ оформлен')
        },
        onError: () => {
            toast.error('Ошибка')
        }
    })
    const {replace} = useRouter()



    const {handleSubmit, control, reset,} = useForm<IOrder>()

    useEffect(() => {
        const jsonItemsData = data?.items?.map((item: ICartItem) => ({
            cartId: item.cartId,
            productVariantId: item.productVariantId,
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt)
        }))
        reset({
            items: jsonItemsData,
            totalAmount: Number(data?.totalAmount),
            userId: Number(userId),
        });
    }, [data, userId,reset]);

    const  onSubmit = (data:IOrder)=> {
        mutate(data)
        console.log(data)
    }

    if (data?.items.length === 0 || !data) return <div
        className={'flex justify-center items-center flex-col h-screen gap-y-4'}>
        <Title size={"lg"} text={'Вы не выбрали ни одного товара'}/>
        <Button onClick={() => replace('/')} className={'flex items-center gap-x-2 px-5 py-4'}> <ArrowLeft
            size={20}/> Вернуться назад</Button>
    </div>
    return (
        <Container className={'py-10'}>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-x-3'}>
                    <div className={'w-[800px] flex flex-col gap-y-3'}>
                        <section>
                            <OrderSectionCart isPending={isPending} items={data?.items}/>
                        </section>
                        <section>
                            <OrderSectionPersonalData fieldEmail={'email'} fieldPhone={'phone'} fieldFirstName={'firstName'} fieldLastName={'lastName'} control={control}/>
                        </section>
                        <section>
                            <OrderSectionAddressDelivery control={control} fieldComment={'comment'} fieldAddress={'address'}  />
                        </section>
                    </div>
                    <div>
                        <OrderPrice isPending={isPending} totalAmount={data?.totalAmount}
                                    amountGoods={data?.amountGoods}
                                    count={data?._count?.items}/>
                    </div>
            </form>
        </Container>
    );
};