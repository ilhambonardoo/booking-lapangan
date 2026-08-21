import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

const Dashboard = ({ auth, bookings }) => {
    const handleStatusChange = (id, newStatus) => {
        if (
            confirm(
                `Apakah Anda yakin ingin mengubah status pesanan ini menjadi ${newStatus}?`,
            )
        ) {
            router.patch(route("admin.booking.status", id), {
                status: newStatus,
            });
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Panel Utama Admin - Kelola Bookingan
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Pelanggan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Lapangan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Jadwal Main
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Total Bayar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                        Aksi Kelola
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr
                                        key={booking.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="font-semibold text-gray-900">
                                                {booking.user?.name}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {booking.user?.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {booking.venue?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div>{booking.booking_date}</div>
                                            <div className="text-xs text-gray-500">
                                                {booking.start_time.substring(
                                                    0,
                                                    5,
                                                )}{" "}
                                                -{" "}
                                                {booking.end_time.substring(
                                                    0,
                                                    5,
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            Rp{" "}
                                            {Number(
                                                booking.total_price,
                                            ).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${
                                                    booking.status ===
                                                    "confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : booking.status ===
                                                            "cancelled"
                                                          ? "bg-red-100 text-red-800"
                                                          : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                booking.id,
                                                                "confirmed",
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded font-semibold transition shadow-sm"
                                                    >
                                                        Setujui Lunas
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                booking.id,
                                                                "cancelled",
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-semibold transition shadow-sm"
                                                    >
                                                        Tolak / Batal
                                                    </button>
                                                </>
                                            )}
                                            {booking.status !== "pending" && (
                                                <span className="text-xs text-gray-400 italic">
                                                    Selesai dikelola
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
