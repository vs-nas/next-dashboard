'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import {
    ArrowUpRight,
} from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    return (
        <>
            <Card
                className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
            >
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Recent transactions from your store.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="#">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="mx-auto max-w-screen-xl h-full flex justify-content items-center px-4 py-8 lg:px-6 lg:py-16">
                                <div className="mx-auto max-w-screen-sm text-center">
                                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry something went wrong.</p>
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

        </>
    )
} 