<?php

namespace App\Http\Controllers;
use App\Http\Modulus\Pendaftaran;
use App\Http\Modulus\Tpembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftaranSiswa extends Controller
{
    public function index()
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Pendaftaran;
        $modul->periode = $startYear.$endYear;
        $data = $modul->index();
        $id_user = $data->id_user ?? '';
        $modul1 = new Tpembayaran;
        $modul1->cperiode = $startYear.$endYear;
        $modul1->id_user = session('id_user');
        // dd($modul1);
        $data1 = $modul1->checkTransaksiFormulir();
        // dd($data1);
        if (!empty($data1)) {
            $statusPembayaran = true;
        } else {
            $statusPembayaran = false;
        }
        return Inertia::render('Pendaftaran',[
            'datas'=>$data,
            'statusPembayaran' => $statusPembayaran,
        ]);
    }

    public function store(Request $request)
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Pendaftaran;
        $modul->periode = $startYear.$endYear;
        $modul->namaSiswa = $request->input('namaSiswa');
        $modul->namaPanggilan = $request->input('namaPanggilan');
        $modul->jenisKelamin = $request->input('jenisKelamin');
        $modul->tempatLahir = $request->input('tempatLahir');
        $modul->tanggalLahir = $request->input('tanggalLahir');
        $modul->agama = $request->input('agama');
        $modul->kewarganegaraan = $request->input('kewarganegaraan');
        $modul->anakKeBerapa = $request->input('anakKeBerapa');
        $modul->jmlKandung = $request->input('jmlKandung');
        $modul->jmlTiri = $request->input('jmlTiri');
        $modul->jmlAngkat = $request->input('jmlAngkat');
        $modul->statusAnak = $request->input('statusAnak');
        $modul->bahasa = $request->input('bahasa');
        $modul->alamat = $request->input('alamat');
        $modul->noKK = $request->input('noKK');
        $modul->kelurahan = $request->input('kelurahan');
        $modul->kecamatan = $request->input('kecamatan');
        $modul->kotaKabupaten = $request->input('kotaKabupaten');
        $modul->kodePos = $request->input('kodePos');
        $modul->telp = $request->input('telp');
        $modul->alamatTersebut = $request->input('alamatTersebut');
        $modul->namaPemilikAlamat = $request->input('namaPemilikAlamat');
        $modul->modeTransportasi = $request->input('modeTransportasi');
        $modul->golonganDarah = $request->input('golonganDarah');
        $modul->penyakit = $request->input('penyakit');
        $modul->tempatDirawat = $request->input('tempatDirawat');
        $modul->kelainanJasmani = $request->input('kelainanJasmani');
        $modul->tinggiBadan = $request->input('tinggiBadan');
        $modul->beratBadan = $request->input('beratBadan');
        $modul->sdAsal = $request->input('sdAsal');
        $modul->tanggalIjazah = $request->input('tanggalIjazah');
        $modul->nomorIjazah = $request->input('nomorIjazah');
        $modul->tanggalSkhun = $request->input('tanggalSkhun');
        $modul->nomorSkhun = $request->input('nomorSkhun');
        $modul->lamaBelajar = $request->input('lamaBelajar');
        $modul->nisn = $request->input('nisn');
        $modul->tipeSekolah = $request->input('tipeSekolah');
        $modul->namaSekolah = $request->input('namaSekolah');
        $modul->tanggalPindah = $request->input('tanggalPindah');
        $modul->alasanPindah = $request->input('alasanPindah');
        $modul->kesenian = $request->input('kesenian');
        $modul->olahraga = $request->input('olahraga');
        $modul->organisasi = $request->input('organisasi');
        $modul->prestasiLainnya = $request->input('prestasiLainnya');
        $modul->hobi = $request->input('hobi');
        $modul->citaCita = $request->input('citaCita');
        $modul->namaAyah = $request->input('namaAyah');
        $modul->tempatLahirAyah = $request->input('tempatLahirAyah');
        $modul->tanggalLahirAyah = $request->input('tanggalLahirAyah');
        $modul->nikAyah = $request->input('nikAyah');
        $modul->agamaAyah = $request->input('agamaAyah');
        $modul->kewarganegaraanAyah = $request->input('kewarganegaraanAyah');
        $modul->pendidikanTerakhirAyah = $request->input('pendidikanTerakhirAyah');
        $modul->ijazahTertinggiAyah = $request->input('ijazahTertinggiAyah');
        $modul->pekerjaanAyah = $request->input('pekerjaanAyah');
        $modul->alamatPekerjaanAyah = $request->input('alamatPekerjaanAyah');
        $modul->penghasilanAyah = preg_replace('/\./', '', $request->input('penghasilanAyah'));
        $modul->alamatRumahAyah = $request->input('alamatRumahAyah');
        $modul->telpAyah = $request->input('telpAyah');
        $modul->statusAyah = $request->input('statusAyah');
        $modul->namaIbu = $request->input('namaIbu');
        $modul->tempatLahirIbu = $request->input('tempatLahirIbu');
        $modul->tanggalLahirIbu = $request->input('tanggalLahirIbu');
        $modul->nikIbu = $request->input('nikIbu');
        $modul->agamaIbu = $request->input('agamaIbu');
        $modul->kewarganegaraanIbu = $request->input('kewarganegaraanIbu');
        $modul->pendidikanTerakhirIbu = $request->input('pendidikanTerakhirIbu');
        $modul->ijazahTertinggiIbu = $request->input('ijazahTertinggiIbu');
        $modul->pekerjaanIbu = $request->input('pekerjaanIbu');
        $modul->alamatPekerjaanIbu = $request->input('alamatPekerjaanIbu');
        $modul->penghasilanIbu = preg_replace('/\./', '', $request->input('penghasilanIbu'));
        $modul->alamatRumahIbu = $request->input('alamatRumahIbu');
        $modul->telpIbu = $request->input('telpIbu');
        $modul->statusIbu = $request->input('statusIbu');
        $modul->namaWali = $request->input('namaWali');
        $modul->tempatLahirWali = $request->input('tempatLahirWali');
        $modul->tanggalLahirWali = $request->input('tanggalLahirWali');
        $modul->nikWali = $request->input('nikWali');
        $modul->agamaWali = $request->input('agamaWali');
        $modul->kewarganegaraanWali = $request->input('kewarganegaraanWali');
        $modul->hubunganKeluargaWali = $request->input('hubunganKeluargaWali');
        $modul->ijazahTertinggiWali = $request->input('ijazahTertinggiWali');
        $modul->pekerjaanWali = $request->input('pekerjaanWali');
        $modul->penghasilanWali = preg_replace('/\./', '', $request->input('penghasilanWali'));
        $modul->alamatWali = $request->input('alamatWali');
        $modul->telpWali = $request->input('telpWali');
        $data = $modul->store();
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Berhasil Disimpan');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Gagal Disimpan');
        }
        return to_route('pendaftaran');
    }
    public function update(Request $request)
    {
        $startYear = date('Y');
        $endYear = $startYear + 1;
        $modul = new Pendaftaran;
        $modul->periode = $startYear.$endYear;
        $modul->namaSiswa = $request->input('namaSiswa');
        $modul->namaPanggilan = $request->input('namaPanggilan');
        $modul->jenisKelamin = $request->input('jenisKelamin');
        $modul->tempatLahir = $request->input('tempatLahir');
        $modul->tanggalLahir = $request->input('tanggalLahir');
        $modul->agama = $request->input('agama');
        $modul->kewarganegaraan = $request->input('kewarganegaraan');
        $modul->anakKeBerapa = $request->input('anakKeBerapa');
        $modul->jmlKandung = $request->input('jmlKandung');
        $modul->jmlTiri = $request->input('jmlTiri');
        $modul->jmlAngkat = $request->input('jmlAngkat');
        $modul->statusAnak = $request->input('statusAnak');
        $modul->bahasa = $request->input('bahasa');
        $modul->alamat = $request->input('alamat');
        $modul->noKK = $request->input('noKK');
        $modul->kelurahan = $request->input('kelurahan');
        $modul->kecamatan = $request->input('kecamatan');
        $modul->kotaKabupaten = $request->input('kotaKabupaten');
        $modul->kodePos = $request->input('kodePos');
        $modul->telp = $request->input('telp');
        $modul->alamatTersebut = $request->input('alamatTersebut');
        $modul->namaPemilikAlamat = $request->input('namaPemilikAlamat');
        $modul->modeTransportasi = $request->input('modeTransportasi');
        $modul->golonganDarah = $request->input('golonganDarah');
        $modul->penyakit = $request->input('penyakit');
        $modul->tempatDirawat = $request->input('tempatDirawat');
        $modul->kelainanJasmani = $request->input('kelainanJasmani');
        $modul->tinggiBadan = $request->input('tinggiBadan');
        $modul->beratBadan = $request->input('beratBadan');
        $modul->sdAsal = $request->input('sdAsal');
        $modul->tanggalIjazah = $request->input('tanggalIjazah');
        $modul->nomorIjazah = $request->input('nomorIjazah');
        $modul->tanggalSkhun = $request->input('tanggalSkhun');
        $modul->nomorSkhun = $request->input('nomorSkhun');
        $modul->lamaBelajar = $request->input('lamaBelajar');
        $modul->nisn = $request->input('nisn');
        $modul->tipeSekolah = $request->input('tipeSekolah');
        $modul->namaSekolah = $request->input('namaSekolah');
        $modul->tanggalPindah = $request->input('tanggalPindah');
        $modul->alasanPindah = $request->input('alasanPindah');
        $modul->kesenian = $request->input('kesenian');
        $modul->olahraga = $request->input('olahraga');
        $modul->organisasi = $request->input('organisasi');
        $modul->prestasiLainnya = $request->input('prestasiLainnya');
        $modul->hobi = $request->input('hobi');
        $modul->citaCita = $request->input('citaCita');
        $modul->namaAyah = $request->input('namaAyah');
        $modul->tempatLahirAyah = $request->input('tempatLahirAyah');
        $modul->tanggalLahirAyah = $request->input('tanggalLahirAyah');
        $modul->nikAyah = $request->input('nikAyah');
        $modul->agamaAyah = $request->input('agamaAyah');
        $modul->kewarganegaraanAyah = $request->input('kewarganegaraanAyah');
        $modul->pendidikanTerakhirAyah = $request->input('pendidikanTerakhirAyah');
        $modul->ijazahTertinggiAyah = $request->input('ijazahTertinggiAyah');
        $modul->pekerjaanAyah = $request->input('pekerjaanAyah');
        $modul->alamatPekerjaanAyah = $request->input('alamatPekerjaanAyah');
        $modul->penghasilanAyah = preg_replace('/\./', '', $request->input('penghasilanAyah'));
        $modul->alamatRumahAyah = $request->input('alamatRumahAyah');
        $modul->telpAyah = $request->input('telpAyah');
        $modul->statusAyah = $request->input('statusAyah');
        $modul->namaIbu = $request->input('namaIbu');
        $modul->tempatLahirIbu = $request->input('tempatLahirIbu');
        $modul->tanggalLahirIbu = $request->input('tanggalLahirIbu');
        $modul->nikIbu = $request->input('nikIbu');
        $modul->agamaIbu = $request->input('agamaIbu');
        $modul->kewarganegaraanIbu = $request->input('kewarganegaraanIbu');
        $modul->pendidikanTerakhirIbu = $request->input('pendidikanTerakhirIbu');
        $modul->ijazahTertinggiIbu = $request->input('ijazahTertinggiIbu');
        $modul->pekerjaanIbu = $request->input('pekerjaanIbu');
        $modul->alamatPekerjaanIbu = $request->input('alamatPekerjaanIbu');
        $modul->penghasilanIbu = preg_replace('/\./', '', $request->input('penghasilanIbu'));
        $modul->alamatRumahIbu = $request->input('alamatRumahIbu');
        $modul->telpIbu = $request->input('telpIbu');
        $modul->statusIbu = $request->input('statusIbu');
        $modul->namaWali = $request->input('namaWali');
        $modul->tempatLahirWali = $request->input('tempatLahirWali');
        $modul->tanggalLahirWali = $request->input('tanggalLahirWali');
        $modul->nikWali = $request->input('nikWali');
        $modul->agamaWali = $request->input('agamaWali');
        $modul->kewarganegaraanWali = $request->input('kewarganegaraanWali');
        $modul->hubunganKeluargaWali = $request->input('hubunganKeluargaWali');
        $modul->ijazahTertinggiWali = $request->input('ijazahTertinggiWali');
        $modul->pekerjaanWali = $request->input('pekerjaanWali');
        $modul->penghasilanWali = preg_replace('/\./', '', $request->input('penghasilanWali'));
        $modul->alamatWali = $request->input('alamatWali');
        $modul->telpWali = $request->input('telpWali');
        $data = $modul->update($request->input('idCalonSiswa'), $request->input('idOrangTuaWali'));
        // dd($data);
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Berhasil Diupdate');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Gagal Diupdate');
        }
        return to_route('pendaftaran');
    }

}
