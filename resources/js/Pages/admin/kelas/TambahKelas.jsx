import React from 'react';
import { useForm } from "@inertiajs/react";
import Modal from "../../UI/molecules/Modal";
import { Label } from "../../UI/atoms/Label";
import { InputForm } from '../../UI/molecules/InputForm';



const TambahKelas = ({open,handleChangeOpen}) => {
    const {data, setData, post} = useForm({
        kelas: "",
        max: "",
    });
    const handleChangeNumber = (e) => {
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
        setData({...data, max: value});
    }
    const handleChangeKelas = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmitKelas = (e) => {
        e.preventDefault();
        // console.log(data);
        handleChangeOpen(false);
        post('/admin/kelas/store');
    }

return (
                <Modal
                    isOpen={open}
                    onClose={() => handleChangeOpen(false)}
                    title="Form Tambah Kelas"
                    className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[40%] p-6 bg-white rounded-lg shadow-lg"
                >
                    <form onSubmit={handleSubmitKelas}>
                        <Label
                            htmlFor="kelas"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Kelas *
                        </Label>
                        <InputForm
                            type="text"
                            name="kelas"
                            className={"w-full"}
                            value={data.kelas}
                            onChange={handleChangeKelas}
                            placeholder="Masukkan Nama Kelas"
                            required
                        />
                        <Label
                            htmlFor="max"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Max *
                        </Label>
                        <InputForm
                            type="text"
                            className={"w-full"}
                            name="max"
                            value={data.max}
                            onChange={handleChangeNumber}
                            placeholder="Masukkan Maksimal Jumlah Siswa"
                            required
                            maxLength={2}
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
export default TambahKelas;