'use client'

import SidebarNav from "@/components/sidebar/SidebarNav";
import SwitchTheme from "@/components/shared/SwitchTheme";

export default function Sidebar() {
    return (
        <div className={'w-[250px] relative m-1 rounded-md p-3 pl-1 border border-primary'}>
            <SidebarNav/>
            <div className={'absolute right-5 py-11 bottom-0 '}><SwitchTheme/></div>
        </div>
    );
};