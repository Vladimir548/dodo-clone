'use client'
import {Search} from "lucide-react";
import {
    Command,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent, DialogHeader, DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {ChangeEvent, useState} from "react";
import HeaderSearchDropdown from "@/components/shared/header/HeaderSearchDropdown";
import useDebounce from "@/hooks/useDebounce";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

export default function HeaderSearch() {
        const [search,setSearch] = useState<string>('')
    const handleChangeSearch =(e:ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
        const  debounce = useDebounce(search)
    return (
        <>
            <Dialog >
                <DialogTrigger asChild className={''}>
                    <Button className={'w-[760px] h-12 font-bold flex text-lg items-center gap-x-3'} variant={"outline"}>
                            <span>
                            <Search size={20}/>
                            </span>
                        Поиск...</Button>
                </DialogTrigger>
                <DialogContent  className={'w-1/2 border-primary rounded-sm  p-2  overflow-auto   focus-visible:border-none'}>
                    <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    </VisuallyHidden>
                    <Command className={'dark:bg-dark-background/50  rounded-sm focus-visible:border-none focus-visible:outline-none'}>
                        <div className={' relative z-30'}>
                            <input value={search} onChange={handleChangeSearch}
                                className={'peer w-full h-[50px] rounded-t-sm placeholder:dark:text-primary/60  border-b dark:border-primary  px-5 pl-10   dark:text-primary  focus-visible:dark:shadow-none focus-visible:outline-0 focus-visible:border focus-visible:dark:border-primary  focus-visible:border-gray-400 focus-visible:shadow-none '}
                                type={"text"} placeholder={'Поиск...'}/>
                            <span
                                className={'absolute left-4 top-1/2 -translate-y-1/2 h-full flex items-center text-black/40 peer-focus-visible:text-black peer-focus-visible:dark:text-primary  dark:text-primary/50'}><Search
                                size={16}/></span>
                        </div>
                        <HeaderSearchDropdown query={debounce}/>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
};