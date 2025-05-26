import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { useForm } from "@inertiajs/react";
import { Label } from "../atoms/Label";
import { InputRadio } from "../atoms/InputRadio";

const FormPendaftaranSiswa = () => {
    const {data, setData, post} = useForm({
        namaSiswa: '',
        namaPanggilan: '',
        jenisKelamin: '',
        tempatLahir: '',
        tanggalLahir: '',
        agama:'',
        kewarganegaraan:'',
        anakKeBerapa:'',
        jmlKandung:'',
        jmlTiri:'',
        jmlAngkat:'',
        statusAnak:'',
        bahasa:'',
        alamat:'',
        noKK:'',
      });

    function handleChangePendaftaran (e){
        setData({
            ...data,[e.target.name]:e.target.value,
        });
    }
    function handleChangeNumber(e){
      const cleanedValue = e.target.value.replace(/[^0-9]/g, '');
      setData({
        ...data,[e.target.name]:cleanedValue,
      })
    }
    function submitFormPendaftaran(e){
        e.preventDefault();
        console.log(data);
        
    }

    return (
    <>
          <form onSubmit={submitFormPendaftaran}>
            <p className="text-xl text-[#226F54] font-extrabold">KETERANGAN PRIBADI</p>
            <Label>Nama Lengkap Siswa *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nama"
              type="text"
              required
              name="namaSiswa"
              value={data.namaSiswa}
              onChange={handleChangePendaftaran}
            />
            <Label>Nama Panggilan *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nama Panggilan"
              type="text"
              name="namaPanggilan"
              required
              value={data.namaPanggilan}
              onChange={handleChangePendaftaran}
            />
            <Label>Jenis Kelamin *</Label>
            <InputRadio
            name='jenisKelamin'
            id='L'
            value='L'
            required
            label='Laki-laki'
            onChange={handleChangePendaftaran}
            />
            <InputRadio
            name='jenisKelamin'
            id='P'
            value='P'
            required
            label='Perempuan'
            onChange={handleChangePendaftaran}
            />
            <Label>Tempat Lahir *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Tempat Lahir"
              type="text"
              name="tempatLahir"
              required
              value={data.tempatLahir}
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal Lahir *</Label>
            <InputForm
            className={'w-56'}
              type="date"
              name="tanggalLahir"
              required
              value={data.tanggalLahir}
              onChange={handleChangePendaftaran}
            />
            <Label>Agama *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Agama"
              type="text"
              name="agama"
              required
              value={data.agama}
              onChange={handleChangePendaftaran}
            />
            <Label>Kewarganegaraan *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Kewarganegaraan"
              type="text"
              name="kewarganegaraan"
              required
              value={data.kewarganegaraan}
              onChange={handleChangePendaftaran}
            />
            <Label>Anak ke berapa *</Label>
            <InputForm
            className={'w-56'}
              placeholder="Masukkan Anak ke berapa"
              type="text"
              maxLength="2"
              name="anakKeBerapa"
              required
              value={data.anakKeBerapa}
              onChange={handleChangeNumber}
            />
            <Label>Jumlah Saudara Kandung *</Label>
            <InputForm
            className={'w-72'}
              placeholder="Masukkan Jumlah Saudara Kandung"
              type="text"
              name="jmlKandung"
              maxLength='2'
              required
              value={data.jmlKandung}
              onChange={handleChangeNumber}
            />
            <Label>Jumlah Saudara Tiri</Label>
            <InputForm
            className={'w-72'}
              placeholder="Masukkan Jumlah Saudara Tiri"
              type="text"
              name="jmlTiri"
              maxLength='2'
              value={data.jmlTiri}
              onChange={handleChangeNumber}
            />
            <Label>Jumlah Saudara Angkat</Label>
            <InputForm
            className={'w-72'}
              placeholder="Masukkan Jumlah Saudara Angkat"
              type="text"
              name="jmlAngkat"
              maxLength='2'
              value={data.jmlAngkat}
              onChange={handleChangeNumber}
            />
            <Label>Anak Yatim/Piatu/Yatim Piatu</Label>
            <InputForm
            className={'w-72'}
              placeholder="Masukkan Yatim/Piatu/Yatim Piatu"
              type="text"
              name="statusAnak"
              value={data.statusAnak}
              onChange={handleChangePendaftaran}
            />
            <Label>Bahasa Sehari-hari dirumah *</Label>
            <InputForm
            className={'w-72'}
              placeholder="Masukkan Bahasa Yang Dipakai Dirumah"
              type="text"
              name="bahasa"
              required
              value={data.bahasa}
              onChange={handleChangePendaftaran}
            />
            <br/>
            <p className="text-xl text-[#226F54] font-extrabold">KETERANGAN TEMPAT TINGGAL</p>
            <Label>Alamat *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Alamat Rumah"
              type="text"
              name="alamat"
              required
              value={data.alamat}
              onChange={handleChangePendaftaran}
            />
            <Label>No. Kartu Keluarga *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Nomor Kartu Keluarga"
              type="text"
              name="noKK"
              maxLength='16'
              required
              value={data.noKK}
              onChange={handleChangeNumber}
            />
            <Button className={'w-full'} type="submit">Submit</Button>
          </form>
        </>
    );
}
export default FormPendaftaranSiswa;