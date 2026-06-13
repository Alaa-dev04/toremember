"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from "react";

type logingPhase = "bg" | "logo-rise" | "logo-right" | "form";

///makes the code cleaner easy to edit later and helps with type script type checking
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

  ////need to use use effct becouse of the set time out
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

    ///clean up on timer when the components unmounts
    return () => {
      clearTimeout(logoapptimer);
      clearTimeout(logorighttimer);
      clearTimeout(formtimer);
    };

    ///// empty dependency array to run the effect only once when the component mounts
  }, []);

  ///// hide intro when form appear
  const showINTRO = phase !== "form";

  return (
    <>
      {/* BACKGROUND ALWAYS EXISTS */}
      <div className="fixed inset-0 bg-[#010000]">
        <Image
          src="/login_bg.gif"
          alt="Login Background"
          fill
          unoptimized
          priority
          className="object-cover object-bottom"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50">
          {/* INTRO ANIMATION LAYER */}

          <div
            className={cn(
              "absolute z-20 flex flex-col items-center transition-all ease-in-out ",
              ANIMATION_DURATION_SLOW,

              // BG (start)
              phase === "bg" && "bottom-0 left-1/2 -translate-x-1/2 opacity-0",

              // center animation
              phase === "logo-rise" &&
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100",

              // FINAL POSITION (IMPORTANT FIX)
              phase === "logo-right" || phase === "form"
                ? "top-1/2 right-[8%] left-auto -translate-y-1/2 opacity-100"
                : "",
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
                  : "opacity-0 translate-y-4",
              )}
            >
              <h3 className="text-xl leading-tight font-bold text-[#EBEBEB] md:text-3xl">
                نظام ادارة طلبات تقنية المعلومات
              </h3>
              <p className="mt-3 text-base text-[#D3D3D3] md:text-xl">
                ادارة ذكية لطلبات الاقسام وعمليات المراجعة والاعتماد
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* final layout ; form (left side)  + branding (right side) */}
      <div
        className={cn(
          ` z-10 grid grid-cols-1 md:grid-cols-2 
           h-screen w-full transition-opacity
           ${ANIMATION_DURATION} ease-in-out`,
          phase === "form" ? "opacity-100" : "opacity-0",
        )}
      >
        {/* FORM SIDE */}
        <div
          className={cn(
            `flex items-center justify-center px-6 md:px-16`,
            ANIMATION_DURATION_SLOW,
            phase === "form"
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0",
          )}
        >
          <div className="w-full max-w-2xl  ">
            <div className="mb-10   bg-black p-6 rounded-lg text-right md:mb-16" dir="rtl">
              <h1 className="text-3xl leading-tight font-bold text-[#FDFDFD] md:text-5xl">
                تسجيل الدخول
              </h1>
              <p className="text-md mt-2 text-[#A3A3A3] md:text-xl">
                يرجى ادخال بياناتك لتسجيل دخولك الى النظام
              </p>
              <form>
                <div>
                    <label className="block text-xl text-right font-medium text-[#FDFDFD] mb-2 ">
                        اسم المستخدم
                    </label>
                    <Input type="text" placeholder="اسم المستخدم" className="w-full" />
                </div>
                <div className="mt-4">
                    <label className="block text-xl text-right font-medium text-[#FDFDFD] mb-2 ">
                        كلمة المرور
                    </label>
                    
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="كلمة المرور" className="w-full" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#FDFDFD]"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                </div>
                <Button className="mt-6 bg-gray-600 hover:bg-gray-300 text-[#FDFDFD] w-full"  >
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