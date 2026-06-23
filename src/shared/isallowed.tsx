import { UserTypes } from "@/constants/auth.ct";
import { useSession } from "next-auth/react";
import { FC , PropsWithChildren } from "react";
export const IsAllowed: FC<
  PropsWithChildren<{ roles: UserTypes[] }>
> = ({ roles, children }) => {
  const { data: session } = useSession();
  const LoggedUser = session?.user.role;
  if (!LoggedUser) return null;
  if (roles.includes(LoggedUser)) return <>{children}</>;
  return null;
};