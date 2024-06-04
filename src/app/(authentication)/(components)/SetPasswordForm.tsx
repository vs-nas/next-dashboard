'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox';
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { SetPasswordSchema } from '@/schemas/set-password-schema';
import { Show } from '@/utils/show';
import { setPassword } from '@/actions/auth.action';
import { toast } from 'sonner';
// import { signIn } from "@/actions/auth.actions"
import { useForm } from 'react-hook-form';
import { useGlobalState } from "@/store";
import { useRouter } from 'next/navigation'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

export default function SetPasswordForm() {
    const router = useRouter();
    const state = useGlobalState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        if (!state.getStatus() || !state.getSessionId()) {
            router.back()
        }
    }, [])

    const form = useForm<z.infer<typeof SetPasswordSchema>>({
        resolver: zodResolver(SetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    function toggleConfirmPasswordVisibility() {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    }
    const onSubmit = async (values: z.infer<typeof SetPasswordSchema>) => {
        const loadingToast = toast.loading('Loading');
        const { data, error } = await setPassword({
            password: values.password,
            confirmPassword: values.confirmPassword,
            session_id: state.getSessionId()
        });
        toast.dismiss(loadingToast);
        if (error) {
            if (typeof (data) == 'string') {
                toast.error(data, { duration: 2000 })
            } else {
                toast.error('Something went wrong', { duration: 2000 })
            }
        };
        if (!error) {
            state.updateStatus(false)
            state.setEmail('')
            router.push("/login");
            toast.success('Password updated successfully.', { duration: 2000 })
        }
    };
    const password = form.watch("password");
    const ConfirmPassword = form.watch("confirmPassword");
    useEffect(() => {
        if(form.getFieldState('confirmPassword').isDirty){
            form.trigger("confirmPassword");
        }
        if(!!form.getValues('password')){
            form.trigger("password");
        }
    }, [password,ConfirmPassword, form.trigger]);
    return (
        <Form {...form}>
            <form className="mt-0" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <h4 className='text-2xl font-semibold text-center pb-12'>Set password</h4>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='max-w-[400px]'>
                                <FormControl >
                                    <div className="relative w-full">
                                        <Input
                                            type={isPasswordVisible ? "text" : "password"}
                                            placeholder="New Password"
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                            className='h-14 p-5 placeholder:text-slate-400 placeholder:text-xs bg-transparent border border-[#CBD5E1] rounded-md text-slate-950'
                                            onKeyDown={(e)=>{
                                                if (e.code === 'Space') e.preventDefault()
                                            }}
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <Show>
                                                <Show.When isTrue={isPasswordVisible}>

                                                    <Image
                                                        width={15}
                                                        height={15}
                                                        src={"/images/icons/eyeIcon.svg"}
                                                        alt="Logo"
                                                        className="me-2 cursor-pointer"
                                                    />
                                                </Show.When>
                                                <Show.Else>
                                                    <Image
                                                        width={15}
                                                        height={15}
                                                        src={"/images/icons/eyeVisibleIcon.svg"}
                                                        alt="Logo"
                                                        className="me-2 cursor-pointer"
                                                    />
                                                </Show.Else>
                                            </Show>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className='' />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-8">
                    {/* <Label htmlFor="password">Password</Label> */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                            className='h-14 p-5 placeholder:text-slate-400 placeholder:text-xs bg-transparent border border-[#CBD5E1] rounded-md text-slate-950'
                                            onKeyDown={(e)=>{
                                                if (e.code === 'Space') e.preventDefault()
                                            }}
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            <Show>
                                                <Show.When isTrue={isConfirmPasswordVisible}>

                                                    <Image
                                                        width={15}
                                                        height={15}
                                                        src={"/images/icons/eyeIcon.svg"}
                                                        alt="Logo"
                                                        className="me-2 cursor-pointer"
                                                    />
                                                </Show.When>
                                                <Show.Else>
                                                    <Image
                                                        width={15}
                                                        height={15}
                                                        src={"/images/icons/eyeVisibleIcon.svg"}
                                                        alt="Logo"
                                                        className="me-2 cursor-pointer"
                                                    />
                                                </Show.Else>
                                            </Show>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between mb-8">

                    <div className="flex items-center space-x-2">
                    </div>
                    <Button disabled={form.formState.isSubmitting} className="w-full  h-[56px] bg-[#FFDA16] hover:bg-yellow-400 rounded-full text-gray-900 font-normal text-xs" type="submit">
                        <p className='text-sm'>Confirm</p>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

