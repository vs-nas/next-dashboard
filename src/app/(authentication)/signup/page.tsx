import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your details below to create a new account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Name</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Full name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Confirm Password</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Link href="/dashboard" className="underline">
                            <Button type="submit" className="w-full">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:flex justify-center items-center">
                <Image
                    src="/undraw_sign_up_n6im.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    priority
                    className="h-[600px] px-10 w-full dark:brightness-[0.2] dark:grayscale"
                />

            </div>
        </div>
    )
}
