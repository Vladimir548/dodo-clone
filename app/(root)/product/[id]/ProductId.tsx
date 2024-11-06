'use client'
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";
import {TypeProduct} from "@/interface/enums";
import ProductIdPizza from "@/app/(root)/product/[id]/ProductIdPizza";
import ProductIdAll from "@/app/(root)/product/[id]/ProductIdAll";


interface IProductId {
    modalClass?:boolean
}

export default function ProductId({modalClass}:IProductId) {
    const {id} = useParams<{ id: string }>()
    const {data, isPending} = useQuery({
        queryKey: ['get-product-id', id],
        queryFn: () => QueryProduct.id(id)
    })
    console.log(data)
    return (
        <div>
            {TypeProduct.PIZZA === data?.type && <ProductIdPizza data={data} isPending={isPending} modalClass={modalClass} />  }
            {TypeProduct.DRINKS === data?.type && <ProductIdAll data={data} modalClass={modalClass} /> }
        </div>
    );
};