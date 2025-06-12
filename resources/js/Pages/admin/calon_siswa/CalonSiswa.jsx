import { Head, usePage, router } from "@inertiajs/react";
import Sidebar from "../../UI/organisms/Sidebar";
import { Menu } from "../../UI/molecules/Menu";
import { IconDashboard } from "../../UI/atoms/IconDashboard";
import { IconForm } from "../../UI/atoms/IconForm";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";


const CalonSiswa = ({datas}) => {

    createTheme("custom", {
        background: {
            default: "transparent",
        },
    });
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
        const handleDetailCalonSiswa = (id) => {
            router.post('/admin/calon-siswa/detail',{id: id});
        }

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
            name: "No",
            selector: (row, index) => index + 1,
        },
        {
            name: "Nama Siswa",
            wrap: true,
            selector: (row) => row.nama_lengkap,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.jenis_kelamin,
            format: (row) => row.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
        },
        {
            name: "Tanggal Lahir",
            wrap: true,
            selector: (row) => handleChangeParseDate(row.tanggal_lahir),
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            wrap: true,
        },
        {
            name: "Aksi",
            cell: (row) => (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-500 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={()=>handleDetailCalonSiswa(row.id_calon_siswa)}>View</button>
                </div>)
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Calon Siswa</title>
            </Head>
            <Sidebar>
                <Menu text="Dashboard" link="/">
                    <IconDashboard />
                </Menu>
                <Menu text="Master Periode" link="/admin/periode">
                    <IconForm />
                </Menu>
                <Menu text="Master Pembayaran" link="/admin/pembayaran">
                    <IconForm />
                </Menu>
                <Menu text="Transaksi Pembayaran" link="/admin/transaksi-pembayaran">
                    <IconForm />
                </Menu>
                <Menu text="Daftar Calon Siswa" link="/admin/calon-siswa">
                    <IconForm />
                </Menu>
            </Sidebar>
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Daftar Calon Siswa
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
                        noDataComponent={<i>Tidak Ada Calon Siswa</i>}
                    />
                </Card>
            </div>
        </div>
    );
};

export default CalonSiswa;
