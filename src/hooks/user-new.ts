"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useQueryDialog from "./useQueryopendia";
import {
 Createusershema,
  type CreateUserFormValues,
} from "@/zod/usres/usersform";
import { $api } from "@/lib/tanstack.lib";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export function useNewUser() {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(Createusershema ),
    defaultValues: {
      frist_name: '',
      last_name: '',
      user_name: '',
      dep_id: '',
      role: '',
      password: '',
      confirm_password: '',
    },
  });
  const { isOpen, closeDialog } = useQueryDialog('create-user');
  const queryClient = useQueryClient();
  const mutatednew = $api.useMutation('post','/users',{
    onSuccess:()=>{
      toast.success('user created succesfully ')
      queryClient.invalidateQueries({
        queryKey:['get','/users'],
      })
      closeDialog();
      form.reset();
    },
    onError:()=>{
        toast.error('something went wrong ')
    }
  })

  const onSubmit = (data: CreateUserFormValues) => {
    mutatednew.mutate({
      body :{
        first_name:data.frist_name,
        last_name:data.frist_name,
        username:data.user_name,
        department_id: data?.dep_id.toString(),
        role:data.role,
        password:data.password,
        password_confirmation:data.confirm_password,
      }
    })
    closeDialog();

    form.reset();
  };

  const onCancel = () => {
    closeDialog();
    form.reset();
  };

  return {
    form,
    isOpen,
    closeDialog,
    onSubmit,
    onCancel,
    isPending:mutatednew.isPending,
  };
}


