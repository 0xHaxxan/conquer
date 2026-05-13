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
// ADD THESE IMPORTS
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

/* =========================
   TYPES
========================= */

interface SellProduct {
    id: number

    productName: string

    quantity: number

    productCost: number

    sellRate: number

    totalCost: number

    totalSell: number

    profit: number
}

interface SellRecord {
    id: number

    customerName: string

    address: string

    phone: string

    sellDate: string

    products: SellProduct[]

    totalQuantity: number

    totalCost: number

    totalSell: number

    totalProfit: number

    createdAt: string
}

/* =========================
   PAGE
========================= */

export default function page() {
    /* =========================
       CUSTOMER
    ========================= */

    const [customer, setCustomer] =
        useState({
            customerName: "",
            address: "",
            phone: "",
            sellDate: "",
        })

    /* =========================
       PRODUCT FORM
    ========================= */

    const [productForm, setProductForm] =
        useState({
            productName: "",
            quantity: "",
            productCost: "",
            sellRate: "",
        })

    const [editingId, setEditingId] =
        useState<number | null>(null)

    const [products, setProducts] =
        useState<SellProduct[]>([])

    const [records, setRecords] =
        useState<SellRecord[]>([])

    // ADD THESE STATES

    const [selectedSell, setSelectedSell] =
        useState<SellRecord | null>(null)

    const [openDetails, setOpenDetails] =
        useState(false)

    /* =========================
       ADD PRODUCT
    ========================= */

    // ADD THIS FUNCTION

    const handleOpenSellDetails = (
        record: SellRecord
    ) => {
        setSelectedSell(record)
        setOpenDetails(true)
    }

    const handleAddProduct = () => {
        if (
            !productForm.productName ||
            !productForm.quantity ||
            !productForm.productCost ||
            !productForm.sellRate
        ) {
            return
        }

        const quantity = Number(
            productForm.quantity
        )

        const productCost = Number(
            productForm.productCost
        )

        const sellRate = Number(
            productForm.sellRate
        )

        const totalCost =
            quantity * productCost

        const totalSell =
            quantity * sellRate

        const profit =
            totalSell - totalCost

        const product: SellProduct = {
            id:
                editingId ||
                Date.now(),

            productName:
                productForm.productName,

            quantity,

            productCost,

            sellRate,

            totalCost,

            totalSell,

            profit,
        }

        // EDIT
        if (editingId) {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? product
                        : item
                )
            )

            setEditingId(null)
        }

        // CREATE
        else {
            setProducts((prev) => [
                ...prev,
                product,
            ])
        }

        // RESET
        setProductForm({
            productName: "",
            quantity: "",
            productCost: "",
            sellRate: "",
        })
    }

    /* =========================
       EDIT PRODUCT
    ========================= */

    const handleEditProduct = (
        item: SellProduct
    ) => {
        setEditingId(item.id)

        setProductForm({
            productName:
                item.productName,

            quantity:
                item.quantity.toString(),

            productCost:
                item.productCost.toString(),

            sellRate:
                item.sellRate.toString(),
        })
    }

    /* =========================
       DELETE PRODUCT
    ========================= */

    const handleDeleteProduct = (
        id: number
    ) => {
        setProducts((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        )
    }

    /* =========================
       SUMMARY
    ========================= */

    const summary = useMemo(() => {
        const totalQuantity =
            products.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            )

        const totalCost =
            products.reduce(
                (sum, item) =>
                    sum +
                    item.totalCost,
                0
            )

        const totalSell =
            products.reduce(
                (sum, item) =>
                    sum +
                    item.totalSell,
                0
            )

        const totalProfit =
            products.reduce(
                (sum, item) =>
                    sum +
                    item.profit,
                0
            )

        return {
            totalQuantity,
            totalCost,
            totalSell,
            totalProfit,
        }
    }, [products])

    /* =========================
       MAKE SELL
    ========================= */

    const handleMakeSell = () => {
        if (
            !customer.customerName ||
            !customer.phone ||
            !customer.sellDate ||
            products.length === 0
        ) {
            return
        }

        const finalObject: SellRecord =
        {
            id: Date.now(),

            customerName:
                customer.customerName,

            address:
                customer.address,

            phone: customer.phone,

            sellDate:
                customer.sellDate,

            products,

            totalQuantity:
                summary.totalQuantity,

            totalCost:
                summary.totalCost,

            totalSell:
                summary.totalSell,

            totalProfit:
                summary.totalProfit,

            createdAt:
                new Date().toISOString(),
        }

        console.log(
            "FINAL SELL OBJECT:",
            finalObject
        )

        setRecords((prev) => [
            finalObject,
            ...prev,
        ])

        // RESET
        setCustomer({
            customerName: "",
            address: "",
            phone: "",
            sellDate: "",
        })

        setProducts([])
    }

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Sell Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage product selling,
                    customer details and
                    profit tracking.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* CUSTOMER */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Customer Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <Label>
                                    Customer Name
                                </Label>

                                <Input
                                    placeholder="John Doe"
                                    value={
                                        customer.customerName
                                    }
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            customerName:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Phone Number
                                </Label>

                                <Input
                                    placeholder="+880..."
                                    value={
                                        customer.phone
                                    }
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            phone:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Address
                                </Label>

                                <Input
                                    placeholder="Dhaka, Bangladesh"
                                    value={
                                        customer.address
                                    }
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            address:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Sell Date
                                </Label>

                                <Input
                                    type="date"
                                    value={
                                        customer.sellDate
                                    }
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            sellDate:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* PRODUCT */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Add Product
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <Label>
                                    Product Name
                                </Label>

                                <Input
                                    placeholder="Dior Sauvage"
                                    value={
                                        productForm.productName
                                    }
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            productName:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Quantity
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={
                                        productForm.quantity
                                    }
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            quantity:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Product Cost
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={
                                        productForm.productCost
                                    }
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            productCost:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Sell Rate
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={
                                        productForm.sellRate
                                    }
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            sellRate:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            <Button
                                onClick={
                                    handleAddProduct
                                }
                                className="w-full rounded-xl"
                            >
                                {editingId
                                    ? "Update Product"
                                    : "Add Product"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* SUMMARY */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Sell Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm text-blue-600">
                                    Total Quantity
                                </p>

                                <h2 className="text-3xl font-bold text-blue-700">
                                    {
                                        summary.totalQuantity
                                    }
                                </h2>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-4">
                                <p className="text-sm text-green-600">
                                    Total Profit
                                </p>

                                <h2 className="text-3xl font-bold text-green-700">
                                    ৳
                                    {summary.totalProfit.toFixed(
                                        2
                                    )}
                                </h2>
                            </div>

                            <Button
                                onClick={
                                    handleMakeSell
                                }
                                className="w-full h-12 rounded-xl"
                            >
                                Make Sell
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT */}
                <div className="xl:col-span-2 space-y-6">
                    {/* CURRENT PRODUCTS */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Current Sell
                                Products
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Product
                                        </TableHead>

                                        <TableHead>
                                            Qty
                                        </TableHead>

                                        <TableHead>
                                            Cost
                                        </TableHead>

                                        <TableHead>
                                            Sell
                                        </TableHead>

                                        <TableHead>
                                            Profit
                                        </TableHead>

                                        <TableHead>
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {products.length >
                                        0 ? (
                                        products.map(
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
                                                            item.productName
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.quantity
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        ৳
                                                        {item.totalCost.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        ৳
                                                        {item.totalSell.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>

                                                    <TableCell className="font-semibold text-green-600">
                                                        ৳
                                                        {item.profit.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditProduct(
                                                                        item
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-gray-100"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteProduct(
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
                                                sell
                                                product
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
                                Sell History
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Customer
                                        </TableHead>

                                        <TableHead>
                                            Phone
                                        </TableHead>

                                        <TableHead>
                                            Date
                                        </TableHead>

                                        <TableHead>
                                            Products
                                        </TableHead>

                                        <TableHead>
                                            Profit
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {records.length > 0 ? (
                                        records.map((record) => (
                                            <TableRow
                                                key={record.id}
                                                className="cursor-pointer hover:bg-gray-50"
                                                onClick={() =>
                                                    handleOpenSellDetails(record)
                                                }
                                            >
                                                <TableCell className="font-medium">
                                                    {record.customerName}
                                                </TableCell>

                                                <TableCell>
                                                    {record.phone}
                                                </TableCell>

                                                <TableCell>
                                                    {record.sellDate}
                                                </TableCell>

                                                <TableCell>
                                                    {record.products.length} Items
                                                </TableCell>

                                                <TableCell className="font-semibold text-green-600">
                                                    ৳
                                                    {record.totalProfit.toFixed(
                                                        2
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center py-10 text-gray-400"
                                            >
                                                No sell history
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Dialog
                        open={openDetails}
                        onOpenChange={setOpenDetails}
                    >
                        <DialogContent className="rounded-3xl">
                            <DialogHeader>
                                <DialogTitle>
                                    Sell Details
                                </DialogTitle>
                            </DialogHeader>

                            {selectedSell && (
                                <div className="space-y-6 flex-wrap">
                                    {/* CUSTOMER */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <p className="text-sm text-gray-500">
                                                Customer
                                            </p>

                                            <h3 className="font-bold text-lg">
                                                {
                                                    selectedSell.customerName
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <p className="text-sm text-gray-500">
                                                Phone
                                            </p>

                                            <h3 className="font-bold text-lg">
                                                {selectedSell.phone}
                                            </h3>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-4 col-span-2">
                                            <p className="text-sm text-gray-500">
                                                Address
                                            </p>

                                            <h3 className="font-medium">
                                                {
                                                    selectedSell.address
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <p className="text-sm text-gray-500">
                                                Sell Date
                                            </p>

                                            <h3 className="font-medium">
                                                {
                                                    selectedSell.sellDate
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <p className="text-sm text-gray-500">
                                                Total Profit
                                            </p>

                                            <h3 className="font-bold text-green-600">
                                                ৳
                                                {selectedSell.totalProfit.toFixed(
                                                    2
                                                )}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* PRODUCT TABLE */}
                                    <div className="border rounded-2xl overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Product
                                                    </TableHead>

                                                    <TableHead>
                                                        Qty
                                                    </TableHead>

                                                    <TableHead>
                                                        Product Cost
                                                    </TableHead>

                                                    <TableHead>
                                                        Sell Rate
                                                    </TableHead>

                                                    <TableHead>
                                                        Total Cost
                                                    </TableHead>

                                                    <TableHead>
                                                        Total Sell
                                                    </TableHead>

                                                    <TableHead>
                                                        Profit
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {selectedSell.products.map(
                                                    (product) => (
                                                        <TableRow
                                                            key={
                                                                product.id
                                                            }
                                                        >
                                                            <TableCell className="font-medium">
                                                                {
                                                                    product.productName
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    product.quantity
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                ৳
                                                                {
                                                                    product.productCost
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                ৳
                                                                {
                                                                    product.sellRate
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                ৳
                                                                {product.totalCost.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>

                                                            <TableCell>
                                                                ৳
                                                                {product.totalSell.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>

                                                            <TableCell className="font-semibold text-green-600">
                                                                ৳
                                                                {product.profit.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* SUMMARY */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-blue-50 rounded-2xl p-4">
                                            <p className="text-sm text-blue-600">
                                                Total Quantity
                                            </p>

                                            <h2 className="text-2xl font-bold text-blue-700">
                                                {
                                                    selectedSell.totalQuantity
                                                }
                                            </h2>
                                        </div>

                                        <div className="bg-orange-50 rounded-2xl p-4">
                                            <p className="text-sm text-orange-600">
                                                Total Sell
                                            </p>

                                            <h2 className="text-2xl font-bold text-orange-700">
                                                ৳
                                                {selectedSell.totalSell.toFixed(
                                                    2
                                                )}
                                            </h2>
                                        </div>

                                        <div className="bg-green-50 rounded-2xl p-4">
                                            <p className="text-sm text-green-600">
                                                Total Profit
                                            </p>

                                            <h2 className="text-2xl font-bold text-green-700">
                                                ৳
                                                {selectedSell.totalProfit.toFixed(
                                                    2
                                                )}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}