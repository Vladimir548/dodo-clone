'use client'

import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {useCallback} from "react";

interface IProps {
    count:number,
    setCount:(count:number)=>void
}

export default function ButtonCounter({setCount,count}:IProps) {

    const handleButtonClick = useCallback((e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault()
    }, []);
    const minusCount = ()=>{
       setCount(count-1)
    }

    return (
        <div onClick={handleButtonClick} className={'flex items-center gap-x-1  '}>
            <Button disabled={count === 1} className={' py-0.5 px-2 h-8  group-hover:hover:text-primary  group-hover:text-white group-hover:border-white'} variant={"outline"} onClick={minusCount}><Minus strokeWidth={3} size={16}/></Button>
                        <b className={'w-[30px] flex justify-center items-center'}> {count}</b>
            <Button disabled={count === 10} className={' py-0.5 px-2 h-8 group-hover:hover:text-primary  group-hover:text-white group-hover:border-white'} variant={"outline"}  onClick={()=>setCount(count+1)}><Plus strokeWidth={3} size={16}/></Button>
        </div>
    );
};