import { cn } from "@/lib/utils"
import {HTMLAttributes} from "react";
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  count: number
}
function Skeleton({
  className,
    count,
  ...props
}: SkeletonProps) {

  const countArr = new Array(count).fill(0)
  return (
      <>
        {countArr.map((_, i) => (
            <div key={i}
                 className={cn("animate-pulse rounded-md bg-primary", className)}
                 {...props}
            />
        ))}
      </>
  )
}

export {Skeleton}
