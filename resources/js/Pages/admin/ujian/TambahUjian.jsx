import React,{useState} from 'react';
import { useForm } from "@inertiajs/react";
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';

const TambahUjian = ({open,handleChangeOpen}) => {
    const { data, setData, post } = useForm({
        namaUjian: "",
    });
    const handleChangeUjian = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmitPeriode = (e) => {
        e.preventDefault();

        // console.log(data);
        handleChangeOpen(false);
        post('/admin/ujian/store');
    }
    return (
        <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Tambah Ujian"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitPeriode}>
                        <Label
                            htmlFor="namaUjian"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                        Nama Ujian *
                        </Label>
                        <InputForm
                            type='text'
                            className='w-full bg-transparent'
                            name='namaUjian'
                            required
                            value={data.namaUjian}
                            onChange={handleChangeUjian}
                            placeholder='Nama Ujian...'
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
export default TambahUjian;