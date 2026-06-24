import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import AppSingleCalender from '@/shared/AppSingleCalender';
import { format } from 'date-fns';

function Filtrationbar() {
  const [date, setDate] = useState<Date>();
  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    status: parseAsString,
    'filter[created_at]': parseAsString,
    'filter[event]': parseAsString.withDefault('all'),
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div>
        <AppSingleCalender
          value={date}
          onChange={async (value) => {
            setDate(value);
            if (!value) {
              await setQuery({
                'filter[created_at]': null,
                page: null,
              });
              return;
            }
            await setQuery({
              'filter[created_at]': format(value, 'yyyy-MM-dd'),
              page: null,
            });
          }}
        />
      </div>
      <Select
        value={query['filter[event]'] || undefined}
        onValueChange={async (value) => {
          await setQuery({
            'filter[event]': value,
            page: null,
          });
        }}
      >
        <SelectTrigger className="md:max-w-130">
          <SelectValue placeholder="الحالة " />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">عرض الكل</SelectItem>
            <SelectItem value="created"> انشاء طلب</SelectItem>
            <SelectItem value="updated">تعديل طلب</SelectItem>
            <SelectItem value="deleted">حذف طلب</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filtrationbar;
