<?php

namespace App\Http\Controllers;
use App\Http\Helper\Helper;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Modulus\Pendaftaran;
use Illuminate\Support\Facades\Storage;
use App\Http\Modulus\Tpembayaran;
use App\Http\Modulus\KartuPeserta;

class PendaftaranSiswa extends Controller
{
    public function index()
    {
        $modul = new Pendaftaran;
        $modul1 = new Helper;
        $modul->periode = session('periode');
        $data = $modul->index();
        // dd($data);
        if(!empty($data) && isset($data->no_kk)){
            $data->no_kk = $modul1->decrypt($data->no_kk);
            $data->nik_ayah = $modul1->decrypt($data->nik_ayah);
            $data->nik_ibu = $modul1->decrypt($data->nik_ibu);
        }
        if(!empty($data) && isset($data->pas_foto)){
            $data->pas_foto = Storage::url($data->pas_foto);
        }
        if(!empty($data) && isset($data->kk)){
            $data->kk = Storage::url($data->kk);
        }
        if(!empty($data) && isset($data->akte)){
            $data->akte = Storage::url($data->akte);
        }
        // $data->noKK = $modul1->decrypt();
        // dd($data);
        $modul1 = new Tpembayaran;
        $modul1->periode = session('periode');
        $modul1->id_user = session('id_user');
        $modul1->id_pembayaran = 1; // Asumsi id_pembayaran untuk formulir adalah 1
        // dd($modul1);
        $data1 = $modul1->checkTransaksiFormulir();
        // dd($data1);
        if (!empty($data1) && $data1[0]->lunas == 'T') {
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
        $rsa = new Helper;
        // dd($encrypt);
        $modul = new Pendaftaran;
        $modul->periode = session('periode');
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
        $modul->noKK = $rsa->encrypt($request->input('noKK'));
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
        $path_pasFoto = $request->file('pasFoto')->store('berkas', 'public');
        $path_fotoKK = $request->file('fotoKK')->store('berkas', 'public');
        $path_fotoAktaKelahiran = $request->file('fotoAktaKelahiran')->store('berkas', 'public');
        $modul->pasFoto = $path_pasFoto;
        $modul->fotoKK = $path_fotoKK;
        $modul->fotoAktaKelahiran = $path_fotoAktaKelahiran;
        $no_form = $modul->store_formulir();
        if(empty($no_form)){
            session()->flash('error', 'Formulir Pendaftaran Gagal Disimpan');
            return to_route('pendaftaran');
        }
        $modul->noForm = $no_form;
        $data = $modul->store();
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Siswa Berhasil Disimpan');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Siswa Gagal Disimpan');
        }
        return to_route('pendaftaran');
    }
    public function store_ortu(Request $request){
        $modul = new Pendaftaran;
        $rsa = new Helper;
        $modul->periode = session('periode');
        $modul->namaAyah = $request->input('namaAyah');
        $modul->tempatLahirAyah = $request->input('tempatLahirAyah');
        $modul->tanggalLahirAyah = $request->input('tanggalLahirAyah');
        $modul->nikAyah = $rsa->encrypt($request->input('nikAyah'));
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
        $modul->nikIbu = $rsa->encrypt($request->input('nikIbu'));
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
        $modul->nikWali = $rsa->encrypt($request->input('nikWali'));
        $modul->agamaWali = $request->input('agamaWali');
        $modul->kewarganegaraanWali = $request->input('kewarganegaraanWali');
        $modul->hubunganKeluargaWali = $request->input('hubunganKeluargaWali');
        $modul->ijazahTertinggiWali = $request->input('ijazahTertinggiWali');
        $modul->pekerjaanWali = $request->input('pekerjaanWali');
        $modul->penghasilanWali = preg_replace('/\./', '', $request->input('penghasilanWali'));
        $modul->alamatWali = $request->input('alamatWali');
        $modul->telpWali = $request->input('telpWali');
        $no_form = $modul->store_formulir();
        if(empty($no_form)){
            session()->flash('error', 'Formulir Pendaftaran Gagal Disimpan');
            return to_route('pendaftaran');
        }
        $modul->noForm = $no_form;
        $data = $modul->store_orang_tua_wali();
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Orang Tua Berhasil Disimpan');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Orang Tua Gagal Disimpan');
        }
        return to_route('pendaftaran');
    }
    public function update(Request $request)
    {
        // dd($request->all());
        $modul = new Pendaftaran;
        $rsa = new Helper;
        $data_berkas = $modul->getBerkas($request->input('idBerkas'));
        if ($request->hasFile('pasFoto')) {
            if($data_berkas->pas_foto != null){
                Storage::disk('public')->delete($data_berkas->pas_foto);
            }
            $path_pasFoto = $request->file('pasFoto')->store('berkas', 'public');
            $modul->pasFoto = $path_pasFoto;
        } else {
            if($request->input('pasFoto') == null){
                $modul->pasFoto = null;
            } else {
                $modul->pasFoto = $data_berkas->pas_foto;
            }
        }
        if ($request->hasFile('fotoKK')) {
            if($data_berkas->kk != null){
                Storage::disk('public')->delete($data_berkas->kk);
            }
            $path_fotoKK = $request->file('fotoKK')->store('berkas', 'public');
            $modul->fotoKK = $path_fotoKK;
        } else {
            if($request->input('fotoKK') == null){
                $modul->fotoKK = null;
            } else {
                $modul->fotoKK = $data_berkas->kk;
            }
        }
        if ($request->hasFile('fotoAktaKelahiran')) {
            if($data_berkas->akte != null){
                Storage::disk('public')->delete($data_berkas->akte);
            }
            $path_fotoAktaKelahiran = $request->file('fotoAktaKelahiran')->store('berkas', 'public');
            $modul->fotoAktaKelahiran = $path_fotoAktaKelahiran;
        } else {
            if($request->input('fotoAktaKelahiran') == null){

                $modul->fotoAktaKelahiran = null;
            } else {
                $modul->fotoAktaKelahiran = $data_berkas->akte;
            }
        }
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
        $modul->noKK = $rsa->encrypt($request->input('noKK'));
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
        $data = $modul->update($request->input('idCalonSiswa'), $request->input('idBerkas'));
        // dd($data);
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Siswa Berhasil Diupdate');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Siswa Gagal Diupdate');
        }
        return to_route('pendaftaran');
    }
    public function update_ortu(Request $request)
    {
        $modul = new Pendaftaran;
        $rsa = new Helper;
        $modul->namaAyah = $request->input('namaAyah');
        $modul->tempatLahirAyah = $request->input('tempatLahirAyah');
        $modul->tanggalLahirAyah = $request->input('tanggalLahirAyah');
        $modul->nikAyah = $rsa->encrypt($request->input('nikAyah'));
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
        $modul->nikIbu = $rsa->encrypt($request->input('nikIbu'));
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
        $modul->nikWali = $rsa->encrypt($request->input('nikWali'));
        $modul->agamaWali = $request->input('agamaWali');
        $modul->kewarganegaraanWali = $request->input('kewarganegaraanWali');
        $modul->hubunganKeluargaWali = $request->input('hubunganKeluargaWali');
        $modul->ijazahTertinggiWali = $request->input('ijazahTertinggiWali');
        $modul->pekerjaanWali = $request->input('pekerjaanWali');
        $modul->penghasilanWali = preg_replace('/\./', '', $request->input('penghasilanWali'));
        $modul->alamatWali = $request->input('alamatWali');
        $modul->telpWali = $request->input('telpWali');
        $data = $modul->updateOrangTuaWali($request->input('idOrangTuaWali'));
        // dd($data);
        if ($data) {
            session()->flash('success', 'Formulir Pendaftaran Orang Tua Berhasil Diupdate');
        } else {
            session()->flash('error', 'Formulir Pendaftaran Orang Tua Gagal Diupdate');
        }
        return to_route('pendaftaran');
    }
    public function cetak_kartu_peserta(Request $request)
    {
        // dd($request->all());
        $modul = new KartuPeserta;
        $modul->no_form = $request->no_form;
        $no_peserta = $modul->getRandomNoPeserta(session('periode'));
        // dd($no_peserta);
        $result = $modul->checkCalonSiswa();
        // dd($result);
        if(empty($result)){
            $modul->store($no_peserta);
        }
        $data = $modul->getDataKartuPeserta();
        // dd($data);
        // $data = $modul->detailCalonSiswa();
        // // dd($data);
        return Inertia::render('calon_siswa/cetak_kartu_peserta/StreamPdf',[
            'datas'=>$data,
        ]);
    }

    // Admin
    public function get_daftar_calon_siswa()
    {
        $modul = new Pendaftaran;
        // $modul->periode = session('periode');
        $data = $modul->getDaftarFormulir();
        // dd($data);
        return Inertia::render('admin/calon_siswa/CalonSiswa',[
            'datas'=>$data,
        ]);
    }
    public function detail_calon_siswa(Request $request)
    {
        // dd($request->all());
        // dd($request->no_form);
        $modul = new Pendaftaran;
        $modul->noForm = base64_decode($request->input('no_form'));
        $data = $modul->detailFormulir();
        if(!empty($data) && isset($data->pas_foto)){
            $data->pas_foto = Storage::url($data->pas_foto);
        }
        if(!empty($data) && isset($data->kk)){
            $data->kk = Storage::url($data->kk);
        }
        if(!empty($data) && isset($data->akte)){
            $data->akte = Storage::url($data->akte);
        }
        // dd($data);
        $modul1 = new Helper;
        if(!empty($data) && isset($data->no_kk)){
            $data->no_kk = $modul1->decrypt($data->no_kk);
            $data->nik_ayah = $modul1->decrypt($data->nik_ayah);
            $data->nik_ibu = $modul1->decrypt($data->nik_ibu);
        }
        // dd($data);
        return Inertia::render('admin/calon_siswa/DataCalonSiswa',[
            'datas'=>$data,
        ]);
    }
    public function verif_calon_siswa(Request $request)
    {
        // dd($request->all());
        $modul = new Pendaftaran;
        $modul->noForm = $request->input('no_form');
        $data = $modul->verifikasiFormulir();
        if ($data) {
            session()->flash('success', 'Data Calon Siswa Berhasil Diverifikasi');
        } else {
            session()->flash('error', 'Data Calon Siswa Gagal Diverifikasi');
        }
        return to_route('admin.detail.calon-siswa',[
            'no_form' => base64_encode($request->input('no_form'))
        ]);
    }
    public function batal_verif_calon_siswa(Request $request)
    {
        // dd($request->all());
        $modul = new Pendaftaran;
        $modul->noForm = $request->input('no_form');
        $data = $modul->batalVerifikasiFormulir();
        if ($data) {
            session()->flash('success', 'Data Calon Siswa Berhasil Dibatalkan Verifikasi');
        } else {
            session()->flash('error', 'Data Calon Siswa Gagal Dibatalkan Verifikasi');
        }
        return to_route('admin.detail.calon-siswa',[
            'no_form' => base64_encode($request->input('no_form'))
        ]);
    }

    public function cetak_calon_siswa(Request $request)
    {
        // dd($request->all());
        $modul = new Pendaftaran;
        $modul->noForm = base64_decode($request->input('no_form'));
        $data = $modul->detailFormulir();
        $modul1 = new Helper;
        if(!empty($data) && isset($data->no_kk)){
            $data->no_kk = $modul1->decrypt($data->no_kk);
            $data->nik_ayah = $modul1->decrypt($data->nik_ayah);
            $data->nik_ibu = $modul1->decrypt($data->nik_ibu);
        }
        // dd($data);
        return Inertia::render('admin/pdf/StreamPdfPage',[
            'datas'=>$data,
        ]);
    }

}
