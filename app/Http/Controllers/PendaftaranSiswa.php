<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Http\Helper\RSA;
use Illuminate\Http\Request;
use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Pendaftaran;
use App\Http\Modulus\Tpembayaran;
use App\Http\Modulus\KartuPeserta;
use Illuminate\Support\Facades\Storage;

class PendaftaranSiswa extends Controller
{
    public function index()
    {
        $modul = new Pendaftaran;
        $rsa = new RSA;
        $modul->periode = session('periode');
        $data = $modul->index();
        // dd($data);
        if(!empty($data)){
            // Decrypt fields that are encrypted and not null
            $encryptedFields = [
                'nama_lengkap', 'nama_panggilan', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
                'agama', 'kewarganegaraan', 'anak_ke', 'jumlah_saudara_kandung', 'jumlah_saudara_tiri',
                'jumlah_saudara_angkat', 'status_anak', 'bahasa_sehari_hari', 'alamat', 'no_kk', 'kelurahan',
                'kecamatan', 'kota', 'kode_pos', 'nomor_telepon', 'tempat_alamat', 'nama_pemilik_tempat_alamat',
                'jarak_ke_sekolah', 'metode_transportasi', 'golongan_darah', 'riwayat_rawat', 'riwayat_penyakit',
                'kelainan_jasmani', 'tinggi_badan', 'berat_badan', 'nama_sekolah_asal', 'tanggal_ijazah',
                'nomor_ijazah', 'tanggal_skhun', 'nomor_skhun', 'lama_belajar', 'nisn', 'tipe_riwayat_sekolah',
                'nama_riwayat_sekolah', 'tanggal_pindah', 'alasan_pindah', 'kesenian', 'olahraga',
                'organisasi', 'prestasi_lainnya', 'hobi', 'cita_cita', 'pas_foto', 'kk', 'akte',
                'nama_ayah', 'tempat_lahir_ayah', 'tanggal_lahir_ayah', 'nik_ayah', 'agama_ayah',
                'kewarganegaraan_ayah', 'pendidikan_terakhir_ayah', 'ijazah_tertinggi_ayah', 'pekerjaan_ayah',
                'alamat_pekerjaan_ayah', 'penghasilan_ayah', 'alamat_rumah_ayah', 'telp_ayah', 'status_ayah',
                'nama_ibu', 'tempat_lahir_ibu', 'tanggal_lahir_ibu', 'nik_ibu', 'agama_ibu',
                'kewarganegaraan_ibu', 'pendidikan_terakhir_ibu', 'ijazah_tertinggi_ibu', 'pekerjaan_ibu',
                'alamat_pekerjaan_ibu', 'penghasilan_ibu', 'alamat_rumah_ibu', 'telp_ibu', 'status_ibu',
                'nama_wali', 'tempat_lahir_wali', 'tanggal_lahir_wali', 'nik_wali', 'agama_wali',
                'kewarganegaraan_wali', 'hubungan_keluarga_wali', 'ijazah_tertinggi_wali', 'pekerjaan_wali',
                'penghasilan_wali', 'alamat_wali', 'telp_wali'
            ];
            
            foreach($encryptedFields as $field){
                if(isset($data->$field) && !is_null($data->$field)){
                    $data->$field = $rsa->decrypt($data->$field);
                }
            }
            $data->pas_foto = Storage::url($data->pas_foto);
            $data->kk = Storage::url($data->kk);
            $data->akte = Storage::url($data->akte);
        }
        // dd($data);
        $modul1 = new Tpembayaran;
        $modul1->periode = session('periode');
        $modul1->id_user = session('id_user');
        $modul1->id_pembayaran = 1; // Asumsi id_pembayaran untuk formulir adalah 1
        // dd($modul1);
        $data1 = $modul1->checkTransaksiFormulir();
        // dd($data1);  
        $total_jumlah_hrsbayar = 0;
        $statusPembayaran = false;
        if(!empty($data1)){
            foreach ($data1 as $key => $row) {
                $total_jumlah_hrsbayar += (int)$rsa->decrypt($row->jumlah_hrsbayar);
            }
            if($total_jumlah_hrsbayar == (int)$data1[0]->total_pembayaran){
                $statusPembayaran = true;
            } else {
                $statusPembayaran = false;
            }
        }
        // dd($total_jumlah_hrsbayar);
        return Inertia::render('Pendaftaran',[
            'datas'=>$data,
            'statusPembayaran' => $statusPembayaran,
        ]);
    }
    
