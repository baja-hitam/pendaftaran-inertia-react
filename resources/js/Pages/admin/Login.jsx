import { Head,usePage, } from "@inertiajs/react";
import { TemplateAuth } from "../template/TemplateAuth";
import { FormLoginAdmin } from "../UI/organisms/FormLogin";
import React,{useEffect} from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.status == 'success') {
      toast.success(flash.message,{
        autoClose: 500,
        position: 'top-center'
      });
    }else if (flash.status == 'error') {
      toast.error(flash.message,{
        autoClose: 500,
        position: 'top-center'
      });
    }
  },[flash])
  
    return (
        <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
        <Head>
          <title>Login</title>
        </Head>
          <TemplateAuth text="Assalamualaikum, Selamat Datang Admin di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" head="Login" text1="Silahkan Anda Login !">
            <FormLoginAdmin />
          </TemplateAuth>
        </div>
    );
}
export default Login;