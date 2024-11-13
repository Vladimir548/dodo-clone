"use client";

import CarouselVariant from "@/components/CarouselVariant";
import Container from "@/components/shared/Container";
import ProductButtonPrice from "@/components/shared/product/ProductButtonPrice";
import ProductIngredients from "@/components/shared/product/ProductIngredients";
import { Title } from "@/components/shared/Title";
import { URL_API } from "@/constants";
import { IProduct } from "@/interface/interface-product";
import { ProductService } from "@/services/product.service";
import Image from "next/image";
import { useEffect, useState } from "react";

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
          src={`${URL_API}/${
            data?.productVariant.find(
              (variant) => variant.productAttribute.id === selectedVariant
            )?.image
          }`}
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
        <div
          className={"flex gap-x-2 text-black/70 dark:text-white/70 min-h-6 "}
        >
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
        <CarouselVariant
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          data={data.productVariant.map((variant) => ({
            name: variant.productAttribute.name,
            value: variant.productAttribute.id,
            disabled: variant.sizes.length === 0,
          }))}
        />
        <CarouselVariant
          selectedVariant={selectedSize}
          setSelectedVariant={setSelectedSize}
          data={data?.productVariant
            .find((variant) => variant.productAttribute.id === selectedVariant)
            ?.sizes?.map((variant) => ({
              name: variant.proportion.value,
              value: variant.id,
            }))}
        />

        <div>
          <ProductIngredients
            data={
              data.productVariant
                .find(
                  (variant) => variant.productAttribute.id === selectedVariant
                )
                ?.sizes.find((size) => size.id === selectedSize)?.ingredients
            }
          />
        </div>
        <div className="flex justify-center items-end h-full">
          <ProductButtonPrice
            data={data}
            selectedSize={selectedSize}
            price={ProductService.calcSumPrice(
              data,
              selectedSize,
              undefined,
              selectedVariant
            )}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>
    </Container>
  );
}
