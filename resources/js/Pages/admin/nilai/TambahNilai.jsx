import React,{useState} from 'react';
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import {InputForm} from '../../UI/molecules/InputForm';
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import Select from 'react-select';


const TambahNilai = ({open,handleChangeOpen,optionUjian}) => {
    const [error, setError] = useState(null);
    const {data, setData, post} = useForm({
        waktuMulai: "",
        tanggalUjian:"",
        waktuSelesai: "",
        selectedUjian: null,
        ruangUjian: "",
        status: "",
    });
    const options = [
        { label: "Aktif", value: "T" },
        { label: "Tidak Aktif", value: "F" },
    ];
    const optionsUjian = optionUjian.map(ujian =>({
        value: ujian.id_ujian,
        label: ujian.nama_ujian
    }));
    const handleChangeForm = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmitNilai = (e) => {
        e.preventDefault();
        // Validasi tanggal
        // console.log(data);
        handleChangeOpen(false);
        post('/admin/ujian/detail/store')
    }
    const colorStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: '#ececec',
            border: '1px solid #d1d5db',
        }),
    }

return (
                <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Entri Nilai"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitNilai}>
                        <Label
                            htmlFor="ujian"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Pilih Ujian *
                        </Label>
                        <Select
                        options={optionsUjian}
                        value={data.selectedUjian}
                        styles={colorStyles}
                        onChange={(e) => setData({...data, selectedUjian: e})}
                        />
                        <Label
                            htmlFor="nilai"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Nilai *
                        </Label>
                        <InputForm
                            type='text'
                            className='w-full'
                            name='nilai'
                            required
                            value={data.nilai}
                            onChange={handleChangeForm}
                            placeholder='Nilai...'
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

export default TambahNilai;