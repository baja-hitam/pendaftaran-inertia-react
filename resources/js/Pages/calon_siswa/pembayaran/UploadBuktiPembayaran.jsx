import React,{useState} from 'react';
import { useForm } from "@inertiajs/react";
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';
import FileUploader from '../../UI/molecules/FileUploader';

const UploadBuktiPembayaran = ({open,handleChangeOpen}) => {
    const { data, setData, post } = useForm();
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
                    title="Form Upload Bukti Pembayaran"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitPeriode}>
                        <FileUploader/>
                    </form>
                </Modal>
    );
}
export default UploadBuktiPembayaran;