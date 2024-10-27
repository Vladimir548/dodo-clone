'use client'

import Link from "next/link";
import logo from '@/public/google.png'
import Image from "next/image";
export default function GoogleAuth() {
    return (
        <Link className={'p-3 inline-flex rounded-md border'} href={'http://localhost:5000/api/auth/google'}>
            <Image src={logo} width={30} height={30} alt="Google Auth" />
        </Link>
    );
};