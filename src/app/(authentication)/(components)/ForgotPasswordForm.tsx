'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Button } from "@/components/ui/button"
import { ForgotPasswordSchema } from '@/schemas';
import { Input } from "@/components/ui/input"
import { forgotPassword } from '@/actions/auth.action';
import { toast } from "sonner"
import { useForm } from 'react-hook-form';
import { useGlobalState } from '@/store';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPasswordForm() {
    const router = useRouter();
    const state = useGlobalState();

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
        const loadingToast = toast.loading('Loading');
        const { data, error } = await forgotPassword({
            email: values.email,
        });
        toast.dismiss(loadingToast);
        
        if (error) toast.error("User not found", { duration: 2000 });
        if (!error) {
            state.setSessionId(data?.session_id || '')
            state.setEmail(values.email || '')
            router.push("/otp");
            toast.success('OTP sent successfully.', { duration: 2000 })
        }
    };

    return (
        <Form {...form}>
            <form className="mt-0" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <h4 className='text-2xl font-semibold text-center pb-12'>Forgot password?</h4>
                <div className="mb-10">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={form.formState.isSubmitting} className='h-14   p-5 placeholder:text-slate-400  placeholder:text-xs bg-transparent border border-[#CBD5E1] rounded-md text-slate-950' placeholder="Email Address" {...field} />
                                </FormControl>
                                <FormMessage className='' />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={form.formState.isSubmitting} className="w-full h-[56px] bg-[#FFDA16] hover:bg-yellow-400 rounded-full text-gray-900 font-normal text-sm" type="submit">
                    <p>Continue</p>
                </Button>

            </form>
        </Form>
    )
}

