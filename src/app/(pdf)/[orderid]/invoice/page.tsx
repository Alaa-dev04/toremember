import { AppDataTable } from "@/shared/appdatatable";
import { invoiceColumns, ItInvoiceColumnsType } from "@/features/pdf.columes";

import { PrintButton } from "@/app/(pdf)/[orderid]/invoice/print";

import { serverFetchClient } from "@/lib/api/clients";
export const dynamic = "force-dynamic";
async function InvoicePage({ params }: { params: { orderid: string } }) {
  const { orderid } = await params;

  if (!orderid) return <div>not found</div>;

  const { data, error } = await serverFetchClient.GET("/orders/{id}", {
    params: {
      path: { id: orderid },
    },
  });
  const items: ItInvoiceColumnsType[] | undefined = data?.data.order_items?.map(
    (item) => {
      return {
        id: item.id,
        item: item.item,
        company: item.company,
        department: item.department,
        applicant: item.applier,
        quantity: item.quantity,
      };
    },
  );
  function formatArabicDate(dateStr?: string) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
    <div className="flex w-full flex-col gap-6" dir="rtl">
      {/* ── Screen-only action bar ── */}
      <div className="no-print flex items-center justify-between rounded-xl border border-white/5 bg-[#1a1a1a] p-4">
        <div>
          <h1 className="text-xl font-bold text-white">اطبع هنا</h1>
        </div>
        <PrintButton />
      </div>

      {/* ═══ Invoice document ═══ */}
      <div
        id="invoice-print-container"
        className="mx-auto w-full rounded-xl border border-white/5 bg-[#1a1a1a] p-6 shadow-xl transition-all duration-300 md:p-12"
      >
        {/* ── Header ── */}
        <div className="print-flex-row mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row ">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/zikola_logo.png"
              alt="Zikola Logo"
              className="h-auto w-44 object-contain"
            />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-lg font-bold text-white print:text-black">
              شركة Zikola للحلول الرقمية
            </p>
            <p className="mt-1 text-xs font-bold text-[#ee5908]">
              Zikola Digital Solutions
            </p>
          </div>
        </div>

        {/* ── Content card: print-content-bg overrides bg in print ── */}
        <div className=" mt-9 print-content-bg rounded-lg border  border-white/5 bg-[#1e1e1e] p-6 md:p-10 print:border-none print:bg-[#F5F5F5]!">
          {/* Title */}
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-extrabold tracking-wide text-[#ee5908]">
              طلب شراء
            </h2>
            {/* FIX 1: "IT Purchase Request" subtitle color in print */}
            <p className="mt-1 text-base font-semibold text-neutral-400 print:text-[#A3A3A3]">
              IT Purchase Request
            </p>
          </div>

          {/* Request meta */}
          <h2 className="mb-4 text-lg font-bold text-white print:text-black ">
            بيانات الطلب
          </h2>
          <div className="mb-8 grid grid-cols-2 mt-2 ">
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#121212] px-5 py-3 text-sm text-neutral-400 print:border-[#a3a3a357] print:bg-[#FDFDFD]">
              <span className="print:text-[#A3A3A3]">رقم الطلب:</span>
              <span className="font-bold text-white print:text-[#121212]">
                {data?.data?.id}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#121212] px-5 py-3 text-sm text-neutral-400 print:border-[#a3a3a357] print:bg-[#FDFDFD]">
              <span className="print:text-[#A3A3A3]">تاريخ الطلب:</span>
              <span className="font-bold text-white print:text-[#121212]">
                {formatArabicDate(data?.data?.created_at)}
              </span>
            </div>
          </div>

          {/* Table */}
          <h2 className="mt-6 text-lg font-bold text-white print:text-black">
            بيانات الطلب
          </h2>
          <div className="mb-8 overflow-hidden mt-6">
            <AppDataTable
              columns={invoiceColumns}
              data={items || []}
              isPaginated={false}
              containerClassName="print-table-container border border-white/5 bg-[#FDFDFD] p-2"
              tableCellClassName="text-white print:text-black py-3 text-center"
            />
          </div>

          {/* ── Approval / signature boxes ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* Manager approval — right in RTL */}
            <div className="flex min-h-[160px] mt-9 flex-col rounded-lg bg-[#1a1a1a] p-5 print:bg-[#FDFDFD] print:border print:border-gray-200">
              <h3 className="text-sm font-bold text-[#ee5908]">
                اعتماد المدير
              </h3>
              <div className="flex flex-1 flex-col items-center justify-end gap-2">
                <hr className="w-4/5 border-t border-white/20 print:border-gray-300" />
                <span className="text-center text-sm text-neutral-300 print:text-black">
                  محمد احمد
                  <br />
                  {formatArabicDate(data?.data?.created_at)}
                </span>
              </div>
            </div>
            {/* Signatures — left in RTL */}
            <div className="flex min-h-[160px] mt-9 flex-col justify-start gap-5 rounded-lg bg-[#1a1a1a] p-5 print:bg-[#FDFDFD] print:border print:border-gray-200">
              <span className="text-sm text-neutral-300 print:text-black">
                الاسم : .................................
              </span>
              <span className="text-sm text-neutral-300 print:text-black">
                الموقع : ................................
              </span>
              <span className="text-sm text-neutral-300 print:text-black">
                التاريخ : ...............................
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
