import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import ButtonLink from "../../UI/atoms/ButtonLink";
import DataTable, { createTheme } from "react-data-table-component";
import SidebarAdmin from "../SidebarAdmin";
import { toast,ToastContainer } from "react-toastify";
import TambahNilai from "./TambahNilai";
import EditNilai from "./EditNilai";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const DetaiNilai = ({datasDetailKartuPeserta,datasOptionsUjian,datasNilai}) => {
    const [tambahMode, setTambahMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const { flash } = usePage().props;
    const MySwal = withReactContent(Swal);


    const handleOpenModalTambah = (o) => {
        setTambahMode(o);
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
    const handleOpenModalEdit = (row)=>{
        setDataEdit(row);
        setEditMode(true);
    }
    const handleCloseModalEdit = () => {
        setEditMode(false);
    }
    const handleDeleteNilai = (id_nilai) => {
        MySwal.fire({
            title: <strong>Konfirmasi</strong>,
            html: <i>Apakah kamu yakin ingin menghapus data ini?</i>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post('/admin/nilai/delete', {id_nilai: id_nilai, no_peserta: datasDetailKartuPeserta.no_peserta})
            }
        })
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
            name:"Ujian",
            selector: (row) => row.nama_ujian,
            wrap: true,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai,
        },
        {
            name: "Aksi",
            cell: (row) => (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-600 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={()=>handleOpenModalEdit(row)}>Edit</button>
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteNilai(row.id_nilai)}>Hapus</button>
                </div>),
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <SidebarAdmin/>
            <Head>
                <title>Detail Nilai</title>
            </Head>
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
                    }
                >
                    <p>Nama Siswa : {datasDetailKartuPeserta.nama_lengkap}</p>
                    <p>Periode : {datasDetailKartuPeserta.periode.slice(0,4) + '/' + datasDetailKartuPeserta.periode.slice(4)}</p>
                    <p>No Peserta : {datasDetailKartuPeserta.no_peserta}</p>
                    <p>Jenis Kelamin : {datasDetailKartuPeserta.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    <p>Tempat Lahir : {datasDetailKartuPeserta.tempat_lahir}</p>
                    <p>Tanggal Lahir : {handleChangeParseDate(datasDetailKartuPeserta.tanggal_lahir)}</p>
                    <ButtonLink
                        handleOpen={handleOpenModalTambah}
                        className="text-sm py-2"
                    >
                        Entri Nilai
                    </ButtonLink>
                    <DataTable
                        columns={columns}
                        data={datasNilai}
                        theme="custom"
                        customStyles={customStyles}
                        noDataComponent={<i>Nilai Belum Dientry</i>}
                    />
                    {tambahMode && (<TambahNilai open={tambahMode} noPeserta={datasDetailKartuPeserta.no_peserta} handleChangeOpen={handleOpenModalTambah} optionUjian={datasOptionsUjian}/>)}
                    {editMode && (<EditNilai open={editMode} row={dataEdit} noPeserta={datasDetailKartuPeserta.no_peserta} handleChangeOpen={handleCloseModalEdit} optionUjian={datasOptionsUjian}/>)}
                </Card>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DetaiNilai;
