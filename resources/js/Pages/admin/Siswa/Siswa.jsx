import DataTable, { createTheme } from "react-data-table-component";
import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import InputSelect from "../../UI/atoms/InputSelect";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Siswa = ({datas, dataFormulir,dataPeriode,periodeSession}) => {
    const [data, setData] = useState({
        periode: ''
    });
    const handleSearchChangePeriode = (e) => {
        setData({
            ...data,
            periode: e.target.value
        });
        router.get('/admin/kelas', {periode: e.target.value});
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
    const optionPeriodeTest = [...optionsPeriode, { value: '20262027', label: '2026/2027' }];
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
            ];
    return (
        <div className="h-max mt-12">
            <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                Siswa
            </p>
                                <Card
                                    className={
                                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[95%] xl:w-[70%]"
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
                                    <button 
                                        className="bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-white mb-2 flex items-center gap-3 font-poppins py-2 px-4 rounded-[7px]"
                                        onClick=''>
                                            Bagikan Kelas
                                    </button>
                                    <DataTable
                                        columns={columns}
                                        data={dataFormulir}
                                        theme="custom"
                                        customStyles={customStyles}
                                        pagination
                                        noDataComponent={<i>Tidak Ada Siswa</i>}
                                    />
                                </Card>
        </div>
    );
};

export default Siswa;