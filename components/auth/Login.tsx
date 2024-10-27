'use client'

import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "@/interface/interface-auth";
import {useMutation} from "@tanstack/react-query";
import {QueryAuth} from "@/app/api/auth/query-auth";
import {toast} from "react-toastify";
import {InputCustom} from "@/components/shared/InputCustom";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import InputPassword from "@/components/InputPassword";
import GoogleAuth from "@/components/auth/social/GoogleAuth";

export default function Login() {
    const {replace} = useRouter()

    const {register, handleSubmit, control} = useForm<IAuth>({
        defaultValues: {
            role: 'USER'
        }
    })
    const {mutate} = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: IAuth) => QueryAuth.login(data),
        onSuccess: () => {
            replace('/')
            toast.success('Вы успешно вошли')
        },
        onError: () => {
            toast.error('Ошибка при входе')
        }
    })

    const onSubmit: SubmitHandler<IAuth> = (data: IAuth) => {
        mutate(data)
    }
    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={' flex flex-col gap-y-3'}>
                <div className={'flex justify-center items-center flex-col gap-y-3'}>
                    <InputCustom {...register('email', {required: true})} type={"email"} className={'w-[300px]'}
                                 width={300} label={'Email'} placeholder={'ivanov@mail.ru'}/>
                    <InputPassword label={"Пароль"} control={control} field={'password'}/>
                </div>
                <Button>Войти</Button>
            </form>
            <div className={'pt-2'}>
                <GoogleAuth/>
            </div>
            <p className={'w-full flex justify-center items-center pt-3 gap-x-2'}>Нет профиля?
                <b>
                    <button className={'text-primary duration-300 ease-in-out  hover:underline'}
                            onClick={() => replace('?type=register', {scroll: false})}>Регистрация
                    </button>
                </b>
            </p>
        </div>


    );
};