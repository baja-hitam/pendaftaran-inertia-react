import { TemplateAuth } from "./template/TemplateAuth";
import { FormDaftar } from "./UI/organisms/FormDaftar";
import { Link,Head } from "@inertiajs/react";

const Daftar = () => {
  
  return (
    <div>
      <Head>
        <title>Daftar</title>
      </Head>
      <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
        <TemplateAuth text="Assalamualaikum, Selamat Datang di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" text1="Silahkan Anda Untuk Mendaftar !">
          <FormDaftar />
          <p className="text-sm mt-2">
            Sudah punya akun?{" "}
            <Link className="text-[#226F54]" href="/">
              Login Disini !
            </Link>
          </p>
        </TemplateAuth>
      </div>
    </div>
  );
};
export default Daftar;
