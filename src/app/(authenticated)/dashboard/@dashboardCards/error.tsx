'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <>
            <div className="flex  w-full flex-col">

                <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card x-chunk="dashboard-01-chunk-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="mx-auto max-w-screen-sm text-start">
                                    <p className="mb-1 text-lg font-light text-gray-500 dark:text-gray-400">Failed to load data.</p>
                                    <button
                                        onClick={
                                            () => reset()
                                        }
                                    >
                                        Try again
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Subscriptions
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="mx-auto max-w-screen-sm text-start">
                                    <p className="mb-1 text-lg font-light text-gray-500 dark:text-gray-400">Failed to load data.</p>
                                    <button
                                        onClick={
                                            () => reset()
                                        }
                                    >
                                        Try again
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="mx-auto max-w-screen-sm text-start">
                                    <p className="mb-1 text-lg font-light text-gray-500 dark:text-gray-400">Failed to load data.</p>
                                    <button
                                        onClick={
                                            () => reset()
                                        }
                                    >
                                        Try again
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-3">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="mx-auto max-w-screen-sm text-start">
                                    <p className="mb-1 text-lg font-light text-gray-500 dark:text-gray-400">Failed to load data.</p>
                                    <button
                                        onClick={
                                            () => reset()
                                        }
                                    >
                                        Try again
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </main>
            </div>

        </>
    )
} 