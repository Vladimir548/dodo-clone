import CreateSize from "@/app/(dashboard)/dashboard/parameter/CreateSize";
import CreateParameter from "@/app/(dashboard)/dashboard/parameter/CreateParameter";


export default function Page() {
    return (
        <div className={'flex flex-col gap-y-2'}>
            <CreateSize/>
            <CreateParameter/>
        </div>
    );
};