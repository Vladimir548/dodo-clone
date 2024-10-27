'use client'

import Image from "next/image";
import {Image as ImageIcon, Trash} from 'lucide-react';
import { FC, useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {Button} from "@/components/ui/button";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Title} from "@/components/shared/Title";
interface FileWithPreview extends File {
    preview: string;
}
interface IUploadImage<T extends FieldValues> {
    control: Control<T>;
    field:Path<T>
    label?:string

}
export default function UploadImage<T extends  FieldValues>({field,control,label}:IUploadImage<T>) {
    const [file, setFile] = useState<FileWithPreview  | null>(null);


    useEffect(() => {
        return () => {
            if (file?.preview) URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    return (
        <>
        <section className={'flex items-center  gap-x-4'}>

                <Controller
                    control={control}
                    render={({ field: { onChange } }) => {

                        return (
                            <>
                            <Dropzone
                                setFile={setFile}
                                onFileChange={onChange}
                                label={label}
                            />

            <div className={'relative w-[400px] h-[300px] rounded-md flex justify-center items-center border-2 border-dashed p-2 border-primary/60 overflow-hidden group '}>
            {file ? (
                <aside >
                    <Image
                        src={file.preview}
                        width={300}
                        height={300}
                        alt="image"
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                </aside>
            ) : (
                <span><ImageIcon size={200} /></span>
            )}
                {file && <Button
                    className={'absolute  top-2 -right-12 bg-red-600 p-2 duration-300 ease-in-out transition-all rounded-md hover:bg-red-500 group-hover:right-2 '}
                    variant={'without'} onClick={()=> {
                        setFile(null)
                    onChange(null)
                }}>
                    <Trash size={24}/></Button>}
            </div>
                            </>
                        )
                    } }
                    name={field}
                />
        </section>
        </>
    );
};

const Dropzone: FC<{
    setFile: (file:FileWithPreview)=> void;
    onFileChange: (file: File | null) => void;
    label?:string

}> = ({ onFileChange,setFile,label }) => {


    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles: File[]) => {
            const previewFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            });
            setFile(previewFile);
            if (acceptedFiles[0]) {
                onFileChange(acceptedFiles[0]);
            }

        },
    });
    return (
        <div
            className={'w-full h-[300px] cursor-pointer  rounded-md border-2 border-dashed border-primary/60 hover:border-primary'} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={'flex justify-center items-center flex-col h-full'}>
                { label && <Title text={label}/>}
            <p className={'flex justify-center items-center h-full text-2xl font-bold'}>Перенесите изображение в выделенную зону или
                нажмите на зону</p>
            </div>

        </div>
    );
};
