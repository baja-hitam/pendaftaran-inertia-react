import { TemplateAuth } from "./template/TemplateAuth";
import { FormDaftar } from "./UI/organisms/FormDaftar";
import { Link,Head,usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";


const Daftar = () => {
    const { flash } = usePage().props;
    
    useEffect(() => {
      if (flash.status == 'error') {
        // console.log(flash.message);
        
        toast.error(flash.message, {
          autoClose: 1000,
          position: 'top-center'
        });
      }
    },[flash])

  return (
    <div>
      <Head>
        <title>Daftar</title>
      </Head>
      <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
        <TemplateAuth text="Assalamualaikum, Selamat Datang di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" head="Daftar" text1="Silahkan Anda Untuk Mendaftar !">
          <FormDaftar />
          <p className="text-sm mt-2">
            Sudah punya akun?{" "}
            <Link className="text-[#226F54]" href="/login">
              Login Disini !
            </Link>
          </p>
        </TemplateAuth>
      </div>
    </div>
  );
};
export default Daftar;
