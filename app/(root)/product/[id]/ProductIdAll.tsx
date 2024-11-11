"use client";

import Container from "@/components/shared/Container";
import Image from "next/image";
import { URL_API } from "@/constants";
import { useEffect, useState } from "react";
import { Title } from "@/components/shared/Title";
import { IProduct } from "@/interface/interface-product";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/product.service";
import ProductButtonPrice from "@/components/shared/product/ProductButtonPrice";
import ProductIngredients from "@/components/shared/product/ProductIngredients";

interface IProductId {
  modalClass?: boolean;
  data: IProduct;
}

export default function ProductIdAll({ modalClass, data }: IProductId) {
  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedVariant, setSelectedVariant] = useState<number>();

  const defaultVariant = ProductService.setDefaultVariantProduct(data);
  const defaultSize = ProductService.setDefaultSize(data, selectedVariant);

  useEffect(() => {
    setSelectedVariant(defaultVariant);
  }, [data]);

  useEffect(() => {
    setSelectedSize(defaultSize);
  }, [data, selectedVariant]);

  return (
    <Container
      className={`text-white h-full w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${
        modalClass && "pt-0"
      } `}
    >
      <div className={" relative  flex justify-center items-center  "}>
        <Image
          alt={data?.name ?? "image"}
          src={`${URL_API}/${data?.productVariant[0].image}`}
          width={400}
          height={400}
        />
      </div>
      <div className={"flex flex-col gap-y-3"}>
        <Title
          size={"lg"}
          className={"font-bold text-black dark:text-white"}
          text={data?.name ?? ""}
        />
        <div className={"flex gap-x-2 text-black/70 dark:text-white/70 min-h-6 "}>
          <span>
            {
              data.productVariant
                ?.find(
                  (variant) => variant.productAttribute.id === selectedVariant
                )
                ?.sizes.find((size) => size.id === selectedSize)?.proportion
                .value
            }
          </span>
          {Number(
            data.productVariant
              .find(
                (variant) => variant.productAttribute.id === selectedVariant
              )
              ?.sizes.find((size) => size.id === selectedSize)?.weight
          ) > 0 && (
            <span>
              {
                data.productVariant
                  .find(
                    (variant) => variant.productAttribute.id === selectedVariant
                  )
                  ?.sizes.find((size) => size.id === selectedSize)?.weight
              }{" "}
            </span>
          )}
        </div>
        {data.productVariant[0].productAttribute.name && (
        <div
          className={
            "flex justify-between p-1 gap-x-1 w-full border-2 border-primary font-bold rounded-lg "
          }
        >
          {data.productVariant.map((variant) => (
            <Button
              onClick={() => setSelectedVariant(variant.productAttribute.id)}
              variant={"outline"}
              className={`w-full  border-2 ${
                selectedVariant === variant.productAttribute.id &&
                "bg-primary text-white"
              } border-primary  rounded-lg hover:border-primary font-bold`}
              key={variant.id}
            >
              {variant.productAttribute.name}
            </Button>
          ))}
        </div>
        )}
        <div
          className={
            "flex justify-between p-1 gap-x-1 w-full border-2 border-primary font-bold rounded-lg "
          }
        >
          {data.productVariant
            .find((variant) => variant.productAttribute.id === selectedVariant)
            ?.sizes?.map((val) => {
              return (
                <Button
                  variant={"outline"}
                  onClick={() => setSelectedSize(val.id)}
                  className={`w-full  border-2 ${
                    selectedSize === val.id && "bg-primary text-white"
                  } border-primary  rounded-lg hover:border-primary font-bold`}
                  key={val.id}
                >
                  {val.proportion.value}
                </Button>
              );
            })}
        </div>
        <div>
          <ProductIngredients data={data.productVariant.find(variant => variant.productAttribute.id === selectedVariant)?.sizes.find(size => size.id === selectedSize)?.ingredients} />
        </div>
        <div className="flex justify-center items-end h-full">
          <ProductButtonPrice
            data={data}
            selectedSize={selectedSize}
            price={ProductService.calcSumPrice(data, selectedSize,undefined,selectedVariant)}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>
    </Container>
  );
}
