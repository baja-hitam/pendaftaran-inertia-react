import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { useForm } from "@inertiajs/react";
import { Label } from "../atoms/Label";
import InputSelect from "../atoms/InputSelect";
import { useEffect } from "react";

const FormPendaftaranOrangTua = ({datas}) => {
    const {data, setData, post} = useForm({
      idOrangTuaWali: datas?.id_orangtua_wali || '',
      namaAyah: datas?.nama_ayah || '',
      tempatLahirAyah: datas?.tempat_lahir_ayah || '',
      tanggalLahirAyah: datas?.tanggal_lahir_ayah || '',
      nikAyah: datas?.nik_ayah || '',
      agamaAyah: datas?.agama_ayah || '',
      kewarganegaraanAyah: datas?.kewarganegaraan_ayah || '',
      pendidikanTerakhirAyah: datas?.pendidikan_terakhir_ayah || '',
      ijazahTertinggiAyah: datas?.ijazah_tertinggi_ayah || '',
      pekerjaanAyah: datas?.pekerjaan_ayah || '',
      alamatPekerjaanAyah: datas?.alamat_pekerjaan_ayah || '',
      penghasilanAyah: datas?.penghasilan_ayah || '',
      alamatRumahAyah: datas?.alamat_rumah_ayah || '',
      telpAyah: datas?.telp_ayah || '',
      statusAyah: datas?.status_ayah || '',
      namaIbu: datas?.nama_ibu || '',
      tempatLahirIbu: datas?.tempat_lahir_ibu || '',
      tanggalLahirIbu: datas?.tanggal_lahir_ibu || '',
      nikIbu: datas?.nik_ibu || '',
      agamaIbu: datas?.agama_ibu || '',
      kewarganegaraanIbu: datas?.kewarganegaraan_ibu || '',
      pendidikanTerakhirIbu: datas?.pendidikan_terakhir_ibu || '',
      ijazahTertinggiIbu: datas?.ijazah_tertinggi_ibu || '',
      pekerjaanIbu: datas?.pekerjaan_ibu || '',
      alamatPekerjaanIbu: datas?.alamat_pekerjaan_ibu || '',
      penghasilanIbu: datas?.penghasilan_ibu || '',
      alamatRumahIbu: datas?.alamat_rumah_ibu || '',
      telpIbu: datas?.telp_ibu || '',
      statusIbu: datas?.status_ibu || '',
      namaWali: datas?.nama_wali || '',
      tempatLahirWali: datas?.tempat_lahir_wali || '',
      tanggalLahirWali: datas?.tanggal_lahir_wali || '',
      nikWali: datas?.nik_wali || '',
      agamaWali: datas?.agama_wali || '',
      kewarganegaraanWali: datas?.kewarganegaraan_wali || '',
      hubunganKeluargaWali: datas?.hubungan_keluarga_wali || '',
      ijazahTertinggiWali: datas?.ijazah_tertinggi_wali || '',
      pekerjaanWali: datas?.pekerjaan_wali || '',
      penghasilanWali: datas?.penghasilan_wali || '',
      alamatWali: datas?.alamat_wali || '',
      telpWali: datas?.telp_wali || '',
    });

    function handleChangePendaftaran (e){
        setData({
            ...data,[e.target.name]:e.target.value,
        });
    }
    useEffect(()=>{
      setData(prevData => ({
        ...prevData,
        idOrangTuaWali: datas?.id_orangtua_wali || '',
        penghasilanAyah: handleFormatRupiah(datas?.penghasilan_ayah || ''),
        penghasilanIbu: handleFormatRupiah(datas?.penghasilan_ibu || ''),
        penghasilanWali: handleFormatRupiah(datas?.penghasilan_wali || ''),
      }));
    },[])
    function handleChangeNumber(e){
      const cleanedValue = e.target.value.replace(/[^0-9]/g, '');
      setData({
        ...data,[e.target.name]:cleanedValue,
      })
    }
    const handleChangeFormatRupiah = (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Hapus semua karakter non-digit

      // Jika angka pertama 0 dan panjang lebih dari 1, hapus angka 0 di depan
      if (value.length > 1 && value[0] === '0') {
          // Cari digit pertama yang bukan 0
          const firstNonZero = value.search(/[1-9]/);
          if (firstNonZero !== -1) {
              value = value.substring(firstNonZero);
          } else {
              value = '0'; // Jika semua 0, tetap 0
          }
      }

      // Tambahkan titik setiap 3 digit dari belakang
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setData({...data, [e.target.name]: value});
  }
  const handleFormatRupiah = (value) => {
        // Jika angka pertama 0 dan panjang lebih dari 1, hapus angka 0 di depan
        if (value.length > 1 && value[0] === "0") {
            // Cari digit pertama yang bukan 0
            const firstNonZero = value.search(/[1-9]/);
            if (firstNonZero !== -1) {
                value = value.substring(firstNonZero);
            } else {
                value = "0"; // Jika semua 0, tetap 0
            }
        }

        // Tambahkan titik setiap 3 digit dari belakang
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return value;
    };
    function submitFormPendaftaran(e) {
      e.preventDefault();
      // console.log(data.idOrangTuaWali);
      
      if (data.idOrangTuaWali && data.idOrangTuaWali !== '') {
        // Jika ada idOrangTuaWali, lakukan update
        post('/pendaftaran/ortu/update');
      } else {
        // Jika tidak ada idOrangTuaWali, lakukan store
        post('/pendaftaran/ortu/store');
      }
    }

    return (
    <>
          <form onSubmit={submitFormPendaftaran}>
          {
              datas.verif_by !== null && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 mt-4">
                  <p className="font-bold">Formulir telah diverifikasi</p>
                </div>
              )
            }
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KETERANGAN TENTANG ORANG TUA </p>
            <p className="text-[#226F54] font-semibold font-poppins text-lg">Ayah</p>
            <Label>Nama</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nama Ayah"
              type="text"
              name="namaAyah"
              value={data.namaAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Tempat Lahir </Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Tempat Lahir Ayah"
              type="text"
              name="tempatLahirAyah"
              value={data.tempatLahirAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal Lahir </Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalLahirAyah"
              value={data.tanggalLahirAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>NIK</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan NIK Ayah"
              type="text"
              name="nikAyah"
              value={data.nikAyah}
              maxLength='16'
              onChange={handleChangeNumber}
            />
            <Label>Agama</Label>
            <InputSelect
            label="Pilih Agama"
            name="agamaAyah"
            value={data.agamaAyah}
            onChange={handleChangePendaftaran}
            options={[
              { value: 'Islam', label: 'Islam' },
              { value: 'Kristen', label: 'Kristen' },
              { value: 'Katolik', label: 'Katolik' },
              { value: 'Hindu', label: 'Hindu' },
              { value: 'Buddha', label: 'Buddha' },
              { value: 'Konghucu', label: 'Konghucu' },
            ]}
            />
            <Label>Kewarganegaraan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Kewarganegaraan Ayah"
              type="text"
              name="kewarganegaraanAyah"
              value={data.kewarganegaraanAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Pendidikan Terakhir</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Pendidikan Terakhir Ayah"
              type="text"
              name="pendidikanTerakhirAyah"
              value={data.pendidikanTerakhirAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Ijazah Tertinggi</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Ijazah Tertinggi Ayah"
              type="text"
              name="ijazahTertinggiAyah"
              value={data.ijazahTertinggiAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Pekerjaan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Pekerjaan Ayah"
              type="text"
              name="pekerjaanAyah"
              value={data.pekerjaanAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Alamat Pekerjaan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alamat Pekerjaan Ayah"
              type="text"
              name="alamatPekerjaanAyah"
              value={data.alamatPekerjaanAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>Penghasilan/Bulan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Penghasilan/Bulan Ayah"
              type="text"
              maxLength='9'
              name="penghasilanAyah"
              value={data.penghasilanAyah}
              onChange={handleChangeFormatRupiah}
            />
            <Label>Alamat Rumah</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alamat Rumah Ayah"
              type="text"
              name="alamatRumahAyah"
              value={data.alamatRumahAyah}
              onChange={handleChangePendaftaran}
            />
            <Label>No. Telepon/HP</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nomor Telepon/HP Ayah"
              type="text"
              name="telpAyah"
              value={data.telpAyah}
              maxLength='13'
              onChange={handleChangeNumber}
            />
            <Label>Masih Hidup/Meninggal dunia</Label>
            <InputSelect
            name="statusAyah"
            value={data.statusAyah}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'Hidup' },
              { value: '2', label: 'Meninggal Dunia' },
            ]}
            />
            <p className="text-[#226F54] font-semibold font-poppins text-lg mt-5">Ibu</p>
            <Label>Nama</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nama Ibu"
              type="text"
              name="namaIbu"
              value={data.namaIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Tempat Lahir</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Tempat Lahir Ibu"
              type="text"
              name="tempatLahirIbu"
              value={data.tempatLahirIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal Lahir</Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalLahirIbu"
              value={data.tanggalLahirIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>NIK</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan NIK Ibu"
              type="text"
              name="nikIbu"
              value={data.nikIbu}
              maxLength='16'
              onChange={handleChangeNumber}
            />
            <Label>Agama</Label>
            <InputSelect
            label="Pilih Agama"
            name="agamaIbu"
            value={data.agamaIbu}
            onChange={handleChangePendaftaran}
            options={[
              { value: 'Islam', label: 'Islam' },
              { value: 'Kristen', label: 'Kristen' },
              { value: 'Katolik', label: 'Katolik' },
              { value: 'Hindu', label: 'Hindu' },
              { value: 'Buddha', label: 'Buddha' },
              { value: 'Konghucu', label: 'Konghucu' },
            ]}
            />
            <Label>Kewarganegaraan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Kewarganegaraan Ibu"
              type="text"
              name="kewarganegaraanIbu"
              value={data.kewarganegaraanIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Pendidikan Terakhir</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Pendidikan Terakhir Ibu"
              type="text"
              name="pendidikanTerakhirIbu"
              value={data.pendidikanTerakhirIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Ijazah Tertinggi</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Ijazah Tertinggi Ibu"
              type="text"
              name="ijazahTertinggiIbu"
              value={data.ijazahTertinggiIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Pekerjaan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Pekerjaan Ibu"
              type="text"
              name="pekerjaanIbu"
              value={data.pekerjaanIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Alamat Pekerjaan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alamat Pekerjaan Ibu"
              type="text"
              name="alamatPekerjaanIbu"
              value={data.alamatPekerjaanIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>Penghasilan/Bulan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Penghasilan/Bulan Ibu"
              type="text"
              maxLength='9'
              name="penghasilanIbu"
              value={data.penghasilanIbu}
              onChange={handleChangeFormatRupiah}
            />
            <Label>Alamat Rumah</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alamat Rumah Ibu"
              type="text"
              name="alamatRumahIbu"
              value={data.alamatRumahIbu}
              onChange={handleChangePendaftaran}
            />
            <Label>No. Telepon/HP</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nomor Telepon/HP Ibu"
              type="text"
              name="telpIbu"
              value={data.telpIbu}
              maxLength='13'
              onChange={handleChangeNumber}
            />
            <Label>Masih Hidup/Meninggal dunia</Label>
            <InputSelect
            name="statusIbu"
            value={data.statusIbu}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'Hidup' },
              { value: '2', label: 'Meninggal Dunia' },
            ]}
            />
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KETERANGAN TENTANG WALI</p>
            <Label>Nama Wali</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nama Wali"
              type="text"
              name="namaWali"
              value={data.namaWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Tempat Lahir</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Tempat Lahir Wali"
              type="text"
              name="tempatLahirWali"
              value={data.tempatLahirWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal Lahir</Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalLahirWali"
              value={data.tanggalLahirWali}
              onChange={handleChangePendaftaran}
            />
            <Label>NIK</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan NIK Wali"
              type="text"
              name="nikWali"
              value={data.nikWali}
              maxLength='16'
              onChange={handleChangeNumber}
            />
            <Label>Agama</Label>
            <InputSelect
            label="Pilih Agama"
            name="agamaWali"
            value={data.agamaWali}
            onChange={handleChangePendaftaran}
            options={[
              { value: 'Islam', label: 'Islam' },
              { value: 'Kristen', label: 'Kristen' },
              { value: 'Katolik', label: 'Katolik' },
              { value: 'Hindu', label: 'Hindu' },
              { value: 'Buddha', label: 'Buddha' },
              { value: 'Konghucu', label: 'Konghucu' },
            ]}
            />
            <Label>Kewarganegaraan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Kewarganegaraan Wali"
              type="text"
              name="kewarganegaraanWali"
              value={data.kewarganegaraanWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Hubungan Keluarga</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Hubungan Keluarga Wali"
              type="text"
              name="hubunganKeluargaWali"
              value={data.hubunganKeluargaWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Ijazah Tertinggi</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Ijazah Tertinggi Wali"
              type="text"
              name="ijazahTertinggiWali"
              value={data.ijazahTertinggiWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Pekerjaan</Label>
            <InputForm  
            className={'w-full'}
              placeholder="Masukkan Pekerjaan Wali"
              type="text"
              name="pekerjaanWali"
              value={data.pekerjaanWali}
              onChange={handleChangePendaftaran}
            />
            <Label>Penghasilan/bulan</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Penghasilan Wali"
              type="text"
              maxLength='9'
              name="penghasilanWali"
              value={data.penghasilanWali}
              onChange={handleChangeFormatRupiah}
            />
            <Label>Alamat</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alamat Wali"
              type="text"
              name="alamatWali"
              value={data.alamatWali}
              onChange={handleChangePendaftaran}
            />
            <Label>No. Telepon/HP</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Nomor Telepon/HP Wali"
              type="text"
              name="telpWali"
              value={data.telpWali}
              maxLength='13'
              onChange={handleChangeNumber}
            />
            {
              datas.verif_by == null && (
                <Button className={'w-full'} type="submit">Submit</Button>
              )
            }
          </form>
        </>
    );
}
export default FormPendaftaranOrangTua;