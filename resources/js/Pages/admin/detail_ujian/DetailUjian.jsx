import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import ButtonLink from "../../UI/atoms/ButtonLink";
import { toast,ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import TambahDetailUjian from "./TambahDetailUjian";
import withReactContent from 'sweetalert2-react-content';
import EditDetailUjian from "./EditDetailUjian";

const DetailUjian = ({datas,optionUjian}) => {
const [tambahMode, setTambahMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const MySwal = withReactContent(Swal);
    const { flash } = usePage().props;

    const handleOpenModalTambah = (o) => {
        setTambahMode(o);
    }
    const handleOpenModalEdit = (row)=>{
        setDataEdit(row);
        setEditMode(true);
    }
    const handleCloseModalEdit = () => {
        setEditMode(false);
    }
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
    const handleChangeParseTime = (time) => {
        if (!time) return "";
        // Handle string in HH:mm:ss or HH:mm
        if (typeof time === "string") {
            const parts = time.split(":");
            if (parts.length >= 2) {
                // Only take hour and minute
                const hour = parts[0].padStart(2, "0");
                const minute = parts[1].padStart(2, "0");
                return `${hour}:${minute}`;
            }
        }
    }
        const handleDeleteUjian = (id) => {
            MySwal.fire({
                title: <strong>Konfirmasi</strong>,
                html: <i>Apakah kamu yakin ingin menghapus data ini?</i>,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log(periode);
                    
                    router.post('/admin/ujian/detail/destroy',{idDetailUjian: id});
                }
            });
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
                name: "Nama Ujian",
                selector: row => row.nama_ujian,
            },
            {
                name: "Periode",
                selector: row => row.periode.slice(0, 4) + "/" + row.periode.slice(4),
            },
            {
                name: "Tanggal Ujian",
                selector: row => row.tanggal_ujian,
                format: row => handleChangeParseDate(row.tanggal_ujian),
            },
            {
                name:"Waktu Mulai",
                selector: row => row.waktu_mulai,
                format: row => handleChangeParseTime(row.waktu_mulai),
            },
            {
                name:"Waktu Selesai",
                selector: row => row.waktu_selesai,
                format: row => handleChangeParseTime(row.waktu_selesai),
            },
            {
                name:"Ruang Ujian",
                selector: row => row.ruang_ujian,
            },
            {
                name:"Status",
                selector: row => row.caktif == 'T' ? "Aktif" : "Tidak Aktif",
            },
            {
                name: "Aksi",
                cell: (row) => (<div className="flex flex-row gap-x-2"> 
                    <button className="bg-blue-600 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={()=>handleOpenModalEdit(row)}>Edit</button>
                    <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteUjian(row.id_detail_ujian)}>Hapus</button>
                    </div>)
            }
        ];
        return (
                <div className="h-max mt-12">
                                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                                    Detail Ujian
                                </p>
                                <Card
                                    className={
                                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[95%] xl:w-[70%]"
                                    }
                                >
                                    <ButtonLink
                                        handleOpen={handleOpenModalTambah}
                                        className="text-sm py-2"
                                    >
                                        Tambah Detail Ujian
                                    </ButtonLink>
                                    <DataTable
                                        columns={columns}
                                        data={datas}
                                        theme="custom"
                                        customStyles={customStyles}
                                        pagination
                                        noDataComponent={<i>Tidak Ada Detail Ujian</i>}
                                    />
                                </Card>
                                <ToastContainer/>
                                {tambahMode && <TambahDetailUjian open={tambahMode} optionUjian={optionUjian} handleChangeOpen={handleOpenModalTambah} />}
                                {editMode && (
                                    <EditDetailUjian
                                        open={editMode}
                                        optionUjian={optionUjian}
                                        handleChangeOpen={handleCloseModalEdit}
                                        row={dataEdit}
                                    />
                                )}
                            </div>
        );
}
export default DetailUjian;