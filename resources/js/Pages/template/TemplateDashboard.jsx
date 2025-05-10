import Sidebar from "../UI/organisms/Sidebar";
import { Card } from "../UI/organisms/Card";

export const TemplateDashboard = () => {
  return (
    <>
        <Sidebar/>
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-2xl font-poppins text-white xl:text-3xl">Alur Pendaftaran</p>
            <div className="flex flex-col gap-y-2.5 mt-3 sm:grid sm:grid-cols-2 sm:gap-3.5 xl:grid-cols-4 xl:gap-5">
                <Card nomor='1' text='Mengisi Formulir'>
                <img className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                </Card>
                <Card nomor='2' text='Mengerjakan Test Ujian'/>
                <Card nomor='3' text='Melakukan Pembayaran SPP 1 dan Pakaian'/>
                <Card nomor='4' text='tunggu pengumuman tanggal masuk'/>
            </div>
        </div>
    </>
  )
}
