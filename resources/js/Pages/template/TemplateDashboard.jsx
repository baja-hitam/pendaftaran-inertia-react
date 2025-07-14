import { Card } from "../UI/organisms/Card";
import TemplateSidebar from "./TemplateSidebar";

export const TemplateDashboard = ({datasDetailUjian}) => {
  const handleChangeParseDate = (date) => {
    // console.log(date);
    date = new Date(date);
    const tanggal = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
    return tanggal;
}
const handleChangeParseTime = (time) => {
    if (!time) return "";
    // Handle string in HH:mm:ss or HH:mm
    if (typeof time === "string") {
        const parts = time.split(":");
        if (parts.length >= 2) {
            // Only take hour and minute
            const hour = parts[0].padStart(2, "0");
            const minute = parts[1].padStart(2, "0");
            return `${hour}:${minute}`;
        }
    }
}
  return (
    <>
        <TemplateSidebar />
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">Dashboard</p>
            <Card className="w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[90%] lg:w-[90%] xl:w-[90%]">
                <p className="text-lg font-poppins text-gray-800 font-bold">Informasi Pelaksanaan Ujian</p>
                <p><i>Cetak kartu peserta pada menu formulir untuk mengikuti pelaksanaan ujian di SMP ISLAM PLUS AL MADINAH</i></p>
                {
                  datasDetailUjian.map((ujian, index) => (
                    <div key={index} className="mt-4">
                        <p className="text-md font-poppins text-gray-800 font-bold">{index+1}. {ujian.nama_ujian}</p>
                        <table>
                          <thead>
                          <tr>
                            <td>
                              <p className="text-md font-poppins text-gray-800">Tanggal Ujian</p>
                            </td>
                            <td className="px-2">:</td>
                            <td>
                              <p className="text-md font-poppins text-gray-800">{handleChangeParseDate(ujian.tanggal_ujian)}</p>
                            </td>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>
                              <p className="text-md font-poppins text-gray-800">Ruang Ujian</p>
                            </td>
                            <td className="px-2">:</td>
                            <td>
                              <p className="text-md font-poppins text-gray-800">{ujian.ruang_ujian}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="text-md font-poppins text-gray-800">Waktu Mulai Ujian</p>
                            </td>
                            <td className="px-2">:</td>
                            <td>
                              <p className="text-md font-poppins text-gray-800">{handleChangeParseTime(ujian.waktu_mulai)}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="text-md font-poppins text-gray-800">Waktu Selesai Ujian</p>
                            </td>
                            <td className="px-2">:</td>
                            <td>
                              <p className="text-md font-poppins text-gray-800">{handleChangeParseTime(ujian.waktu_selesai)}</p>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                    </div>
                  ))
                }
            </Card>
        </div>
    </>
  )
}
