import { Head } from "@inertiajs/react";
import { TemplateAuth } from "../template/TemplateAuth";
import { FormLogin } from "../UI/organisms/FormLogin";
const Login = () => {
    return (
        <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
        <Head>
          <title>Login</title>
        </Head>
          <TemplateAuth text="Assalamualaikum, Selamat Datang Admin di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" head="Login" text1="Silahkan Anda Login !">
            <FormLogin />
          </TemplateAuth>
        </div>
    );
}
export default Login;