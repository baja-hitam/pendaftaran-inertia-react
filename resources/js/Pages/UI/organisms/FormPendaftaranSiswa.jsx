import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { useForm } from "@inertiajs/react";
import { Label } from "../atoms/Label";
import InputSelect from "../atoms/InputSelect";
import { useEffect,useState } from "react";
import FileUploaderBerkas from "../molecules/FileUploaderBerkas";

const FormPendaftaranSiswa = ({datas}) => {
    const [currentFilePasFoto, setCurrentFilePasFoto] = useState(null);
    const [currentFileKK, setCurrentFileKK] = useState(null);
    const [currentFileAkte, setCurrentFileAkte] = useState(null);
    const [error, setError] = useState({
      pasFoto: '',
      fotoKK: '',
      fotoAkte: '',
    });
    // State untuk mengontrol apakah modal preview terbuka atau tidak
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    // State untuk menyimpan URL gambar yang sedang di-preview (opsional, jika Anda ingin preview gambar yang berbeda)
    const [imageToPreview, setImageToPreview] = useState(null);

    const {data, setData, post} = useForm({
      idCalonSiswa: datas?.id_calon_siswa || '',
      idBerkas: datas?.id_berkas || '',
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
      kesenian: datas?.kesenian || '',
      olahraga: datas?.olahraga || '',
      organisasi: datas?.organisasi || '',
      prestasiLainnya: datas?.prestasi_lainnya || '',
      hobi: datas?.hobi || '',
      citaCita: datas?.cita_cita || '',
      pasFoto: datas?.pas_foto || null,
      fotoKK: datas?.kk || null,
      fotoAktaKelahiran: datas?.akte || null,
    });
    useEffect(() => {
      if (datas?.pas_foto) {
        setCurrentFilePasFoto(datas.pas_foto);
      }
      if (datas?.kk) {
        setCurrentFileKK(datas.kk);
      }
      if (datas?.akte) {
        setCurrentFileAkte(datas.akte);
      }
    },[datas]);

    const openImagePreview = (imageUrl) => {
      setImageToPreview(imageUrl);
      setIsImagePreviewOpen(true);
  };

  const closeImagePreview = () => {
      setIsImagePreviewOpen(false);
      setImageToPreview(null);
  };


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
    function handleChangeFile(name,file){
      setData({
        ...data, [name]: file,
      });
    }
    function handleRemoveCurrentFilePasFoto(){
      setCurrentFilePasFoto(null);
      setData({
        ...data, pasFoto: null,
      });
    }
    function handleRemoveCurrentFileKK(){
      setCurrentFileKK(null);
      setData({
        ...data, fotoKK: null,
      });
    }
    
    function handleRemoveCurrentFileAkte(){
      setCurrentFileAkte(null);
      setData({
        ...data, fotoAktaKelahiran: null,
      });
    }

    function submitFormPendaftaran(e) {
      e.preventDefault();
      // console.log(data);
      
      if(!data.pasFoto) {
        setError({...error, pasFoto: 'Foto Pas Siswa harus diisi.'});
        return;
      }
      if(!data.fotoKK) {
        setError({...error, fotoKK: 'Foto Kartu Keluarga harus diisi.'});
        return;
      }
      if(!data.fotoAktaKelahiran) {
        setError({...error, fotoAkte: 'Foto Akta Kelahiran harus diisi.'});
        return;
      }
      setError('');

      if (data.idCalonSiswa && data.idCalonSiswa !== '') {
        // Jika ada idCalonSiswa, lakukan update
        post('/pendaftaran/siswa/update');
      } else {
        // Jika tidak ada idCalonSiswa, lakukan store
        post('/pendaftaran/siswa/store');
      }
    }

    return (
    <>
          <form onSubmit={submitFormPendaftaran}>
            {
              datas.verif_by != null && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 mt-4">
                  <p className="font-bold">Formulir telah diverifikasi</p>
                </div>
              )
            }
            <p className="text-xl text-[#226F54] font-extrabold mt-7">KETERANGAN PRIBADI</p>
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
            <p className="text-xl text-[#226F54] font-extrabold mt-7">BERKAS</p>
            <Label>Pas Foto</Label>
            {currentFilePasFoto && (
                <div className="mb-4">
                    <p className="block text-gray-700 text-sm font-bold mb-2">Gambar Saat Ini:</p>
                    <img onClick={() => openImagePreview(currentFilePasFoto)} src={currentFilePasFoto}  alt="Preview" className="max-w-full h-auto max-h-48 rounded-lg shadow-md cursor-pointer" />
                    {currentFilePasFoto && (
                        <button
                            onClick={() => handleRemoveCurrentFilePasFoto()}
                            className="mt-2 px-4 py-2 text-sm rounded-lg font-semibold text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Hapus Gambar Saat Ini
                        </button>
                    )}
                </div>
            )}
            <FileUploaderBerkas
              name="pasFoto"
              handleChangeFile={handleChangeFile}
              selectedFile={data.pasFoto}
              accept="image/*"
              />
              {error.pasFoto && (
                <p className="text-red-500 text-sm mt-2">{error.pasFoto}</p>
              )}
            <Label>Foto Kartu Keluarga</Label>
            {currentFileKK && (
                <div className="mb-4">
                    <p className="block text-gray-700 text-sm font-bold mb-2">Gambar Saat Ini:</p>
                    <img onClick={() => openImagePreview(currentFileKK)} src={currentFileKK} alt="Preview" className="max-w-full h-auto max-h-48 rounded-lg shadow-md cursor-pointer" />
                    {currentFileKK && (
                        <button
                            onClick={() => handleRemoveCurrentFileKK()}
                            className="mt-2 px-4 py-2 text-sm rounded-lg font-semibold text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Hapus Gambar Saat Ini
                        </button>
                    )}
                </div>
            )}
            <FileUploaderBerkas
              name="fotoKK"
              handleChangeFile={handleChangeFile}
              selectedFile={data.fotoKK}
              accept="image/*"/>
              {error.fotoKK && (
                <p className="text-red-500 text-sm mt-2">{error.fotoKK}</p>
              )}
            <Label>Foto Akta Kelahiran</Label>
            {currentFileAkte && (
                <div className="mb-4">
                    <p className="block text-gray-700 text-sm font-bold mb-2">Gambar Saat Ini:</p>
                    <img onClick={() => openImagePreview(currentFileAkte)} src={currentFileAkte} alt="Preview" className="max-w-full h-auto max-h-48 rounded-lg shadow-md cursor-pointer" />
                    {currentFileAkte && (
                        <button
                            onClick={() => handleRemoveCurrentFileAkte()}
                            className="mt-2 px-4 py-2 text-sm rounded-lg font-semibold text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Hapus Gambar Saat Ini
                        </button>
                    )}
                </div>
            )}
            <FileUploaderBerkas
              name="fotoAktaKelahiran"
              selectedFile={data.fotoAktaKelahiran}
              handleChangeFile={handleChangeFile}
              accept="image/*"/>
              {error.fotoAkte && (
                <p className="text-red-500 text-sm mt-2">{error.fotoAkte}</p>
              )}
              {
                datas.verif_by == null && (
                  <Button className={'w-full'} type="submit">Submit</Button>
                )
              }
          </form>
           {/* Modal Preview Gambar */}
          {isImagePreviewOpen && imageToPreview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeImagePreview} // Menutup modal saat mengklik di luar gambar
                >
                    <div
                        className="relative bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto"
                        onClick={(e) => e.stopPropagation()} // Mencegah klik pada modal menutupnya
                    >
                        <button
                            onClick={closeImagePreview}
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
                        >
                            &times;
                        </button>
                        <img
                            src={imageToPreview}
                            alt="Full Preview"
                            className="max-w-full max-h-[80vh] h-auto object-contain mx-auto" // Menyesuaikan ukuran gambar agar sesuai dengan modal
                        />
                    </div>
                </div>
            )}
        </>
    );
}
export default FormPendaftaranSiswa;