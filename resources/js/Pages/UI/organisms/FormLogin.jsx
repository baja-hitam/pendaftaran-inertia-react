import { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { toast } from "react-toastify";
import { Button } from "../atoms/Button";
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
        <InputForm
          label="Email Address *"
          placeholder="Masukkan Email"
          type="email"
          minLength="8"
          required
          name="email"
          value={data.email}
          onChange={handleChangeFormLogin}
        />
        <InputForm
          label="Password *"
          placeholder="Masukkan Password"
          type="password"
          minLength="8"
          name="password"
          required
          value={data.password}
          onChange={handleChangeFormLogin}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
