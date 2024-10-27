'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LogIn, User} from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useEffect, useState} from "react";

export default function HeaderLogin() {

    const [isLogin,setIsLogin] = useState(false);

    const user = useCurrentUser()?.userId

    useEffect(() => {
       if (user) {
           setIsLogin(true);
       }
       else {
           setIsLogin(false);
       }
    },[user])

    return (
        <>
            {isLogin ? (
                <Link scroll={false} href={'/profile'}>
                    <Button asChild className={'flex items-center gap-x-1 rounded-lg'} variant={"outline"}>
                        <span><User size={16}/> Профиль</span>
                    </Button>
                </Link>
            ) : (
                <Link scroll={false} href={'/auth?type=login'}>
                    <Button asChild className={'flex items-center gap-x-1 rounded-lg'} variant={"outline"}>
                        <span> <LogIn size={16}/> Войти</span>
                    </Button>
                </Link>
            )}
        </>
    );
};