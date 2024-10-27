'use client'

import {Title} from "@/components/shared/Title";
import {InputCustom} from "@/components/shared/InputCustom";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {QueryAuth} from "@/app/api/auth/query-auth";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "@/interface/interface-auth";
import {toast} from "react-toastify";
import { useRouter} from "next/navigation";

import InputPassword from "@/components/InputPassword";

export default function Register() {
    const {replace} = useRouter()

    const {register,handleSubmit,control} = useForm<IAuth>({
        defaultValues:{
            role:'USER'
        }
    })
    const {mutate} = useMutation({
        mutationKey:['register'],
        mutationFn:(data:IAuth)=>QueryAuth.register(data),
        onSuccess:()=>{
            replace('/')
            toast.success('Вы успешно зарегистрировались')
        },
        onError:()=>{
            toast.error('Ошибка при регистрации')
        }
    })

    const onSubmit: SubmitHandler<IAuth> =(data:IAuth)=>{
        if (data.controlPassword === data.password){
            mutate(data)
        } else {
            toast.error('Пароли не совпадают')
        }
    }
    return (

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className={' flex flex-col gap-y-3'}>
                        <div className={'flex justify-center items-center flex-col gap-y-3'}>
                            <InputCustom {...register('fullName', {required: true,})} className={'w-[300px]'}
                                         label={'ФИО'} width={300} placeholder={'Иванов Иван Иванович'}/>
                            <InputCustom {...register('email', {required: true})} type={"email"} className={'w-[300px]'}
                                         width={300} label={'Email'} placeholder={'ivanov@mail.ru'}/>
                            <InputPassword label={'Пароль'} control={control} field={'password'}/>
                            <InputPassword label={'Повторите пароль'} control={control} field={'controlPassword'}/>
                        </div>

                        <Button>Зарегистрироваться</Button>
                    </form>
                </div>


    );
};