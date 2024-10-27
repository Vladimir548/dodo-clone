import {useIntersection} from "react-use";
import {useEffect, useRef} from "react";
import {useCategoryStore} from "@/store/category";


export const useIntersectionCategory = (categoryId:number)=>{
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold:0.4
    });
    useEffect(() => {
        if (intersection?.isIntersecting) {

            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting]);

    return {intersectionRef}
}