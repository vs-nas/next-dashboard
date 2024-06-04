import Image from "next/image"
import Link from "next/link"
import LoginForm from "../(components)/LoginForm"

export default function Dashboard() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your credentials below to login
                        </p>
                    </div>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:flex justify-center items-center">
                <Image
                    src="/undraw_reading.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    priority
                    className="h-[600px] px-10 w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />

            </div>
        </div>
    )
}
