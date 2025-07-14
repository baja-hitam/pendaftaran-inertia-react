import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import ButtonLink from "../../UI/atoms/ButtonLink";
import { toast,ToastContainer } from "react-toastify";
import TambahNilai from "./TambahNilai";
import SidebarAdmin from "../SidebarAdmin";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Nilai = ({datas}) => {
    const handleChangeParseDate = (date) => {
        // console.log(date);
        date = new Date(date);
        const tanggal = new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
        return tanggal;
    }
        const handleDetailEntri = (no_peserta) => {
            router.get('/admin/nilai/detail',{no_peserta: no_peserta});
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
                name: "No Peserta",
                selector: (row) => row.no_peserta,
            },
            {
                name: "Nama Lengkap",
                selector: (row) => row.nama_lengkap,
            },
            {
                name: "Jenis Kelamin",
                selector: (row) => row.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan',
            },
            {
                name: "Tempat Lahir",
                selector: (row) => row.tempat_lahir,
            },
            {
                name: "Tanggal Lahir",
                selector: (row) => handleChangeParseDate(row.tanggal_lahir),
            },
            {
                name: "Aksi",
                cell: (row) => (
                    <div className="flex flex-row gap-x-2">
                        <button className="bg-blue-600 w-20 h-7 text-white rounded-md hover:bg-blue-700" onClick={()=>handleDetailEntri(row.no_peserta)}>Detail</button>
                    </div>
                ),
            }
        ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Nilai</title>
            </Head>
            <SidebarAdmin/>
            <div className="w-[70%] h-max mt-12 sm:w-[80%] xl:w-[90%]">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Entri Nilai Calon Siswa/i
                </p>
                <Card
                    className={
                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[60%] xl:w-[60%]"
                    }
                >
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        pagination
                        noDataComponent={<i>Tidak Ada Peserta Ujian</i>}
                    />
                </Card>
                <ToastContainer/>
            </div>
        </div>
    );
}
export default Nilai;