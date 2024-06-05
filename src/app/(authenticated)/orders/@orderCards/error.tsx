'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card
                    className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                >
                    <CardHeader className="pb-3">
                        <CardTitle>Your Orders</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Introducing Our Dynamic Orders Dashboard for Seamless
                            Management and Insightful Analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Create New Order</Button>
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardContent className="pt-6">
                        <div>
                            <section className="bg-white dark:bg-gray-900">
                                <div className="mx-auto h-full flex justify-center items-center px-4 py-8 lg:px-6 lg:py-14">
                                    <div className="mx-auto max-w-screen-sm text-center">
                                        <button
                                            onClick={
                                                () => reset()
                                            }
                                        >
                                            Try again
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardContent className="pt-6">
                        <div>
                            <section className="bg-white dark:bg-gray-900">
                                <div className="mx-auto h-full flex justify-center items-center px-4 py-8 lg:px-6 lg:py-14">
                                    <div className="mx-auto max-w-screen-sm text-center">
                                        <button
                                            onClick={
                                                () => reset()
                                            }
                                        >
                                            Try again
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    )
} 