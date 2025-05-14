import Sidebar from "../UI/organisms/Sidebar";
import { Card } from "../UI/organisms/Card";

export const TemplateDashboard = () => {
  return (
    <>
        <Sidebar/>
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-2xl font-poppins text-white xl:text-3xl">Alur Pendaftaran</p>
            <div className="flex flex-col gap-y-2.5 mt-3 sm:grid sm:grid-cols-2 sm:gap-3.5 xl:grid-cols-4 xl:gap-5">
                <Card>
                <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                  <p className="text-xl ml-3.5 mt-1 text-white">1</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-[250px] p-2.5">
                  <img className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                  <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                    Mengisi Formulir
                  </p>
                </div>
                </Card>
                <Card>
                <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                  <p className="text-xl ml-3.5 mt-1 text-white">2</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-[250px] p-2.5">
                  <img className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                  <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                    Mengerjakan Test Ujian
                  </p>
                </div>
                </Card>
                <Card>
                <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                  <p className="text-xl ml-3.5 mt-1 text-white">3</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-[250px] p-2.5">
                  <img className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                  <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                    Melakukan Pembayaran SPP 1 dan Pakaian
                  </p>
                </div>
                </Card>
                <Card>
                <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                  <p className="text-xl ml-3.5 mt-1 text-white">4</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-[250px] p-2.5">
                  <img className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                  <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                    Tunggu Pengumuman Tanggal Masuk
                  </p>
                </div>
                </Card>
            </div>
        </div>
    </>
  )
}
