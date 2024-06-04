import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function TransactionsLoading() {

    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="grid gap-1">
                            <div className="text-sm font-medium leading-none">
                                <Skeleton className="h-4 w-[120px] rounded" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <Skeleton className="h-4 w-[150px] rounded" />
                            </div>
                        </div>
                        <div className="ml-auto font-medium">
                            <Skeleton className="h-4 w-[50px] rounded" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="grid gap-1">
                            <div className="text-sm font-medium leading-none">
                                <Skeleton className="h-4 w-[120px] rounded" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <Skeleton className="h-4 w-[150px] rounded" />
                            </div>
                        </div>
                        <div className="ml-auto font-medium">
                            <Skeleton className="h-4 w-[50px] rounded" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="grid gap-1">
                            <div className="text-sm font-medium leading-none">
                                <Skeleton className="h-4 w-[120px] rounded" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <Skeleton className="h-4 w-[150px] rounded" />
                            </div>
                        </div>
                        <div className="ml-auto font-medium">
                            <Skeleton className="h-4 w-[50px] rounded" />
                        </div>
                    </div>
                    
                </CardContent>
            </Card>

        </>
    )
}