import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import TemplateSidebar from "../../template/TemplateSidebar";


const RiwayatPembayaran = ({datas}) => {
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
        },
        {
            name: "Jumlah Yang Harus Dibayar",
            selector: (row) => row.total_pembayaran,
            format: (row) =>
                new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(row.total_pembayaran),
        },
        {
            name: "Tanggal Dibayarkan",
            selector: (row) => row.tanggal_pembayaran ? handleChangeParseDate(row.tanggal_pembayaran) : "-",
        },
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Riwayat Pembayaran</title>
            </Head>
            <TemplateSidebar />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Riwayat Pembayaran
                </p>
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
                    }
                >
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        noDataComponent={<i>Tidak Ada Riwayat Pembayaran</i>}
                    />
                </Card>
            </div>
        </div>
    );
};

export default RiwayatPembayaran;
