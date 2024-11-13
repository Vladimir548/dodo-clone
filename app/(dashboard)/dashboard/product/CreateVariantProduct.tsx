"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import SelectProduct from "@/app/(dashboard)/dashboard/_ui/select/SelectProduct";
import FormLayout from "@/app/(dashboard)/FormLayout";
import { QueryVariantProduct } from "@/app/api/query-variant-product";
import InputCounter from "@/components/InputCounter";
import SelectCustom from "@/components/SelectCustom";
import UploadImage from "@/components/shared/upload-image/UploadImage";
import { DATADOUGHTYPE } from "@/data/dough-type";
import useTypeProduct from "@/hooks/useTypeProduct";
import { IProductVariant } from "@/interface/interface-product-variant";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { InputCustom } from "@/components/shared/InputCustom";
import { TypeProduct } from "@/interface/enums";
import SelectSize from "../_ui/select/SelectSize";

export default function CreateVariantProduct() {
  const { handleSubmit, control, watch, register } = useForm<IProductVariant>({
    defaultValues: {
      sizes: [],
    },
  });
  const watchProductId = watch("productId");
  const { mutate } = useMutation({
    mutationKey: ["create-variant-product"],
    mutationFn: (dto: IProductVariant) => QueryVariantProduct.create(dto),
    onSuccess: () => {
      toast.success("Данные добавлены");
    },
    onError: () => {
      toast.error("Ошибка при добавлении данных");
    },
  });
  const onSubmit: SubmitHandler<IProductVariant> = (data) => {
    mutate(data);
  };
  const { category, type } = useTypeProduct(watchProductId);

  return (
    <FormLayout
      handleFn={handleSubmit(onSubmit)}
      buttonVariant={"create"}
      title={"Создание вариантов продукта"}
    >
      <InputCustom
        {...register("productAttribute.name")}
        label={"Название варианта"}
      />

      <SelectProduct control={control} field={"productId"} />

      <InputCounter
        control={control}
        field={"quantity"}
        min={1}
        max={30}
        label={"Количество шт"}
      />

      {type === TypeProduct.PIZZA && (
        <SelectCustom
          control={control}
          field={"doughName"}
          label={"Тип теста"}
          renderItems={DATADOUGHTYPE.map((val) => ({
            value: val.value,
            name: val.name,
          }))}
        />
      )}
      <SelectSize control={control} categoryId={category} watch={watch} />

      <UploadImage<IProductVariant> control={control} field={"image"} />
    </FormLayout>
  );
}
