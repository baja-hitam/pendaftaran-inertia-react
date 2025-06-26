import FormOtp from "./FormOtp";
import {Head,Link} from "@inertiajs/react";
import {TemplateAuth} from "../../../template/TemplateAuth";
const Otp = ({otp}) => {
    return (
        <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
        <Head>
            <title>OTP</title>
        </Head>
        <TemplateAuth text="Assalamualaikum, Selamat Datang di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" head="OTP" text1="Silahkan Anda Masukkan Kode OTP !">
            <FormOtp />
            <p className="text-sm mt-2 md:ml-3 lg:ml-0">
            Belum menerima kode OTP?{" "}
            <Link className="text-[#226F54]" href="/otp/daftar/kirim-ulang">
                Kirim Ulang Kode OTP
            </Link>
            </p>
        </TemplateAuth>
        </div>
    );
}
export default Otp;