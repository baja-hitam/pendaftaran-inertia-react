import { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { toast } from "react-toastify";
import { Button } from "../atoms/Button";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
          label="Password *"
          placeholder="Masukkan Password"
          type="password"
          minLength="8"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
