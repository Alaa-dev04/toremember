'use client';

import { format } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;

  placeholder?: string;
};

export default function AppSingleCalender({
  value,
  onChange,
  placeholder = 'اختر التاريخ',
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="border-t-primary flex h-12 w-full min-w-0 items-center justify-between rounded-md bg-[#272727] hover:bg-[#272727]"
        >
          <ChevronDown />
          {value ? (
            <>
              <span dir="ltr">{format(value, 'dd MMM yyyy')}</span>
            </>
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="bg-[#353535] p-0 text-primary"
        align="start"
      >
        <Calendar
          mode="single"
          defaultMonth={value}
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
}
