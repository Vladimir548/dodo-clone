import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {ArrowDownUp} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
                <PopoverTrigger asChild className={' w-[300px]  flex items-center gap-x-2 rounded-lg '}>
                  <Button className={'gap-x-1'} variant={"outline"}>
                    <ArrowDownUp/> <b>Сортировка
                    по:</b><span className={'font-bold'}> {items.find(val => val.id === categoryId)?.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={'dark:bg-black/80 dark:border dark:border-primary backdrop-blur-lg'}>
                    <RadioGroup onValueChange={(value) => setCategoryActiveId(value)} className={'flex flex-col gap-y-2'} value={categoryId} defaultValue={items[0].id}>
                        {items.map((item,) => (
                                    <div key={item.id} className="flex items-center space-x-2 cursor-pointer">
                                        <RadioGroupItem value={item.id} id={item.id} />
                                        <label className={`dark:text-white ${categoryId === item.id && 'dark:text-primary'}`} htmlFor={item.id}>{item.name}</label>
                                    </div>
                        ))}
                    </RadioGroup>
                </PopoverContent>
            </Popover>
        </div>
    );
};