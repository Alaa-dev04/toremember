"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useQueryDialog from "./useQueryopendia";
import {
  Editeusershema,
  type UpdateUserFormValues,
} from "@/zod/usres/usereditform";
import { $api } from "@/lib/tanstack.lib";
import { parseAsString, useQueryState } from "nuqs";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";


type UpdateUserBody = {
  first_name?: string;
  last_name?: string;
  username?: string;
  role?: string;
  department_id?: number;
  status?: number;
  password?: string;
  password_confirmation?: string;
};

const useEditUser = () => {
  //reading user id from the url
  const [userId] = useQueryState(
    "dialog-edit-user",
    parseAsString.withDefault(""),
  );
  //gets acces to react quary chash
  const queryClient = useQueryClient();
  //fetchingf the data
  const { data: userdata, isLoading } = $api.useQuery(
    "get",
    "/users/{id}",
    {
      params: {
        path: { id: userId },
      },
    },
    { enabled: !!userId },
  );
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(Editeusershema as any),
    defaultValues: {
      frist_name: userdata?.data.first_name,
      last_name: userdata?.data.last_name,
      user_name: userdata?.data.username,
      role: userdata?.data.role,
      dep_id: userdata?.data.department_id.toString(),
      is_disabled: userdata ? userdata?.data.status === 0 : undefined,
      password: "",
      confirm_password: "",
    },
  });
  const { isOpen, closeDialog } = useQueryDialog("edit-user");
  const mutation = $api.useMutation("put", "/users/{id}");
  /// i want to do onsumit
  const onSubmit = (data: UpdateUserBody) => {
    if (!userId) return;
    const body: UpdateUserBody = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data?.username,
      role: data.role,
      department_id: data.department_id ? Number(data.department_id) : undefined,
        status: data.status ? 0 : 1,
      ...(data.password
        ? {
            password: data.password,
            password_confirmation: data.password_confirmation,
          }
        : {}),
    };
     mutation.mutate(
    {
        params:{path:{id:userId}},
        body :body ,
    },{
        onSuccess:()=>{
            closeDialog();
            form.reset();
            toast.success('updated successfully');
             queryClient.invalidateQueries({
                queryKey:['get',['/users']],
            });
        }
    }
  )
  };

  const onCancel =()=>{
    closeDialog();
    form.reset();};

    const statsmutation = $api.useMutation(
        'put','/users/toggle-status/{id}'
    );
     const onToggleStatus = () => {
    if (!userId) return;
    statsmutation.mutate(
      {
        params: { path: { id: userId } },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get', '/users'],
          });
          form.setValue('is_disabled', !form.getValues('is_disabled'));
        },
      }
    );
  };

 return {
    form,
    isOpen,
    closeDialog,
    onSubmit,
    onCancel,
    mutation,
    onToggleStatus,
    statsmutation,
  };
 
};

export default useEditUser;