    public function store(Request $request)
    {
        $rsa = new RSA;
        // dd($encrypt);
        $modul = new Pendaftaran;
        $modul->periode = session('periode');
        $fields = [
            'namaSiswa', 'namaPanggilan', 'jenisKelamin', 'tempatLahir', 'tanggalLahir',
            'agama', 'kewarganegaraan', 'anakKeBerapa', 'jmlKandung', 'jmlTiri',
            'jmlAngkat', 'statusAnak', 'bahasa', 'alamat', 'noKK', 'kelurahan',
            'kecamatan', 'kotaKabupaten', 'kodePos', 'telp', 'alamatTersebut',
            'namaPemilikAlamat', 'modeTransportasi', 'golonganDarah', 'penyakit',
            'tempatDirawat', 'kelainanJasmani', 'tinggiBadan', 'beratBadan',
            'sdAsal', 'tanggalIjazah', 'nomorIjazah', 'tanggalSkhun', 'nomorSkhun',
            'lamaBelajar', 'nisn', 'tipeSekolah', 'namaSekolah', 'tanggalPindah',
            'alasanPindah', 'kesenian', 'olahraga', 'organisasi', 'prestasiLainnya',
            'hobi', 'citaCita'
        ];

        foreach ($fields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }
        $path_pasFoto = $request->file('pasFoto')->store('berkas', 'public');
        $path_fotoKK = $request->file('fotoKK')->store('berkas', 'public');
        $path_fotoAktaKelahiran = $request->file('fotoAktaKelahiran')->store('berkas', 'public');
        $modul->pasFoto = $rsa->encrypt($path_pasFoto);
        $modul->fotoKK = $rsa->encrypt($path_fotoKK);
        $modul->fotoAktaKelahiran = $rsa->encrypt($path_fotoAktaKelahiran);
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
        $rsa = new RSA;
        $modul->periode = session('periode');
        $parentFields = [
            'namaAyah', 'tempatLahirAyah', 'tanggalLahirAyah', 'agamaAyah', 'kewarganegaraanAyah',
            'pendidikanTerakhirAyah', 'ijazahTertinggiAyah', 'pekerjaanAyah', 'alamatPekerjaanAyah',
            'alamatRumahAyah', 'telpAyah', 'statusAyah', 'namaIbu', 'tempatLahirIbu', 'tanggalLahirIbu',
            'agamaIbu', 'kewarganegaraanIbu', 'pendidikanTerakhirIbu', 'ijazahTertinggiIbu', 'pekerjaanIbu',
            'alamatPekerjaanIbu', 'alamatRumahIbu', 'telpIbu', 'statusIbu', 'namaWali', 'tempatLahirWali',
            'tanggalLahirWali', 'agamaWali', 'kewarganegaraanWali', 'hubunganKeluargaWali', 'ijazahTertinggiWali',
            'pekerjaanWali', 'alamatWali', 'telpWali'
        ];

        foreach ($parentFields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }

        // Handle NIK fields separately with encryption
        $nikFields = ['nikAyah', 'nikIbu', 'nikWali'];
        foreach ($nikFields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }

        // Handle penghasilan fields with dot removal and encryption
        $penghasilanFields = ['penghasilanAyah', 'penghasilanIbu', 'penghasilanWali'];
        foreach ($penghasilanFields as $field) {
            $value = $request->input($field);
            if (!empty($value)) {
            $cleanValue = preg_replace('/\./', '', $value);
            $modul->$field = $rsa->encrypt($cleanValue);
            } else {
            $modul->$field = $value;
            }
        }
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
        $rsa = new RSA;
        $data_berkas = $modul->getBerkas($request->input('idBerkas'));
        if ($request->hasFile('pasFoto')) {
            if($data_berkas->pas_foto != null){
                Storage::disk('public')->delete($rsa->decrypt($data_berkas->pas_foto));
            }
            $path_pasFoto = $request->file('pasFoto')->store('berkas', 'public');
            $modul->pasFoto = $rsa->encrypt($path_pasFoto);
        } else {
            if($request->input('pasFoto') == null){
                $modul->pasFoto = null;
            } else {
                $modul->pasFoto = $data_berkas->pas_foto;
            }
        }
        if ($request->hasFile('fotoKK')) {
            if($data_berkas->kk != null){
                Storage::disk('public')->delete($rsa->decrypt($data_berkas->kk));
            }
            $path_fotoKK = $request->file('fotoKK')->store('berkas', 'public');
            $modul->fotoKK = $rsa->encrypt($path_fotoKK);
        } else {
            if($request->input('fotoKK') == null){
                $modul->fotoKK = null;
            } else {
                $modul->fotoKK = $data_berkas->kk;
            }
        }
        if ($request->hasFile('fotoAktaKelahiran')) {
            if($data_berkas->akte != null){
                Storage::disk('public')->delete($rsa->decrypt($data_berkas->akte));
            }
            $path_fotoAktaKelahiran = $request->file('fotoAktaKelahiran')->store('berkas', 'public');
            $modul->fotoAktaKelahiran = $rsa->encrypt($path_fotoAktaKelahiran);
        } else {
            if($request->input('fotoAktaKelahiran') == null){

                $modul->fotoAktaKelahiran = null;
            } else {
                $modul->fotoAktaKelahiran = $data_berkas->akte;
            }
        }
        $fields = [
            'namaSiswa', 'namaPanggilan', 'jenisKelamin', 'tempatLahir', 'tanggalLahir',
            'agama', 'kewarganegaraan', 'anakKeBerapa', 'jmlKandung', 'jmlTiri',
            'jmlAngkat', 'statusAnak', 'bahasa', 'alamat', 'noKK', 'kelurahan',
            'kecamatan', 'kotaKabupaten', 'kodePos', 'telp', 'alamatTersebut',
            'namaPemilikAlamat', 'modeTransportasi', 'golonganDarah', 'penyakit',
            'tempatDirawat', 'kelainanJasmani', 'tinggiBadan', 'beratBadan',
            'sdAsal', 'tanggalIjazah', 'nomorIjazah', 'tanggalSkhun', 'nomorSkhun',
            'lamaBelajar', 'nisn', 'tipeSekolah', 'namaSekolah', 'tanggalPindah',
            'alasanPindah', 'kesenian', 'olahraga', 'organisasi', 'prestasiLainnya',
            'hobi', 'citaCita'
        ];

        foreach ($fields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }
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
        $rsa = new RSA;
        $parentFields = [
            'namaAyah', 'tempatLahirAyah', 'tanggalLahirAyah', 'agamaAyah', 'kewarganegaraanAyah',
            'pendidikanTerakhirAyah', 'ijazahTertinggiAyah', 'pekerjaanAyah', 'alamatPekerjaanAyah',
            'alamatRumahAyah', 'telpAyah', 'statusAyah', 'namaIbu', 'tempatLahirIbu', 'tanggalLahirIbu',
            'agamaIbu', 'kewarganegaraanIbu', 'pendidikanTerakhirIbu', 'ijazahTertinggiIbu', 'pekerjaanIbu',
            'alamatPekerjaanIbu', 'alamatRumahIbu', 'telpIbu', 'statusIbu', 'namaWali', 'tempatLahirWali',
            'tanggalLahirWali', 'agamaWali', 'kewarganegaraanWali', 'hubunganKeluargaWali', 'ijazahTertinggiWali',
            'pekerjaanWali', 'alamatWali', 'telpWali'
        ];

        foreach ($parentFields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }

        // Handle NIK fields separately with encryption
        $nikFields = ['nikAyah', 'nikIbu', 'nikWali'];
        foreach ($nikFields as $field) {
            $value = $request->input($field);
            $modul->$field = empty($value) ? $value : $rsa->encrypt($value);
        }

        // Handle penghasilan fields with dot removal and encryption
        $penghasilanFields = ['penghasilanAyah', 'penghasilanIbu', 'penghasilanWali'];
        foreach ($penghasilanFields as $field) {
            $value = $request->input($field);
            if (!empty($value)) {
            $cleanValue = preg_replace('/\./', '', $value);
            $modul->$field = $rsa->encrypt($cleanValue);
            } else {
            $modul->$field = $value;
            }
        }
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
        $modul->no_form = $request->input('no_form');
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
    public function get_daftar_calon_siswa(Request $request)
    {
        $modul = new Pendaftaran;
        $modul1 = new Mperiode;
        $rsa = new RSA;
        // $modul->periode = session('periode');
        $modul->periode = $request->input('periode') ?? session('periode');
        $data = $modul->getDaftarFormulir();
        $dataPeriode = $modul1->getAllPeriode();
        // dd($data);
        $fields = [
            'nama_lengkap', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'kelurahan', 'kecamatan', 'kota'
        ];
        foreach ($data as $item) {
            foreach ($fields as $field) {
                if (isset($item->$field) && !is_null($item->$field)) {
                    $item->$field = $rsa->decrypt($item->$field);
                }
            }
        }
        // dd($data);
        return Inertia::render('admin/calon_siswa/CalonSiswa',[
            'datas'=>$data,
            'dataPeriode' => $dataPeriode,
            'periodeSession'=>$request->input('periode') ?? session('periode'),
        ]);
    }
    public function detail_calon_siswa(Request $request)
    {
        // dd($request->all());
        // dd($request->no_form);
        $modul = new Pendaftaran;
        $modul->noForm = base64_decode($request->input('no_form'));
        $rsa = new RSA;
        $data = $modul->detailFormulir();
        // dd($data);
        if(!empty($data)){
            // Decrypt fields that are encrypted and not null
            $encryptedFields = [
                'nama_lengkap', 'nama_panggilan', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
                'agama', 'kewarganegaraan', 'anak_ke', 'jumlah_saudara_kandung', 'jumlah_saudara_tiri',
                'jumlah_saudara_angkat', 'status_anak', 'bahasa_sehari_hari', 'alamat', 'no_kk', 'kelurahan',
                'kecamatan', 'kota', 'kode_pos', 'nomor_telepon', 'tempat_alamat', 'nama_pemilik_tempat_alamat',
                'jarak_ke_sekolah', 'metode_transportasi', 'golongan_darah', 'riwayat_rawat', 'riwayat_penyakit',
                'kelainan_jasmani', 'tinggi_badan', 'berat_badan', 'nama_sekolah_asal', 'tanggal_ijazah',
                'nomor_ijazah', 'tanggal_skhun', 'nomor_skhun', 'lama_belajar', 'nisn', 'tipe_riwayat_sekolah',
                'nama_riwayat_sekolah', 'tanggal_pindah', 'alasan_pindah', 'kesenian', 'olahraga',
                'organisasi', 'prestasi_lainnya', 'hobi', 'cita_cita', 'pas_foto', 'kk', 'akte',
                'nama_ayah', 'tempat_lahir_ayah', 'tanggal_lahir_ayah', 'nik_ayah', 'agama_ayah',
                'kewarganegaraan_ayah', 'pendidikan_terakhir_ayah', 'ijazah_tertinggi_ayah', 'pekerjaan_ayah',
                'alamat_pekerjaan_ayah', 'penghasilan_ayah', 'alamat_rumah_ayah', 'telp_ayah', 'status_ayah',
                'nama_ibu', 'tempat_lahir_ibu', 'tanggal_lahir_ibu', 'nik_ibu', 'agama_ibu',
                'kewarganegaraan_ibu', 'pendidikan_terakhir_ibu', 'ijazah_tertinggi_ibu', 'pekerjaan_ibu',
                'alamat_pekerjaan_ibu', 'penghasilan_ibu', 'alamat_rumah_ibu', 'telp_ibu', 'status_ibu',
                'nama_wali', 'tempat_lahir_wali', 'tanggal_lahir_wali', 'nik_wali', 'agama_wali',
                'kewarganegaraan_wali', 'hubungan_keluarga_wali', 'ijazah_tertinggi_wali', 'pekerjaan_wali',
                'penghasilan_wali', 'alamat_wali', 'telp_wali'
            ];
            
            foreach($encryptedFields as $field){
                if(isset($data->$field) && !is_null($data->$field)){
                    $data->$field = $rsa->decrypt($data->$field);
                }
            }
            $data->pas_foto = Storage::url($data->pas_foto);
            $data->kk = Storage::url($data->kk);
            $data->akte = Storage::url($data->akte);
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
        $rsa = new RSA;
        if(!empty($data)){
            // Decrypt fields that are encrypted and not null
            $encryptedFields = [
                'nama_lengkap', 'nama_panggilan', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
                'agama', 'kewarganegaraan', 'anak_ke', 'jumlah_saudara_kandung', 'jumlah_saudara_tiri',
                'jumlah_saudara_angkat', 'status_anak', 'bahasa_sehari_hari', 'alamat', 'no_kk', 'kelurahan',
                'kecamatan', 'kota', 'kode_pos', 'nomor_telepon', 'tempat_alamat', 'nama_pemilik_tempat_alamat',
                'jarak_ke_sekolah', 'metode_transportasi', 'golongan_darah', 'riwayat_rawat', 'riwayat_penyakit',
                'kelainan_jasmani', 'tinggi_badan', 'berat_badan', 'nama_sekolah_asal', 'tanggal_ijazah',
                'nomor_ijazah', 'tanggal_skhun', 'nomor_skhun', 'lama_belajar', 'nisn', 'tipe_riwayat_sekolah',
                'nama_riwayat_sekolah', 'tanggal_pindah', 'alasan_pindah', 'kesenian', 'olahraga',
                'organisasi', 'prestasi_lainnya', 'hobi', 'cita_cita', 'pas_foto', 'kk', 'akte',
                'nama_ayah', 'tempat_lahir_ayah', 'tanggal_lahir_ayah', 'nik_ayah', 'agama_ayah',
                'kewarganegaraan_ayah', 'pendidikan_terakhir_ayah', 'ijazah_tertinggi_ayah', 'pekerjaan_ayah',
                'alamat_pekerjaan_ayah', 'penghasilan_ayah', 'alamat_rumah_ayah', 'telp_ayah', 'status_ayah',
                'nama_ibu', 'tempat_lahir_ibu', 'tanggal_lahir_ibu', 'nik_ibu', 'agama_ibu',
                'kewarganegaraan_ibu', 'pendidikan_terakhir_ibu', 'ijazah_tertinggi_ibu', 'pekerjaan_ibu',
                'alamat_pekerjaan_ibu', 'penghasilan_ibu', 'alamat_rumah_ibu', 'telp_ibu', 'status_ibu',
                'nama_wali', 'tempat_lahir_wali', 'tanggal_lahir_wali', 'nik_wali', 'agama_wali',
                'kewarganegaraan_wali', 'hubungan_keluarga_wali', 'ijazah_tertinggi_wali', 'pekerjaan_wali',
                'penghasilan_wali', 'alamat_wali', 'telp_wali'
            ];
            
            foreach($encryptedFields as $field){
                if(isset($data->$field) && !is_null($data->$field)){
                    $data->$field = $rsa->decrypt($data->$field);
                }
            }
        }
        // dd($data);
        return Inertia::render('admin/pdf/StreamPdfPage',[
            'datas'=>$data,
        ]);
    }

}
