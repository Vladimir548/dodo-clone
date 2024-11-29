"use client";

import Filter from "@/components/shared/filters/Filter";
import ProductsGroupList from "@/components/shared/products-group-list/ProductsGroupList";

function HomePage() {
  return (
    <div className="flex gap-x-14 relative">
      <div className="sticky left-0 top-[100px] overflow-y-auto h-[calc(100vh-100px)] scrollbar ">
        <Filter />
      </div>
      <div>
        <ProductsGroupList />
      </div>
    </div>
  );
}

export default HomePage;
