import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, venues }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Katalog Lapangan Olahraga
                </h2>
            }
        >
            <Head title="Katalog Lapangan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {venues.map((venue) => (
                            <div
                                key={venue.id}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-100 flex flex-col justify-between"
                            >
                                <div className="p-6">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                                            venue.type === "futsal"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-orange-100 text-orange-800"
                                        }`}
                                    >
                                        {venue.type}
                                    </span>

                                    <h3 className="mt-3 text-lg font-bold text-gray-900">
                                        {venue.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                        {venue.description ||
                                            "Tidak ada deskripsi fasilitas."}
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 bg-gray-50 p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Harga Sewa
                                        </p>
                                        <p className="text-lg font-extrabold text-indigo-600">
                                            Rp{" "}
                                            {Number(
                                                venue.price_per_hour,
                                            ).toLocaleString("id-ID")}
                                            <span className="text-xs font-normal text-gray-500">
                                                /jam
                                            </span>
                                        </p>
                                    </div>

                                    <Link
                                        href={route("booking.create", venue.id)}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-150"
                                    >
                                        Pesan Jadwal
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Jika database kosong */}
                    {venues.length === 0 && (
                        <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                            <p className="text-gray-500">
                                Belum ada lapangan yang terdaftar saat ini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
