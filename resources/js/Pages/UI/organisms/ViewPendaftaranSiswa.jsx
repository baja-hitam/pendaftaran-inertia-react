import { useEffect, useState } from "react";

const ViewPendaftaranSiswa = ({ datas }) => {
    // State untuk mengontrol apakah modal preview terbuka atau tidak
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    // State untuk menyimpan URL gambar yang sedang di-preview
    const [imageToPreview, setImageToPreview] = useState(null);

    const openImagePreview = (imageUrl) => {
        setImageToPreview(imageUrl);
        setIsImagePreviewOpen(true);
    };

    const closeImagePreview = () => {
        setIsImagePreviewOpen(false);
        setImageToPreview(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getJenisKelaminText = (value) => {
        return value === 'L' ? 'Laki-laki' : value === 'P' ? 'Perempuan' : '-';
    };

    const getAlamatTersebutText = (value) => {
        const options = {
            '1': 'Tempat Orang Tua',
            '2': 'Menumpang Pada Orang Lain',
            '3': 'Di Asrama'
        };
        return options[value] || '-';
    };

    const getModeTransportasiText = (value) => {
        const options = {
            '1': 'Kendaraan Umum',
            '2': 'Kendaraan Pribadi',
            '3': 'Jalan Kaki'
        };
        return options[value] || '-';
    };

    const getPenyakitText = (value) => {
        const options = {
            '1': 'TBC',
            '2': 'CACAR',
            '3': 'EPILEPSI',
            '4': 'Penyakit Lainnya'
        };
        return options[value] || '-';
    };

    const getTipeSekolahText = (value) => {
        const options = {
            '1': 'SMP',
            '2': 'MTS',
            '3': 'Pesantren'
        };
        return options[value] || '-';
    };

    const InfoRow = ({ label, value, isImage = false, imageUrl = null }) => (
        <div className="mb-4">
            <div className="font-semibold text-gray-700 mb-1">{label}</div>
            {isImage ? (
                imageUrl ? (
                    <img 
                        onClick={() => openImagePreview(imageUrl)} 
                        src={imageUrl} 
                        alt={label} 
                        className="max-w-full h-auto max-h-48 rounded-lg cursor-pointer"
                    />
                ) : (
                    <div className="text-gray-500 italic">Tidak ada file</div>
                )
            ) : (
                <div className="text-gray-900 p-2 rounded">
                    {value || '-'}
                </div>
            )}
        </div>
    );

    const SectionTitle = ({ title }) => (
        <h2 className="text-xl text-[#226F54] font-extrabold mt-8 mb-4 border-b-2 border-[#226F54] pb-2">
            {title}
        </h2>
    );

    return (
        <>
            <div className="p-6 rounded-lg">
                {datas?.verif_by != null && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                        <p className="font-bold">✓ Formulir telah diverifikasi</p>
                    </div>
                )}

                <SectionTitle title="KETERANGAN PRIBADI" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Nama Lengkap Siswa" value={datas?.nama_lengkap} />
                    <InfoRow label="Nama Panggilan" value={datas?.nama_panggilan} />
                    <InfoRow label="Jenis Kelamin" value={getJenisKelaminText(datas?.jenis_kelamin)} />
                    <InfoRow label="Tempat Lahir" value={datas?.tempat_lahir} />
                    <InfoRow label="Tanggal Lahir" value={formatDate(datas?.tanggal_lahir)} />
                    <InfoRow label="Agama" value={datas?.agama} />
                    <InfoRow label="Kewarganegaraan" value={datas?.kewarganegaraan} />
                    <InfoRow label="Anak ke berapa" value={datas?.anak_ke} />
                    <InfoRow label="Jumlah Saudara Kandung" value={datas?.jumlah_saudara_kandung} />
                    <InfoRow label="Jumlah Saudara Tiri" value={datas?.jumlah_saudara_tiri} />
                    <InfoRow label="Jumlah Saudara Angkat" value={datas?.jumlah_saudara_angkat} />
                    <InfoRow label="Status Anak" value={datas?.status_anak} />
                </div>
                <InfoRow label="Bahasa Sehari-hari dirumah" value={datas?.bahasa_sehari_hari} />

                <SectionTitle title="KETERANGAN TEMPAT TINGGAL" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <InfoRow label="Alamat" value={datas?.alamat} />
                    </div>
                    <InfoRow label="No. Kartu Keluarga" value={datas?.no_kk} />
                    <InfoRow label="Kelurahan" value={datas?.kelurahan} />
                    <InfoRow label="Kecamatan" value={datas?.kecamatan} />
                    <InfoRow label="Kota/Kabupaten" value={datas?.kota} />
                    <InfoRow label="Kode Pos" value={datas?.kode_pos} />
                    <InfoRow label="No. Telepon/HP" value={datas?.nomor_telepon} />
                    <InfoRow label="Alamat Tersebut" value={getAlamatTersebutText(datas?.tempat_alamat)} />
                    <InfoRow label="Nama Pemilik Alamat" value={datas?.nama_pemilik_tempat_alamat} />
                    <InfoRow label="Ke sekolah dengan" value={getModeTransportasiText(datas?.metode_transportasi)} />
                </div>

                <SectionTitle title="KETERANGAN KESEHATAN" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Golongan Darah" value={datas?.golongan_darah} />
                    <InfoRow label="Penyakit yang pernah diderita" value={getPenyakitText(datas?.riwayat_penyakit)} />
                    <InfoRow label="Tempat Dirawat" value={datas?.riwayat_rawat} />
                    <InfoRow label="Kelainan Jasmani" value={datas?.kelainan_jasmani} />
                    <InfoRow label="Tinggi Badan (cm)" value={datas?.tinggi_badan ? `${datas.tinggi_badan} cm` : '-'} />
                    <InfoRow label="Berat Badan (kg)" value={datas?.berat_badan ? `${datas.berat_badan} kg` : '-'} />
                </div>

                <SectionTitle title="KETERANGAN PENDIDIKAN SEBELUMNYA" />
                <h3 className="text-lg text-[#226F54] font-semibold mb-4">Asal Sekolah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="SD Asal" value={datas?.nama_sekolah_asal} />
                    <InfoRow label="Tanggal Ijazah" value={formatDate(datas?.tanggal_ijazah)} />
                    <InfoRow label="Nomor Ijazah" value={datas?.nomor_ijazah} />
                    <InfoRow label="Tanggal SKHUN" value={formatDate(datas?.tanggal_skhun)} />
                    <InfoRow label="Nomor SKHUN" value={datas?.nomor_skhun} />
                    <InfoRow label="Lama Belajar (Tahun)" value={datas?.lama_belajar ? `${datas.lama_belajar} tahun` : '-'} />
                    <InfoRow label="NISN" value={datas?.nisn} />
                </div>

                <h3 className="text-lg text-[#226F54] font-semibold mb-4 mt-6">Pindah Sekolah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Pindahan Dari Sekolah" value={getTipeSekolahText(datas?.tipe_riwayat_sekolah)} />
                    <InfoRow label="Nama Sekolah Pindahan" value={datas?.nama_riwayat_sekolah} />
                    <InfoRow label="Tanggal Diterima" value={formatDate(datas?.tanggal_pindah)} />
                    <InfoRow label="Alasan Pindah" value={datas?.alasan_pindah} />
                </div>

                <SectionTitle title="KEGEMARAN CALON SISWA" />
                <h3 className="text-lg text-[#226F54] font-semibold mb-4">Bakat khusus dan Prestasi yang menonjol dalam</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Kesenian" value={datas?.kesenian} />
                    <InfoRow label="Pendidikan Jasmani/Olahraga" value={datas?.olahraga} />
                    <InfoRow label="Kemasyarakatan/Organisasi" value={datas?.organisasi} />
                    <InfoRow label="Lain-lain" value={datas?.prestasi_lainnya} />
                    <InfoRow label="Hobi" value={datas?.hobi} />
                    <InfoRow label="Cita-cita" value={datas?.cita_cita} />
                </div>

                <SectionTitle title="BERKAS" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoRow 
                        label="Pas Foto" 
                        isImage={true} 
                        imageUrl={datas?.pas_foto} 
                    />
                    <InfoRow 
                        label="Foto Kartu Keluarga" 
                        isImage={true} 
                        imageUrl={datas?.kk} 
                    />
                    <InfoRow 
                        label="Foto Akta Kelahiran" 
                        isImage={true} 
                        imageUrl={datas?.akte} 
                    />
                </div>
            </div>

            {/* Modal Preview Gambar */}
            {isImagePreviewOpen && imageToPreview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeImagePreview}
                >
                    <div
                        className="relative bg-white p-4 rounded-lg max-w-4xl max-h-full overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeImagePreview}
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-600"
                        >
                            &times;
                        </button>
                        <img
                            src={imageToPreview}
                            alt="Full Preview"
                            className="max-w-full max-h-[80vh] h-auto object-contain mx-auto"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPendaftaranSiswa;