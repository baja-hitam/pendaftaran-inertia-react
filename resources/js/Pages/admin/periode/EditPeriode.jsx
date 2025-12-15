import React,{useState} from 'react';
import Flatpickr from "react-flatpickr";
import { useForm } from "@inertiajs/react";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";

import { Indonesian } from "flatpickr/dist/l10n/id.js"; // Lokal Bahasa Indonesia
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import InputSelect from "../../UI/atoms/InputSelect";

const EditPeriode = ({open,row,handleChangeOpen})=>{
    const [error, setError] = useState(null);
    const {data, setData, post} = useForm({
        startDate: row?.start_date,
        endDate: row?.end_date,
        status: row?.aktif
    });
    // console.log(data);
    
        const options = [
            { label: "Aktif", value: "T" },
            { label: "Tidak Aktif", value: "F" },
        ];
        const handleChangePeriode = (e) => {
            setData({...data, [e.target.name]: e.target.value});
        }
        const handleChangeStartDate = (_,dates) => {
            setData({ ...data, startDate: dates });
        }
        const handleChangeEndDate = (_,dates) => {
            setData({ ...data, endDate: dates });
        }
        const handleSubmitPeriode = (e) => {
            e.preventDefault();
            // Validasi tanggal
            if(data.startDate === "" || data.endDate === "") {
                setError("Tanggal mulai dan tanggal selesai harus diisi.");
                return;
            }
            // console.log(data);
            handleChangeOpen(false);
            post('/admin/periode/update')
        }
    return (
        <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Edit Periode"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitPeriode}>
                        <Label
                            htmlFor="startDate"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Tanggal Mulai *
                        </Label>
                        <Flatpickr
                        className="bg-[#ececec] rounded-lg h-[35px] w-full"
                        onChange={handleChangeStartDate}
                        value={data.startDate}
                        placeholder="Tanggal Buka Pendaftaran"
                        options={{ locale: Indonesian,dateFormat: "Y-m-d" }}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {error}
                            </p>
                        )}
                        <Label
                            htmlFor="endDate"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Tanggal Selesai *
                        </Label>
                        <Flatpickr
                        className="bg-[#ececec] rounded-lg h-[35px] w-full"
                        placeholder="Tanggal Tutup Pendaftaran"
                        onChange={handleChangeEndDate}
                        value={data.endDate}
                        options={{ locale: Indonesian,dateFormat: "Y-m-d",minDate: data.startDate }}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {error}
                            </p>
                        )}
                        <Label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Pilih Status Periode *
                        </Label>
                        <InputSelect
                            label="Pilih Bulan"
                            name="status"
                            value={data.status}
                            onChange={handleChangePeriode}
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
}
export default EditPeriode;