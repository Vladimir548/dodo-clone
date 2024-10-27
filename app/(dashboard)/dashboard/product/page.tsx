import CreateProduct from "@/app/(dashboard)/dashboard/product/CreateProduct";
import CreateVariantProduct from "@/app/(dashboard)/dashboard/product/CreateVariantProduct";

export default function Page() {
    return (
        <div className={'flex flex-col gap-y-2'}>
            <CreateProduct/>
            <CreateVariantProduct/>
        </div>
    );
};