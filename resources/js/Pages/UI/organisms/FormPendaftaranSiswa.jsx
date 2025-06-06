import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { useForm } from "@inertiajs/react";
import { Label } from "../atoms/Label";
import InputSelect from "../atoms/InputSelect";
import { useEffect } from "react";

const FormPendaftaranSiswa = ({datas}) => {
    const {data, setData, post} = useForm({
      idCalonSiswa: datas?.id_calon_siswa || '',
      idOrangTuaWali: datas?.id_orangtua_wali || '',
      namaSiswa: datas?.nama_lengkap || '',
      namaPanggilan: datas?.nama_panggilan || '',
      jenisKelamin: datas?.jenis_kelamin || '',
      tempatLahir: datas?.tempat_lahir || '',
      tanggalLahir: datas?.tanggal_lahir || '',
      agama: datas?.agama || '',
      kewarganegaraan: datas?.kewarganegaraan || '',
      anakKeBerapa: datas?.anak_ke || '',
      jmlKandung: datas?.jumlah_saudara_kandung || '',
      jmlTiri: datas?.jumlah_saudara_tiri || '',
      jmlAngkat: datas?.jumlah_saudara_angkat || '',
      statusAnak: datas?.status_anak || '',
      bahasa: datas?.bahasa_sehari_hari || '',
      alamat: datas?.alamat || '',
      noKK: datas?.no_kk || '',
      kelurahan: datas?.kelurahan || '',
      kecamatan: datas?.kecamatan || '',
      kotaKabupaten: datas?.kota || '',
      kodePos: datas?.kode_pos || '',
      telp: datas?.nomor_telepon || '',
      alamatTersebut: datas?.tempat_alamat || '',
      namaPemilikAlamat: datas?.nama_pemilik_tempat_alamat || '',
      modeTransportasi: datas?.metode_transportasi || '',
      golonganDarah: datas?.golongan_darah || '',
      penyakit: datas?.riwayat_penyakit || '',
      tempatDirawat: datas?.riwayat_rawat || '',
      kelainanJasmani: datas?.kelainan_jasmani || '',
      tinggiBadan: datas?.tinggi_badan || '',
      beratBadan: datas?.berat_badan || '',
      sdAsal: datas?.nama_sekolah_asal || '',
      tanggalIjazah: datas?.tanggal_ijazah || '',
      nomorIjazah: datas?.nomor_ijazah || '',
      tanggalSkhun: datas?.tanggal_skhun || '',
      nomorSkhun: datas?.nomor_skhun || '',
      lamaBelajar: datas?.lama_belajar || '',
      nisn: datas?.nisn || '',
      tipeSekolah: datas?.tipe_riwayat_sekolah || '',
      namaSekolah: datas?.nama_riwayat_sekolah || '',
      tanggalPindah: datas?.tanggal_pindah || '',
      alasanPindah: datas?.alasan_pindah || '',
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
      kesenian: datas?.kesenian || '',
      olahraga: datas?.olahraga || '',
      organisasi: datas?.organisasi || '',
      prestasiLainnya: datas?.prestasi_lainnya || '',
      hobi: datas?.hobi || '',
      citaCita: datas?.cita_cita || '',
    });

    function handleChangePendaftaran (e){
        setData({
            ...data,[e.target.name]:e.target.value,
        });
    }
    useEffect(()=>{
      setData(prevData => ({
        ...prevData,
        idCalonSiswa: datas?.id_calon_siswa || '',
        idOrangTuaWali: datas?.id_orangtua_wali || '',
        penghasilanAyah: handleFormatRupiah(datas?.penghasilan_ayah || ''),
        penghasilanIbu: handleFormatRupiah(datas?.penghasilan_ibu || ''),
        penghasilanWali: handleFormatRupiah(datas?.penghasilan_wali || ''),
      }));
    },[datas])
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
      
      if (data.idCalonSiswa && data.idCalonSiswa !== '') {
        // Jika ada idCalonSiswa, lakukan update
        post('/pendaftaran/update');
      } else {
        // Jika tidak ada idCalonSiswa, lakukan store
        post('/pendaftaran/store');
      }
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
            <InputSelect
            required
            label="Pilih Jenis Kelamin"
            name="jenisKelamin"
            value={data.jenisKelamin}
            onChange={handleChangePendaftaran}
            options={[
              { value: 'L', label: 'Laki - Laki' },
              { value: 'P', label: 'Perempuan' },
            ]}
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
            className={'w-full md:w-56'}
              type="date"
              name="tanggalLahir"
              required
              value={data.tanggalLahir}
              onChange={handleChangePendaftaran}
            />
            <Label>Agama *</Label>
            <InputSelect
            label="Pilih Agama"
            name="agama"
            required
            value={data.agama}
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
            className={'w-full md:w-56'}
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
            className={'w-full md:w-72'}
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
            className={'w-full md:w-72'}
              placeholder="Masukkan Jumlah Saudara Tiri"
              type="text"
              name="jmlTiri"
              maxLength='2'
              value={data.jmlTiri}
              onChange={handleChangeNumber}
            />
            <Label>Jumlah Saudara Angkat</Label>
            <InputForm
            className={'w-full md:w-72'}
              placeholder="Masukkan Jumlah Saudara Angkat"
              type="text"
              name="jmlAngkat"
              maxLength='2'
              value={data.jmlAngkat}
              onChange={handleChangeNumber}
            />
            <Label>Anak Yatim/Piatu/Yatim Piatu</Label>
            <InputForm
            className={'w-full md:w-72'}
              placeholder="Masukkan Yatim/Piatu/Yatim Piatu"
              type="text"
              maxLength="25"
              name="statusAnak"
              value={data.statusAnak}
              onChange={handleChangePendaftaran}
            />
            <Label>Bahasa Sehari-hari dirumah *</Label>
            <InputForm
            className={'w-full md:w-72'}
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
            <Label>Kelurahan *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Nama Kelurahan"
              type="text"
              name="kelurahan"
              required
              value={data.kelurahan}
              onChange={handleChangePendaftaran}
            />
            <Label>Kecamatan *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Nama Kecamatan"
              type="text"
              name="kecamatan"
              required
              value={data.kecamatan}
              onChange={handleChangePendaftaran}
            />
            <Label>Kota/Kabupaten *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Nama Kota/Kabupaten"
              type="text"
              name="kotaKabupaten"
              required
              value={data.kotaKabupaten}
              onChange={handleChangePendaftaran}
            />
            <Label>Kode Pos *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Kode Pos"
              type="text"
              name="kodePos"
              maxLength='5'
              required
              value={data.kodePos}
              onChange={handleChangeNumber}
            />
            <Label>No. Telepon/HP *</Label>
            <InputForm
              className={'w-full'}
              placeholder="Masukkan Nomor Telepon/HP"
              type="text"
              name="telp"
              maxLength='13'
              required
              value={data.telp}
              onChange={handleChangeNumber}
            />
            <Label>Alamat Tersebut *</Label>
            <InputSelect
            required
            label="Pilih Alamat Tersebut"
            name="alamatTersebut"
            value={data.alamatTersebut}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'Tempat Orang Tua' },
              { value: '2', label: 'Menumpang Pada Orang Lain' },
              { value: '3', label: 'Di Asrama' },
            ]}
            />
            <InputForm
              className={'w-full md:w-52 mt-2'}
              placeholder="Bernama"
              type="text"
              required
              name="namaPemilikAlamat"
              value={data.namaPemilikAlamat}
              onChange={handleChangePendaftaran}
            />
            <Label>Ke sekolah dengan *</Label>
            <InputSelect
            required
            label="Pilih Mode Transportasi"
            name="modeTransportasi"
            value={data.modeTransportasi}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'Kendaraan Umum' },
              { value: '2', label: 'Kendaraan Pribadi' },
              { value: '3', label: 'Jalan Kaki' },
            ]}
            />
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KETERANGAN KESEHATAN</p>
            <Label>Golongan Darah</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Golongan Darah"
              type="text"
              name="golonganDarah"
              maxLength='2'
              value={data.golonganDarah}
              onChange={handleChangePendaftaran}
            />
            <Label>Penyakit yang pernah diderita</Label>
            <InputSelect
            label="Pilih Penyakit"
            name="penyakit"
            value={data.penyakit}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'TBC' },
              { value: '2', label: 'CACAR' },
              { value: '3', label: 'EPILEPSI' },
              { value: '4', label: 'Penyakit Lainnya' },
            ]}
            />
            <InputForm
            className={'w-full mt-2'}
              placeholder="Dirawat di"
              type="text"
              name="tempatDirawat"
              value={data.tempatDirawat}
              onChange={handleChangePendaftaran}
            />
            <Label>Kelainan Jasmani</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Kelainan Jasmani"
              type="text"
              name="kelainanJasmani"
              value={data.kelainanJasmani}
              onChange={handleChangePendaftaran}
            />
            <Label>Tinggi Badan Siswa (cm) *</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Tinggi Badan"
              type="text"
              required
              name="tinggiBadan"
              maxLength='3'
              value={data.tinggiBadan}
              onChange={handleChangeNumber}
            />
            <Label>Berat Badan Siswa (kg)*</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Berat Badan"
              type="text"
              required
              name="beratBadan"
              maxLength='3'
              value={data.beratBadan}
              onChange={handleChangeNumber}
            />
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KETERANGAN PENDIDIKAN SEBELUMNYA *)</p>
            <p className="text-[#226F54] font-semibold font-poppins text-lg">Asal Sekolah</p>
            <Label>SD</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan SD Asal"
              type="text"
              name="sdAsal"
              value={data.sdAsal}
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal Ijazah</Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalIjazah"
              value={data.tanggalIjazah}
              onChange={handleChangePendaftaran}
            />
            <Label>Nomor Ijazah</Label>
            <InputForm
            className={'w-full'}
              type="text"
              placeholder={"Masukkan Nomor Ijazah"}
              name="nomorIjazah"
              value={data.nomorIjazah}
              maxLength='100'
              onChange={handleChangePendaftaran}
            />
            <Label>Tanggal SKHUN</Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalSkhun"
              value={data.tanggalSkhun}
              onChange={handleChangePendaftaran}
            />
            <Label>Nomor SKHUN</Label>
            <InputForm
            className={'w-full'}
              type="text"
              placeholder={"Masukkan Nomor SKHUN"}
              name="nomorSkhun"
              value={data.nomorSkhun}
              maxLength='100'
              onChange={handleChangePendaftaran}
            />
            <Label>Lama Belajar (Tahun)</Label>
            <InputForm
            className={'w-full'}
              type="text"
              placeholder={"Masukkan Berapa Lama Belajar"}
              name="lamaBelajar"
              value={data.lamaBelajar}
              maxLength='2'
              onChange={handleChangeNumber}
            />
            <Label>Nomor Induk Siswa Nasional (NISN)</Label>
            <InputForm
            className={'w-full'}
              type="text"
              placeholder={"Masukkan NISN"}
              name="nisn"
              value={data.nisn}
              maxLength='10'
              onChange={handleChangeNumber}
            />
            <p className="text-[#226F54] font-semibold font-poppins text-lg">Pindah Sekolah</p>
            <Label>Pindahan Dari Sekolah</Label>
            <InputSelect
            label="Pilih Sekolah"
            name="tipeSekolah"
            value={data.tipeSekolah}
            onChange={handleChangePendaftaran}
            options={[
              { value: '1', label: 'SMP' },
              { value: '2', label: 'MTS' },
              { value: '3', label: 'Pesantren' },
            ]}
            />
            <InputForm
            className={'w-full mt-2'}
              placeholder="Masukkan Nama Sekolah Pindahan"
              type="text"
              name="namaSekolah"
              value={data.namaSekolah}
              onChange={handleChangePendaftaran}
            />
            <Label>Diterima di sekolah ini pada tanggal</Label>
            <InputForm
            className={'w-full md:w-56'}
              type="date"
              name="tanggalPindah"
              value={data.tanggalPindah}
              onChange={handleChangePendaftaran}
            />
            <Label>Alasan Pindah</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Alasan Pindah"
              type="text"
              name="alasanPindah"
              value={data.alasanPindah}
              onChange={handleChangePendaftaran}
            />
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
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KEGEMARAN CALON SISWA</p>
            <p className="text-[#226F54] font-semibold font-poppins text-lg mt-5">Bakat khusus dan Prestasi yang menonjol dalam</p>
            <Label>Kesenian</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Prestasi/Bakat Kesenian"
              type="text"
              name="kesenian"
              value={data.kesenian}
              onChange={handleChangePendaftaran}
            />
            <Label>Pendidikan Jasmani/Olahraga</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Prestasi/Bakat Pendidikan Jasmani/Olahraga"
              type="text"
              name="olahraga"
              value={data.olahraga}
              onChange={handleChangePendaftaran}
            />
            <Label>Kemasyarakatan/Organisasi</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Prestasi/Bakat Kemasyarakatan/Organisasi"
              type="text"
              name="organisasi"
              value={data.organisasi}
              onChange={handleChangePendaftaran}
            />
            <Label>Lain - lain</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Prestasi/Bakat Lainnya"
              type="text"
              name="prestasiLainnya"
              value={data.prestasiLainnya}
              onChange={handleChangePendaftaran}
            />
            <Label>Hobi</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Hobi"
              type="text"
              name="hobi"
              value={data.hobi}
              onChange={handleChangePendaftaran}
            />
            <Label>Cita-cita</Label>
            <InputForm
            className={'w-full'}
              placeholder="Masukkan Cita-cita"
              type="text"
              name="citaCita"
              value={data.citaCita}
              onChange={handleChangePendaftaran}
            />
            <Button className={'w-full'} type="submit">Submit</Button>
          </form>
        </>
    );
}
export default FormPendaftaranSiswa;