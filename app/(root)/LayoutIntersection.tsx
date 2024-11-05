'use client'

import {useIntersectionCategory} from "@/hooks/useIntersectionCategory";
import {cn} from "@/lib/utils";


interface ILayoutIntersection {
    children:React.ReactNode;
    id:number
    className?:string
}

export default function LayoutIntersection({children,id,className}:ILayoutIntersection) {
    console.log(id)
    const  {intersectionRef}= useIntersectionCategory(id)
    console.log(intersectionRef);
    return (
        <div className={cn('min-h-[600px]',className)} id={String(id)} ref={intersectionRef}>
            {children}
        </div>
    );
};