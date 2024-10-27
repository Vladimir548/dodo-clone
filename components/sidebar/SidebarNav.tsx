import {DASHBOARDNAV} from "@/data/dashboard-nav";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SidebarNav() {
    const pathname = usePathname()
    return (
        <nav>
            {DASHBOARDNAV.map(nav => (
                <Link className={`flex items-center ${pathname === nav.url  && 'text-primary border-l-2 border-primary'} gap-x-4 py-1 my-1 duration-300 ease-in-out hover:text-primary`} href={nav.url} key={nav.url}><span className={'pl-2'}><nav.icon size={22}/></span> <p className={'text-xl'}>{nav.label}</p></Link>
            ))}
        </nav>
    );
};