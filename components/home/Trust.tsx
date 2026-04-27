import { CreditCard, Phone, Shield, Truck } from 'lucide-react'

const Trust = () => {
    return (
        <section className="bg-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Truck className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Free Delivery & Returns*</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Phone className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Online Self Service</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Shield className="w-6 h-6" />
                            <span className="text-xs md:text-sm">100% Genuine Guaranteed</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <CreditCard className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Trust