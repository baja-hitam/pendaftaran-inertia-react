import { Card } from "../UI/organisms/Card";
import TemplateSidebar from "./TemplateSidebar";

export const TemplateDashboard = () => {
  return (
    <>
        <TemplateSidebar />
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">Alur Pendaftaran</p>
            <div className="flex flex-col gap-y-2.5 mt-3 sm:grid sm:grid-cols-2 sm:gap-3.5 xl:grid-cols-4">
                <Card className={"w-[90%] h-[170px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%]"}>
                  <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                    <p className="text-xl ml-3.5 mt-1 text-white">1</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-full p-2.5">
                    <img className="w-[100px] h-[100px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                    <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                      Mengisi Formulir
                    </p>
                  </div>
                </Card>
                <Card className={"w-[90%] h-[170px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%]"}>
                  <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                    <p className="text-xl ml-3.5 mt-1 text-white">2</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-full p-2.5">
                    <img className="w-[100px] h-[100px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                    <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                      Mengerjakan Test Ujian
                    </p>
                  </div>
                </Card>
                <Card className={"w-[90%] h-[170px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%]"}>
                  <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                    <p className="text-xl ml-3.5 mt-1 text-white">3</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-full p-2.5">
                    <img className="w-[100px] h-[100px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
                    <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
                      Melakukan Pembayaran SPP 1 dan Pakaian
                    </p>
                  </div>
                </Card>
                <Card className={"w-[90%] h-[170px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%]" }>
                  <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
                    <p className="text-xl ml-3.5 mt-1 text-white">4</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-full p-2.5">
                    <img className="w-[100px] h-[100px]" src="https://img.icons8.com/stickers/100/fill-in-form.png" alt="fill-in-form"/>
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
