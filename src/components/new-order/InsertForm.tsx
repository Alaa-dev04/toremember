import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { $api } from "@/lib/tanstack.lib";
import {
  Check,
  Download,
  MinusIcon,
  Plus,
  PlusIcon,
  RefreshCcw,
} from "lucide-react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
import ItemDialog from "@/shared/ItemDialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrderFormValues } from "@/zod/orders/neworder.shema";

const InsertForm = () => {
  const queryClient = useQueryClient();
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState("");

  const form = useFormContext<OrderFormValues>();
  const { fields, append, update } = useFieldArray<OrderFormValues>({
    control: form.control,
    name: "items",
  });

  const DialogPropsMapper = {
    item: {
      title: "اسم العنصر",
      confirmLabel: "اضافة العنصر",
      inputPlaceholder: "اكتب اسم العنصر الجديد",
      onSubmit: (value: string) => {
        setIsItemDialogOpen(false);
        itemMutate({
          body: {
            name: value,
          },
        });
      },
    },
    company: {
      title: "اسم الشركة",
      confirmLabel: "اضافة الشركة",
      inputPlaceholder: "اكتب اسم الشركة الجديد",
      onSubmit: (value: string) => {
        setIsItemDialogOpen(false);
        companyMutate({
          body: {
            name: value,
          },
        });
      },
    },
    department: {
      title: "اسم القسم",
      confirmLabel: "اضافة القسم",
      inputPlaceholder: "اكتب اسم القسم الجديد",
      onSubmit: (value: string) => {
        setIsItemDialogOpen(false);
        departmentMutate({
          body: {
            name: value,
          },
        });
      },
    },
    applier: {
      title: "اسم مقدم الطلب",
      confirmLabel: "اضافة مقدم الطلب",
      inputPlaceholder: "اكتب اسم مقدم الطلب الجديد",
      onSubmit: (value: string) => {
        setIsItemDialogOpen(false);
        applierMutate({
          body: {
            name: value,
          },
        });
      },
    },
  };

  const activeDialogProps = dialogKey
    ? DialogPropsMapper[dialogKey as keyof typeof DialogPropsMapper]
    : undefined;
  const { data: itemsData } = $api.useQuery("get", "/items");
  const { data: companiesData } = $api.useQuery("get", "/companies");
  const { data: departmentsData } = $api.useQuery("get", "/departments");
  const { data: appliersData } = $api.useQuery("get", "/appliers");

  const handleSaveItem = async () => {
    const isValid = await form.trigger("tempItem");
    if (isValid) {
      const tempItem = form.getValues("tempItem");
      const editingIndex = form.getValues("editingIndex");

      const selectedItem = itemsData?.data.find(
        (i) => i.id.toString() === tempItem.item_id.toString(),
      );
      const selectedCompany = companiesData?.data.find(
        (c) => c.id.toString() === tempItem.company_id.toString(),
      );
      const selectedDept = departmentsData?.data.find(
        (d) => d.id.toString() === tempItem.department_id.toString(),
      );
      const selectedApplier = appliersData?.data.find(
        (a) => a.id.toString() === tempItem.applier_id.toString(),
      );

      const itemLabel = selectedItem ? selectedItem.name : "";
      const companyLabel = selectedCompany ? selectedCompany.name : "";
      const deptLabel = selectedDept ? selectedDept.name : "";
      const applierLabel = selectedApplier ? selectedApplier.name : "";

      const payloadItem = {
        id:
          typeof editingIndex === "number" && editingIndex !== null
            ? fields[editingIndex].id
            : (fields.length + 1).toString(),
        item_id: Number(tempItem.item_id),
        item: itemLabel,
        quantity: Number(tempItem.quantity),
        company_id: Number(tempItem.company_id),
        company: companyLabel,
        department_id: Number(tempItem.department_id),
        department: deptLabel,
        applier_id: Number(tempItem.applier_id),
        applicant: applierLabel,
        date:
          typeof editingIndex === "number" &&
          editingIndex !== null &&
          fields[editingIndex].date
            ? fields[editingIndex].date
            : new Date().toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
      };

      if (
        typeof editingIndex === "number" &&
        editingIndex !== null &&
        editingIndex !== undefined
      ) {
        update(editingIndex, payloadItem);
        form.setValue("editingIndex", null);
      } else {
        append(payloadItem);
      }

      form.setValue("tempItem", {
        item_id: "",
        company_id: "",
        department_id: "",
        quantity: 1,
        applier_id: "",
      });
      form.clearErrors("tempItem");
    }
  };

  const handleReset = () => {
    form.setValue("tempItem", {
      item_id: "",
      company_id: "",
      department_id: "",
      quantity: 1,
      applier_id: "",
    });
    form.setValue("editingIndex", null);
    form.clearErrors("tempItem");
  };

  const editingIndex = form.watch("editingIndex");
  const isEditing = editingIndex !== null;

  const { mutate: itemMutate } = $api.useMutation("post", "/items", {
    onSuccess: () => {
      toast.success("تم اضافة العنصر بنجاح");
      queryClient.invalidateQueries({
        queryKey: $api.queryOptions("get", "/items").queryKey,
      });
    },
  });

  const { mutate: companyMutate } = $api.useMutation("post", "/companies", {
    onSuccess: () => {
      toast.success("تم اضافة الشركة بنجاح");
      queryClient.invalidateQueries({
        queryKey: $api.queryOptions("get", "/companies").queryKey,
      });
    },
  });

  const { mutate: departmentMutate } = $api.useMutation(
    "post",
    "/departments",
    {
      onSuccess: () => {
        toast.success("تم اضافة القسم بنجاح");
        queryClient.invalidateQueries({
          queryKey: $api.queryOptions("get", "/departments").queryKey,
        });
      },
    },
  );

  const { mutate: applierMutate } = $api.useMutation("post", "/appliers", {
    onSuccess: () => {
      toast.success("تم اضافة مقدم الطلب بنجاح");
      queryClient.invalidateQueries({
        queryKey: $api.queryOptions("get", "/appliers").queryKey,
      });
    },
  });
  console.log(form.watch());
  return (
    <>
      <div className="card mt-9 pt-6 ">
        <div
          dir="rtl"
          className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3 "
        >
          <Controller
            control={form.control}
            name="tempItem.item_id"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  العنصر المطلوب
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => {
                      if (value === "add") {
                        setDialogKey("item");
                        setIsItemDialogOpen(true);
                        field.onChange("");
                      } else {
                        field.onChange(value);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر العنصر المطلوب" />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      <SelectGroup>
                        {itemsData?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="add">
                          <Plus className="size-6" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError
                  errors={[form.formState.errors.tempItem?.item_id]}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tempItem.company_id"
            render={({ field }) => (
              <Field className="">
                <FieldLabel>
                  الشركة <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => {
                      if (value === "add") {
                        setDialogKey("company");
                        setIsItemDialogOpen(true);
                        field.onChange("");
                      } else {
                        console.log(typeof value);
                        field.onChange(value);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر الشركة" />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      <SelectGroup>
                        {companiesData?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="add">
                          <Plus className="size-6" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError
                  errors={[form.formState.errors.tempItem?.company_id]}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tempItem.department_id"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  القسم <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => {
                      if (value === "add") {
                        setDialogKey("department");
                        setIsItemDialogOpen(true);
                        field.onChange("");
                      } else {
                        field.onChange(value);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      <SelectGroup>
                        {departmentsData?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="add">
                          <Plus className="size-6" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError
                  errors={[form.formState.errors.tempItem?.department_id]}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tempItem.quantity"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  الكمية المطلوبة <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <ButtonGroup className="border-t-primary h-12 w-full overflow-hidden rounded-md border bg-[#272727]">
                    <Button
                      type="button"
                      size={"sm"}
                      onClick={() => field.onChange((field.value || 1) + 1)}
                      className="h-full w-14 shrink-0 rounded-none border-0 bg-transparent text-[#FDFDFD] hover:bg-[#2E2E2E]"
                    >
                      <PlusIcon className="size-5" />
                    </Button>

                    <ButtonGroupText className="flex flex-1 items-center justify-center border-none bg-transparent text-base font-semibold text-white">
                      {field.value || 1}
                    </ButtonGroupText>
                    <Button
                      type="button"
                      size={"sm"}
                      disabled={(field.value || 1) <= 1}
                      onClick={() =>
                        field.onChange(Math.max(1, (field.value || 1) - 1))
                      }
                      className="h-full w-14 shrink-0 rounded-none border-0 bg-transparent text-[#BDBDBD] hover:bg-[#2E2E2E] hover:text-white disabled:opacity-40"
                    >
                      <MinusIcon className="size-5" />
                    </Button>
                  </ButtonGroup>
                </FieldContent>
                <FieldError
                  errors={[form.formState.errors.tempItem?.quantity]}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tempItem.applier_id"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  مقدم الطلب <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => {
                      if (value === "add") {
                        setDialogKey("applier");
                        setIsItemDialogOpen(true);
                        field.onChange("");
                      } else {
                        field.onChange(value);
                      }
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="مقدم الطلب" />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      <SelectGroup>
                        {appliersData?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="add">
                          <Plus className="size-6" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError
                  errors={[form.formState.errors.tempItem?.applier_id]}
                />
              </Field>
            )}
          />
        </div>
        <div className="flex justify-start mt-6" dir="rtl">
          <Button
            dir="rtl"
            type="button"
            onClick={handleSaveItem}
            className="mt-6 flex items-center justify-between"
          >
            <span>{isEditing ? "تعديل العنصر" : "حفظ العنصر"}</span>
            {isEditing ? <Check /> : <Download />}
          </Button>
         </div>
      </div>
      {activeDialogProps && (
        <ItemDialog
          {...activeDialogProps}
          isOpen={isItemDialogOpen}
          onClose={() => setIsItemDialogOpen(false)}
        />
      )}

      <Button
        dir="rtl"
        type="button"
        onClick={handleReset}
        className="ms-auto mt-6 flex items-center justify-between "
      >
        <span>اعادة تعيين</span>
        <RefreshCcw />
      </Button>
    </>
  );
};

export default InsertForm;
