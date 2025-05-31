// import React from 'react'
import { useEffect, useState } from "react";
import { TemplateAuth } from "./template/TemplateAuth";
import { FormLogin } from "./UI/organisms/FormLogin";
import { Link,Head,usePage } from '@inertiajs/react';
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
      <TemplateAuth text="Assalamualaikum, Selamat Datang di Sistem Informasi Manajemen Penerimaan Peserta Didik Baru SMP Islam Plus Al Madinah" head="Login" text1="Silahkan Anda Login !">
        <FormLogin />
        <p className="text-sm mt-2 md:ml-3 lg:ml-0">
          Belum punya akun?<Link className="text-[#226F54]" href="/register">Daftar Disini !</Link>
        </p>
      </TemplateAuth>
    </div>
  );
};

export default Login;
