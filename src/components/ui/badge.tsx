import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border-[0.5px] py-1 text-xs font-bold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3! min-w-[106px] rounded-sm',
  {
    variants: {
      variant: {
        default: 'bg-primary/15 text-primary border-primary',
        secondary: 'bg-[#404040]/15 text-[#A3A3A3] border-[#A3A3A3]',
        destructive:
          'bg-destructive/15 text-destructive border-destructive',
        outline:
          'border-border text-foreground hover:bg-muted hover:text-muted-foreground',
        ghost:
          'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-[#188C43]/15 text-[#188C43] border-[#188C43]',
        warning: 'bg-[#E09D21]/15 text-[#E09D21] border-[#E09D21]',
        create: 'bg-[#268AB0]/15 text-[#268AB0] border-[#268AB0]',
        info: 'bg-[#AF49E2]/15 text-[#AF49E2] border-[#AF49E2]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
