import { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { toast } from "react-toastify";
import { Button } from "../atoms/Button";
import { Label } from "../atoms/Label";
import { useForm } from "@inertiajs/react";

export const FormLogin = () => {
    const {data, setData, post} = useForm({
      email: '',
      password: '',
    });
    const handleChangeFormLogin = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
    const submitLogin = (e) => {
      e.preventDefault();
      post("/login");
    };
  return (
    <>
      <form onSubmit={submitLogin}>
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
            onChange={handleChangeFormLogin}
          />
        </div>
        <div className="mb-2">
          <Label label='Password *'>Password *</Label>
          <InputForm
            className={'lg:w-[250px]'}
            placeholder="Masukkan Password"
            type="password"
            minLength="8"
            name="password"
            required
            value={data.password}
            onChange={handleChangeFormLogin}
          />
        </div>
        <Button className={'w-full'} type="submit">Login</Button>
      </form>
    </>
  );
};
