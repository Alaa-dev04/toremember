"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/zod/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Logingform = {
  username: string;
  password: string;
};

type logingPhase = "bg" | "logo-rise" | "logo-right" | "form";

const PHASE_DELAYS = {
  logoRise: 2500,
  logoRight: 5500,
  form: 8000,
} as const;

export default function LoginPage() {
  const [phase, setPhase] = useState<logingPhase>("bg");
  const [showPassword, setShowPassword] = useState(false);

  const ANIMATION_DURATION = "duration-1000";
  const ANIMATION_DURATION_SLOW = "duration-[1400ms]";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const router = useRouter();

  const onSubmit = async (data: Logingform) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (!res || res.error) {
      toast.error("فشل فى تسجيل الدخول ");
      return;
    }

    toast.success("تم تسجيل الدخول بنجاح");
    router.push("/dashboard");
  };

  useEffect(() => {
    const logoapptimer = setTimeout(() => {
      setPhase("logo-rise");
    }, PHASE_DELAYS.logoRise);

    const logorighttimer = setTimeout(() => {
      setPhase("logo-right");
    }, PHASE_DELAYS.logoRight);

    const formtimer = setTimeout(() => {
      setPhase("form");
    }, PHASE_DELAYS.form);

    return () => {
      clearTimeout(logoapptimer);
      clearTimeout(logorighttimer);
      clearTimeout(formtimer);
    };
  }, []);

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[#010000]">
        <Image
          src="/login_bg.gif"
          alt="Login Background"
          fill
          unoptimized
          priority
          className="object-cover object-bottom"
        />

        <div className="absolute inset-0 bg-black/50">
          {/* LOGO ANIMATION */}
          <div
            className={cn(
              "absolute z-20 flex flex-col items-center transition-all ease-in-out",
              ANIMATION_DURATION_SLOW,
              phase === "bg" &&
                "bottom-0 left-1/2 -translate-x-1/2 opacity-0",
              phase === "logo-rise" &&
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100",
              phase === "logo-right" || phase === "form"
                ? "top-1/2 right-[8%] left-auto -translate-y-1/2 opacity-100"
                : ""
            )}
          >
            <Image
              className="scale-200 md:scale-170 m-14"
              src="/zikola_logo.png"
              alt="Zikola logo"
              width={220}
              height={278}
              priority
            />

            <div
              className={cn(
                `mt-6 max-w-md text-center transition-all ${ANIMATION_DURATION}`,
                phase === "logo-right" || phase === "form"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <h3 className="text-xl md:text-3xl font-bold text-[#EBEBEB]">
                نظام ادارة طلبات تقنية المعلومات
              </h3>
              <p className="mt-3 text-[#D3D3D3] md:text-xl">
                ادارة ذكية لطلبات الاقسام وعمليات المراجعة والاعتماد
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FORM LAYOUT */}
      <div
        className={cn(
          `z-10 grid grid-cols-1 md:grid-cols-2 h-screen w-full transition-opacity ${ANIMATION_DURATION}`,
          phase === "form" ? "opacity-100" : "opacity-0"
        )}
      >
        {/* FORM SIDE */}
        <div
          className={cn(
            `flex items-center justify-center px-6 md:px-16`,
            ANIMATION_DURATION_SLOW,
            phase === "form"
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          )}
        >
          <div className="w-full max-w-2xl">

            {/* FORM CARD (NEW DESIGN) */}
            <div
              className="
                w-full  rounded-2xl
                bg-black backdrop-blur-xl
                border border-white/10
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
                p-6 md:p-10 text-right
              "
              dir="rtl"
            >
              {/* HEADER */}
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                تسجيل الدخول
              </h1>

              <p className="text-sm md:text-lg mt-3 text-gray-300">
                يرجى ادخال بياناتك لتسجيل دخولك الى النظام
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

                {/* USERNAME */}
                <div>
                  <label className="block text-lg font-medium text-gray-200 mb-2">
                    اسم المستخدم
                  </label>

                  <Input
                    type="text"
                    placeholder="اسم المستخدم"
                    className="
                      w-full bg-black/30 border border-white/10
                      text-white placeholder:text-gray-500
                      rounded-lg h-12 px-4
                      focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    "
                    {...register("username")}
                  />

                  {errors.username && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-lg font-medium text-gray-200 mb-2">
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="كلمة المرور"
                      className="
                        w-full bg-black/30 border border-white/10
                        text-white placeholder:text-gray-500
                        rounded-lg h-12 px-4 pr-12
                        focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      "
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        absolute left-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-orange-400 transition
                      "
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <Button
                  type="submit"
                  className="
                    w-full h-12 rounded-lg
                    bg-linear-to-r from-orange-500 to-orange-600
                    hover:from-orange-600 hover:to-orange-700
                    text-white font-semibold
                    shadow-lg shadow-orange-500/20
                    transition-all duration-300
                  "
                >
                  تسجيل الدخول
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}