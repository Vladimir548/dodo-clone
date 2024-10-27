'use client'

import {Button, buttonVariants} from "@/components/ui/button";
import {VariantProps} from "class-variance-authority";
import {Title} from "@/components/shared/Title";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface IFormLayout {
    children: React.ReactNode,
    title?: string
    handleFn: React.FormEventHandler<HTMLFormElement>
    buttonVariant: ButtonVariantProps['variant']

}

export default function FormLayout({children, handleFn, buttonVariant, title}: IFormLayout) {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFn(e);
    };
    return (
        <form onSubmit={onSubmit} className={' h-full border-primary border p-2  rounded-md'}>
            <div className={'flex items-center w-full justify-between  border-b border-primary'}>
                {title && (
                    <Title className={'text-primary'} text={title} size={"md"}/>
                )}
                <div className={`flex  justify-end ${!title && 'w-full'}  items-center mb-2 pb-1`}>
                    <Button className={'text-lg px-4'} variant={buttonVariant} type={'submit'}>
                        {buttonVariant === "create" ? 'Создать' : 'Редактировать'}
                    </Button>
                </div>
            </div>
            <div className={'flex h-full gap-2 pt-2 flex-wrap '}>
                {children}
            </div>
        </form>
    );
};