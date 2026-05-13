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

import { Textarea } from "@/components/ui/textarea"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Pencil,
    Trash2,
    Eye,
    Plus,
    X,
} from "lucide-react"

/* =========================
   TYPES
========================= */

interface Product {
    id: number

    name: string

    category: string

    type: string

    price: number

    image: string

    tag: string

    tagColor: string

    description: string

    size: string[]
}

/* =========================
   PAGE
========================= */

export default function page() {
    /* =========================
       STATES
    ========================= */

    const [products, setProducts] =
        useState<Product[]>([])

    const [editingId, setEditingId] =
        useState<number | null>(null)

    const [previewProduct, setPreviewProduct] =
        useState<Product | null>(null)

    const [openPreview, setOpenPreview] =
        useState(false)

    const [sizeInput, setSizeInput] =
        useState("")

    const [form, setForm] = useState({
        name: "",
        category: "",
        type: "",
        price: "",
        image: "",
        tag: "",
        tagColor: "bg-purple-700",
        description: "",
        size: [] as string[],
    })

    /* =========================
       ADD SIZE
    ========================= */

    const handleAddSize = () => {
        if (!sizeInput) return

        if (
            form.size.includes(sizeInput)
        ) {
            return
        }

        setForm({
            ...form,
            size: [
                ...form.size,
                sizeInput,
            ],
        })

        setSizeInput("")
    }

    /* =========================
       REMOVE SIZE
    ========================= */

    const handleRemoveSize = (
        size: string
    ) => {
        setForm({
            ...form,
            size: form.size.filter(
                (item) => item !== size
            ),
        })
    }

    /* =========================
       CREATE PRODUCT
    ========================= */

    const handleCreateProduct = () => {
        if (
            !form.name ||
            !form.category ||
            !form.price
        ) {
            return
        }

        const finalProduct: Product = {
            id:
                editingId ||
                Date.now(),

            name: form.name,

            category: form.category,

            type: form.type,

            price: Number(form.price),

            image: form.image,

            tag: form.tag,

            tagColor: form.tagColor,

            description:
                form.description,

            size: form.size,
        }

        console.log(
            "FINAL PRODUCT:",
            finalProduct
        )

        // EDIT
        if (editingId) {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? finalProduct
                        : item
                )
            )

            setEditingId(null)
        }

        // CREATE
        else {
            setProducts((prev) => [
                finalProduct,
                ...prev,
            ])
        }

        // RESET
        setForm({
            name: "",
            category: "",
            type: "",
            price: "",
            image: "",
            tag: "",
            tagColor: "bg-purple-700",
            description: "",
            size: [],
        })
    }

    /* =========================
       EDIT PRODUCT
    ========================= */

    const handleEditProduct = (
        product: Product
    ) => {
        setEditingId(product.id)

        setForm({
            name: product.name,

            category:
                product.category,

            type: product.type,

            price:
                product.price.toString(),

            image: product.image,

            tag: product.tag,

            tagColor:
                product.tagColor,

            description:
                product.description,

            size: product.size,
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth",
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
       PREVIEW PRODUCT
    ========================= */

    const handlePreviewProduct = (
        product: Product
    ) => {
        setPreviewProduct(product)

        setOpenPreview(true)
    }

    /* =========================
       STATS
    ========================= */

    const stats = useMemo(() => {
        return {
            totalProducts:
                products.length,

            totalValue:
                products.reduce(
                    (sum, item) =>
                        sum + item.price,
                    0
                ),
        }
    }, [products])

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Product Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Create and manage
                    perfume products.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="xl:col-span-1 space-y-6">
                    {/* FORM */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                {editingId
                                    ? "Edit Product"
                                    : "Create Product"}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* NAME */}
                            <div>
                                <Label>
                                    Product Name
                                </Label>

                                <Input
                                    placeholder="Vampire Blood"
                                    value={
                                        form.name
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* CATEGORY */}
                            <div>
                                <Label>
                                    Category
                                </Label>

                                <Select
                                    value={
                                        form.category
                                    }
                                    onValueChange={(
                                        value
                                    ) =>
                                        setForm({
                                            ...form,
                                            category:
                                                value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="For Men">
                                            For Men
                                        </SelectItem>

                                        <SelectItem value="For Women">
                                            For Women
                                        </SelectItem>

                                        <SelectItem value="Unisex">
                                            Unisex
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* TYPE */}
                            <div>
                                <Label>
                                    Brand Type
                                </Label>

                                <Input
                                    placeholder="Euro Valley"
                                    value={
                                        form.type
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            type:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* PRICE */}
                            <div>
                                <Label>
                                    Price
                                </Label>

                                <Input
                                    type="number"
                                    placeholder="299"
                                    value={
                                        form.price
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            price:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* IMAGE */}
                            <div>
                                <Label>
                                    Image Path
                                </Label>

                                <Input
                                    placeholder="/products/image.png"
                                    value={
                                        form.image
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            image:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* TAG */}
                            <div>
                                <Label>
                                    Product Tag
                                </Label>

                                <Input
                                    placeholder="GENUINE"
                                    value={
                                        form.tag
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tag:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                />
                            </div>

                            {/* TAG COLOR */}
                            <div>
                                <Label>
                                    Tag Color
                                </Label>

                                <Select
                                    value={
                                        form.tagColor
                                    }
                                    onValueChange={(
                                        value
                                    ) =>
                                        setForm({
                                            ...form,
                                            tagColor:
                                                value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="bg-purple-700">
                                            Purple
                                        </SelectItem>

                                        <SelectItem value="bg-red-600">
                                            Red
                                        </SelectItem>

                                        <SelectItem value="bg-green-600">
                                            Green
                                        </SelectItem>

                                        <SelectItem value="bg-blue-600">
                                            Blue
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <Label>
                                    Description
                                </Label>

                                <Textarea
                                    rows={5}
                                    placeholder="Write product description..."
                                    value={
                                        form.description
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description:
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
                                    Product Sizes
                                </Label>

                                <div className="flex gap-2 mt-2">
                                    <Input
                                        placeholder="50ml"
                                        value={
                                            sizeInput
                                        }
                                        onChange={(e) =>
                                            setSizeInput(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                    />

                                    <Button
                                        type="button"
                                        onClick={
                                            handleAddSize
                                        }
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* SIZE LIST */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.size.map(
                                        (size) => (
                                            <div
                                                key={
                                                    size
                                                }
                                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm"
                                            >
                                                {
                                                    size
                                                }

                                                <button
                                                    onClick={() =>
                                                        handleRemoveSize(
                                                            size
                                                        )
                                                    }
                                                >
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* BUTTON */}
                            <Button
                                onClick={
                                    handleCreateProduct
                                }
                                className="w-full rounded-xl h-11"
                            >
                                {editingId
                                    ? "Update Product"
                                    : "Create Product"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* STATS */}
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Product Stats
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm text-blue-600">
                                    Total Products
                                </p>

                                <h2 className="text-3xl font-bold text-blue-700">
                                    {
                                        stats.totalProducts
                                    }
                                </h2>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-4">
                                <p className="text-sm text-green-600">
                                    Total Product Value
                                </p>

                                <h2 className="text-3xl font-bold text-green-700">
                                    ৳
                                    {stats.totalValue}
                                </h2>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT */}
                <div className="xl:col-span-2">
                    <Card className="rounded-3xl border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>
                                Product List
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Image
                                            </TableHead>

                                            <TableHead>
                                                Product
                                            </TableHead>

                                            <TableHead>
                                                Category
                                            </TableHead>

                                            <TableHead>
                                                Price
                                            </TableHead>

                                            <TableHead>
                                                Sizes
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
                                                    product
                                                ) => (
                                                    <TableRow
                                                        key={
                                                            product.id
                                                        }
                                                    >
                                                        <TableCell>
                                                            <img
                                                                src={
                                                                    product.image
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="w-14 h-14 rounded-xl object-cover border"
                                                            />
                                                        </TableCell>

                                                        <TableCell>
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </h3>

                                                                <p className="text-sm text-gray-500">
                                                                    {
                                                                        product.type
                                                                    }
                                                                </p>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                product.category
                                                            }
                                                        </TableCell>

                                                        <TableCell className="font-semibold">
                                                            ৳
                                                            {
                                                                product.price
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {product.size.map(
                                                                    (
                                                                        size
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                size
                                                                            }
                                                                            className="px-2 py-1 text-xs rounded-full bg-gray-100"
                                                                        >
                                                                            {
                                                                                size
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </TableCell>

                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handlePreviewProduct(
                                                                            product
                                                                        )
                                                                    }
                                                                    className="p-2 rounded-lg hover:bg-gray-100"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        handleEditProduct(
                                                                            product
                                                                        )
                                                                    }
                                                                    className="p-2 rounded-lg hover:bg-gray-100"
                                                                >
                                                                    <Pencil className="w-4 h-4" />
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteProduct(
                                                                            product.id
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
                                                    className="text-center py-16 text-gray-400"
                                                >
                                                    No
                                                    products
                                                    created
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* PREVIEW DIALOG */}
            <Dialog
                open={openPreview}
                onOpenChange={
                    setOpenPreview
                }
            >
                <DialogContent className="w-[95vw] max-w-5xl rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            Product Preview
                        </DialogTitle>
                    </DialogHeader>

                    {previewProduct && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* IMAGE */}
                            <div className="bg-gray-100 rounded-3xl p-6">
                                <img
                                    src={
                                        previewProduct.image
                                    }
                                    alt={
                                        previewProduct.name
                                    }
                                    className="w-full h-[400px] object-contain"
                                />
                            </div>

                            {/* DETAILS */}
                            <div className="space-y-5">
                                <div>
                                    <span
                                        className={`${previewProduct.tagColor} text-white text-xs px-3 py-1 rounded-full`}
                                    >
                                        {
                                            previewProduct.tag
                                        }
                                    </span>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {
                                            previewProduct.name
                                        }
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {
                                            previewProduct.type
                                        }
                                    </p>
                                </div>

                                <div className="text-3xl font-bold text-purple-700">
                                    ৳
                                    {
                                        previewProduct.price
                                    }
                                </div>

                                <div>
                                    <p className="font-medium mb-2">
                                        Sizes
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {previewProduct.size.map(
                                            (
                                                size
                                            ) => (
                                                <span
                                                    key={
                                                        size
                                                    }
                                                    className="px-4 py-2 border rounded-xl text-sm"
                                                >
                                                    {
                                                        size
                                                    }
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="font-medium mb-2">
                                        Description
                                    </p>

                                    <p className="text-gray-600 leading-7">
                                        {
                                            previewProduct.description
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}