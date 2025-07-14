import { Head, usePage, router } from "@inertiajs/react";
import SidebarAdmin from "../SidebarAdmin";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import ButtonLink from "../../UI/atoms/ButtonLink";
import { toast,ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import TambahPembayaran from "./TambahPembayaran";
import withReactContent from 'sweetalert2-react-content';
import EditPembayaran from "./EditPembayaran";


const Pembayaran = ({datas}) => {
    const [tambahMode, setTambahMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const MySwal = withReactContent(Swal);
    const { flash } = usePage().props;
    const handleOpenModalTambah = (o) => {
        setTambahMode(o);
    };

    const handleOpenEdit = (row)=>{
        setDataEdit(row);
        setEditMode(true);
    }
    const handleDeletePembayaran = (id) => {
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
                    
                    router.post('/admin/pembayaran/delete',{id: id});
                }
            });
            
    }
    const handleCloseEdit = () => {
        setEditMode(false);
    }

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
            name: "Nama Pembayaran",
            wrap: true,
            selector: (row) => row.nama_pembayaran,
        },
        {
            name: "Total Pembayaran",
            selector: (row) => row.total_pembayaran,
            format: (row) => new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(row.total_pembayaran),
        },
        {
            name: "Status",
            selector: (row) => row.aktif == 'T' ? 'Aktif' : 'Tidak Aktif',
        },
        {
            name: "Aksi",
            cell: (row) => (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-600 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={() => handleOpenEdit(row)}>Edit</button>
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeletePembayaran(row.id_pembayaran)}>Hapus</button>
                </div>)
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Pembayaran</title>
            </Head>
            <SidebarAdmin/>
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Master Pembayaran
                </p>
                <Card
                    className={
                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[90%] lg:w-[90%] xl:w-[60%]"
                    }
                >
                    <ButtonLink
                        handleOpen={handleOpenModalTambah}
                        className="text-sm py-2"
                    >
                        Tambah Jenis Pembayaran
                    </ButtonLink>
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        noDataComponent={<i>Tidak Ada Jenis Pembayaran</i>}
                    />
                </Card>
                <ToastContainer/>
                {tambahMode && (
                    <TambahPembayaran
                        open={tambahMode}
                        handleChangeOpen={handleOpenModalTambah}
                    />
                )}
                {editMode && (
                    <EditPembayaran
                        open={editMode}
                        handleChangeOpen={handleCloseEdit}
                        row={dataEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default Pembayaran;
