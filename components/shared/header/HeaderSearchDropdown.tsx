'use client'

import {CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command";
import {useQuery} from "@tanstack/react-query";
import {QueryProduct} from "@/app/api/query-product";

import {Skeleton} from "@/components/ui/skeleton";
import {QueryCategory} from "@/app/api/query-category";
import {useGetCategories} from "@/hooks/useGetCategories";
import Link from "next/link";
import Image from "next/image";
import {URL_API} from "@/constants";

interface IProps {
    query: string
}


export default function HeaderSearchDropdown({query}: IProps) {

    const {data, isPending} = useQuery({
        queryKey: ['search-product', query],
        queryFn: () => QueryProduct.query(query)
    })

    const {data: category} = useGetCategories()
    if (isPending) {
        return <Skeleton count={10} className={'flex my-0.5 h-6 dark:bg-primary rounded-sm w-full'}/>

    }

    if (!data || !category) return 'Ошибка данных'
    return (
        <>
            <CommandList className={'bg-white dark:bg-dark-background  scrollbar  text-primary dark:text-primary'}>
                <CommandEmpty>Ничего не найдено</CommandEmpty>
                {Object?.keys(data).map(type => (
                    <CommandGroup key={type}
                                  heading={category?.find(val => val?.id === +type)?.name}>
                        {data[type]?.map(val => (
                            <Link scroll={false} key={val.id} href={`/product/${val.id}`}>
                                <CommandItem
                                    className={'hover:bg-primary flex gap-x-3 items-center  font-bold dark:hover:text-white dark:text-primary data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:dark:text-white py-2 cursor-pointer '}
                                >
                                    <Image width={50} height={50} src={`${URL_API}/${val.image}`} alt={val.name}/>
                                   <p className={'text-lg'}> {val.name}</p>
                                </CommandItem>
                            </Link>
                        ))}
                        <CommandSeparator className={'dark:bg-primary/20 bg-black/20'}/>
                    </CommandGroup>
                ))}
            </CommandList>
        </>
    );
};