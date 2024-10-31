
import CreateParameter from "@/app/(dashboard)/dashboard/parameter/CreateParameter";
import CreateProportion from "@/app/(dashboard)/dashboard/parameter/CreateProportion";


export default function Page() {
    return (
        <div className={'flex flex-col gap-y-2'}>
            <CreateProportion/>
            <CreateParameter/>
        </div>
    );
};