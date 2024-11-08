"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface IInputCustom extends InputProps {
  label?: string;
  action?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}
const InputCustom = React.forwardRef<HTMLInputElement, IInputCustom>(
  (
    { className, label, action, placeholder, type, required, ...props },
    ref
  ) => {
    return (
      <div className={"relative flex flex-col gap-y-1"}>
        <label htmlFor="">
          {required && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-primary">
                  {label}*
                </TooltipTrigger>
                <TooltipContent className="bg-black border p-2 rounded-md">
                  Это поле является обязательным к заполнению
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </label>
        <div className={"relative"}>
          <Input
            required={required}
            placeholder={placeholder}
            type={type}
            className={cn(
              `flex h-10 w-full py-0 peer  dark:text-white rounded-md border focus-visible:border-primary dark:border-primary/50 focus-visible:dark:border-primary bg-background px-3  text-sm ring-offset-background  dark:placeholder:text-primary focus-visible:outline-none ${
                action && "pr-10"
              } focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            ref={ref}
            {...props}
          />
          {action}
        </div>
      </div>
    );
  }
);
InputCustom.displayName = "InputCustom";

export { InputCustom };
