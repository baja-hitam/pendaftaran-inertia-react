// import React from 'react'
import { TemplateAuth } from "./template/TemplateAuth";
import { FormLogin } from "./UI/organisms/FormLogin";
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react'

const Login = () => {
  return (
    <div className="flex justify-center items-center bg-[#226F54] min-h-screen">
    <Head>
      <title>Login</title>
    </Head>
      <TemplateAuth text="Assalamualaikum, Selamat Datang di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" text1="Silahkan Anda Login !">
        <FormLogin />
        <p className="text-sm mt-2 md:ml-3 lg:ml-0">
          Belum punya akun?<Link className="text-[#226F54]" href="/register">Daftar Disini !</Link>
        </p>
      </TemplateAuth>
    </div>
  );
};

export default Login;
