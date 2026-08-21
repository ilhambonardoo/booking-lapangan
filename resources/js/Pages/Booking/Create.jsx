import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";

const Create = ({ venue }) => {
    const { auth } = usePage().props;
    const isGuest = !auth.user;

    const { data, setData, post, processing, errors } = useForm({
        venue_id: venue.id,
        booking_date: "",
        start_time: "",
        end_time: "",
        is_guest: isGuest,
        name: "",
        email: "",
        phone: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("booking.store"), {
            onError: (err) => console.log("Validasi Gagal : ", err),
        });
    };

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            auth={auth}
            isWide={false}
            {...(auth.user
                ? {
                      header: (
                          <h2 className="text-xl font-semibold leading-tight text-gray-800">
                              Form Pemesanan - {venue.name}
                          </h2>
                      ),
                  }
                : {})}
        >
            <Head title={`Pesan ${venue.name}`} />

            <div className="py-12 max-w-2xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Informasi Reservasi: {venue.name}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="hidden" value={data.venue_id} />

                        {/* FITUR OTOMATIS: Muncul HANYA jika user BELUM LOGIN */}
                        {isGuest && (
                            <div className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-100 space-y-4 mb-6">
                                <p className="text-xs text-indigo-700 font-medium">
                                    Anda belum login. Silahkan isi data diri
                                    singkat di bawah untuk instant booking (Akun
                                    akan dibuat otomatis).
                                </p>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Contoh: Ilham Kusuma"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-xs mt-1 block">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700">
                                            Email Aktif
                                        </label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="nama@email.com"
                                        />
                                        {errors.email && (
                                            <span className="text-red-500 text-xs mt-1 block">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700">
                                            No. WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            placeholder="081234567xxx"
                                        />
                                        {errors.phone && (
                                            <span className="text-red-500 text-xs mt-1 block">
                                                {errors.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* INPUT JADWAL UTAMA */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700">
                                Tanggal Main
                            </label>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                value={data.booking_date}
                                onChange={(e) =>
                                    setData("booking_date", e.target.value)
                                }
                            />
                            {errors.booking_date && (
                                <span className="text-red-500 text-xs mt-1 block">
                                    {errors.booking_date}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                    value={data.start_time}
                                    onChange={(e) =>
                                        setData("start_time", e.target.value)
                                    }
                                />
                                {errors.start_time && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.start_time}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">
                                    Jam Selesai
                                </label>
                                <input
                                    type="time"
                                    className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                                    value={data.end_time}
                                    onChange={(e) =>
                                        setData("end_time", e.target.value)
                                    }
                                />
                                {errors.end_time && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.end_time}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            {/* Link batal diarahkan kembali ke katalog lapangan */}
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
        </Layout>
    );
};

export default Create;
