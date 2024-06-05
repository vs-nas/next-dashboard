import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    File,
    ListFilter,
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton'
import { wait } from "@/lib/utils"

export default function OrderDetailLoading() {

    return (
        <>
            <Tabs defaultValue="week">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                    </div>
                </div>
                <TabsContent value="week">
                    <Card x-chunk="dashboard-05-chunk-3">
                        <CardHeader className="px-7">
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                Recent orders from your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium mb-2">
                                                <Skeleton className="h-4 w-[120px] rounded" />
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                <Skeleton className="h-4 w-[150px] rounded" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[100px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium mb-2">
                                                <Skeleton className="h-4 w-[120px] rounded" />
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                <Skeleton className="h-4 w-[150px] rounded" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[100px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium mb-2">
                                                <Skeleton className="h-4 w-[120px] rounded" />
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                <Skeleton className="h-4 w-[150px] rounded" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[100px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium mb-2">
                                                <Skeleton className="h-4 w-[120px] rounded" />
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                <Skeleton className="h-4 w-[150px] rounded" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[100px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium mb-2">
                                                <Skeleton className="h-4 w-[120px] rounded" />
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                <Skeleton className="h-4 w-[150px] rounded" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-4 w-[100px] rounded" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-[120px] rounded" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </>
    )
}