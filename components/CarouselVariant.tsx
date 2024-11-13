"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
interface IProps {
  data:
    | {
        value: string | number;
        name: string | undefined;
        disabled?: boolean;
      }[]
    | undefined;
  selectedVariant: number | undefined;
  setSelectedVariant: (value: number) => void;
}

function CarouselVariant({
  data,
  selectedVariant,
  setSelectedVariant,
}: IProps) {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (!data) return;

    const isName = data.some((val) => val.name !== null);
    if (isName) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [, data]);

  return (
    <>
      {isShow && (
        <Carousel
          opts={{
            dragFree: true,
          }}
          className="  w-full border-2 border-primary rounded-md "
        >
          <CarouselContent className="flex  p-1 -ml-1  w-full font-bold">
            {data?.map((val) => (
              <CarouselItem
                hidden={!val.name}
                className={`${
                  data.length === 1
                    ? "basis-full"
                    : data.length === 2
                    ? "basis-1/2"
                    : "basis-[38%]"
                } pl-1  `}
                key={String(val.value)}
              >
                <Button
                  onClick={() => setSelectedVariant(Number(val.value))}
                  variant={"outline"}
                  className={`w-full  border-2 ${
                    selectedVariant === Number(val.value) &&
                    "bg-primary text-white"
                  } border-primary  rounded-md hover:border-primary font-bold select-none  `}
                  disabled={val.disabled}
                >
                  {val.name}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="disabled:hidden " />
          <CarouselNext className="disabled:hidden " /> */}
        </Carousel>
      )}
    </>
  );
}

export default CarouselVariant;
