'use client';




const PageHeaderMap = {
  it: {
    title: (name: string) => `مرحبــًا بــك مجددًا ${name}`,
    description: 'تابع وادِر طلبات المشتريات الخاصة بك بسهولة',
  },
  account: {
    title: (name: string) => `مرحبــًا بــك مجددًا ${name}`,
    description:
      'لوحة المراجعة الإدارية واعتماد طلبات ومستلزمات الـ IT الخاصة بالأقسام المختلفة.',
  },
  cto: {
    title: () => 'لوحة تحكم النظام',
    description: 'متابعة الطلبات وإدارة المستخدمين وسجل العمليات',
  },
};
import {
  StatCard,
  type StatCardItem,
} from '';


import { FileSearchCorner, Plus } from 'lucide-react';

import { Suspense } from 'react';
import { $api } from '@/lib/tanstask.lib';
import { CToOrdersDashboardColumns } from '@/features/cto/utils/orders.table';
import { CTOOperationsColumns } from '@/features/cto/utils/operations.table';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

function Page() {
  const { data: sessionData } = useSession();

  const loggedUserRole = sessionData?.user?.role || 'it';

  const isCanViewOperations = loggedUserRole === 'cto';

  const { data: session } = useSession();
  const userRole = (session?.user?.role as UserTypes) || 'it';
  const header = userRole && PageHeaderMap[userRole];

  const { data, isLoading: isOrderLoading } = $api.useQuery(
    'get',
    '/orders',
    {
      params: {
        query: {
          paginate: '10',
        },
      },
    }
  );

  const { data: operations, isLoading: isOperationsLoading } =
    $api.useQuery(
      'get',
      '/audits',
      {
        params: {
          query: {
            paginate: '10',
          },
        },
      },
      {
        enabled: isCanViewOperations,
      }
    );

  const { data: stats } = $api.useQuery('get', '/orders/stats');

  const dashboardStats: StatCardItem[] = [
    {
      id: 1,
      label: 'إجمالي الطلبات',
      value: stats?.data?.total ?? 0,
      variant: 'orange',
    },
    {
      id: 2,
      label: 'طلبات قيد المراجعة',
      value: Number(stats?.data?.pending ?? 0),
      variant: 'yellow',
    },
    {
      id: 3,
      label: 'طلبات مقبولة',
      value: Number(stats?.data?.accepted ?? 0),
      variant: 'green',
    },
    {
      id: 4,
      label: 'طلبات مرفوضة',
      value: Number(stats?.data?.rejected ?? 0),
      variant: 'red',
    },
  ];
  return (
    <div className="">
      <Suspense fallback={null}>
        <OrdersModel />
      </Suspense>
      <PageHeading
        title={header.title('محمد ماهر')}
        description={header.description}
        className="mb-8"
      />
      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatCard
            key={item.id}
            id={item.id}
            label={item.label}
            value={item.value}
            variant={item.variant}
          />
        ))}
      </div>

      <IsAllowed roles={['it']}>
        <Button
          className="my-8 ms-auto flex w-fit items-center justify-between"
          asChild
        >
          <Link
            href={'/new-order'}
            className="flex items-center gap-2"
          >
            <span>طلب جديد</span>
            <Plus />
          </Link>
        </Button>
      </IsAllowed>
      <div className="flex flex-col gap-10">
        <AppDataTable
          columns={CToOrdersDashboardColumns}
          data={data?.data?.data || []}
          isPaginated={false}
          isLoading={isOrderLoading}
          EmptyMessage={
            <>
              <div className="flex justify-between">
                <h1 className="mt-2 mb-6 text-base font-medium">
                  أحدث الطلبات
                </h1>
              </div>
              <EmptyState>
                <EmptyStateIcon>
                  <FileSearchCorner className="h-44 w-44" />
                </EmptyStateIcon>
                <EmptyStateTitle>
                  لا توجد طلبات حتى الان
                </EmptyStateTitle>
                <EmptyStateDescription>
                  لا توجد طلبات مشتريات متاحة للعرض في الوقت الحالي
                  <br />
                  سيتم عرض جميع الطلبات هنا بمجرد انشائها
                </EmptyStateDescription>
              </EmptyState>
            </>
          }
          tableHeader={
            <div className="flex justify-between">
              <h1 className="mt-2 mb-6 text-base font-medium">
                أخر الطلبات
              </h1>
              <Link
                href={'/orders'}
                className="text-primary text-base font-medium underline"
              >
                مشاهدة الكل
              </Link>
            </div>
          }
        />

        <IsAllowed roles={['cto']}>
          <AppDataTable
            columns={CTOOperationsColumns}
            data={operations?.data.data || []}
            isPaginated={false}
            isLoading={isOperationsLoading}
            tableHeader={
              <div className="flex justify-between">
                <h1 className="mt-2 mb-6 text-base font-medium">
                  احدث العمليات
                </h1>
                <Link
                  href={'/operations'}
                  className="text-primary text-base font-medium underline"
                >
                  مشاهدة الكل
                </Link>
              </div>
            }
            EmptyMessage={
              <>
                <div className="flex justify-between">
                  <h1 className="mt-2 mb-6 text-base font-medium">
                    أحدث الطلبات
                  </h1>
                  <Link
                    href={'/orders'}
                    className="text-primary text-base font-medium underline"
                  >
                    مشاهدة الكل
                  </Link>
                </div>
                <EmptyState>
                  <EmptyStateIcon>
                    <FileSearchCorner className="h-44 w-44" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>
                    لا توجد طلبات حتى الان
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    لا توجد طلبات مشتريات متاحة للعرض في الوقت الحالي
                    <br />
                    سيتم عرض جميع الطلبات هنا بمجرد انشائها
                  </EmptyStateDescription>
                </EmptyState>
              </>
            }
          />
        </IsAllowed>
      </div>
    </div>
  );
}

export default Page;
