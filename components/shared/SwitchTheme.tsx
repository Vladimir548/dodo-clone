'use client'

import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function SwitchTheme() {
    const { setTheme,theme } = useTheme()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    if (!mounted) {
        return null;
    }

    return (
        <Button onClick={()=>handleClick()} variant={"without"} className={'w-[60px] h-8 border-2 border-primary rounded-lg  relative'}>
            <span className={`absolute  ${theme === 'light' ? 'left-1' : 'right-1'} top-1/2  ease-in-out -translate-y-1/2 w-[26px] h-[26px]   rounded-full bg-primary flex justify-center items-center`}>
                {theme === 'light' ? <Sun className={'text-white'} size={16}/> : <Moon size={16} className={'text-white'}/>}
            </span>
        </Button>
    );
};