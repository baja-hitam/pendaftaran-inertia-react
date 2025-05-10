import { useState } from "react";
import { Button } from "../atoms/Button";
import { InputForm } from "../molecules/InputForm";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export const FormDaftar = () => {
  const {data, setData, post} = useForm({
    email: '',
    password: '',
  });

const handleChangeFormDaftar = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
const submitDaftar = (e) => {
    e.preventDefault();
    post("/register");
  };
  return (
    <>
      <form onSubmit={submitDaftar}>
        <InputForm
          label="Email Address *"
          placeholder="Masukkan Email"
          type="email"
          minLength="8"
          required
          name="email"
          value={data.email}
          onChange={handleChangeFormDaftar}
        />
        <InputForm
          label="Password *"
          placeholder="Masukkan Password"
          type="password"
          minLength="8"
          required
          name="password"
          value={data.password}
          onChange={handleChangeFormDaftar}
        />
        <Button type="submit">Daftar</Button>
      </form>
    </>
  );
};
