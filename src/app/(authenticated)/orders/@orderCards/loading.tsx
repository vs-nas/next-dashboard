import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from '@/components/ui/skeleton'

export default function OrderCardsLoading() {

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
                    <CardHeader className="pb-2">
                        <CardDescription>This Week</CardDescription>
                        <CardTitle className="text-4xl">
                            <Skeleton className="h-10 w-[120px] rounded" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            <Skeleton className="h-4 w-[120px] rounded" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={0} aria-label="Loading" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>This Month</CardDescription>
                        <CardTitle className="text-4xl">
                            <Skeleton className="h-10 w-[120px] rounded" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            <Skeleton className="h-4 w-[120px] rounded" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={0} aria-label="Loading" />
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}