import Image from 'next/image'

const Certificates = () => {
    return (
        <section className="bg-purple-900 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">GIFT CERTIFICATES</h2>
                        <button className="bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                            GET A GIFT CERTIFICATE
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative w-64 h-40">
                            <div className="absolute inset-0 bg-linear-to-r from-purple-800 to-transparent z-10" />
                            <Image
                                src="/banners/gift-certificate.jpg"
                                alt="Gift Certificate"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Certificates