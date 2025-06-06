import React,{useState} from 'react';
import Flatpickr from "react-flatpickr";
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";

import { Indonesian } from "flatpickr/dist/l10n/id.js"; // Lokal Bahasa Indonesia
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';
import InputSelect from "../../UI/atoms/InputSelect";
import Select from 'react-select';



const TambahTransaksi = ({open,handleChangeOpen,datasUserOption,datasJenPembayaranOption}) => {
    const { data, setData, post } = useForm({
        selectedUser: null,
        selectedPembayaran: null,
        dibayarkan: ''
    });

    const optionsUser = datasUserOption.map(user =>({
        value: user.id_user,
        label: user.email
    }));
    const optionsJenPembayaran = datasJenPembayaranOption.map(jen =>({
        value: jen.id_pembayaran,
        label: jen.nama_pembayaran+' - '+ new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(jen.total_pembayaran)
    }))
    // console.log(options);
    
    // console.log(data.selectedUser);
    
    const handleChangeUser = (e) => {
        setData({...data, selectedUser: e});
    }
    const handleChangePembayaran = (e) => {
        setData({...data, selectedPembayaran: e});
    }
    const handleChangeFormatRupiah = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Hapus semua karakter non-digit

        // Jika angka pertama 0 dan panjang lebih dari 1, hapus angka 0 di depan
        if (value.length > 1 && value[0] === '0') {
            // Cari digit pertama yang bukan 0
            const firstNonZero = value.search(/[1-9]/);
            if (firstNonZero !== -1) {
                value = value.substring(firstNonZero);
            } else {
                value = '0'; // Jika semua 0, tetap 0
            }
        }

        // Tambahkan titik setiap 3 digit dari belakang
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setData({ ...data, [e.target.name]: value });
    }
    const handleSubmitPeriode = (e) => {
        e.preventDefault();

        // console.log(data);
        handleChangeOpen(false);
        post('/admin/transaksi-pembayaran/store');
    }

return (
                <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Transaksi Pembayaran"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitPeriode}>
                        <Label
                            htmlFor="emailUser"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Email User
                        </Label>
                        <Select
                        options={optionsUser}
                        value={data.selectedUser}
                        onChange={handleChangeUser}
                        placeholder="Pilih User...."
                        required
                        isSearchable
                        />
                        <Label
                            htmlFor="jenPembayaran"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Jenis Pembayaran
                        </Label>
                        <Select
                        options={optionsJenPembayaran}
                        required
                        value={data.selectedPembayaran}
                        onChange={handleChangePembayaran}
                        placeholder="Pilih Pembayaran..."
                        isSearchable
                        />
                        <Label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Dibayarkan
                        </Label>
                        <InputForm
                            type='text'
                            className='w-full bg-transparent'
                            name='dibayarkan'
                            required
                            value={data.dibayarkan}
                            onChange={handleChangeFormatRupiah}
                            placeholder='Jumlah Yang Dibayarkan...'
                        />
                    <button
                        type="submit"
                        className="bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins mt-4 py-2 px-4 rounded-[7px]"
                    >
                        Simpan
                    </button>
                    </form>
                </Modal>
)
}
export default TambahTransaksi;