'use client'

import {useIntersectionCategory} from "@/hooks/useIntersectionCategory";
import {cn} from "@/lib/utils";


interface ILayoutIntersection {
    children:React.ReactNode;
    slug:string
    className?:string
}

export default function LayoutIntersection({children,slug,className}:ILayoutIntersection) {
    const  {intersectionRef}= useIntersectionCategory(slug)
    console.log(intersectionRef);
    return (
        <div className={cn('min-h-[600px]',className)} id={slug} ref={intersectionRef}>
            {children}
        </div>
    );
};