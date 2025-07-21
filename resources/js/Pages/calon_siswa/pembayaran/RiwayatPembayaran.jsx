import { Head, usePage, router } from "@inertiajs/react";
import { Card } from "../../UI/organisms/Card";
import React, { useState,useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import TemplateSidebar from "../../template/TemplateSidebar";
import { toast,ToastContainer } from "react-toastify";
import Angsuran from "./Angsuran";
import  InputSelect  from "../../UI/atoms/InputSelect";


const RiwayatPembayaran = ({datas,periode,periodeSession}) => {
    const { flash } = usePage().props;
    const [data, setData] = useState({
        periode: ''
    });
    const handleSearchChangePeriode = (e) => {
        setData({
            ...data,
            periode: e.target.value
        });
        router.get('/riwayat-pembayaran', {periode: e.target.value});
    }
    useEffect(() => {
        setData({
            periode: periodeSession
        });
    }, []);
    const [angsuranModal, setAngsuranModal] = useState(false);
    const optionsPeriode = periode.map(user => ({
        value: user.periode,
        label: user.periode.slice(0, 4) + "/" + user.periode.slice(4)
    }));
    const optionPeriodeTest = [...optionsPeriode, { value: '20262027', label: '2026/2027' }];
    const handleChangeAngsuranModal = (o) => {
        setAngsuranModal(o);
    }
    const handleChangeDetailRiwayatPembayaran = (id) => {
        // console.log(data.periode);
        
        if(data.periode === ''){
            toast.error('Periode tidak boleh kosong', {
                autoClose: 500,
                position: 'top-center'
            });
            return;
        }
        router.get('/riwayat-pembayaran/detail', {id: id, periode: data.periode});
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
            name:"Nama Pembayaran",
            selector: (row) => row.nama_pembayaran,
            wrap: true,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <>
                {
                    (row.status == 0) && (
                        <button
                        className="bg-[#226F54] py-1 px-3 mr-3 text-white rounded-md hover:bg-[#1a5b45]"
                        onClick={() => router.post('/create-kwitansi',{id_pembayaran: row.id_pembayaran, periode: data.periode})}
                        >
                            Buat Kwitansi
                        </button>
                    )
                }
                <button
                    className="bg-blue-600 py-1 px-3 text-white rounded-md hover:bg-blue-700"
                    onClick={() => handleChangeDetailRiwayatPembayaran(row.id_pembayaran)}
                >
                    Detail
                </button>
                </>
            ),
        }
    ];

    return (
        <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
            <Head>
                <title>Kwitansi Pembayaran</title>
            </Head>
            <TemplateSidebar />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins mb-3 text-white sm:text-2xl xl:text-3xl">
                    Kwitansi Pembayaran
                </p>
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
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
                        className="bg-[#226F54] py-1 px-3 text-sm mr-3 text-white rounded-md hover:bg-[#1a5b45]"
                        onClick={() => handleChangeAngsuranModal(true)}
                        >
                            Ajukan Angsuran
                    </button>
                    <DataTable
                        columns={columns}
                        data={datas}
                        theme="custom"
                        customStyles={customStyles}
                        noDataComponent={<i>Tidak Ada Riwayat Pembayaran</i>}
                    />
                </Card>
                {angsuranModal && (
                    <Angsuran
                        open={angsuranModal}
                        handleChangeOpen={handleChangeAngsuranModal}
                        datasJenPembayaranOption={datas}
                        periode={data.periode}
                    />
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default RiwayatPembayaran;
