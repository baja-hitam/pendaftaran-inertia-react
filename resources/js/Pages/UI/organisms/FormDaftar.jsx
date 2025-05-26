import { useState } from "react";
import { Button } from "../atoms/Button";
import { InputForm } from "../molecules/InputForm";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { Label } from "../atoms/Label";

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
        <div className="mb-2">
          <Label label='Email Address *'>Email Address *</Label>
          <InputForm
          className={'lg:w-[250px]'}
            placeholder="Masukkan Email"
            type="email"
            minLength="8"
            required
            name="email"
            value={data.email}
            onChange={handleChangeFormDaftar}
          />
        </div>
        <div className="mb-2">
          <Label label='Password *'>Password *</Label>
          <InputForm
          className={'lg:w-[250px]'}
            label="Password *"
            placeholder="Masukkan Password"
            type="password"
            minLength="8"
            required
            name="password"
            value={data.password}
            onChange={handleChangeFormDaftar}
          />
        </div>
        <Button className={'w-full'} type="submit">Daftar</Button>
      </form>
    </>
  );
};
