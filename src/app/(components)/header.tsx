'use client'

import * as React from "react"

import {
    CircleUser,
    Menu,
    Search,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { CubeTransparentIcon } from "@heroicons/react/24/outline"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import clsx from 'clsx';
import { logOut } from "@/actions/auth.action"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function Header({ session }: any) {
    const pathname = usePathname();
    const router = useRouter();
    const { setTheme } = useTheme();
    const [currentUser, setCurrentUser] = useState<any>({})
    useEffect(() => {
        if (!!session.user) {
            setCurrentUser(session.user)
        }
    }, [session])

    const handleLogout = async () => {
        const loadingToast = toast.loading('Logging out');
        await logOut()
        toast.dismiss(loadingToast);
        toast.success('Logged out successfully.', { duration: 1000 })
        router.push("/login");
    }
    return (
        <>
            <header className="sticky z-[5] top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <CubeTransparentIcon className="h-8 w-12" />
                        <span className="sr-only">logo</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className={clsx(
                            'transition-colors hover:text-foreground',
                            {
                                'text-foreground': pathname === '/dashboard',
                                'text-muted-foreground': pathname != '/dashboard'
                            },
                        )}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/orders"
                        className={clsx(
                            'transition-colors hover:text-foreground',
                            {
                                'text-foreground': pathname === '/orders',
                                'text-muted-foreground': pathname != '/orders'
                            },
                        )}
                    >
                        Orders
                    </Link>
                    <Link
                        href="/settings"
                        className={clsx(
                            'transition-colors hover:text-foreground',
                            {
                                'text-foreground': pathname === '/settings',
                                'text-muted-foreground': pathname != '/settings'
                            },
                        )}
                    >
                        Settings
                    </Link>

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <CubeTransparentIcon className="h-6 w-6" />
                                <span className="sr-only">Logo</span>
                            </Link>
                            <Link href="/dashboard" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="/orders"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/settings"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{currentUser?.name || "Username"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div
                                    onClick={handleLogout}
                                    className="w-full cursor-pointer"
                                >
                                    Logout
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    );
}
