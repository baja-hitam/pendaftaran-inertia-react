import { Head, usePage, router } from "@inertiajs/react";
import SidebarAdmin from "../SidebarAdmin";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import InputSelect from "../../UI/atoms/InputSelect";
import DataTable, { createTheme } from "react-data-table-component";


const CalonSiswa = ({datas,dataPeriode,periodeSession}) => {
    const [data, setData] = useState({
            periode: ''
        });
        const handleSearchChangePeriode = (e) => {
            setData({
                ...data,
                periode: e.target.value
            });
            router.get('/admin/calon-siswa', {periode: e.target.value});
        }
        useEffect(() => {
            setData({
                periode: periodeSession
            });
        }, []);
        const optionsPeriode = dataPeriode.map(user => ({
            value: user.periode,
            label: user.periode.slice(0, 4) + "/" + user.periode.slice(4)
        }));
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
        const handleDetailCalonSiswa = (no_formulir) => {
            router.get('/admin/calon-siswa/detail',{no_form: btoa(no_formulir)});
        }

    const customStyles = {
        table: {
            style: {
                minWidth: "450px",
            },
        },
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
            name: "Periode",
            selector: (row) => row.periode.slice(0, 4) + "/" + row.periode.slice(4),
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
            selector: (row) => row.alamat +', '+ row.kelurahan +', '+ row.kecamatan +', '+ row.kota,
            wrap: true,
        },
        {
            name: "Aksi",
            wrap: true,
            cell: (row) => (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-500 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={()=>handleDetailCalonSiswa(row.no_formulir)}>Detail</button>
                </div>)
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Formulir Pendaftaran</title>
            </Head>
            <SidebarAdmin/>
            <div className="w-[80%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Formulir Pendaftaran Siswa/i Baru
                </p>
                <Card
                    className={
                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[90%] lg:w-[90%] xl:w-[60%]"
                    }
                >
                                                        Periode:
                                    <InputSelect
                                        options={optionsPeriode}
                                        className='w-full mb-7 lg:w-[150px]'
                                        name='periode'
                                        disabled
                                        onChange={handleSearchChangePeriode}
                                        value={data.periode}
                                    />
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        pagination
                        noDataComponent={<i>Tidak Ada Calon Siswa</i>}
                    />
                </Card>
            </div>
        </div>
    );
};

export default CalonSiswa;
