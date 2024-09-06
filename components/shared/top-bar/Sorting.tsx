import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {ArrowDownUp} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";

interface IItems {
    id: string;
    name: string
}

export default function Sorting() {
    const items: IItems[] = [
        {
            name: 'Рейтингу',
            id: 'rating'
        }, {
            name: 'Популярности',
            id: 'popular'
        }, {
            name: 'Цене',
            id: 'price'
        },
    ]

    const [categoryId, setCategoryActiveId] = useState<string>('popular')

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild className={' dark:bg-transparent   flex items-center gap-x-2 rounded-lg '}>
                  <Button className={'gap-x-1'} variant={"outline"}>
                    <ArrowDownUp/> <b>Сортировка
                    по:</b><span > {items.find(val => val.id === categoryId)?.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={'dark:bg-black/50 dark:border dark:border-primary backdrop-blur-lg'}>
                    <ul>
                        {items.map((item, id) => (
                            <li key={item.id} className={'p-2'} >
                                <Button onClick={()=> setCategoryActiveId(item.id)} className={'w-full'} variant={categoryId === item.id ? 'default' : "outline"}>
                                    {item.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    );
};