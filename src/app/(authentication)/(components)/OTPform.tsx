'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import { VerfiyOtpSchema } from '@/schemas/verfiy-otp-schema';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '@/store';
import { useRouter } from 'next/navigation'
import { resendOtp, verfiyOtp } from '@/actions/auth.action';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

export default function OtpForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [value, setValue] = useState("")

    const state = useGlobalState();

    useEffect(() => {
        if (!state.getSessionId()) {
            router.back()
        }
    }, [])
    const form = useForm<z.infer<typeof VerfiyOtpSchema>>({
        resolver: zodResolver(VerfiyOtpSchema),
        defaultValues: {
            otp: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof VerfiyOtpSchema>) => {
        const loadingToast = toast.loading('Loading');
        const { data, error } = await verfiyOtp({
            otp: values.otp,
            session_id: state.getSessionId()
        });
        toast.dismiss(loadingToast);
        if (error) {
            form.reset()
            if (typeof (data) == 'string') {
                toast.error(data, { duration: 2000 })
            } else {
                toast.error('Something went wrong', { duration: 2000 })
            }
            state.updateStatus(false)
        };
        if (!error) {
            state.updateStatus(true)
            router.push("/set-password");
            toast.success('OTP verified successfully.', { duration: 2000 })
        }
    };
    const onResend = async () => {
        const loadingToast = toast.loading('Loading');
        const { data, error } = await resendOtp(state.getSessionId());
        toast.dismiss(loadingToast);
        if (error) toast.error("Something went wrong", { duration: 2000 });
        if (!error) {
            toast.success('OTP sent successfully.', { duration: 2000 })
        }
    };
    return (
        <Form {...form}>
            <form className="mt-0" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <h4 className='text-2xl font-semibold text-center mb-8'>OTP Verification</h4>

                <div className="w-full flex justify-center mb-10">

                <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <InputOTP maxLength={4} {...field} disabled={form.formState.isSubmitting}>
                                        <InputOTPGroup >
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-between mb-8">

                    <div className="flex items-center space-x-2">
                    </div>
                    <Button disabled={form.formState.isSubmitting}  className="w-full  h-[56px] bg-[#FFDA16] hover:bg-yellow-400 rounded-full text-gray-900 font-normal text-xs" type="submit">
                        <p className='text-sm'>Continue</p>
                    </Button>
                </div>
                <div className="mb-12 flex justify-center">
                    <p   className="text-sm text-[#70798B] font-normal leading-none ">Didn’t receive it? &nbsp;</p>
                    <label
                        // htmlFor="rememberMe"
                        className="text-sm cursor-pointer text-[#4C699D] font-normal leading-none "
                        onClick={() => { onResend() }}
                    >
                         Resend
                    </label>
                </div>
            </form>
        </Form>
    )
}

