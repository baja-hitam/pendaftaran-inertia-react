import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import TemplateSidebar from "../../template/TemplateSidebar";
import { toast,ToastContainer } from "react-toastify";


const RiwayatPembayaran = ({datas}) => {
    const { flash } = usePage().props;
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

    useEffect(() => {
        if(flash.success != null){
            toast.success(flash.success, {
                autoClose: 500,
                position: 'top-center'
            });
        }else if(flash.error != null){
            toast.error(flash.error, {
                autoClose: 500,
                position: 'top-center'
            });
        }
    },[flash])

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
            name: "Aksi",
            cell: (row) => (
                <>
                {
                    (row.status == 0) && (
                        <button
                        className="bg-[#226F54] py-1 px-3 mr-3 text-white rounded-md hover:bg-[#1a5b45]"
                        onClick={() => router.post('/create-kwitansi',{id_pembayaran: row.id_pembayaran})}
                        >
                            Buat Kwitansi
                        </button>
                    )
                }
                <button
                    className="bg-blue-600 py-1 px-3 text-white rounded-md hover:bg-blue-700"
                    onClick={() => router.get('/riwayat-pembayaran/detail', {id: row.id_pembayaran})}
                >
                    Detail
                </button>
                </>
            ),
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Kwitansi Pembayaran</title>
            </Head>
            <TemplateSidebar />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Kwitansi Pembayaran
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
            <ToastContainer />
        </div>
    );
};

export default RiwayatPembayaran;
