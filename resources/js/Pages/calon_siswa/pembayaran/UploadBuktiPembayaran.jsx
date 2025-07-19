import React,{useState} from 'react';
import { useForm } from "@inertiajs/react";
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';
import FileUploader from '../../UI/molecules/FileUploader';
import { router } from '@inertiajs/react';

const UploadBuktiPembayaran = ({open,handleChangeOpen,idTransaksiPembayaran}) => {
    const handleSubmit = (file) => {
        router.post('/upload-bukti', {
            idTransaksiPembayaran: idTransaksiPembayaran,
            file: file,
        });
    }
    return (
        <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Upload Bukti Pembayaran"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                        <FileUploader onSubmit={handleSubmit} handleChangeOpen={handleChangeOpen}/>
                </Modal>
    );
}
export default UploadBuktiPembayaran;