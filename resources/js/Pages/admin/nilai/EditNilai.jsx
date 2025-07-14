import React,{useState} from 'react';
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import {InputForm} from '../../UI/molecules/InputForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import Select from 'react-select';


const EditNilai = ({open,handleChangeOpen,optionUjian,row,noPeserta}) => {
    const [error, setError] = useState(null);
    const {data, setData, post} = useForm({
        selectedUjian: {value: row.id_ujian, label: row.nama_ujian},
        nilai: row.nilai,
        idNilai: row.id_nilai,
        noPeserta: noPeserta
    });
    const MySwal = withReactContent(Swal);
    const optionsUjian = optionUjian.map(ujian =>({
        value: ujian.id_ujian,
        label: ujian.nama_ujian
    }));
    const handleSelectUjian = (e) => {
        const newData = {...data};
        newData.selectedUjian = e;
        setData(newData);
    }
    const handleChangeNilai = (e)=>{
        let value = e.target.value.replace(/\D/g, ''); // Hanya ambil angka
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
                if (value > 100 || value < 0 || value === '') {
                    value = 0; // Jika nilai lebih dari 100 atau kurang dari 0, set ke 0
                }
        setData({...data, nilai: value});
    }
    const handleSubmitNilai = (e) => {
        e.preventDefault();
        // Validasi tanggal
        // console.log(data);
        handleChangeOpen();
        post('/admin/nilai/update')
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
                    onClose={handleChangeOpen}
                    title="Form Update Nilai"
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
                                onChange={handleSelectUjian}
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
                                    maxLength={3}
                                    value={data.nilai}
                                    onChange={handleChangeNilai}
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

export default EditNilai;