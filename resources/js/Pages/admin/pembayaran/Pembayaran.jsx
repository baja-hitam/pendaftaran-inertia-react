import { Head, usePage, router } from "@inertiajs/react";
import Sidebar from "../../UI/organisms/Sidebar";
import { Menu } from "../../UI/molecules/Menu";
import { IconDashboard } from "../../UI/atoms/IconDashboard";
import { IconForm } from "../../UI/atoms/IconForm";
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
            name: "Aksi",
            cell: (row) => (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-600 w-16 h-7 text-white rounded-md hover:bg-blue-700" onClick={() => handleOpenEdit(row)}>Edit</button>
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeletePembayaran(row.id)}>Hapus</button>
                </div>)
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Pembayaran</title>
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
            </Sidebar>
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Master Pembayaran
                </p>
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
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
