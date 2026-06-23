import { UserTypes } from "./auth.ct";
export const VIEW_ORDERS_ROUTE = "/dashboard/it/view-orders";
export const navbar_links_roles: Record<
  UserTypes,
  { href: string; Label: string }[]
> = {
  it: [
    { href: "/dashboard", Label: "لوحة التحكم" },
    { href: "/users", Label: "المستخدمون" },
    { href: "/services", Label: "الخدمات" },
    { href: "/blogs", Label: "المدونة" },
    { href: "/orders", Label: "الطلبات" },
    { href: "/operations", Label: "سجل العمليات" },
  ],
  cto: [
    { href: "/dashboard", Label: "لوحة التحكم" },
    { href: "/clients", Label: "العملاء" },
  ],
  account: [
    { href: "/dashboard", Label: "لوحة التحكم" },
    { href: "/clients", Label: "العملاء" },
    { href: "/recommendations", Label: "التوصيات" },
  ],
};
//[ /] is too generic
// It likely causes middleware redirect loops in your proxy/auth system
export const ROUTE_ROLE_MAP: Record<string, UserTypes[]> = {
  "/dashboard": ["account", "cto", "it"],
  "/orders": ["account", "cto", "it"],
  "/users": ["cto"],
  "/operations": ["cto"],
  "/new-order": ["it"],
  "/forbidden": ["account", "cto", "it"],
};
// where each user land after loging
export const HOMEPAGE_ROLE_ROUTE: Record<UserTypes, string> = {
  account: "/dashboard",
  it: "/dashboard",
  cto: "/dashboard",
};
//pages that doesnt requer an auth to enter
export const PUBLIC_PAGES = [
  "/login",
  "/register",
  "/forgetpassword",
  "/resetpassword",
];
// Why duplicate?

// Usually used for:

// Redirect logged-in users away from auth pages

// Example:

// If user is already logged in → don't let them open /login
export const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgetpassword",
  "/resetpassword",
];

export const FORBIDDEN =[
   "/forbidden" 
]