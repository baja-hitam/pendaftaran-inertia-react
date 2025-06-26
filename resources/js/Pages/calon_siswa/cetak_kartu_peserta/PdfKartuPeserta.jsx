import React from "react";
// Use a direct URL or base64 string for react-pdf images
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


const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;

const PdfKartuPeserta = ({ datas }) => (
<Document>
    <Page
        size={{ width: 515, height: 364 }} // ID Card size in points (approx 85mm x 53mm)
        style={{ padding: 12 }}
    >
        {/* Header */}
            <View style={[styles.section, { flexDirection: "row", alignItems: "center", marginBottom: 10 }]}>
                <Image
                src={logo}
                style={{ width: 52, height: 52, marginLeft:30 }}
                />
                <View style={{ flex: 1,marginRight:50 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", letterSpacing: 1, color: "#226F54", textAlign: "center" }}>
                    YAYASAN RAUDHOTUL JANNAH
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "bold", marginVertical: 1, color: "#226F54", textAlign: "center" }}>
                    SMP ISLAM PLUS AL MADINAH
                </Text>
                <Text style={{ fontSize: 12, textAlign: "center", color: "#226F54" }}>
                    Kartu Peserta Ujian Penerimaan Siswa Baru
                </Text>
                <Text style={{ fontSize: 10, textAlign: "center", color: "#226F54" }}>
                    Tahun Ajaran {datas.periode.slice(0, 4) + "/" + datas.periode.slice(4)}
                </Text>
                </View>
            </View>

            {/* Data Pribadi */}
        <View style={[styles.section, { marginLeft: 20 }]}>
            <View style={[styles.row, { alignItems: "flex-start" }]}>
                <View style={{ width: 120 }}>
                    <Label>Nomor Peserta</Label>
                </View>
                <Text style={[styles.value, { flex: 1 }]}>: {datas.no_peserta || "-"}</Text>
            </View>

            <View style={[styles.row, { alignItems: "flex-start" }]}>
                <View style={{ width: 120 }}>
                    <Label>Nama Lengkap</Label>
                </View>
                <Text style={[styles.value, { flex: 1 }]}>: {datas.nama_lengkap || "-"}</Text>
            </View>

            <View style={[styles.row, { alignItems: "flex-start" }]}>
                <View style={{ width: 120 }}>
                    <Label>Nama Panggilan</Label>
                </View>
                <Text style={[styles.value, { flex: 1 }]}>: {datas.nama_panggilan || "-"}</Text>
            </View>

            <View style={[styles.row, { alignItems: "flex-start" }]}>
                <View style={{ width: 120 }}>
                    <Label>Jenis Kelamin</Label>
                </View>
                <Text style={[styles.value, { flex: 1 }]}>
                    : {datas.jenis_kelamin === "L"
                        ? "Laki-laki"
                        : datas.jenis_kelamin === "P"
                        ? "Perempuan"
                        : "-"}
                </Text>
            </View>

            <View style={[styles.row, { alignItems: "flex-start" }]}>
                <View style={{ width: 120 }}>
                    <Label>Tempat, Tanggal Lahir</Label>
                </View>
                <Text style={[styles.value, { flex: 1 }]}>
                    : {(datas.tempat_lahir || "-") + ", " + (formatDate(datas.tanggal_lahir) || "-")}
                </Text>
            </View>
        </View>
    </Page>
</Document>
);

export default PdfKartuPeserta;