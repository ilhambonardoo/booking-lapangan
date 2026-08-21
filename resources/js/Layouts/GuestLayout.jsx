export default function GuestLayout({ children, isWide = true }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div
                className={`w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ${
                    isWide
                        ? "max-w-7xl mx-4 sm:mx-6 lg:mx-8"
                        : "max-w-md sm:max-w-md"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
