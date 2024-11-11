'use client'

import Image from "next/image";
import {URL_API} from "@/constants";
import {Button} from "@/components/ui/button";

import { CircleCheckBig} from "lucide-react";
import {Title} from "@/components/shared/Title";
import {useFilters} from "@/store/filters";
import { IIngredient } from "@/interface/interface-ingredient";


export default function ProductIngredients({data}: { data:IIngredient[] | undefined }) {
   
    const {toggleIngredients,ingredients} = useFilters()
    return (
        <>
        {data && data?.length > 0 && (
        <>
            <Title size={"md"} className={'font-bold pb-2'} text={'Добавить по вкусу'}/>
            <div className={'w-full grid grid-cols-3 gap-3  scrollbar px-2  '}>
                {data?.map(val => (
                    <Button onClick={() => toggleIngredients(val.id)} variant={'outline'}
                            className={'relative flex h-full text-wrap flex-col rounded-md items-center shadow-default shadow-white/20 p-2 overflow-hidden '}
                            key={val.id}>
                        <Image src={`${URL_API}/${val.image}`} width={90} height={90} alt={val.name}/>
                        <p className={' text-sm line-clamp-2 flex flex-1 text-center'}>{val.name}</p>
                        <b>{val.price} ₽</b>
                        {ingredients.some(ingr => ingr === val.id) && (
                            <span className={`absolute top-1 right-1`}><CircleCheckBig/></span>
                        )}
                    </Button>
                ))}
            </div>
            </>
            )}
        </>
    );
};