import { Sidebar } from "@/components/import/Sidebar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 md:ml-64 pt-14 md:pt-0">
                <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
