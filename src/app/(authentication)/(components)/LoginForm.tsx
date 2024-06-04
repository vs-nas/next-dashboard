'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Button } from "@/components/ui/button"
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Show } from '@/utils/show';
// import { login } from '@/actions/auth.action';
import { toast } from "sonner"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas/login-schema';
import { Login } from '@/actions/auth.action';
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        const loadingToast = toast.loading('Logging in');
        const res = await Login({
            email: values.email,
            password: values.password,
        });
        toast.dismiss(loadingToast);
        const { error } = res;
        if (!!error) {
            toast.error(error);
        } else {
            toast.success("Login successful");
            router.replace("/");
        }
    };

    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                        />
                                    </>
                                </FormControl>
                                <FormMessage className='' />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="/forgot-password"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <div className="relative w-full">
                                            <Input
                                                id="password"
                                                type={isPasswordVisible ? "text" : "password"}
                                                {...field}
                                                disabled={form.formState.isSubmitting}
                                                autoCapitalize="none"
                                                autoComplete="password"
                                                autoCorrect="off"
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                                onClick={togglePasswordVisibility}
                                            >
                                                <Show>
                                                    <Show.When isTrue={isPasswordVisible}>
                                                        <EyeOff className='w-4 cursor-pointer' />
                                                    </Show.When>
                                                    <Show.Else>
                                                        <Eye className='w-4 cursor-pointer' />
                                                    </Show.Else>
                                                </Show>
                                            </div>
                                        </div>
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                    </div>
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                        Login
                    </Button>
                </div>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </form>
        </Form>
    )
}

