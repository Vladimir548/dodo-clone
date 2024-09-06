import {cn} from "@/lib/utils";
import {useState} from "react";

interface Props {

    className?: string;
}
interface IItems {
    id: number;
    name:string
}
export default function Categories({  className }:Props) {
    const items:IItems[] = [
        {
            name:'Все',
            id:0
    },  {
            name:'Мясные',
            id:1
    },  {
            name:'С курицей',
            id:2
    }, {
            name:'Сладкие',
            id:3
    },{
            name:'Вегетариансике',
            id:4
    },{
            name:'Острые',
            id:5
    },
    ]

    const [categoryId, setCategoryActiveId] = useState(0)
    return (
        <div className={cn('inline-flex gap-1 bg-gray-100 dark:bg-transparent dark:border dark:border-primary p-1 rounded-2xl', className)}>
            {items.map(({name, id}, index) => (
                <a onClick={()=> setCategoryActiveId(id)}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl duration-300 px-5 border border-transparent hover:border-primary',
                        categoryId === id && 'dark:bg-primary bg-primary text-white  dark:shadow-none ',
                    )}
                    href={`/#${name}`}
                    key={index}>
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};