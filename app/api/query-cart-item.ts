import {axiosClassic} from "@/app/api/axios/axios";
import {ICartItemResponse} from "@/interface/interface-cart-item";
import {IAddItemCart} from "@/interface/interface-add-item-cart";
import axios from "axios";


export const QueryCartItem = {
    async create(dto:IAddItemCart){
        const {data} = await axiosClassic.post('/cart-item/add',dto)

        return data as IAddItemCart
    },
    async allItemById(cartId:number | undefined){
        const {data} = await axiosClassic.get(`/cart-item/all/${cartId}`)

        return data as ICartItemResponse
    },
    async remove(id:number,cartId:number | undefined | null){
        const dto ={
            id,
            cartId,

        }
        const {data} = await axiosClassic.post(`/cart-item/delete`,dto)

        return data as ICartItemResponse
    },
    async removeAll(cartId:number | undefined | null){
        const {data} = await axiosClassic.post(`/cart-item/delete/all`,{ id: cartId })
        return data as ICartItemResponse
    },

    async changeQuantity(id:number,cartId:number | undefined,quantity:number){
        const dto ={
            id,
            cartId,
            quantity
        }
        const {data} = await axiosClassic.post(`/cart-item/change-quantity`,dto)
        return data as ICartItemResponse
    }

}