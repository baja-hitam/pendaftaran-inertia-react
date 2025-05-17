import Sidebar from "../UI/organisms/Sidebar";
import { Card } from "../UI/organisms/Card";

export const TemplateDashboard = () => {
  return (
    <>
        <Sidebar/>
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-2xl font-poppins text-white xl:text-3xl">Formulir Pendaftaran</p>
            <Card>
                
            </Card>
        </div>
    </>
  )
}
