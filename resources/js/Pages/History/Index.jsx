import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Index = ({ bookings }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Riwayat Booking Saya
                    </h2>
                }
            >
                <Head title="Riwayat Booking" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-100">
                            {bookings.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        Anda belum memiliki riwayat pemesanan
                                        lapangan.
                                    </p>
                                    <Link
                                        href={route("katalog.index")}
                                        className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-500"
                                    >
                                        Cari Lapangan Sekarang &rarr;
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Nama Lapangan
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Tanggal Main
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Durasi Jam
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Total Bayar
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking) => (
                                                <tr
                                                    key={booking.id}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    {/* Nama Lapangan */}
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        {booking.venue
                                                            ? booking.venue.name
                                                            : "Lapangan Tidak Diketahui"}
                                                    </td>
                                                    {/* Tanggal */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {booking.booking_date}
                                                    </td>
                                                    {/* Jam */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {booking.start_time.substring(
                                                            0,
                                                            5,
                                                        )}{" "}
                                                        -{" "}
                                                        {booking.end_time.substring(
                                                            0,
                                                            5,
                                                        )}
                                                    </td>
                                                    {/* Total Harga */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                        Rp{" "}
                                                        {Number(
                                                            booking.total_price,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    {/* Status Badge */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyle(booking.status)}`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    {/* Tombol Aksi */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                        {booking.status ===
                                                            "pending" && (
                                                            <button className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-500 transition">
                                                                Bayar Sekarang
                                                            </button>
                                                        )}
                                                        {booking.status ===
                                                            "confirmed" && (
                                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                                Siap Main! ✔
                                                            </span>
                                                        )}
                                                        {booking.status ===
                                                            "cancelled" && (
                                                            <span className="text-xs text-gray-400">
                                                                Batal
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
