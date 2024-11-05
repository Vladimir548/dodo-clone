import {useIntersection} from "react-use";
import {useEffect, useRef} from "react";
import {useCategoryStore} from "@/store/category";


export const useIntersectionCategory = (categorySlug:string)=>{
    const setActiveSlug = useCategoryStore((state) => state.setActiveSlug);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold:0.4
    });
    useEffect(() => {
        if ( intersection?.isIntersecting ) {
            setActiveSlug(categorySlug);
        }
    }, [categorySlug, intersection?.isIntersecting]);

    return {intersectionRef}
}