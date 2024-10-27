'use client'


import Image from "next/image";
import {URL_API} from "@/constants";
import placeholder from '@/public/placeholder.svg'
import {useEffect, useState} from "react";
interface IProductImage {
    sizes: Record<string, number>[];
    size:string
    alt: string | undefined,
    src: string | undefined
    type?: string
    isLoading?: boolean
}

export default function ImageProduct({ sizes,size, alt, src, isLoading}: IProductImage) {
    const [err,setErr] = useState(false)
    useEffect(() => {
        setErr(false);
    },[src])
    const getSelectValue = (key:string) => {
        const foundObject = sizes.find(obj => obj.hasOwnProperty(key));
        return foundObject ? foundObject[key] : 400;
    };
    return (
        <div className={`relative w-full h-full flex justify-center items-center`}>
            {isLoading || err ? (
                <Image width={getSelectValue(size)} height={getSelectValue(size)} alt={alt ?? 'image'}
                       src={placeholder}/>
            ) : (
                <Image className={'flex justify-center items-center'} onError={() => setErr(true)} width={getSelectValue(size)} height={getSelectValue(size)}
                       alt={alt ?? 'image'} src={`${URL_API}/${src}`}/>
            )}
            {/*<span*/}
            {/*    className={`absolute h-[${getSelectValue(size)}px] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border w-[${getSelectValue(size)}px]  `}>*/}

            {/*</span>*/}

        </div>
    );
};