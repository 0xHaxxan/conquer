"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function page() {
    const [form, setForm] = useState({
        oilPrice: "",
        oilAmount: "",

        boosterPrice: "",
        boosterAmount: "",

        fixativePrice: "",
        fixativeAmount: "",

        alcoholPrice: "",
        alcoholAmount: "",

        totalFragrance: "",
        bottleSize: "",

        bottleCost: "",
        packetCost: "",
        sellingPrice: "",
    })

    const results = useMemo(() => {
        // Raw Materials
        const oilCost =
            Number(form.oilPrice || 0) *
            Number(form.oilAmount || 0)

        const boosterCost =
            Number(form.boosterPrice || 0) *
            Number(form.boosterAmount || 0)

        const fixativeCost =
            Number(form.fixativePrice || 0) *
            Number(form.fixativeAmount || 0)

        const alcoholCost =
            Number(form.alcoholPrice || 0) *
            Number(form.alcoholAmount || 0)

        // Total Batch Cost
        const totalRawMaterialCost =
            oilCost +
            boosterCost +
            fixativeCost +
            alcoholCost

        // Production
        const totalFragranceMade =
            Number(form.totalFragrance || 0)

        const bottleSize =
            Number(form.bottleSize || 0)

        const bottleCount =
            bottleSize > 0
                ? Math.floor(
                    totalFragranceMade / bottleSize
                )
                : 0

        // Per Bottle
        const fragranceCostPerBottle =
            bottleCount > 0
                ? totalRawMaterialCost / bottleCount
                : 0

        const bottleCost =
            Number(form.bottleCost || 0)

        const packetCost =
            Number(form.packetCost || 0)

        const totalCostPerBottle =
            fragranceCostPerBottle +
            bottleCost +
            packetCost

        // Profit
        const sellingPrice =
            Number(form.sellingPrice || 0)

        const profit =
            sellingPrice - totalCostPerBottle

        const margin =
            sellingPrice > 0
                ? (profit / sellingPrice) * 100
                : 0

        return {
            oilCost,
            boosterCost,
            fixativeCost,
            alcoholCost,

            totalRawMaterialCost,

            totalFragranceMade,
            bottleCount,

            fragranceCostPerBottle,
            bottleCost,
            packetCost,

            totalCostPerBottle,

            profit,
            margin,
        }
    }, [form])

    const handleChange = (
        key: string,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Perfume Cost Calculator
                </h1>

                <p className="text-gray-500 mt-2">
                    Calculate perfume production cost,
                    bottle cost, and profit margin.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* LEFT */}
                <Card className="border-0 shadow-lg rounded-3xl">
                    <CardHeader>
                        <CardTitle>
                            Raw Material Input
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* OIL */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>
                                    Oil Price (৳/ml)
                                </Label>

                                <Input
                                    type="number"
                                    value={form.oilPrice}
                                    onChange={(e) =>
                                        handleChange(
                                            "oilPrice",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label>
                                    Oil Amount (ml)
                                </Label>

                                <Input
                                    type="number"
                                    value={form.oilAmount}
                                    onChange={(e) =>
                                        handleChange(
                                            "oilAmount",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* BOOSTER */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>
                                    Booster Price
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.boosterPrice
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "boosterPrice",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label>
                                    Booster Amount
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.boosterAmount
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "boosterAmount",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* FIXATIVE */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>
                                    Fixative Price
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.fixativePrice
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "fixativePrice",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label>
                                    Fixative Amount
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.fixativeAmount
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "fixativeAmount",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* ALCOHOL */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>
                                    Alcohol Price
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.alcoholPrice
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "alcoholPrice",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label>
                                    Alcohol Amount
                                </Label>

                                <Input
                                    type="number"
                                    value={
                                        form.alcoholAmount
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "alcoholAmount",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* PRODUCTION */}
                        <div className="pt-4 border-t">
                            <h3 className="font-semibold text-gray-800 mb-4">
                                Production Details
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>
                                        Total Fragrance
                                        (ml)
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            form.totalFragrance
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "totalFragrance",
                                                e.target.value
                                            )
                                        }
                                        placeholder="1000"
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Bottle Size (ml)
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            form.bottleSize
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "bottleSize",
                                                e.target.value
                                            )
                                        }
                                        placeholder="50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* COSTS */}
                        <div className="pt-4 border-t">
                            <h3 className="font-semibold text-gray-800 mb-4">
                                Additional Costs
                            </h3>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>
                                        Bottle Cost
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            form.bottleCost
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "bottleCost",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Packet Cost
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            form.packetCost
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "packetCost",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Selling Price
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            form.sellingPrice
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "sellingPrice",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-12 rounded-xl text-base">
                            Live Calculation Enabled
                        </Button>
                    </CardContent>
                </Card>

                {/* RIGHT */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-lg rounded-3xl">
                        <CardHeader>
                            <CardTitle>
                                Cost Breakdown
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <ResultRow
                                label="Oil Cost"
                                value={results.oilCost}
                            />

                            <ResultRow
                                label="Booster Cost"
                                value={
                                    results.boosterCost
                                }
                            />

                            <ResultRow
                                label="Fixative Cost"
                                value={
                                    results.fixativeCost
                                }
                            />

                            <ResultRow
                                label="Alcohol Cost"
                                value={
                                    results.alcoholCost
                                }
                            />

                            <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between">
                                <span className="font-semibold">
                                    Total Raw Material
                                </span>

                                <span className="font-bold text-xl">
                                    ৳
                                    {results.totalRawMaterialCost.toFixed(
                                        2
                                    )}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SUMMARY */}
                    <Card className="border-0 shadow-lg rounded-3xl">
                        <CardHeader>
                            <CardTitle>
                                Production Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                                    <p className="text-sm text-blue-600">
                                        Total Fragrance
                                    </p>

                                    <h2 className="text-3xl font-bold text-blue-700 mt-2">
                                        {
                                            results.totalFragranceMade
                                        }
                                        ml
                                    </h2>
                                </div>

                                <div className="bg-purple-50 rounded-2xl p-5 text-center">
                                    <p className="text-sm text-purple-600">
                                        Bottle Count
                                    </p>

                                    <h2 className="text-3xl font-bold text-purple-700 mt-2">
                                        {
                                            results.bottleCount
                                        }
                                    </h2>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FINAL */}
                    <Card className="border-0 shadow-lg rounded-3xl">
                        <CardHeader>
                            <CardTitle>
                                Final Result
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <ResultRow
                                label="Fragrance Cost / Bottle"
                                value={
                                    results.fragranceCostPerBottle
                                }
                            />

                            <ResultRow
                                label="Bottle Cost"
                                value={
                                    results.bottleCost
                                }
                            />

                            <ResultRow
                                label="Packet Cost"
                                value={
                                    results.packetCost
                                }
                            />

                            <div className="bg-amber-50 rounded-2xl p-5 flex items-center justify-between">
                                <span className="font-bold text-amber-800">
                                    Total Cost / Bottle
                                </span>

                                <span className="font-bold text-2xl text-amber-700">
                                    ৳
                                    {results.totalCostPerBottle.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5 flex items-center justify-between">
                                <span className="font-bold text-green-800">
                                    Profit / Bottle
                                </span>

                                <span className="font-bold text-2xl text-green-700">
                                    ৳
                                    {results.profit.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="bg-orange-50 rounded-2xl p-5 flex items-center justify-between">
                                <span className="font-bold text-orange-800">
                                    Profit Margin
                                </span>

                                <span className="font-bold text-2xl text-orange-700">
                                    {results.margin.toFixed(
                                        1
                                    )}
                                    %
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function ResultRow({
    label,
    value,
}: {
    label: string
    value: number
}) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">
                {label}
            </span>

            <span className="font-semibold text-gray-900">
                ৳{value.toFixed(2)}
            </span>
        </div>
    )
}