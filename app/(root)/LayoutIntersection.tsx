'use client'

import {useIntersectionCategory} from "@/hooks/useIntersectionCategory";
import {cn} from "@/lib/utils";


interface ILayoutIntersection {
    children:React.ReactNode;
    id:number
    className?:string
}

export default function LayoutIntersection({children,id,className}:ILayoutIntersection) {
    const  {intersectionRef}= useIntersectionCategory(id)

    return (
        <div className={cn('',className)} ref={intersectionRef}>
            {children}
        </div>
    );
};