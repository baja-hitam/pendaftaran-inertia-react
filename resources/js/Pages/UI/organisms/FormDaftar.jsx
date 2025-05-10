import { useState } from "react";
import { Button } from "../atoms/Button";
import { InputForm } from "../molecules/InputForm";
import { toast } from "react-toastify";

export const FormDaftar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noHandphone, setNoHandphone] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeNoHandphone = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setNoHandphone(value);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
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
          value={email}
          onChange={handleChangeEmail}
        />
        <InputForm
          label="No Handphone *"
          placeholder="Masukkan No Handphone"
          type="text"
          minLength="11"
          maxLength="13"
          required
          value={noHandphone}
          onChange={handleChangeNoHandphone}
        />
        <InputForm
          label="Password *"
          placeholder="Masukkan Password"
          type="password"
          minLength="8"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <Button type="submit">Daftar</Button>
      </form>
    </>
  );
};
