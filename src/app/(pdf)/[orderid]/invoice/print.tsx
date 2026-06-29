'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="flex min-w-fit items-center gap-2 rounded-lg bg-[#ee5908] px-6 py-2.5 text-white transition-transform duration-150 hover:bg-[#ee5908]/90 active:scale-95"
    >
      <Printer className="h-4 w-4" />
      <span>طباعة </span>
    </Button>
  );
}
