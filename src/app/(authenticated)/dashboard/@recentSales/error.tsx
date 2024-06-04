'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <div>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="mx-auto h-full flex justify-center items-center px-4 py-8 lg:px-6 lg:py-16">
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