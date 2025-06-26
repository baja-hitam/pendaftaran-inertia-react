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

const Nilai = ({datas,optionUjian}) => {
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
                    
                    router.post('/admin/ujian/destroy',{idUjian: id});
                }
            });
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
                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[60%] xl:w-[40%]"
                    }
                >
                    <ButtonLink
                        handleOpen={handleOpenModalTambah}
                        className="text-sm py-2"
                    >
                        Tambah Nilai
                    </ButtonLink>
                    {/* <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        pagination
                        noDataComponent={<i>Tidak Ada Ujian</i>}
                    /> */}
                </Card>
                <ToastContainer/>
                {tambahMode && (
                    <TambahNilai
                        optionUjian={optionUjian}
                        open={tambahMode}
                        handleChangeOpen={handleOpenModalTambah}
                    />
                )}
            </div>
        </div>
    );
}
export default Nilai;