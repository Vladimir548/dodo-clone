import {cn} from "@/lib/utils";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {QueryCategory} from "@/app/api/query-category";
import {Skeleton} from "@/components/ui/skeleton";
import {useCategoryStore} from "@/store/category";

interface Props {
    className?: string;
}

interface IItems {
    id: number;
    name: string
}

export default function Categories({className}: Props) {
    const {data, isPending} = useQuery({
        queryKey: ['all-categories'],
        queryFn: () => QueryCategory.all()
    })

    const {activeId,setActiveId} = useCategoryStore()


    useEffect(() => {
        if (data){
        setActiveId(data[0]?.id)
        }
    }, [data,setActiveId]);
    if(!data) return  null
    if (isPending) return <div className={'w-full'}>
        <Skeleton count={1} className={'w-10/12 h-[55px] dark:bg-primary'}/>
    </div>
    if (!data) return  null
    const items: IItems[] = data?.filter(item => item.products.length > 0).map(category => ({name: category.name, id: category.id}))
    return (
        <div
            className={cn('inline-flex gap-1 bg-gray-100 dark:bg-transparent dark:border-2 dark:border-primary p-1 rounded-2xl', className)}>
            {items?.map(({name, id}, index) => (
                <a onClick={() => setActiveId(id)}
                   className={cn(
                       'flex items-center font-bold h-11 rounded-2xl duration-300 px-5 border-2 border-transparent hover:border-primary',
                       activeId === id && 'dark:bg-primary bg-primary text-white  dark:shadow-none ',
                   )}
                   href={`/#${id}`}
                   key={index}>
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};