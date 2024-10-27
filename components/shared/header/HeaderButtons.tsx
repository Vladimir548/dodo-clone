'use client'

import HeaderLogin from "@/components/shared/header/HeaderLogin";
import DialogCart from "@/components/cart/DialogCart";

export default function HeaderButtons() {


    return (
        <div className="flex items-center gap-x-2">
           <HeaderLogin/>
            <div className=" ">
               <DialogCart/>
            </div>
        </div>
    );
};