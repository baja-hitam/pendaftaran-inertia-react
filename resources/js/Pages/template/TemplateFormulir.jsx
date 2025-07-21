import { Card } from "../UI/organisms/Card";
import FormPendaftaranSiswa from "../UI/organisms/FormPendaftaranSiswa";
import FormPendaftaranOrangTua from "../UI/organisms/FormPendaftaranOrangTua";
import TemplateSidebar from "./TemplateSidebar";
import { useState } from "react";
import { FaPrint } from "react-icons/fa";

export const TemplateFormulir = ({ datas }) => {
        const [siswa, setSiswa] = useState(true);
        const [orangTua, setOrangTua] = useState(false);

        const handleSiswaClick = () => {
            setSiswa(true);
            setOrangTua(false);
        }
        const handleOrangTuaClick = () => {
            setSiswa(false);
            setOrangTua(true);
        }
    return (
        <>
            <TemplateSidebar />
            <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
                <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">
                    Formulir Pendaftaran Siswa/i Baru
                </p>
                <Card
                    className={
                        "w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"
                    }
                >
                    <div className="flex items-center flex-row gap-4">
                        <div className={"w-full text-center md:text-lg hover:cursor-pointer hover:text-[#226F54] "+(siswa == true ? "border-b-4 border-[#226F54]":"")} onClick={handleSiswaClick}>Siswa</div>
                        <div className={"w-full text-center md:text-lg hover:cursor-pointer hover:text-[#226F54] "+(orangTua == true ? "border-b-4 border-[#226F54]":"")} onClick={handleOrangTuaClick}>Orang Tua</div>
                    </div>
                    {siswa && <FormPendaftaranSiswa datas={datas} />}
                    {orangTua && <FormPendaftaranOrangTua datas={datas} />}
                </Card>
            </div>
        </>
    );
};
