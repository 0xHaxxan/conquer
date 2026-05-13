"use client"

import { useMemo, useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

/* =========================
   TYPES
========================= */

interface ProductionItem {
    id: number
    bottleName: string
    bottleSize: string
    quantity: number
    costPerBottle: number
    totalCost: number
}

interface ProductionRecord {
    id: number
    productionDate: string
    items: ProductionItem[]
    grandTotal: number
    totalBottleCount: number
    createdAt: string
}

/* =========================
   PAGE
========================= */

export default function page() {
    const [productionDate, setProductionDate] =
        useState("")

    const [itemForm, setItemForm] = useState({
        bottleName: "",
        bottleSize: "",
        quantity: "",
        costPerBottle: "",
    })

    const [items, setItems] = useState<
        ProductionItem[]
    >([])

    const [records, setRecords] = useState<
        ProductionRecord[]
    >([])

    const [editingId, setEditingId] = useState<
        number | null
    >(null)

    /* =========================
       ADD ITEM
    ========================= */

    const handleAddBottle = () => {
        if (
            !itemForm.bottleName ||
            !itemForm.quantity ||
            !itemForm.costPerBottle
        ) {
            return
        }

        const quantity = Number(
            itemForm.quantity
        )

        const costPerBottle = Number(
            itemForm.costPerBottle
        )

        const newItem: ProductionItem = {
            id:
                editingId ||
                Date.now(),

            bottleName:
                itemForm.bottleName,

            bottleSize:
                itemForm.bottleSize,

            quantity,

            costPerBottle,

            totalCost:
                quantity *
                costPerBottle,
        }

        // EDIT
        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? newItem
                        : item
                )
            )

            setEditingId(null)
        }

        // CREATE
        else {
            setItems((prev) => [
                ...prev,
                newItem,
            ])
        }

        // RESET
        setItemForm({
            bottleName: "",
            bottleSize: "",
            quantity: "",
            costPerBottle: "",
        })
    }

    /* =========================
       DELETE
    ========================= */

    const handleDeleteItem = (
        id: number
    ) => {
        setItems((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        )
    }

    /* =========================
       EDIT
    ========================= */

    const handleEditItem = (
        item: ProductionItem
    ) => {
        setEditingId(item.id)

        setItemForm({
            bottleName:
                item.bottleName,

            bottleSize:
                item.bottleSize,

            quantity:
                item.quantity.toString(),

            costPerBottle:
                item.costPerBottle.toString(),
        })
    }

    /* =========================
       TOTALS
    ========================= */

    const summary = useMemo(() => {
        const totalBottleCount =
            items.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            )

        const grandTotal =
            items.reduce(
                (sum, item) =>
                    sum +
                    item.totalCost,
                0
            )

        return {
            totalBottleCount,
            grandTotal,
        }
    }, [items])

    /* =========================
       MAKE PRODUCTION
    ========================= */

    const handleMakeProduction = () => {
        if (
            !productionDate ||
            items.length === 0
        ) {
            return
        }

        const finalObject: ProductionRecord =
            {
                id: Date.now(),

                productionDate,

                items,

                grandTotal:
                    summary.grandTotal,

                totalBottleCount:
                    summary.totalBottleCount,

                createdAt:
                    new Date().toISOString(),
            }

        console.log(
            "FINAL PRODUCTION OBJECT:",
            finalObject
        )

        setRecords((prev) => [
            finalObject,
            ...prev,
        ])

        // RESET
        setItems([])

        setProductionDate("")
    }

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Production Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Track daily perfume
                    bottle production.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="xl:col-span-1">
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Add Production
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* DATE */}
                            <div>
                                <Label>
                                    Production Date
                                </Label>

                                <Input
                                    type="date"
                                    value={
                                        productionDate
                                    }
                                    onChange={(e) =>
                                        setProductionDate(
                                            e.target
                                                .value
                                        )
                                    }
                                />
                            </div>

                            {/* BOTTLE */}
                            <div>
                                <Label>
                                    Bottle Name
                                </Label>

                                <Input
                                    placeholder="Dior Sauvage"
                                    value={
                                        itemForm.bottleName
                                    }
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            bottleName:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* SIZE */}
                            <div>
                                <Label>
                                    Bottle Size
                                </Label>

                                <Input
                                    placeholder="50ml"
                                    value={
                                        itemForm.bottleSize
                                    }
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            bottleSize:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* QTY */}
                            <div>
                                <Label>
                                    Quantity
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={
                                        itemForm.quantity
                                    }
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            quantity:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* COST */}
                            <div>
                                <Label>
                                    Cost Per Bottle
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={
                                        itemForm.costPerBottle
                                    }
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            costPerBottle:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <Button
                                onClick={
                                    handleAddBottle
                                }
                                className="w-full rounded-xl"
                            >
                                {editingId
                                    ? "Update Bottle"
                                    : "Add Bottle"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* SUMMARY */}
                    <Card className="rounded-3xl border-0 shadow-lg mt-6">
                        <CardHeader>
                            <CardTitle>
                                Production Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm text-blue-600">
                                    Total Bottles
                                </p>

                                <h2 className="text-3xl font-bold text-blue-700">
                                    {
                                        summary.totalBottleCount
                                    }
                                </h2>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-4">
                                <p className="text-sm text-green-600">
                                    Total Cost
                                </p>

                                <h2 className="text-3xl font-bold text-green-700">
                                    ৳
                                    {summary.grandTotal.toFixed(
                                        2
                                    )}
                                </h2>
                            </div>

                            <Button
                                onClick={
                                    handleMakeProduction
                                }
                                className="w-full h-12 rounded-xl"
                            >
                                Make Production
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT */}
                <div className="xl:col-span-2 space-y-6">
                    {/* CURRENT ITEMS */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Current Production
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Bottle
                                        </TableHead>

                                        <TableHead>
                                            Size
                                        </TableHead>

                                        <TableHead>
                                            Qty
                                        </TableHead>

                                        <TableHead>
                                            Cost
                                        </TableHead>

                                        <TableHead>
                                            Total
                                        </TableHead>

                                        <TableHead>
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {items.length >
                                        0 ? (
                                        items.map(
                                            (
                                                item
                                            ) => (
                                                <TableRow
                                                    key={
                                                        item.id
                                                    }
                                                >
                                                    <TableCell className="font-medium">
                                                        {
                                                            item.bottleName
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.bottleSize
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.quantity
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        ৳
                                                        {
                                                            item.costPerBottle
                                                        }
                                                    </TableCell>

                                                    <TableCell className="font-semibold">
                                                        ৳
                                                        {item.totalCost.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditItem(
                                                                        item
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-gray-100"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteItem(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={
                                                    6
                                                }
                                                className="text-center py-10 text-gray-400"
                                            >
                                                No
                                                production
                                                item
                                                added
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* HISTORY */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Production History
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Date
                                        </TableHead>

                                        <TableHead>
                                            Types
                                        </TableHead>

                                        <TableHead>
                                            Bottles
                                        </TableHead>

                                        <TableHead>
                                            Total Cost
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {records.length >
                                        0 ? (
                                        records.map(
                                            (
                                                record
                                            ) => (
                                                <TableRow
                                                    key={
                                                        record.id
                                                    }
                                                >
                                                    <TableCell>
                                                        {
                                                            record.productionDate
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            record.items.length
                                                        }{" "}
                                                        Types
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            record.totalBottleCount
                                                        }
                                                    </TableCell>

                                                    <TableCell className="font-semibold">
                                                        ৳
                                                        {record.grandTotal.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={
                                                    4
                                                }
                                                className="text-center py-10 text-gray-400"
                                            >
                                                No
                                                production
                                                history
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}