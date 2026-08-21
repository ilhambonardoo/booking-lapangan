import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang - Reservasi Lapangan Olahraga" />
            <div className="relative min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
                {/* 1. NAVBAR TOP */}
                <header className="w-full max-w-7xl mx-auto px-6 py-10 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                        {/* Logo Simple / Icon Lapangan */}
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M11 20a9 9 0 118-9m-8 9a9 9 0 01-8-9m8 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-5 9h16"
                                ></path>
                            </svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-slate-900">
                            SportArena
                        </span>
                    </div>

                    <nav className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                            >
                                Dashboard Anda
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                                >
                                    Masuk Admin
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* 2. HERO SECTION HERO UTAMA */}
                <main className="flex-1 max-w-7xl w-full mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            ⚡ Instant Booking Tanpa Ribet
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none">
                            Sewa Lapangan Olahraga <br />
                            <span className="text-indigo-600">
                                Jadi Lebih Mudah.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                            Cek jadwal yang kosong, pilih lapangan favoritmu,
                            dan lakukan pemesanan secara langsung dalam hitungan
                            menit. Olahraga teratur, hidup jadi lebih sehat!
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            {/* Tombol Utama Menuju Katalog */}
                            <Link
                                href={route("katalog.index")}
                                className="w-full sm:w-auto text-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:shadow-indigo-300 transition duration-150 transform hover:-translate-y-0.5"
                            >
                                Cari & Pesan Lapangan
                            </Link>
                        </div>
                    </div>

                    {/* Ilustrasi Samping Kanan */}
                    <div className="flex-1 hidden lg:flex justify-center relative">
                        {/* Hiasan background lingkaran estetik */}
                        <div className="absolute -top-12 -left-12 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-4 right-4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -z-10"></div>

                        <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 max-w-md transform rotate-1 hover:rotate-0 transition duration-300">
                            <div className="rounded-xl overflow-hidden bg-slate-100 aspect-video mb-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-slate-900 shadow-sm">
                                    ⚽ Lapangan Futsal Vinyl
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
                                    alt="Lapangan Futsal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900">
                                Booking Instan & Aman
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Cukup isi data diri saat pesan lapangan, riwayat
                                serta status bayar otomatis terekam.
                            </p>
                        </div>
                    </div>
                </main>

                {/* 3. FOOTER */}
                <footer className="w-full text-center py-8 text-sm text-slate-400 border-t border-slate-100">
                    &copy; {new Date().getFullYear()} SportArena Booking System.
                    All rights reserved.
                </footer>
            </div>
        </>
    );
}
