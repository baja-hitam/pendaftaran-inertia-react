import { Label } from "../atoms/Label";
import { useEffect, useState } from "react";

const ViewPendaftaranOrangTua = ({ datas }) => {
    const [formattedData, setFormattedData] = useState({});

    useEffect(() => {
        if (datas) {
            setFormattedData({
                penghasilanAyah: handleFormatRupiah(datas.penghasilan_ayah || ''),
                penghasilanIbu: handleFormatRupiah(datas.penghasilan_ibu || ''),
                penghasilanWali: handleFormatRupiah(datas.penghasilan_wali || ''),
            });
        }
    }, [datas]);

    const handleFormatRupiah = (value) => {
        if (!value) return '';
        
        // Convert to string and remove non-digits
        let cleanValue = value.toString().replace(/\D/g, '');
        
        // Remove leading zeros
        if (cleanValue.length > 1 && cleanValue[0] === "0") {
            const firstNonZero = cleanValue.search(/[1-9]/);
            if (firstNonZero !== -1) {
                cleanValue = cleanValue.substring(firstNonZero);
            } else {
                cleanValue = "0";
            }
        }

        // Add dots every 3 digits from the right
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const getStatusText = (status) => {
        return status === '1' ? 'Hidup' : status === '2' ? 'Meninggal Dunia' : '';
    };

    const InfoRow = ({ label, value }) => (
        <div className="mb-4">
            <div className="font-semibold text-gray-700 mb-1">{label}</div>
            <div className="text-gray-900 p-2 rounded">
                {value || '-'}
            </div>
        </div>
    );

    const SectionTitle = ({ title }) => (
        <h2 className="text-xl text-[#226F54] font-extrabold mt-8 mb-4 border-b-2 border-[#226F54] pb-2">
            {title}
        </h2>
    );

    const SubSectionTitle = ({ title }) => (
        <h3 className="text-lg text-[#226F54] font-semibold mb-4">{title}</h3>
    );

    if (!datas) {
        return (
            <div className="p-4">
                <p className="text-gray-500">Data tidak tersedia</p>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-lg">
            {datas.verif_by !== null && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-bold">✓ Formulir telah diverifikasi</p>
                </div>
            )}

            <SectionTitle title="KETERANGAN TENTANG ORANG TUA" />
            
            {/* Ayah Section */}
            <SubSectionTitle title="Ayah" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Nama" value={datas.nama_ayah} />
                <InfoRow label="Tempat Lahir" value={datas.tempat_lahir_ayah} />
                <InfoRow label="Tanggal Lahir" value={datas.tanggal_lahir_ayah} />
                <InfoRow label="NIK" value={datas.nik_ayah} />
                <InfoRow label="Agama" value={datas.agama_ayah} />
                <InfoRow label="Kewarganegaraan" value={datas.kewarganegaraan_ayah} />
                <InfoRow label="Pendidikan Terakhir" value={datas.pendidikan_terakhir_ayah} />
                <InfoRow label="Ijazah Tertinggi" value={datas.ijazah_tertinggi_ayah} />
                <InfoRow label="Pekerjaan" value={datas.pekerjaan_ayah} />
                <InfoRow label="Alamat Pekerjaan" value={datas.alamat_pekerjaan_ayah} />
                <InfoRow label="Penghasilan/Bulan" value={formattedData.penghasilanAyah} />
                <InfoRow label="Alamat Rumah" value={datas.alamat_rumah_ayah} />
                <InfoRow label="No. Telepon/HP" value={datas.telp_ayah} />
                <InfoRow label="Status" value={getStatusText(datas.status_ayah)} />
            </div>

            {/* Ibu Section */}
            <SubSectionTitle title="Ibu" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Nama" value={datas.nama_ibu} />
                <InfoRow label="Tempat Lahir" value={datas.tempat_lahir_ibu} />
                <InfoRow label="Tanggal Lahir" value={datas.tanggal_lahir_ibu} />
                <InfoRow label="NIK" value={datas.nik_ibu} />
                <InfoRow label="Agama" value={datas.agama_ibu} />
                <InfoRow label="Kewarganegaraan" value={datas.kewarganegaraan_ibu} />
                <InfoRow label="Pendidikan Terakhir" value={datas.pendidikan_terakhir_ibu} />
                <InfoRow label="Ijazah Tertinggi" value={datas.ijazah_tertinggi_ibu} />
                <InfoRow label="Pekerjaan" value={datas.pekerjaan_ibu} />
                <InfoRow label="Alamat Pekerjaan" value={datas.alamat_pekerjaan_ibu} />
                <InfoRow label="Penghasilan/Bulan" value={formattedData.penghasilanIbu} />
                <InfoRow label="Alamat Rumah" value={datas.alamat_rumah_ibu} />
                <InfoRow label="No. Telepon/HP" value={datas.telp_ibu} />
                <InfoRow label="Status" value={getStatusText(datas.status_ibu)} />
            </div>

            {/* Wali Section */}
            <SectionTitle title="KETERANGAN TENTANG WALI" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Nama Wali" value={datas.nama_wali} />
                <InfoRow label="Tempat Lahir" value={datas.tempat_lahir_wali} />
                <InfoRow label="Tanggal Lahir" value={datas.tanggal_lahir_wali} />
                <InfoRow label="NIK" value={datas.nik_wali} />
                <InfoRow label="Agama" value={datas.agama_wali} />
                <InfoRow label="Kewarganegaraan" value={datas.kewarganegaraan_wali} />
                <InfoRow label="Hubungan Keluarga" value={datas.hubungan_keluarga_wali} />
                <InfoRow label="Ijazah Tertinggi" value={datas.ijazah_tertinggi_wali} />
                <InfoRow label="Pekerjaan" value={datas.pekerjaan_wali} />
                <InfoRow label="Penghasilan/Bulan" value={formattedData.penghasilanWali} />
                <InfoRow label="Alamat" value={datas.alamat_wali} />
                <InfoRow label="No. Telepon/HP" value={datas.telp_wali} />
            </div>
        </div>
    );
};

export default ViewPendaftaranOrangTua;
