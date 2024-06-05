import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    Truck,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from '@/components/ui/skeleton'
import { wait } from "@/lib/utils"

export default function OrderDetailLoading() {

    return (
        <>
            <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            <Skeleton className="h-4 w-[160px] rounded" />
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription><Skeleton className="h-4 w-[120px] rounded" /></CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <Skeleton className="h-4 w-[120px] rounded" />
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                            <li className="flex items-center justify-between">
                                <Skeleton className="h-4 w-[120px] rounded" />
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <Skeleton className="h-4 w-[70px] rounded" />
                            </li>
                        </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <div className="font-semibold">Shipping Information</div>
                            <address className="grid gap-2 not-italic text-muted-foreground">
                                <Skeleton className="h-4 w-[100px] rounded" />
                                <Skeleton className="h-4 w-[70px] rounded" />
                                <Skeleton className="h-4 w-[80px] rounded" />
                            </address>
                        </div>
                        <div className="grid auto-rows-max gap-2">
                            <div className="font-semibold">Billing Information</div>
                            <Skeleton className="h-4 w-[100px] rounded" />
                            <Skeleton className="h-4 w-[70px] rounded" />
                            <Skeleton className="h-4 w-[80px] rounded" />
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Customer Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Customer</dt>
                                <dd><Skeleton className="h-4 w-[120px] rounded" /></dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                    <a href="mailto:"><Skeleton className="h-4 w-[120px] rounded" /></a>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>
                                    <a href="tel:"><Skeleton className="h-4 w-[100px] rounded" /></a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Payment Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <Skeleton className="h-4 w-[100px] rounded" />
                                </dt>
                                <dd><Skeleton className="h-4 w-[100px] rounded" /></dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        <Skeleton className="h-4 w-[140px] rounded" />
                    </div>
                    
                </CardFooter>
            </Card>

        </>
    )
}