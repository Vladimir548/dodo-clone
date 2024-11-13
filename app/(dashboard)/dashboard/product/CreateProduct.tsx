"use client";

import SelectCategory from "@/app/(dashboard)/dashboard/_ui/select/SelectCategory";
import SelectType from "@/app/(dashboard)/dashboard/_ui/select/SelectType";
import FormLayout from "@/app/(dashboard)/FormLayout";
import { QueryProduct } from "@/app/api/query-product";
import { InputCustom } from "@/components/shared/InputCustom";
import UploadImage from "@/components/shared/upload-image/UploadImage";
import { TextareaCustom } from "@/components/TextareaCustom";
import { IProduct } from "@/interface/interface-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const { handleSubmit, control, register, watch } = useForm<IProduct>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (dto: IProduct) => QueryProduct.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-product"],
      });
      toast.success("Данные добавлены");
    },
    onError: () => {
      toast.error("Ошибка при добавлении данных");
    },
  });
  const onSubmit: SubmitHandler<IProduct> = (data) => {
    mutate(data);
  };
  return (
    <FormLayout
      handleFn={handleSubmit(onSubmit)}
      buttonVariant={"create"}
      title={"Создание продукта"}
    >
      <InputCustom
        required
        label={"Название"}
        {...register("name", { required: true })}
      />
      <SelectType control={control} field={"type"} />
      <SelectCategory control={control} field={"categoryId"} />
      <TextareaCustom label={"Описание"} />
      <UploadImage control={control} field={"file"} />
    </FormLayout>
  );
}
