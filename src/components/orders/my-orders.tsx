'use client';
import { AppDataTable } from '@/shared/appdatatable';

import Filtrationbar from './filtarationbar';
import { $api } from '@/lib/tanstack.lib';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';

function Orders() {
  const [filters] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      'filter[status]': parseAsString,
      'filter[created_at]': parseAsString,
      paginate: parseAsString.withDefault('10'),
    },
    {
      shallow: false,
    }
  );

  const { data, isLoading } = $api.useQuery('get', '/orders', {
    params: {
      query: filters as Record<string, unknown>,
    },
  });
  console.log(data?.data.current_page);
  return (
    <div className="flex flex-col gap-9">
    
      <Filtrationbar />
{/* we need to add the data real data integration */}
      <AppDataTable
        columns={[]}
        data={data?.data?.data || []}
        isPaginated
        totalItems={data?.data.total}
        isLoading={isLoading}
      /> 
    </div>
  );
}

export default Orders;
