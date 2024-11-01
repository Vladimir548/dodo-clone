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
                <Container> 
                     <ProductsGroupList/>
                </Container>
            </div>
        </>
    );
}
