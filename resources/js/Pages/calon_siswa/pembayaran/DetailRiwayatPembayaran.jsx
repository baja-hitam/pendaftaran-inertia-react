import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import TemplateSidebar from "../../template/TemplateSidebar";
import FileUploader from "../../UI/molecules/FileUploader";
import UploadBuktiPembayaran from "./UploadBuktiPembayaran";


const DetailRiwayatPembayaran = ({datas}) => {
    const [tambahMode, setTambahMode] = useState(false);
    const [idTransaksiPembayaran, setIdTransaksiPembayaran] = useState('');
    const handleOpenModalTambah = (o,id) => {
        // console.log(id);
        setIdTransaksiPembayaran(id);
        setTambahMode(o);
    }
    const handleChangeParseDate = (date) => {
        // console.log(date);
        date = new Date(date);
        const formatted = new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);

        return formatted;
    }
    createTheme("custom", {
        background: {
            default: "transparent",
        },
    });
    const sisaPembayaran = Number(datas[0]?.total_pembayaran) - datas.reduce((acc, curr) => {
        if (curr.verif_by !== null) {
            return acc + Number(curr.jumlah_hrsbayar);
        }
        return acc;
    }, 0);

    const customStyles = {
        rows: {
            style: {
                fontSize: "14px",
            },
        },
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: "bold",
            },
        },
        cells: {
            style: {
                fontSize: "14px",
            },
        },
    };

    const columns = [
        {
            name:"Nama Pembayaran",
            selector: (row) => row.nama_pembayaran,
            wrap: true,
        },
        {
            name: "Periode",
            selector: (row) => row.periode.slice(0, 4) + "/" + row.periode.slice(4),

        },
        {
            name: "Jumlah Harus Dibayar",
            selector: (row) => row.jumlah_hrsbayar,
            format: (row) => new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(row.jumlah_hrsbayar),
        },
        {
            name: "Tanggal Dibayarkan",
            selector: (row) => row.tanggal_dibayar == null ? '-' : handleChangeParseDate(row.tanggal_dibayar),
        },
        {
            name: "Verif Pembayaran",
            selector: (row) => row.verif_name == null ? '-' : row.verif_name,
        },
        {
            name: "Tanggal Verifikasi",
            selector: (row) => row.verif_date == null ? '-' : handleChangeParseDate(row.verif_date),
        },
        {
            name : "Bukti Pembayaran",
            cell : (row) => (
                row.path_bukti != null ? (
                    <a href={row.path_bukti} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {row.nama_bukti}
                    </a>
                ):(
                    <button className="bg-blue-600 py-2 px-4 text-white rounded-md hover:bg-blue-700" onClick={()=>handleOpenModalTambah(true,row.id_transaksi_pembayaran)}>Upload Bukti</button>
                )
            )
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Detail Riwayat Pembayaran</title>
            </Head>
            <TemplateSidebar />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] mt-12">
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[70%]"
                    }
                >
                    <p>Nama Pembayaran : {datas[0]?.nama_pembayaran}</p>
                    <p>Periode : {datas[0]?.periode.slice(0, 4) + "/" + datas[0]?.periode.slice(4)}</p>
                    <p>Total Pembayaran : {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    }).format(datas[0]?.total_pembayaran)}</p>
                    <p>Sisa Pembayaran : {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    }).format(sisaPembayaran)}</p>

                    <p className="mt-3">Detail Transaksi Pembayaran:</p>
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        noDataComponent={<i>Tidak Ada Data Transaksi</i>}
                    />
                </Card>
                {tambahMode && (
                    <UploadBuktiPembayaran
                        open={tambahMode}
                        handleChangeOpen={handleOpenModalTambah}
                        idTransaksiPembayaran={idTransaksiPembayaran}
                    />
                )}
            </div>
        </div>
    );
};

export default DetailRiwayatPembayaran;
