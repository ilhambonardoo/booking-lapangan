import { useForm, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ venue }) => {
    const { data, setData, post, processing, errors } = useForm({
        venue_id: venue?.id ?? "",
        booking_date: "",
        start_time: "",
        end_time: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("booking.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Form Pemesanan {venue.name}
                </h2>
            }
        >
            <Head title={`Pesan ${venue.name}`} />

            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100">
                    <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-bold text-indigo-900">
                            Detail Lapangan:
                        </h4>
                        <p className="text-sm text-indigo-700 mt-1">
                            Harga Sewa:{" "}
                            <span className="font-semibold">
                                Rp{" "}
                                {Number(venue.price_per_hour).toLocaleString(
                                    "id-ID",
                                )}
                                /jam
                            </span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input type="hidden" value={data.venue_id} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tanggal Main
                            </label>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.booking_date}
                                onChange={(e) =>
                                    setData("booking_date", e.target.value)
                                }
                            />
                            {errors.booking_date && (
                                <span className="text-red-500 text-sm mt-1 block">
                                    {errors.booking_date}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.start_time}
                                    onChange={(e) =>
                                        setData("start_time", e.target.value)
                                    }
                                />
                                {errors.start_time && (
                                    <span className="text-red-500 text-sm mt-1 block">
                                        {errors.start_time}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Jam Selesai
                                </label>
                                <input
                                    type="time"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.end_time}
                                    onChange={(e) =>
                                        setData("end_time", e.target.value)
                                    }
                                />
                                {errors.end_time && (
                                    <span className="text-red-500 text-sm mt-1 block">
                                        {errors.end_time}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            <Link
                                href={route("katalog.index")}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
                            >
                                {processing
                                    ? "Memproses..."
                                    : "Konfirmasi Booking"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
