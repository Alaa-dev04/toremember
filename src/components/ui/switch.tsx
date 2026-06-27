"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Track
        "peer relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300",
        
        // OFF state
        "bg-zinc-700",

        // ON state
        "data-[state=checked]:bg-orange-500",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50",

        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          // Thumb
          "block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300",

          // Position OFF
          "translate-x-1",

          // Position ON
          "data-[state=checked]:-translate-x-9"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }