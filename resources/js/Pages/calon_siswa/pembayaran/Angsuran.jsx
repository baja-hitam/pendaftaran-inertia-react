import React,{useEffect, useState} from 'react';
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';
import Select from 'react-select';



const Angsuran = ({open,handleChangeOpen,datasJenPembayaranOption,periode}) => {
    const { data, setData, post } = useForm({
        selectedPembayaran: null,
        cicilan: '',
        periode: periode,
    });
    const optionsJenPembayaran = datasJenPembayaranOption.map(jen =>({
        value: jen.id_pembayaran,
        label: jen.nama_pembayaran+' - '+ new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(jen.total_pembayaran)
    }));

    // console.log(options);
    
    // console.log(data.selectedUser);
    
    const handleChangePembayaran = (e) => {
        setData({...data, selectedPembayaran: e});
    }
    const handleChangeCicilan = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Hanya ambil angka
        if (value == '0'){
            setData({...data, cicilan: ''}); // Jika 0, kosongkan input
            return;
        }
        setData({...data, cicilan: value}); // Simpan sebagai angka tanpa format
    }

    const handleSubmitCicilan = (e) => {
        e.preventDefault();

        handleChangeOpen(false);
        post('/buat-angsuran');
    }

return (
                <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Angsuran"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitCicilan}>
                        <Label
                            htmlFor="jenPembayaran"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Nama Pembayaran *
                        </Label>
                        <Select
                        options={optionsJenPembayaran}
                        required
                        value={data.selectedPembayaran}
                        onChange={handleChangePembayaran}
                        placeholder="Pilih Pembayaran..."
                        isSearchable
                        />
                        {data.selectedPembayaran != null && data.selectedPembayaran?.value != 1 && (
                        <>
                        <Label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Angsuran *
                        </Label>
                        <InputForm
                            type='text'
                            className='w-full bg-transparent'
                            name='dibayarkan'
                            required
                            maxLength={1}
                            value={data.cicilan}
                            onChange={handleChangeCicilan}
                            placeholder='Jumlah Angsuran...'
                        />
                        </>
                        )}
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
export default Angsuran;