import React from "react";
import logo from "../../../../../public/asset/logo_sekolah.png";
import {

Page,
Text,
View,
Document,
StyleSheet,
Font,
Image,
} from "@react-pdf/renderer";

// Optional: Register a font if needed
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' });

const styles = StyleSheet.create({
section: { marginBottom: 16 },
heading: { fontSize: 14, fontWeight: "bold", color: "#226F54", marginBottom: 6 },
subheading: { fontSize: 12, fontWeight: "bold", color: "#226F54", marginBottom: 4 },
label: { fontSize: 10, fontWeight: "bold" },
value: { fontSize: 10, marginBottom: 4 },
row: { flexDirection: "row", marginBottom: 2 },
col: { flex: 1, marginRight: 8 },
grid: { flexDirection: "row", flexWrap: "wrap" },
break: { flexBasis: "100%", height: 0 },
});

function formatDate(date) {
    if (!date) return "-";
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "-";
        const bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return `${d.getDate().toString().padStart(2, "0")} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
        return "-";
    }
}

function formatCurrency(val) {
if (!val) return "-";
try {
    return "Rp " + Number(val).toLocaleString("id-ID");
} catch {
    return "-";
}
}

const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;

const PdfFormulirSiswa = ({ datas }) => (
<Document>
    <Page size="A4" style={{ padding: 20 }}>
    <View style={[styles.section, { flexDirection: "row", alignItems: "center", justifyContent:"center", marginBottom: 20 }]}>
            {/* Logo Sekolah di sebelah kiri */}
            <View style={{ marginBottom:10 }}>
                <Image
                    src={logo} // Adjust the path as necessary
                    style={{ width: 58, height: 58 }}
                />
            </View>
            <View style={{ flex: 1, alignItems: "center",marginRight:55 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", letterSpacing: 1, color: "#226F54" }}>
                    YAYASAN RAUDHOTUL JANNAH
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 2, color: "#226F54" }}>
                    SMP ISLAM PLUS AL MADINAH
                </Text>
                <Text style={{ fontSize: 9, textAlign: "center", color: "#226F54" }}>
                    KAV. DEPLU No. 40 Jl. Putri Duyung Cipadu Jaya, Larangan Kota Tangerang
                </Text>
                <Text style={{ fontSize: 9, textAlign: "center",color: "#226F54" }}>
                    Telp. 081-72993800
                </Text>
            </View>
        </View>
        {/* Keterangan Pribadi */}
        <View style={styles.section}>
            <Text style={styles.heading}>Keterangan Pribadi</Text>
            <View style={styles.grid}>
                <View style={styles.col}>
                    <Label>Nama Lengkap</Label>
                    <Text style={styles.value}>{datas.nama_lengkap || "-"}</Text>
                    <Label>Nama Panggilan</Label>
                    <Text style={styles.value}>{datas.nama_panggilan || "-"}</Text>
                    <Label>Jenis Kelamin</Label>
                    <Text style={styles.value}>
                        {datas.jenis_kelamin === "L"
                            ? "Laki-laki"
                            : datas.jenis_kelamin === "P"
                            ? "Perempuan"
                            : "-"}
                    </Text>
                    <Label>Tempat, Tanggal Lahir</Label>
                    <Text style={styles.value}>
                        {(datas.tempat_lahir || "-") + ", " + (formatDate(datas.tanggal_lahir) || "-")}
                    </Text>
                    <Label>Agama</Label>
                    <Text style={styles.value}>{datas.agama || "-"}</Text>
                    <Label>Kewarganegaraan</Label>
                    <Text style={styles.value}>{datas.kewarganegaraan || "-"}</Text>
                    <Label>Anak ke</Label>
                    <Text style={styles.value}>{datas.anak_ke || "-"}</Text>
                    <Label>Jumlah Saudara Kandung</Label>
                    <Text style={styles.value}>{datas.jumlah_saudara_kandung || "-"}</Text>
                    <Label>Jumlah Saudara Tiri</Label>
                    <Text style={styles.value}>{datas.jumlah_saudara_tiri || "-"}</Text>
                    <Label>Jumlah Saudara Angkat</Label>
                    <Text style={styles.value}>{datas.jumlah_saudara_angkat || "-"}</Text>
                    <Label>Status Anak</Label>
                    <Text style={styles.value}>{datas.status_anak || "-"}</Text>
                    <Label>Bahasa Sehari-hari</Label>
                    <Text style={styles.value}>{datas.bahasa_sehari_hari || "-"}</Text>
                </View>
                <View style={styles.col}>
                    <Label>Alamat</Label>
                    <Text style={styles.value}>{datas.alamat || "-"}</Text>
                    <Label>No. KK</Label>
                    <Text style={styles.value}>{datas.no_kk || "-"}</Text>
                    <Label>Kelurahan</Label>
                    <Text style={styles.value}>{datas.kelurahan || "-"}</Text>
                    <Label>Kecamatan</Label>
                    <Text style={styles.value}>{datas.kecamatan || "-"}</Text>
                    <Label>Kota/Kabupaten</Label>
                    <Text style={styles.value}>{datas.kota || "-"}</Text>
                    <Label>Kode Pos</Label>
                    <Text style={styles.value}>{datas.kode_pos || "-"}</Text>
                    <Label>No. Telepon</Label>
                    <Text style={styles.value}>{datas.nomor_telepon || "-"}</Text>
                    <Label>Alamat Tersebut</Label>
                    <Text style={styles.value}>
                        {datas.tempat_alamat === "1"
                            ? "Tempat Orang Tua"
                            : datas.tempat_alamat === "2"
                            ? "Menumpang Pada Orang Lain"
                            : datas.tempat_alamat === "3"
                            ? "Di Asrama"
                            : "-"}
                    </Text>
                    <Label>Nama Pemilik Alamat</Label>
                    <Text style={styles.value}>{datas.nama_pemilik_tempat_alamat || "-"}</Text>
                    <Label>Mode Transportasi</Label>
                    <Text style={styles.value}>
                        {datas.metode_transportasi === "1"
                            ? "Kendaraan Umum"
                            : datas.metode_transportasi === "2"
                            ? "Kendaraan Pribadi"
                            : datas.metode_transportasi === "3"
                            ? "Jalan Kaki"
                            : "-"}
                    </Text>
                </View>
            </View>
        </View>

        {/* Keterangan Kesehatan */}
        <View style={styles.section}>
            <Text style={styles.heading}>Keterangan Kesehatan</Text>
            <View style={styles.grid}>
                <View style={styles.col}>
                    <Label>Golongan Darah</Label>
                    <Text style={styles.value}>{datas.golongan_darah || "-"}</Text>
                    <Label>Penyakit yang Pernah Diderita</Label>
                    <Text style={styles.value}>
                        {datas.riwayat_penyakit === "1"
                            ? "TBC"
                            : datas.riwayat_penyakit === "2"
                            ? "CACAR"
                            : datas.riwayat_penyakit === "3"
                            ? "EPILEPSI"
                            : datas.riwayat_penyakit === "4"
                            ? "Penyakit Lainnya"
                            : datas.riwayat_penyakit || "-"}
                    </Text>
                    <Label>Tempat Dirawat</Label>
                    <Text style={styles.value}>{datas.riwayat_rawat || "-"}</Text>
                    <Label>Kelainan Jasmani</Label>
                    <Text style={styles.value}>{datas.kelainan_jasmani || "-"}</Text>
                </View>
                <View style={styles.col}>
                    <Label>Tinggi Badan (cm)</Label>
                    <Text style={styles.value}>{datas.tinggi_badan || "-"}</Text>
                    <Label>Berat Badan (kg)</Label>
                    <Text style={styles.value}>{datas.berat_badan || "-"}</Text>
                </View>
            </View>
        </View>

        {/* Pendidikan Sebelumnya */}
        <View style={styles.section}>
            <Text style={styles.heading}>Pendidikan Sebelumnya</Text>
            <View style={styles.grid}>
                <View style={styles.col}>
                    <Label>SD Asal</Label>
                    <Text style={styles.value}>{datas.nama_sekolah_asal || "-"}</Text>
                    <Label>Tanggal Ijazah</Label>
                    <Text style={styles.value}>{formatDate(datas.tanggal_ijazah) || "-"}</Text>
                    <Label>Nomor Ijazah</Label>
                    <Text style={styles.value}>{datas.nomor_ijazah || "-"}</Text>
                    <Label>Tanggal SKHUN</Label>
                    <Text style={styles.value}>{formatDate(datas.tanggal_skhun) || "-"}</Text>
                    <Label>Nomor SKHUN</Label>
                    <Text style={styles.value}>{datas.nomor_skhun || "-"}</Text>
                    <Label>Lama Belajar (tahun)</Label>
                    <Text style={styles.value}>{datas.lama_belajar || "-"}</Text>
                    <Label>NISN</Label>
                    <Text style={styles.value}>{datas.nisn || "-"}</Text>
                </View>
                <View style={styles.col}>
                    <Label>Pindahan Dari Sekolah</Label>
                    <Text style={styles.value}>
                        {datas.tipe_riwayat_sekolah === "1"
                            ? "SMP"
                            : datas.tipe_riwayat_sekolah === "2"
                            ? "MTS"
                            : datas.tipe_riwayat_sekolah === "3"
                            ? "Pesantren"
                            : "-"}
                    </Text>
                    <Label>Nama Sekolah Pindahan</Label>
                    <Text style={styles.value}>{datas.nama_riwayat_sekolah || "-"}</Text>
                    <Label>Diterima di Sekolah Ini Pada Tanggal</Label>
                    <Text style={styles.value}>{datas.tanggal_pindah || "-"}</Text>
                    <Label>Alasan Pindah</Label>
                    <Text style={styles.value}>{datas.alasan_pindah || "-"}</Text>
                </View>
            </View>
        </View>

        {/* Keterangan Orang Tua */}
        <View style={styles.section}>
            <Text style={styles.heading}>Keterangan Orang Tua</Text>
            <View style={styles.grid}>
                {/* Ayah */}
                <View style={styles.col}>
                    <Text style={styles.subheading}>Ayah</Text>
                    <Label>Nama</Label>
                    <Text style={styles.value}>{datas.nama_ayah || "-"}</Text>
                    <Label>Tempat, Tanggal Lahir</Label>
                    <Text style={styles.value}>
                        {(datas.tempat_lahir_ayah || "-") + ", " + (formatDate(datas.tanggal_lahir_ayah) || "-")}
                    </Text>
                    <Label>NIK</Label>
                    <Text style={styles.value}>{datas.nik_ayah || "-"}</Text>
                    <Label>Agama</Label>
                    <Text style={styles.value}>{datas.agama_ayah || "-"}</Text>
                    <Label>Kewarganegaraan</Label>
                    <Text style={styles.value}>{datas.kewarganegaraan_ayah || "-"}</Text>
                    <Label>Pendidikan Terakhir</Label>
                    <Text style={styles.value}>{datas.pendidikan_terakhir_ayah || "-"}</Text>
                    <Label>Ijazah Tertinggi</Label>
                    <Text style={styles.value}>{datas.ijazah_tertinggi_ayah || "-"}</Text>
                    <Label>Pekerjaan</Label>
                    <Text style={styles.value}>{datas.pekerjaan_ayah || "-"}</Text>
                    <Label>Alamat Pekerjaan</Label>
                    <Text style={styles.value}>{datas.alamat_pekerjaan_ayah || "-"}</Text>
                    <Label>Penghasilan/Bulan</Label>
                    <Text style={styles.value}>{formatCurrency(datas.penghasilan_ayah) || "-"}</Text>
                    <Label>Alamat Rumah</Label>
                    <Text style={styles.value}>{datas.alamat_rumah_ayah || "-"}</Text>
                    <Label>No. Telepon</Label>
                    <Text style={styles.value}>{datas.telp_ayah || "-"}</Text>
                    <Label>Status</Label>
                    <Text style={styles.value}>
                        {datas.status_ayah === "1"
                            ? "Hidup"
                            : datas.status_ayah === "2"
                            ? "Meninggal Dunia"
                            : "-"}
                    </Text>
                </View>
                {/* Ibu */}
                <View style={styles.col}>
                    <Text style={styles.subheading}>Ibu</Text>
                    <Label>Nama</Label>
                    <Text style={styles.value}>{datas.nama_ibu || "-"}</Text>
                    <Label>Tempat, Tanggal Lahir</Label>
                    <Text style={styles.value}>
                        {(datas.tempat_lahir_ibu || "-") + ", " + (formatDate(datas.tanggal_lahir_ibu) || "-")}
                    </Text>
                    <Label>NIK</Label>
                    <Text style={styles.value}>{datas.nik_ibu || "-"}</Text>
                    <Label>Agama</Label>
                    <Text style={styles.value}>{datas.agama_ibu || "-"}</Text>
                    <Label>Kewarganegaraan</Label>
                    <Text style={styles.value}>{datas.kewarganegaraan_ibu || "-"}</Text>
                    <Label>Pendidikan Terakhir</Label>
                    <Text style={styles.value}>{datas.pendidikan_terakhir_ibu || "-"}</Text>
                    <Label>Ijazah Tertinggi</Label>
                    <Text style={styles.value}>{datas.ijazah_tertinggi_ibu || "-"}</Text>
                    <Label>Pekerjaan</Label>
                    <Text style={styles.value}>{datas.pekerjaan_ibu || "-"}</Text>
                    <Label>Alamat Pekerjaan</Label>
                    <Text style={styles.value}>{datas.alamat_pekerjaan_ibu || "-"}</Text>
                    <Label>Penghasilan/Bulan</Label>
                    <Text style={styles.value}>{formatCurrency(datas.penghasilan_ibu) || "-"}</Text>
                    <Label>Alamat Rumah</Label>
                    <Text style={styles.value}>{datas.alamat_rumah_ibu || "-"}</Text>
                    <Label>No. Telepon</Label>
                    <Text style={styles.value}>{datas.telp_ibu || "-"}</Text>
                    <Label>Status</Label>
                    <Text style={styles.value}>
                        {datas.status_ibu === "1"
                            ? "Hidup"
                            : datas.status_ibu === "2"
                            ? "Meninggal Dunia"
                            : "-"}
                    </Text>
                </View>
            </View>
        </View>

        {/* Keterangan Wali */}
        <View style={styles.section}>
            <Text style={styles.heading}>Keterangan Wali</Text>
            <View style={styles.grid}>
                <View style={styles.col}>
                    <Label>Nama</Label>
                    <Text style={styles.value}>{datas.nama_wali || "-"}</Text>
                    <Label>Tempat, Tanggal Lahir</Label>
                    <Text style={styles.value}>
                        {(datas.tempat_lahir_wali || "-") + ", " + (formatDate(datas.tanggal_lahir_wali) || "-")}
                    </Text>
                    <Label>NIK</Label>
                    <Text style={styles.value}>{datas.nik_wali || "-"}</Text>
                    <Label>Agama</Label>
                    <Text style={styles.value}>{datas.agama_wali || "-"}</Text>
                    <Label>Kewarganegaraan</Label>
                    <Text style={styles.value}>{datas.kewarganegaraan_wali || "-"}</Text>
                    <Label>Hubungan Keluarga</Label>
                    <Text style={styles.value}>{datas.hubungan_keluarga_wali || "-"}</Text>
                </View>
                <View style={styles.col}>
                    <Label>Ijazah Tertinggi</Label>
                    <Text style={styles.value}>{datas.ijazah_tertinggi_wali || "-"}</Text>
                    <Label>Pekerjaan</Label>
                    <Text style={styles.value}>{datas.pekerjaan_wali || "-"}</Text>
                    <Label>Penghasilan/Bulan</Label>
                    <Text style={styles.value}>{formatCurrency(datas.penghasilan_wali) || "-"}</Text>
                    <Label>Alamat</Label>
                    <Text style={styles.value}>{datas.alamat_wali || "-"}</Text>
                    <Label>No. Telepon</Label>
                    <Text style={styles.value}>{datas.telp_wali || "-"}</Text>
                </View>
            </View>
        </View>

        {/* Kegemaran dan Prestasi */}
        <View style={styles.section}>
            <Text style={styles.heading}>Kegemaran & Prestasi</Text>
            <View style={styles.grid}>
                <View style={styles.col}>
                    <Label>Kesenian</Label>
                    <Text style={styles.value}>{datas.kesenian || "-"}</Text>
                    <Label>Olahraga</Label>
                    <Text style={styles.value}>{datas.olahraga || "-"}</Text>
                    <Label>Organisasi</Label>
                    <Text style={styles.value}>{datas.organisasi || "-"}</Text>
                </View>
                <View style={styles.col}>
                    <Label>Prestasi Lainnya</Label>
                    <Text style={styles.value}>{datas.prestasi_lainnya || "-"}</Text>
                    <Label>Hobi</Label>
                    <Text style={styles.value}>{datas.hobi || "-"}</Text>
                    <Label>Cita-cita</Label>
                    <Text style={styles.value}>{datas.cita_cita || "-"}</Text>
                </View>
            </View>
        </View>
        </Page>
</Document>
);

export default PdfFormulirSiswa;