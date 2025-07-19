import { Head, usePage, router, useForm } from "@inertiajs/react";
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


const TransaksiPembayaran = ({datas,datasUserOption,datasJenPembayaranOption,jenPembayaran,search,tahun,datasPeriodeOption,datasFormulirOption}) => {
    const [tambahMode, setTambahMode] = useState(false);
    // const [editMode, setEditMode] = useState(false);
    // const [dataEdit, setDataEdit] = useState(null);
    const MySwal = withReactContent(Swal);
    // State untuk search query dan debounced query
    const {data,setData,get} = useForm({
        user: search ?? '',
        periode: tahun ?? '',
        jenPembayaran : jenPembayaran ?? '', // Default ke Jenis Pembayaran 1
    });
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
    const optionsJenPembayaran = datasJenPembayaranOption.map(jenpem => ({
        value: jenpem.id_pembayaran,
        label: jenpem.nama_pembayaran
    }))
    // console.log(optionsJenPembayaran);
    
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
        setData({ ...data, user: searchValue });
    };
    const handleSearchChangePeriode = (e) => {
        const searchValue = e.target.value;
        setData({ ...data, periode: searchValue });
    };
    const handleChangeJenPembayaran = (e) => {
        const searchValue = e.target.value;
        setData({ ...data, jenPembayaran: searchValue });
    }
    const handleSearch = (e) => {
        e.preventDefault();
        
        // console.log(data);
        
        get('/admin/transaksi-pembayaran/search');
    }

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
            selector: (row)=> row.email ?? '-',
            wrap: true,
        },
        {
            name: "Nama User",
            selector: (row) => row.nama_lengkap ?? '-',
            wrap: true,
        },
        {
            name: "Nama Siswa",
            selector: (row) => row.nama_siswa ?? '-',
            wrap: true,
        },
        {
            name: "Periode",
            selector: (row) => row.periode.slice(0, 4) + "/" + row.periode.slice(4),
        },
        {
            name: "Jenis Pembayaran",
            selector: (row) => row.nama_pembayaran,
            wrap: true,
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
            name:"Verif Pembayaran",
            selector: (row) => row.verif_name ?? '-',
        },
        {
            name: "Tanggal Verifikasi",
            selector: (row) => row.verif_date == null ? '-' : handleChangeParseDate(row.verif_date),
        },
        {
            name: "Tanggal Dibayarkan",
            selector: (row)=> row.tanggal_dibayar == null ? '-':handleChangeParseDate(row.tanggal_dibayar),
        },
        {
            name: "Bukti Pembayaran",
            cell: (row) => (
                row.path_bukti != null ? (
                    <a href={row.path_bukti} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {row.nama_bukti}
                    </a>
                ) : (
                    <span>Tidak ada bukti</span>
                )
            ),
        },
        {
            name: "Aksi",
            cell: (row) => row.verif_by == null ? (<div className="flex flex-row gap-x-2"> 
                <button className="bg-blue-600 w-20 h-7 text-white rounded-md hover:bg-blue-700" onClick={() => handleKonfirmasiPembayaran(row.id_transaksi_pembayaran)}>Konfirmasi</button>
                {/* <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteTransaksi(row.id_transaksi_pembayaran)}>Hapus</button> */}
                </div>) : (<div className="flex flex-row gap-x-2"> 
                {/* <button className="bg-red-600 w-16 h-7 text-white rounded-md hover:bg-red-700" onClick={()=>handleDeleteTransaksi(row.id_transaksi_pembayaran)}>Hapus</button> */}
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
                        <form onSubmit={handleSearch} className="flex flex-col pt-4 lg:flex-row lg:items-center lg:gap-x-2">
                            <InputSelect
                                options={optionsJenPembayaran}
                                className='w-full mb-2 lg:w-[250px]'
                                name='jenPembayaran'
                                required
                                onChange={handleChangeJenPembayaran}
                                value={data.jenPembayaran}
                            />
                            <InputSelect
                                options={optionsPeriode}
                                className='w-full mb-2 lg:w-[150px]'
                                name='periode'
                                onChange={handleSearchChangePeriode}
                                value={data.periode}
                                />
                            <InputForm
                                type='text'
                                className='w-full lg:w-[200px]'
                                name='search'
                                value={data.user}
                                onChange={handleSearchChange}
                                placeholder='Cari Email / Nama Siswa ....'
                            />
                            <button type="submit" className="mb-2 bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins mt-4 py-1 px-4 rounded-[7px] lg:mt-0 lg:ml-2">
                                Search
                            </button>
                        </form>
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
                {tambahMode && (<TambahTransaksi open={tambahMode} datasFormulirOption={datasFormulirOption} handleChangeOpen={handleOpenModalTambah} datasUserOption={datasUserOption} datasJenPembayaranOption={datasJenPembayaranOption}/>)}
                {/* {editMode && (<EditTransaksi open={editMode} row={dataEdit} handleChangeOpen={handleCloseEdit} datasUserOption={datasUserOption} datasJenPembayaranOption={datasJenPembayaranOption}/>)} */}
            </div>
        </div>
    );
};

export default TransaksiPembayaran;
