import {ICartItem} from "@/interface/interface-cart-item";
import Image from "next/image";
import {URL_API} from "@/constants";
import {DATADOUGHTYPE} from "@/data/dough-type";
import {DATAPIZZASIZE} from "@/data/pizza-size";
import CartButtonCounter from "@/components/cart/CartButtonCounter";
import CartButtonDelete from "@/components/cart/CartButtonDelete";

interface Props {
    item:ICartItem
}

export default function OrderItemCard({item}: Props) {
    const totalPriceIngredients = item.ingredients.reduce((acc,ingredient) => acc+ingredient.price,0)
    const totalPrice = (totalPriceIngredients +item.size.price) * item.quantity
    return (
        <div className={'flex flex-col gap-y-2 py-1 w-full'}>
            <div className={'flex gap-x-3 items-center'}>
            <div>
                <Image width={80} height={80} src={`${URL_API}/${item.productVariant?.image}`}
                       alt={item.product.name}/>
            </div>
                <div className={'flex items-center justify-between w-full'}>
                    <div className={'w-[400px] flex flex-col flex-wrap '}>
                        <h3 className={'font-bold'}>{item.product.name}</h3>
                        <div className={'flex items-center gap-x-3 dark:text-gray-200 text-black/60 text-md'}>
                            <span>{DATADOUGHTYPE.find(val => val.value === item.productVariant.doughName)?.name}</span>
                            <span> {item.size.proportion.value}</span>
                            <span>{item.size.weight} г</span>
                        </div>
                        {item.ingredients.length > 0 && (
                            <div className={'dark:text-gray-200 text-black/60 text-sm flex gap-x-1'}>
                                + {item.ingredients.map(ingredient => ingredient.name).join(', ')}
                            </div>
                        )}
                    </div>
                    <span className={'flex items-center gap-x-2 text-lg'}>
                 <b className={'text-primary'}>{totalPrice} ₽</b>
            </span>
                    <div className={'flex items-center gap-x-3'}>
                        <CartButtonCounter quantity={item.quantity} cartId={item.cartId} id={item.id}/>
                        <CartButtonDelete id={item.id} size={21}/>
                    </div>
                </div>
            </div>

        </div>
    );
};