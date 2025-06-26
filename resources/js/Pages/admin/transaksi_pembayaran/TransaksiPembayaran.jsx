import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import ButtonLink from "../../UI/atoms/ButtonLink";
import { toast,ToastContainer } from "react-toastify";
import SidebarAdmin from "../SidebarAdmin";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TambahTransaksi from "./TambahTransaksi";
import Select from 'react-select';
import { Label } from "../../UI/atoms/Label";
import InputSelect from "../../UI/atoms/InputSelect";
import { InputForm } from '../../UI/molecules/InputForm';
import EditTransaksi from "./EditTransaksi";


const TransaksiPembayaran = ({datas,datasUserOption,datasJenPembayaranOption,search,tahun,datasPeriodeOption}) => {
    const [tambahMode, setTambahMode] = useState(false);
    // const [editMode, setEditMode] = useState(false);
    // const [dataEdit, setDataEdit] = useState(null);
    const MySwal = withReactContent(Swal);
    // State untuk search query dan debounced query
    const [periode, setPeriode] = useState(tahun);
    const [query, setQuery] = useState(search);
    // State untuk debounced search
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const { flash } = usePage().props;
    const handleOpenModalTambah = (o) => {
        setTambahMode(o);
    };
    const optionsUser = datasUserOption.map(user =>({
        value: user.id_user,
        label: user.email
    }));
    const optionsPeriode = datasPeriodeOption.map(user => ({
        value: user.periode,
        label: user.periode.slice(0, 4) + "/" + user.periode.slice(4)
    }));
    // const handleOpenEdit = (row)=>{
    //     setDataEdit(row);
    //     setEditMode(true);
    // }

    // const handleCloseEdit = () => {
    //     setEditMode(false);
    // }
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

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setQuery(searchValue);
        
        // Clear timeout sebelumnya jika ada
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        // console.log(query);
        
        
        // Set timeout baru untuk delay 500ms setelah user berhenti mengetik
        const newTimeout = setTimeout(() => {
            router.get('/admin/transaksi-pembayaran/search', 
                { user: searchValue, periode: periode},
            );
        }, 500);
        
        setDebounceTimeout(newTimeout);
    };
    const handleSearchChangePeriode = (e) => {
        const searchValue = e.target.value;
        setPeriode(searchValue);
        
        // Clear timeout sebelumnya jika ada
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        // console.log(periode);
        
        
        // Set timeout baru untuk delay 500ms setelah user berhenti mengetik
        const newTimeout = setTimeout(() => {
            router.get('/admin/transaksi-pembayaran/search', 
                { user: query, periode: searchValue },
            );
        }, 500);
        
        setDebounceTimeout(newTimeout);
    };

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
    const handleDeleteTransaksi = (id) => {
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
                
                router.post('/admin/transaksi-pembayaran/delete',{id: id});
            }
        });
    }
    const handleKonfirmasiPembayaran = (id) => {
        MySwal.fire({
            title: <strong>Konfirmasi</strong>,
            html: <i>Apakah kamu yakin ingin mengkonfirmasi pembayaran ini?</i>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, konfirmasi!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(periode);
                
                router.post('/admin/transaksi-pembayaran/konfirmasi',{id: id});
            }
        });
    }
    const handleKonfirmasiBatalPembayaran = (id) => {
        MySwal.fire({
            title: <strong>Konfirmasi</strong>,
            html: <i>Apakah kamu yakin ingin membatalkan konfirmasi pembayaran ini?</i>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(periode);
                
                router.post('/admin/transaksi-pembayaran/batal-konfirmasi',{id: id});
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
            name: "Email",
            selector: (row)=> row.email,
            wrap: true,
        },
        {
            name: "Nama",
            selector: (row) => row.nama_lengkap,
            wrap: true,

        },
        {
            name: "Periode",
            selector: (row) => row.periode.slice(0, 4) + "/" + row.periode.slice(4),
        },
        {
            name: "Jenis Pembayaran",
            selector: (row) => row.nama_pembayaran,
        },
        {
            name: "Jumlah Harus Dibayar",
            selector: (row) => row.jumlah_hrsbayar,
            format: (row) => new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(row.jumlah_hrsbayar),
        },
        {
            name:"Entry Pembayaran",
            selector: (row) => row.nama_entry_admin ?? '-',
        },
        {
            name: "Tanggal Dibayarkan",
            selector: (row)=> row.tanggal_dibayar == null ? '-':handleChangeParseDate(row.tanggal_dibayar),
        },
        {
            name: "Aksi",
            cell: (row) => row.tanggal_dibayar == null ? (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-600 w-20 h-7 text-white rounded-md hover:bg-blue-700" onClick={() => handleKonfirmasiPembayaran(row.id_transaksi_pembayaran)}>Dibayarkan</button>
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteTransaksi(row.id_transaksi_pembayaran)}>Hapus</button>
                </div>) : (<div className="flex flex-row gap-x-2"> 
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700   " onClick={() => handleKonfirmasiBatalPembayaran(row.id_transaksi_pembayaran)}>Batal</button>
                <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteTransaksi(row.id_transaksi_pembayaran)}>Hapus</button>
                </div>)
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Transaksi Pembayaran</title>
            </Head>
            <SidebarAdmin/>
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Transaksi Pembayaran
                </p>
                <Card
                    className={
                        "w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[90%] lg:w-[90%] xl:w-[70%]"
                    }
                >
                    <ButtonLink
                        handleOpen={handleOpenModalTambah}
                        className="text-sm py-2"
                    >
                        Tambah Transaksi Pembayaran
                    </ButtonLink>
                        <InputSelect
                            options={optionsPeriode}
                            className='w-full mt-4 xl:w-3/12'
                            name='periode'
                            onChange={handleSearchChangePeriode}
                            value={periode}
                            />
                        <InputForm
                            type='text'
                            className='w-full mt-4 xl:w-3/12'
                            name='search'
                            required
                            value={query}
                            onChange={handleSearchChange}
                            placeholder='Cari Email ....'
                        />
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        pagination
                        noDataComponent={<i>Tidak Ada Transaksi Pembayaran</i>}
                    />
                </Card>
                <ToastContainer/>
                {tambahMode && (<TambahTransaksi open={tambahMode} handleChangeOpen={handleOpenModalTambah} datasUserOption={datasUserOption} datasJenPembayaranOption={datasJenPembayaranOption}/>)}
                {/* {editMode && (<EditTransaksi open={editMode} row={dataEdit} handleChangeOpen={handleCloseEdit} datasUserOption={datasUserOption} datasJenPembayaranOption={datasJenPembayaranOption}/>)} */}
            </div>
        </div>
    );
};

export default TransaksiPembayaran;
