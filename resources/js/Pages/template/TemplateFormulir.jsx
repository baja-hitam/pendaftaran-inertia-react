import { Card } from "../UI/organisms/Card";
import FormPendaftaranSiswa from "../UI/organisms/FormPendaftaranSiswa";
import TemplateSidebar from "./TemplateSidebar";

export const TemplateFormulir = ({datas}) => {
  return (
    <>
        <TemplateSidebar />
        <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">Formulir Pendaftaran Siswa/i Baru</p>
            <Card className={"w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"}>
                <FormPendaftaranSiswa datas={datas} />
            </Card>
        </div>
    </>
  )
}
