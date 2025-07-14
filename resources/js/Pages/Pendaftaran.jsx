import {TemplateFormulir} from "../Pages/template/TemplateFormulir"
import { Head,usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";
import { router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Pendaftaran = ({datas,statusPembayaran}) => {
    const MySwal = withReactContent(Swal);
    const {flash} = usePage().props;

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
    useEffect(() => {
        if(!statusPembayaran){
            MySwal.fire({
                title: <strong>Informasi</strong>,
                html: <i>Anda belum melakukan pembayaran formulir pendaftaran, silahkan lakukan pembayaran terlebih dahulu</i>,
                icon: 'info',
                confirmButtonText: 'OK',
                allowOutsideClick: false, // Tambahkan ini agar tidak bisa di-close jika klik di luar
            }).then((result) => {
                if (result.isConfirmed) {
                    router.get('/dashboard');
                }
            });
        }
    }, []);

    return (
    <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
        <Head>
            <title>Pendaftaran</title>
        </Head>
        <TemplateFormulir datas={datas}/>
        <ToastContainer/>
    </div>
    );
}
export default Pendaftaran;