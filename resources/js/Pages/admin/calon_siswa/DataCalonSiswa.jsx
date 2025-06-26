import React from "react";
import { Label } from "../../UI/atoms/Label";
import { Card } from "../../UI/organisms/Card";
import { Head,router } from "@inertiajs/react";
import SidebarAdmin from "../SidebarAdmin";
import { FaPrint } from "react-icons/fa";


const DataCalonSiswa = ({ datas }) => {
    if (!datas) {
        return <div>Data siswa tidak ditemukan.</div>;
    }
    // Function to format date
    const formatDate = (date) => {
        if (!date) return "-";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
    };
    // Function to format
    const formatCurrency = (value) => {
        if (!value) return "-";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };
    const handleCetakFormulir = (no_form) => {
        router.post('/admin/calon-siswa/cetak',{no_form:no_form})
    }
    

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Detail Formulir</title>
            </Head>
            <SidebarAdmin />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Detail Formulir
                </p>
                <button 
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white mb-2 flex items-center gap-3 font-poppins py-2 px-4 rounded-[7px]"
                onClick={()=>handleCetakFormulir(datas.no_form)}>
                    <FaPrint /> Cetak Formulir
                </button>
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
                    }
                >
            {/* Keterangan Pribadi */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Keterangan Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Nama Lengkap</Label>
                        <div className="mb-2 break-words">{datas.nama_lengkap || "-"}</div>
                        <Label>Nama Panggilan</Label>
                        <div className="mb-2 break-words">{datas.nama_panggilan || "-"}</div>
                        <Label>Jenis Kelamin</Label>
                        <div className="mb-2 break-words">
                            {datas.jenis_kelamin === "L" ? "Laki-laki" : datas.jenis_kelamin === "P" ? "Perempuan" : "-"}
                        </div>
                        <Label>Tempat, Tanggal Lahir</Label>
                        <div className="mb-2 break-words">
                            {datas.tempat_lahir || "-"}, {formatDate(datas.tanggal_lahir) || "-"}
                        </div>
                        <Label>Agama</Label>
                        <div className="mb-2 break-words">{datas.agama || "-"}</div>
                        <Label>Kewarganegaraan</Label>
                        <div className="mb-2 break-words">{datas.kewarganegaraan || "-"}</div>
                        <Label>Anak ke</Label>
                        <div className="mb-2 break-words">{datas.anak_ke || "-"}</div>
                        <Label>Jumlah Saudara Kandung</Label>
                        <div className="mb-2 break-words">{datas.jumlah_saudara_kandung || "-"}</div>
                        <Label>Jumlah Saudara Tiri</Label>
                        <div className="mb-2 break-words">{datas.jumlah_saudara_tiri || "-"}</div>
                        <Label>Jumlah Saudara Angkat</Label>
                        <div className="mb-2 break-words">{datas.jumlah_saudara_angkat || "-"}</div>
                        <Label>Status Anak</Label>
                        <div className="mb-2 break-words">{datas.status_anak || "-"}</div>
                        <Label>Bahasa Sehari-hari</Label>
                        <div className="mb-2 break-words">{datas.bahasa_sehari_hari || "-"}</div>
                    </div>
                    <div>
                        <Label>Alamat</Label>
                        <div className="mb-2 break-words">{datas.alamat || "-"}</div>
                        <Label>No. KK</Label>
                        <div className="mb-2 break-words">{datas.no_kk || "-"}</div>
                        <Label>Kelurahan</Label>
                        <div className="mb-2 break-words">{datas.kelurahan || "-"}</div>
                        <Label>Kecamatan</Label>
                        <div className="mb-2 break-words">{datas.kecamatan || "-"}</div>
                        <Label>Kota/Kabupaten</Label>
                        <div className="mb-2 break-words">{datas.kota || "-"}</div>
                        <Label>Kode Pos</Label>
                        <div className="mb-2 break-words">{datas.kode_pos || "-"}</div>
                        <Label>No. Telepon</Label>
                        <div className="mb-2 break-words">{datas.nomor_telepon || "-"}</div>
                        <Label>Alamat Tersebut</Label>
                        <div className="mb-2 break-words">
                            {datas.tempat_alamat === "1"
                                ? "Tempat Orang Tua"
                                : datas.tempat_alamat === "2"
                                ? "Menumpang Pada Orang Lain"
                                : datas.tempat_alamat === "3"
                                ? "Di Asrama"
                                : "-"}
                        </div>
                        <Label>Nama Pemilik Alamat</Label>
                        <div className="mb-2 break-words">{datas.nama_pemilik_tempat_alamat || "-"}</div>
                        <Label>Mode Transportasi</Label>
                        <div className="mb-2 break-words">
                            {datas.metode_transportasi === "1"
                                ? "Kendaraan Umum"
                                : datas.metode_transportasi === "2"
                                ? "Kendaraan Pribadi"
                                : datas.metode_transportasi === "3"
                                ? "Jalan Kaki"
                                : "-"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Keterangan Kesehatan */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Keterangan Kesehatan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Golongan Darah</Label>
                        <div className="mb-2 break-words">{datas.golongan_darah || "-"}</div>
                        <Label>Penyakit yang Pernah Diderita</Label>
                        <div className="mb-2 break-words">
                            {datas.riwayat_penyakit === "1"
                                ? "TBC"
                                : datas.riwayat_penyakit === "2"
                                ? "CACAR"
                                : datas.riwayat_penyakit === "3"
                                ? "EPILEPSI"
                                : datas.riwayat_penyakit === "4"
                                ? "Penyakit Lainnya"
                                : datas.riwayat_penyakit || "-"}
                        </div>
                        <Label>Tempat Dirawat</Label>
                        <div className="mb-2 break-words">{datas.riwayat_rawat || "-"}</div>
                        <Label>Kelainan Jasmani</Label>
                        <div className="mb-2 break-words">{datas.kelainan_jasmani || "-"}</div>
                    </div>
                    <div>
                        <Label>Tinggi Badan (cm)</Label>
                        <div className="mb-2 break-words">{datas.tinggi_badan || "-"}</div>
                        <Label>Berat Badan (kg)</Label>
                        <div className="mb-2 break-words">{datas.berat_badan || "-"}</div>
                    </div>
                </div>
            </div>

            {/* Pendidikan Sebelumnya */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Pendidikan Sebelumnya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="break-words">
                        <Label>SD Asal</Label>
                        <div className="mb-2 break-words">{datas.nama_sekolah_asal || "-"}</div>
                        <Label>Tanggal Ijazah</Label>
                        <div className="mb-2 break-words">{formatDate(datas.tanggal_ijazah) || "-"}</div>
                        <Label>Nomor Ijazah</Label>
                        <div className="mb-2 break-words">{datas.nomor_ijazah || "-"}</div>
                        <Label>Tanggal SKHUN</Label>
                        <div className="mb-2 break-words">{formatDate(datas.tanggal_skhun) || "-"}</div>
                        <Label>Nomor SKHUN</Label>
                        <div className="mb-2 break-words">{datas.nomor_skhun || "-"}</div>
                        <Label>Lama Belajar (tahun)</Label>
                        <div className="mb-2 break-words">{datas.lama_belajar || "-"}</div>
                        <Label>NISN</Label>
                        <div className="mb-2 break-words">{datas.nisn || "-"}</div>
                    </div>
                    <div className="break-words">
                        <Label>Pindahan Dari Sekolah</Label>
                        <div className="mb-2 break-words">
                            {datas.tipe_riwayat_sekolah === "1"
                                ? "SMP"
                                : datas.tipe_riwayat_sekolah === "2"
                                ? "MTS"
                                : datas.tipe_riwayat_sekolah === "3"
                                ? "Pesantren"
                                : "-"}
                        </div>
                        <Label>Nama Sekolah Pindahan</Label>
                        <div className="mb-2 break-words">{datas.nama_riwayat_sekolah || "-"}</div>
                        <Label>Diterima di Sekolah Ini Pada Tanggal</Label>
                        <div className="mb-2 break-words">{datas.tanggal_pindah || "-"}</div>
                        <Label>Alasan Pindah</Label>
                        <div className="mb-2 break-words">{datas.alasan_pindah || "-"}</div>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Keterangan Orang Tua</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ayah */}
                    <div>
                        <h4 className="font-bold text-[#226F54]">Ayah</h4>
                        <Label>Nama</Label>
                        <div className="mb-2 break-words">{datas.nama_ayah || "-"}</div>
                        <Label>Tempat, Tanggal Lahir</Label>
                        <div className="mb-2 break-words">{datas.tempat_lahir_ayah || "-"}, {formatDate(datas.tanggal_lahir_ayah) || "-"}</div>
                        <Label>NIK</Label>
                        <div className="mb-2 break-words">{datas.nik_ayah || "-"}</div>
                        <Label>Agama</Label>
                        <div className="mb-2 break-words">{datas.agama_ayah || "-"}</div>
                        <Label>Kewarganegaraan</Label>
                        <div className="mb-2 break-words">{datas.kewarganegaraan_ayah || "-"}</div>
                        <Label>Pendidikan Terakhir</Label>
                        <div className="mb-2 break-words">{datas.pendidikan_terakhir_ayah || "-"}</div>
                        <Label>Ijazah Tertinggi</Label>
                        <div className="mb-2 break-words">{datas.ijazah_tertinggi_ayah || "-"}</div>
                        <Label>Pekerjaan</Label>
                        <div className="mb-2 break-words">{datas.pekerjaan_ayah || "-"}</div>
                        <Label>Alamat Pekerjaan</Label>
                        <div className="mb-2 break-words">{datas.alamat_pekerjaan_ayah || "-"}</div>
                        <Label>Penghasilan/Bulan</Label>
                        <div className="mb-2 break-words">{formatCurrency(datas.penghasilan_ayah) || "-"}</div>
                        <Label>Alamat Rumah</Label>
                        <div className="mb-2 break-words">{datas.alamat_rumah_ayah || "-"}</div>
                        <Label>No. Telepon</Label>
                        <div className="mb-2 break-words">{datas.telp_ayah || "-"}</div>
                        <Label>Status</Label>
                        <div className="mb-2 break-words">
                            {datas.status_ayah === "1"
                                ? "Hidup"
                                : datas.status_ayah === "2"
                                ? "Meninggal Dunia"
                                : "-"}
                        </div>
                    </div>
                    {/* Ibu */}
                    <div>
                        <h4 className="font-bold text-[#226F54]">Ibu</h4>
                        <Label>Nama</Label>
                        <div className="mb-2 break-words">{datas.nama_ibu || "-"}</div>
                        <Label>Tempat, Tanggal Lahir</Label>
                        <div className="mb-2 break-words">{datas.tempat_lahir_ibu || "-"}, {formatDate(datas.tanggal_lahir_ibu) || "-"}</div>
                        <Label>NIK</Label>
                        <div className="mb-2 break-words">{datas.nik_ibu || "-"}</div>
                        <Label>Agama</Label>
                        <div className="mb-2 break-words">{datas.agama_ibu || "-"}</div>
                        <Label>Kewarganegaraan</Label>
                        <div className="mb-2 break-words">{datas.kewarganegaraan_ibu || "-"}</div>
                        <Label>Pendidikan Terakhir</Label>
                        <div className="mb-2 break-words">{datas.pendidikan_terakhir_ibu || "-"}</div>
                        <Label>Ijazah Tertinggi</Label>
                        <div className="mb-2 break-words">{datas.ijazah_tertinggi_ibu || "-"}</div>
                        <Label>Pekerjaan</Label>
                        <div className="mb-2 break-words">{datas.pekerjaan_ibu || "-"}</div>
                        <Label>Alamat Pekerjaan</Label>
                        <div className="mb-2 break-words">{datas.alamat_pekerjaan_ibu || "-"}</div>
                        <Label>Penghasilan/Bulan</Label>
                        <div className="mb-2 break-words">{formatCurrency(datas.penghasilan_ibu) || "-"}</div>
                        <Label>Alamat Rumah</Label>
                        <div className="mb-2 break-words">{datas.alamat_rumah_ibu || "-"}</div>
                        <Label>No. Telepon</Label>
                        <div className="mb-2 break-words">{datas.telp_ibu || "-"}</div>
                        <Label>Status</Label>
                        <div className="mb-2 break-words">
                            {datas.status_ibu === "1"
                                ? "Hidup"
                                : datas.status_ibu === "2"
                                ? "Meninggal Dunia"
                                : "-"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Wali */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Keterangan Wali</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Nama</Label>
                        <div className="mb-2 break-words">{datas.nama_wali || "-"}</div>
                        <Label>Tempat, Tanggal Lahir</Label>
                        <div className="mb-2 break-words">{datas.tempat_lahir_wali || "-"}, {formatDate(datas.tanggal_lahir_wali) || "-"}</div>
                        <Label>NIK</Label>
                        <div className="mb-2 break-words">{datas.nik_wali || "-"}</div>
                        <Label>Agama</Label>
                        <div className="mb-2 break-words">{datas.agama_wali || "-"}</div>
                        <Label>Kewarganegaraan</Label>
                        <div className="mb-2 break-words">{datas.kewarganegaraan_wali || "-"}</div>
                        <Label>Hubungan Keluarga</Label>
                        <div className="mb-2 break-words">{datas.hubungan_keluarga_wali || "-"}</div>
                        <Label>Ijazah Tertinggi</Label>
                        <div className="mb-2 break-words">{datas.ijazah_tertinggi_wali || "-"}</div>
                        <Label>Pekerjaan</Label>
                        <div className="mb-2 break-words">{datas.pekerjaan_wali || "-"}</div>
                        <Label>Penghasilan/Bulan</Label>
                        <div className="mb-2 break-words">{formatCurrency(datas.penghasilan_wali) || "-"}</div>
                        <Label>Alamat</Label>
                        <div className="mb-2 break-words">{datas.alamat_wali || "-"}</div>
                        <Label>No. Telepon</Label>
                        <div className="mb-2 break-words">{datas.telp_wali || "-"}</div>
                    </div>
                </div>
            </div>

            {/* Kegemaran dan Prestasi */}
            <div>
                <h3 className="text-lg font-semibold text-[#226F54] mb-2">Kegemaran & Prestasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Kesenian</Label>
                        <div className="mb-2 break-words">{datas.kesenian || "-"}</div>
                        <Label>Olahraga</Label>
                        <div className="mb-2 break-words">{datas.olahraga || "-"}</div>
                        <Label>Organisasi</Label>
                        <div className="mb-2 break-words">{datas.organisasi || "-"}</div>
                        <Label>Prestasi Lainnya</Label>
                        <div className="mb-2 break-words">{datas.prestasi_lainnya || "-"}</div>
                        <Label>Hobi</Label>
                        <div className="mb-2 break-words">{datas.hobi || "-"}</div>
                        <Label>Cita-cita</Label>
                        <div className="mb-2 break-words">{datas.cita_cita || "-"}</div>
                    </div>
                </div>
            </div>
                </Card>
            </div>
        </div>
    );
};

export default DataCalonSiswa;