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


const TambahNilai = ({open,handleChangeOpen,optionUjian,noPeserta}) => {
    const [error, setError] = useState(null);
    const [count,setCount] = useState(1);
    const {data, setData, post} = useForm([
        {
            selectedUjian: null,
            nilai: 0,
            noPeserta: noPeserta
        }
    ]);
    const MySwal = withReactContent(Swal);
    const optionsUjian = optionUjian.map(ujian =>({
        value: ujian.id_ujian,
        label: ujian.nama_ujian
    }));
    const handleSelectUjian = (e,index) => {
        const newData = [...data];
        newData[index].selectedUjian = e;
        setData(newData);
    }
    const handleChangeNilai = (e,index)=>{
        let value = e.target.value.replace(/\D/g, ''); // Hanya ambil angka
        const newData = [...data];
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
        newData[index].nilai = value;
        setData(newData);
    }
    const handleAdd = () => {
        setData([...data, { selectedUjian: null, nilai: '',noPeserta: noPeserta }]);
        setCount(count + 1);
    }
    const handleRemove = () => {
        if (data.length > 1) {
            const newData = [...data];
            newData.pop();
            setData(newData);
            setCount(count - 1);
        } else {
            MySwal.fire({
                icon: 'warning',
                title: 'Tidak Bisa Menghapus',
                text: 'Minimal harus ada satu baris entri nilai.',
            });
        }
    }
    const handleSubmitNilai = (e) => {
        e.preventDefault();
        // Validasi tanggal
        // console.log(data);
        handleChangeOpen(false);
        post('/admin/nilai/store')
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
                        {data.map((item, index) => (
                            <div key={index} className="mb-4">
                                <Label
                                htmlFor="ujian"
                                className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                Pilih Ujian *
                                </Label>
                                <Select
                                options={optionsUjian}
                                value={item.selectedUjian}
                                styles={colorStyles}
                                onChange={(e) => handleSelectUjian(e, index)}
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
                                    value={item.nilai}
                                    onChange={(e) => handleChangeNilai(e, index)}
                                    placeholder='Nilai...'
                                />
                            </div>
                        ))}
                    <button
                        type="submit"
                        className="bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins mt-4 py-2 px-4 rounded-[7px]"
                    >
                        Simpan
                    </button>
                    {count < 3 && (<button type="button"  onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 ml-2 cursor-pointer text-white font-poppins mt-4 py-2 px-4 rounded-[7px]">Tambah Baris</button>)}
                    {count > 0 && (<button type="button"  onClick={handleRemove} className="bg-red-500 hover:bg-red-600 active:bg-red-700 ml-2 cursor-pointer text-white font-poppins mt-4 py-2 px-4 rounded-[7px]">Hapus Baris</button>)}
                    </form>
                </Modal>
)
}

export default TambahNilai;