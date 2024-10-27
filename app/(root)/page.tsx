import TopBar from "@/components/shared/top-bar/TopBar";
import Filter from "@/components/shared/filters/Filter";
import Container from "@/components/shared/Container";
import ProductsGroupList from "@/components/shared/products-group-list/ProductsGroupList";
import {Suspense} from "react";



export default function Home() {
    return (
        <>
            <TopBar/>
            <div className={'pt-5'}>
                <Container className={'flex gap-x-[80px]'}>
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                        <Filter/>
                        </Suspense>
                    </div>
                    <div className="w-full">
                     <ProductsGroupList/>
                    </div>
                </Container>
            </div>
        </>
    );
}
