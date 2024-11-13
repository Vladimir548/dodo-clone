"use client";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/interface-product";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { URL_API } from "@/constants";

interface ICard {
  product: IProduct;
}
export default function ProductCard({ product }: ICard) {
  return (
    <Link
      scroll={false}
      href={`/product/${product.id}`}
      className={
        "flex flex-col rounded-md p-2  duration-300 shadow-default dark:shadow-none dark:border-2 dark:border-primary ease-in-out   dark:shadow-primary hover:bg-primary  hover:text-white group "
      }
    >
      <div className={"flex flex-col flex-1 "}>
        <div className={"flex justify-center items-center w-full"}>
          <Image
            loading={"lazy"}
            src={`${URL_API}/${product.image}`}
            width={250}
            height={250}
            alt={product.name}
          />
        </div>
        <div className={"flex flex-1 flex-col"}>
          <Title
            className={"pt-3 group-hover:text-white font-bold"}
            size={"sm"}
            text={product.name}
          />
          {product.ingredients && (
            <p
              className={
                "text-foreground/80 group-hover:text-white/80 dark:text-white/80 text-sm"
              }
            >
              {product.ingredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className={"pt-4 flex justify-between items-center"}>
        <span className={"font-bold text-xl"}>
          От{" "}
          {Math.min(
            ...product.productVariant
              .map((val) => val.sizes?.map((val) => val.price))
              .flat()
          )}{" "}
          ₽
        </span>

        <Button
          variant={"outline"}
          className={
            "flex pointer-events-auto border shadow-md items-center gap-x-2 font-bold hover:bg-white  group-hover:hover:text-primary  group-hover:text-white group-hover:border-white  "
          }
        >
          <Plus strokeWidth={3} size={18} /> Добавить
        </Button>
      </div>
    </Link>
  );
}
