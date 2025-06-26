import React,{useState} from 'react';
import Flatpickr from "react-flatpickr";
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import {InputForm} from '../../UI/molecules/InputForm';

import { Indonesian } from "flatpickr/dist/l10n/id.js"; // Lokal Bahasa Indonesia
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import InputSelect from "../../UI/atoms/InputSelect";
import Select from 'react-select';


const EditDetailUjian = ({open,handleChangeOpen,optionUjian,row}) => {
    const [error, setError] = useState(null);
    const {data, setData, post} = useForm({
        idDetailUjian: row.id_detail_ujian,
        waktuMulai: row.waktu_mulai,
        tanggalUjian: row.tanggal_ujian,
        waktuSelesai: row.waktu_selesai,
        selectedUjian: {
            value: row.id_ujian,
            label: row.nama_ujian
        },
        ruangUjian: row.ruang_ujian,
        status: row.caktif,
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
    const handleChangeWaktuMulai = (_,times) => {
        setData({ ...data, waktuMulai: times });
    }
    const handleChangeWaktuSelesai = (_,times) => {
        setData({ ...data, waktuSelesai: times });
    }
    const handleChangeTanggalUjian = (_,dates) => {
        setData({ ...data, tanggalUjian: dates });
    }
    const handleSubmitDetailUjian = (e) => {
        e.preventDefault();
        // Validasi tanggal
        if(data.startDate === "" || data.endDate === "") {
            setError("Tanggal mulai dan tanggal selesai harus diisi.");
            return;
        }
        // console.log(data);
        handleChangeOpen(false);
        post('/admin/ujian/detail/update')
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
                    title="Form Edit Detail Ujian"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitDetailUjian}>
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
                            htmlFor="tanggalUjian"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Tanggal Ujian *
                        </Label>
                        <Flatpickr
                            className="bg-[#ececec] rounded-lg h-[35px] w-full"
                            onChange={handleChangeTanggalUjian}
                            value={data.tanggalUjian}
                            placeholder="Tanggal Ujian"
                            options={{ locale: Indonesian, dateFormat: "Y-m-d" }}
                        />
                        <Label
                            htmlFor="waktuMulai"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Waktu Mulai *
                        </Label>
                        <Flatpickr
                        className="bg-[#ececec] rounded-lg h-[35px] w-full"
                        onChange={handleChangeWaktuMulai}
                        value={data.waktuMulai}
                        placeholder="Waktu Mulai Ujian"
                        options={{ locale: Indonesian,dateFormat: "H:i",enableTime: true,time_24hr: true,noCalendar: true }}
                        />
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                        <Label
                            htmlFor="endDate"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Waktu Selesai *
                        </Label>
                        <Flatpickr
                        className="bg-[#ececec] rounded-lg h-[35px] w-full"
                        placeholder="Waktu Selesai Ujian"
                        onChange={handleChangeWaktuSelesai}
                        value={data.waktuSelesai}
                        options={{ locale: Indonesian,dateFormat: "H:i",enableTime: true,time_24hr: true,noCalendar: true,minDate: data.waktuMulai }}
                        />
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                        <Label
                            htmlFor="ruangUjian"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Ruang Ujian *
                        </Label>
                        <InputForm
                            type='text'
                            className='w-full'
                            name='ruangUjian'
                            required
                            value={data.ruangUjian}
                            onChange={handleChangeForm}
                            placeholder='Ruang Ujian...'
                        />
                        <Label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Pilih Status Detail Ujian *
                        </Label>
                        <InputSelect
                            label="Pilih Detail"
                            name="status"
                            value={data.status}
                            onChange={handleChangeForm}
                            options={options}
                            required
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
)
}

export default EditDetailUjian;