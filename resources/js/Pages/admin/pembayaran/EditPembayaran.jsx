import React, { use, useState,useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';
import InputSelect from "../../UI/atoms/InputSelect";

const EditPembayaran = ({ open, row, handleChangeOpen }) => {
    const { data, setData, post } = useForm({
        id: '',
        namaPembayaran: '',
        totalPembayaran: '',
        status: '',
    });
    useEffect(() => {
            setData({
                id: row.id_pembayaran,
                namaPembayaran: row.nama_pembayaran,
                totalPembayaran: handleFormatRupiah(row.total_pembayaran.toString()),
                status: row.aktif,
            });
    },[]);
    const handleFormatRupiah = (value) => {
        // Jika angka pertama 0 dan panjang lebih dari 1, hapus angka 0 di depan
        if (value.length > 1 && value[0] === "0") {
            // Cari digit pertama yang bukan 0
            const firstNonZero = value.search(/[1-9]/);
            if (firstNonZero !== -1) {
                value = value.substring(firstNonZero);
            } else {
                value = "0"; // Jika semua 0, tetap 0
            }
        }

        // Tambahkan titik setiap 3 digit dari belakang
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return value;
    };
        
    const options = [
        { label: "Aktif", value: "T" },
        { label: "Tidak Aktif", value: "F" },
    ];
    const handleChangePembayaran = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleChangeFormatRupiah = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Hapus semua karakter non-digit

        // Jika angka pertama 0 dan panjang lebih dari 1, hapus angka 0 di depan
        if (value.length > 1 && value[0] === "0") {
            // Cari digit pertama yang bukan 0
            const firstNonZero = value.search(/[1-9]/);
            if (firstNonZero !== -1) {
                value = value.substring(firstNonZero);
            } else {
                value = "0"; // Jika semua 0, tetap 0
            }
        }

        // Tambahkan titik setiap 3 digit dari belakang
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setData({ ...data, totalPembayaran: value });
    };
    const handleSubmitPeriode = (e) => {
        e.preventDefault();
        // console.log(data);
        handleChangeOpen();
        post("/admin/pembayaran/update");
    };
    return (
        <Modal
            isOpen={open}
            onClose={handleChangeOpen}
            title="Form Edit Pembayaran"
            className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
        >
            <form onSubmit={handleSubmitPeriode}>
                <Label
                    htmlFor="namaPembayaran"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Nama Pembayaran *
                </Label>
                <InputForm
                    type="text"
                    name="namaPembayaran"
                    className={"w-full"}
                    value={data.namaPembayaran}
                    onChange={handleChangePembayaran}
                    placeholder="Nama Pembayaran"
                    required
                />
                <Label
                    htmlFor="totalPembayaran"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Total Pembayaran *
                </Label>
                <InputForm
                    type="text"
                    className={"w-full"}
                    name="totalPembayaran"
                    value={data.totalPembayaran}
                    onChange={handleChangeFormatRupiah}
                    placeholder="Total Pembayaran"
                    required
                    maxLength={10}
                />
                <Label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Pilih Status Master Pembayaran *
                </Label>
                <InputSelect
                    label="Pilih Bulan"
                    name="status"
                    value={data.status}
                    onChange={handleChangePembayaran}
                    options={options}
                    className="w-60"
                />
                <button
                    type="submit"
                    className="bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins mt-4 py-2 px-4 rounded-[7px]"
                >
                    Simpan
                </button>
            </form>
        </Modal>
    );
};
export default EditPembayaran;
