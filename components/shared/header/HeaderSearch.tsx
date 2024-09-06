import {Search} from "lucide-react";

export default function HeaderSearch() {
    return (
        <div className={' relative'}>
            <input className={'peer w-[764px] h-[50px] rounded-md placeholder:dark:text-primary/60   px-5 pl-10 dark:shadow-[0px_0px_3px_1px_#ff5e00]  dark:text-primary shadow-[0px_0px_5px_1px_#edf2f7] focus-visible:dark:shadow-none focus-visible:outline-0 focus-visible:border focus-visible:dark:border-primary  focus-visible:border-gray-400 focus-visible:shadow-none '} type={"text"} placeholder={'Поиск...'}/>
            <span className={'absolute left-4 top-1/2 -translate-y-1/2 h-full flex items-center text-black/40 peer-focus-visible:text-black peer-focus-visible:dark:text-primary  dark:text-primary/50'}><Search size={16}   /></span>
        </div>
    );
};