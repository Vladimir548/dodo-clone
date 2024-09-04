import {Pizza} from "lucide-react";
import Image from "next/image";
import logo from '@/public/logo.png'

export default function HeaderLogo() {
    return (
        <div className={'flex gap-x-4 items-center max-w-full'}>
            <div>
                <Image width={35} height={35} src={logo} alt={'logo'}/>
            </div>
            <div className="">
                <h1 className={'font-black text-2xl uppercase dark:text-white '}>Pizza clone</h1>
                <p className={'text-gray-500'}>вкусней уже некуда</p>
            </div>
        </div>
    );
};