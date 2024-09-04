import {Button} from "@/components/ui/button";
import {ArrowRight, ArrowUp, ShoppingCart, User} from "lucide-react";

export default function HeaderButtons() {
    return (
        <div className="flex items-center gap-x-2">
            <div>
                <Button className={'flex items-center gap-x-1'} variant={"outline"}><span><User size={16}/></span> Войти</Button>
            </div>
            <div className="group ">
                <Button className={'flex items-center gap-x-1'} variant={"default"}>
                    <b className={'max-w-[50px] line-clamp-1 overflow-hidden'}>210000</b><b>₽</b>
                    <span className={'w-[1px] h-full bg-white/30'}></span>
                    <div className={' relative'}>
                        <span className={'flex items-center opacity-100 gap-x-2 duration-300 group-hover:opacity-0'}>
                        <ShoppingCart size={16}/> 0
                        </span>
                        <ArrowRight size={20}
                                 className={'absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  duration-300 opacity-0 group-hover:opacity-100'}/>
                    </div>
                </Button>

            </div>
        </div>
    );
};