import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { Label } from "../../../UI/atoms/Label";
import { InputForm } from "../../../UI/molecules/InputForm";
const FormOtp = () => {
    const { data, setData, post } = useForm({
        otp: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    }
    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col">
                <Label htmlFor="otp" className="text-sm font-semibold mb-2">Masukkan Kode OTP yang telah dikirimkan ke whatsapp Anda</Label>
                <InputForm
                    className="w-full"
                    placeholder="Masukkan Kode OTP"
                    type="text"
                    maxLength="6"
                    required
                    value={data.otp}
                    onChange={(e) => setData('otp', e.target.value)}
                    name="otp"
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#226F54] text-white py-2 rounded-md hover:bg-[#1a4f3c] transition duration-200"
            >
                Verifikasi OTP
            </button>
        </form>
    );
}
export default FormOtp;