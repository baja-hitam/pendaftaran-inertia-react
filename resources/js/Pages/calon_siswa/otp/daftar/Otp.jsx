import FormOtp from "./FormOtp";
import { useEffect } from "react";
import {Head,Link,usePage} from "@inertiajs/react";
import {TemplateAuth} from "../../../template/TemplateAuth";
import { toast,ToastContainer } from "react-toastify";
const Otp = ({otp}) => {
    const { flash } = usePage().props;
    useEffect(() => {
        if(flash.success != null){
            toast.success(flash.success, {
                autoClose: 500,
                position: 'top-center'
            });
        }else if(flash.error != null){
            toast.error(flash.error, {
                autoClose: 500,
                position: 'top-center'
            });
        }
    },[flash])

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
        <ToastContainer />
        </div>
    );
}
export default Otp;