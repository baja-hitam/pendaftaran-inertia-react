<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;
class Pendaftaran
{
    public $namaSiswa;
    public $periode;
    public $namaPanggilan;
    public $jenisKelamin;
    public $noForm;
    public $tempatLahir;
    public $tanggalLahir;
    public $agama;
    public $kewarganegaraan;
    public $anakKeBerapa;
    public $jmlKandung;
    public $jmlTiri;
    public $jmlAngkat;
    public $statusAnak;
    public $bahasa;
    public $alamat;
    public $noKK;
    public $kelurahan;
    public $kecamatan;
    public $kotaKabupaten;
    public $kodePos;
    public $telp;
    public $alamatTersebut;
    public $namaPemilikAlamat;
    public $modeTransportasi;
    public $golonganDarah;
    public $penyakit;
    public $tempatDirawat;
    public $kelainanJasmani;
    public $tinggiBadan;
    public $beratBadan;
    public $sdAsal;
    public $tanggalIjazah;
    public $nomorIjazah;
    public $tanggalSkhun;
    public $nomorSkhun;
    public $lamaBelajar;
    public $nisn;
    public $tipeSekolah;
    public $namaSekolah;
    public $tanggalPindah;
    public $alasanPindah;
    public $kesenian;
    public $olahraga;
    public $organisasi;
    public $prestasiLainnya;
    public $hobi;
    public $citaCita;
    public $idCalonSiswa;

    public $namaAyah;
    public $tempatLahirAyah;
    public $tanggalLahirAyah;
    public $nikAyah;
    public $agamaAyah;
    public $kewarganegaraanAyah;
    public $pendidikanTerakhirAyah;
    public $ijazahTertinggiAyah;
    public $pekerjaanAyah;
    public $alamatPekerjaanAyah;
    public $penghasilanAyah;
    public $alamatRumahAyah;
    public $telpAyah;
    public $statusAyah;

    public $namaIbu;
    public $tempatLahirIbu;
    public $tanggalLahirIbu;
    public $nikIbu;
    public $agamaIbu;
    public $kewarganegaraanIbu;
    public $pendidikanTerakhirIbu;
    public $ijazahTertinggiIbu;
    public $pekerjaanIbu;
    public $alamatPekerjaanIbu;
    public $penghasilanIbu;
    public $alamatRumahIbu;
    public $telpIbu;
    public $statusIbu;

    public $namaWali;
    public $tempatLahirWali;
    public $tanggalLahirWali;
    public $nikWali;
    public $agamaWali;
    public $kewarganegaraanWali;
    public $hubunganKeluargaWali;
    public $ijazahTertinggiWali;
    public $pekerjaanWali;
    public $penghasilanWali;
    public $alamatWali;
    public $telpWali;
    public $pasFoto;
    public $fotoKK;
    public $fotoAktaKelahiran;

    public function getPasFoto()
    {
        return $this->pasFoto;
    }
    public function getFotoKK()
    {
        return $this->fotoKK;
    }
    public function getFotoAktaKelahiran()
    {
        return $this->fotoAktaKelahiran;
    }

    public function getIdCalonSiswa()
    {
        return $this->idCalonSiswa;
    }

    public function getNoForm()
    {
        return $this->noForm;
    }
    public function getNamaAyah()
    {
        return $this->namaAyah;
    }
    public function getTempatLahirAyah()
    {
        return $this->tempatLahirAyah;
    }
    public function getTanggalLahirAyah()
    {
        return $this->tanggalLahirAyah;
    }
    public function getNikAyah()
    {
        return $this->nikAyah;
    }
    public function getAgamaAyah()
    {
        return $this->agamaAyah;
    }
    public function getKewarganegaraanAyah()
    {
        return $this->kewarganegaraanAyah;
    }
    public function getPendidikanTerakhirAyah()
    {
        return $this->pendidikanTerakhirAyah;
    }
    public function getIjazahTertinggiAyah()
    {
        return $this->ijazahTertinggiAyah;
    }
    public function getPekerjaanAyah()
    {
        return $this->pekerjaanAyah;
    }
    public function getAlamatPekerjaanAyah()
    {
        return $this->alamatPekerjaanAyah;
    }
    public function getPenghasilanAyah()
    {
        return $this->penghasilanAyah;
    }
    public function getAlamatRumahAyah()
    {
        return $this->alamatRumahAyah;
    }
    public function getTelpAyah()
    {
        return $this->telpAyah;
    }
    public function getStatusAyah()
    {
        return $this->statusAyah;
    }

    public function getNamaIbu()
    {
        return $this->namaIbu;
    }
    public function getTempatLahirIbu()
    {
        return $this->tempatLahirIbu;
    }
    public function getTanggalLahirIbu()
    {
        return $this->tanggalLahirIbu;
    }
    public function getNikIbu()
    {
        return $this->nikIbu;
    }
    public function getAgamaIbu()
    {
        return $this->agamaIbu;
    }
    public function getKewarganegaraanIbu()
    {
        return $this->kewarganegaraanIbu;
    }
    public function getPendidikanTerakhirIbu()
    {
        return $this->pendidikanTerakhirIbu;
    }
    public function getIjazahTertinggiIbu()
    {
        return $this->ijazahTertinggiIbu;
    }
    public function getPekerjaanIbu()
    {
        return $this->pekerjaanIbu;
    }
    public function getAlamatPekerjaanIbu()
    {
        return $this->alamatPekerjaanIbu;
    }
    public function getPenghasilanIbu()
    {
        return $this->penghasilanIbu;
    }
    public function getAlamatRumahIbu()
    {
        return $this->alamatRumahIbu;
    }
    public function getTelpIbu()
    {
        return $this->telpIbu;
    }
    public function getStatusIbu()
    {
        return $this->statusIbu;
    }

    public function getNamaWali()
    {
        return $this->namaWali;
    }
    public function getTempatLahirWali()
    {
        return $this->tempatLahirWali;
    }
    public function getTanggalLahirWali()
    {
        return $this->tanggalLahirWali;
    }
    public function getNikWali()
    {
        return $this->nikWali;
    }
    public function getAgamaWali()
    {
        return $this->agamaWali;
    }
    public function getKewarganegaraanWali()
    {
        return $this->kewarganegaraanWali;
    }
    public function getHubunganKeluargaWali()
    {
        return $this->hubunganKeluargaWali;
    }
    public function getIjazahTertinggiWali()
    {
        return $this->ijazahTertinggiWali;
    }
    public function getPekerjaanWali()
    {
        return $this->pekerjaanWali;
    }
    public function getPenghasilanWali()
    {
        return $this->penghasilanWali;
    }
    public function getAlamatWali()
    {
        return $this->alamatWali;
    }
    public function getTelpWali()
    {
        return $this->telpWali;
    }

    public function getNamaSiswa()
    {
        return $this->namaSiswa;
    }

    public function getPeriode(){
        return $this->periode;
    }
    public function getNamaPanggilan()
    {
        return $this->namaPanggilan;
    }

    public function getJenisKelamin()
    {
        return $this->jenisKelamin;
    }

    public function getTempatLahir()
    {
        return $this->tempatLahir;
    }

    public function getTanggalLahir()
    {
        return $this->tanggalLahir;
    }

    public function getAgama()
    {
        return $this->agama;
    }

    public function getKewarganegaraan()
    {
        return $this->kewarganegaraan;
    }

    public function getAnakKeBerapa()
    {
        return $this->anakKeBerapa;
    }

    public function getJmlKandung()
    {
        return $this->jmlKandung;
    }

    public function getJmlTiri()
    {
        return $this->jmlTiri;
    }

    public function getJmlAngkat()
    {
        return $this->jmlAngkat;
    }

    public function getStatusAnak()
    {
        return $this->statusAnak;
    }

    public function getBahasa()
    {
        return $this->bahasa;
    }

    public function getAlamat()
    {
        return $this->alamat;
    }

    public function getNoKK()
    {
        return $this->noKK;
    }

    public function getKelurahan()
    {
        return $this->kelurahan;
    }

    public function getKecamatan()
    {
        return $this->kecamatan;
    }

    public function getKotaKabupaten()
    {
        return $this->kotaKabupaten;
    }

    public function getKodePos()
    {
        return $this->kodePos;
    }

    public function getTelp()
    {
        return $this->telp;
    }

    public function getAlamatTersebut()
    {
        return $this->alamatTersebut;
    }

    public function getNamaPemilikAlamat()
    {
        return $this->namaPemilikAlamat;
    }

    public function getModeTransportasi()
    {
        return $this->modeTransportasi;
    }

    public function getGolonganDarah()
    {
        return $this->golonganDarah;
    }

    public function getPenyakit()
    {
        return $this->penyakit;
    }

    public function getTempatDirawat()
    {
        return $this->tempatDirawat;
    }

    public function getKelainanJasmani()
    {
        return $this->kelainanJasmani;
    }

    public function getTinggiBadan()
    {
        return $this->tinggiBadan;
    }

    public function getBeratBadan()
    {
        return $this->beratBadan;
    }

    public function getSdAsal()
    {
        return $this->sdAsal;
    }

    public function getTanggalIjazah()
    {
        return $this->tanggalIjazah;
    }

    public function getNomorIjazah()
    {
        return $this->nomorIjazah;
    }

    public function getTanggalSkhun()
    {
        return $this->tanggalSkhun;
    }

    public function getNomorSkhun()
    {
        return $this->nomorSkhun;
    }

    public function getLamaBelajar()
    {
        return $this->lamaBelajar;
    }

    public function getNisn()
    {
        return $this->nisn;
    }

    public function getTipeSekolah()
    {
        return $this->tipeSekolah;
    }

    public function getNamaSekolah()
    {
        return $this->namaSekolah;
    }

    public function getTanggalPindah()
    {
        return $this->tanggalPindah;
    }

    public function getAlasanPindah()
    {
        return $this->alasanPindah;
    }

    public function getKesenian()
    {
        return $this->kesenian;
    }

    public function getOlahraga()
    {
        return $this->olahraga;
    }

    public function getOrganisasi()
    {
        return $this->organisasi;
    }

    public function getPrestasiLainnya()
    {
        return $this->prestasiLainnya;
    }

    public function getHobi()
    {
        return $this->hobi;
    }

    public function getCitaCita()
    {
        return $this->citaCita;
    }
    public function getAllFormulir(){
        $query = <<<EOD
        SELECT formulir.no_form,calon_siswa.nama_lengkap,orang_tua_wali.nama_ayah,orang_tua_wali.nama_ibu,orang_tua_wali.nama_wali FROM formulir
        LEFT JOIN calon_siswa ON formulir.no_form = calon_siswa.no_form
        left join orang_tua_wali on formulir.no_form = orang_tua_wali.no_form
        EOD;
        $conn = DB::connection('mysql')->select($query);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function getBerkas($id_berkas){
        $query = "SELECT * FROM berkas where id_berkas = :ridberkas";
        $conn = DB::connection('mysql')->select($query,[
            'ridberkas' => $id_berkas,
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn[0];
    }
    public function checkDataCalonSiswa(){
        $query = "SELECT id_calon_siswa FROM calon_siswa where id_user = :riduser AND periode = :rcperiode";
        $conn = DB::connection('mysql')->select($query,[
            'riduser'=>session('id_user'),
            'rcperiode'=>$this->getPeriode(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn[0]->id_calon_siswa;
    }
    public function getJumlahPendaftaran(){
        $query = "SELECT COUNT(no_form) as jumlah_pendaftar, periode FROM formulir where periode = :rcperiode GROUP BY periode";
        $conn = DB::connection('mysql')->select($query,[
            'rcperiode'=>$this->getPeriode(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function counterIdCalonSiswa(){
        $query = "SELECT id_calon_siswa FROM calon_siswa order by id_calon_siswa desc";
        $conn = DB::connection(name: 'mysql')->select($query);
        if(empty($conn)){
            return 1;
        }

        return $conn[0]->id_calon_siswa + 1;
    }
    public function counterIdOrangTuaWali(){
        $query = "SELECT id_orangtua_wali FROM orang_tua_wali order by id_orangtua_wali desc";
        $conn = DB::connection(name: 'mysql')->select($query);
        if(empty($conn)){
            return 1;
        }

        return $conn[0]->id_orangtua_wali + 1;
    }
    public function getDaftarFormulir(){
        $query = <<<EOD
        SELECT formulir.no_form as no_formulir, formulir.periode, calon_siswa.*, orang_tua_wali.* from formulir
        LEFT JOIN calon_siswa ON formulir.no_form = calon_siswa.no_form
        LEFT JOIN orang_tua_wali ON formulir.no_form = orang_tua_wali.no_form
        where formulir.periode = :rperiode
        EOD;
        $conn = DB::connection('mysql')->select($query,[
            'rperiode' => $this->getPeriode(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function detailFormulir(){
        $query = <<<EOD
        SELECT * FROM formulir 
        LEFT JOIN calon_siswa ON formulir.no_form = calon_siswa.no_form
        LEFT JOIN orang_tua_wali ON formulir.no_form = orang_tua_wali.no_form
        LEFT JOIN berkas ON formulir.no_form = berkas.no_form
        WHERE formulir.no_form = :rnoform
        EOD;
        $conn = DB::connection('mysql')->select($query,[
            'rnoform' => $this->getNoForm(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn[0];
    }
    public function verifikasiFormulir(){
        $query = "UPDATE formulir SET verif_by = :riduser,verif_date = NOW(), updated_at = NOW() WHERE no_form = :rnoform";
        $conn = DB::connection('mysql')->update($query,[
            'riduser' => session('id_user'),
            'rnoform' => $this->getNoForm(),
        ]);
        if(!$conn){
            return [];
        }
        return true;
    }
    public function batalVerifikasiFormulir(){
        $query = "UPDATE formulir SET verif_by = NULL, verif_date = NOW(), updated_at = NOW() WHERE no_form = :rnoform";
        $conn = DB::connection('mysql')->update($query,[
            'rnoform' => $this->getNoForm(),
        ]);
        if(!$conn){
            return [];
        }
        return true;
    }
    public function index(){
        $query = <<<EOD
        SELECT formulir.no_form as no_formulir, formulir.verif_by, formulir.verif_date,calon_siswa.*,orang_tua_wali.*, berkas.* FROM formulir
        LEFT JOIN calon_siswa ON formulir.no_form = calon_siswa.no_form
        LEFT JOIN orang_tua_wali ON formulir.no_form = orang_tua_wali.no_form
        LEFT JOIN berkas ON formulir.no_form = berkas.no_form
        where periode = :rcperiode AND id_user = :riduser
        EOD;
        $conn = DB::connection('mysql')->select($query,[
            'riduser'=>session('id_user'),
            'rcperiode'=>$this->getPeriode(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn[0];
    }
    public function getNoFormulir(){
        $query = "SELECT no_form FROM formulir where id_user = :riduser AND periode = :rcperiode";
        $conn = DB::connection('mysql')->select($query,[
            'riduser'=>session('id_user'),
            'rcperiode'=>$this->getPeriode(),
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn[0]->no_form;
    }
    public function store_formulir(){
        $no_formulir = $this->getNoFormulir();
        if(!empty($no_formulir)){
            return $no_formulir;
        }
        $query = "INSERT INTO formulir (id_user, periode, created_at, updated_at) values (:riduser, :rcperiode, NOW(), NOW())";
        $conn = DB::connection('mysql')->insert($query,[
            'riduser' => session('id_user'),
            'rcperiode' => $this->getPeriode(),
        ]);
        if(!$conn){
            return [];
        }
        $no_formulir = $this->getNoFormulir();
        return $no_formulir;
    }
    public function store(){
        $id_calon_siswa = $this->counterIdCalonSiswa();
        $query = <<<EOD
        INSERT INTO calon_siswa ( `id_calon_siswa`, `no_form`, `nama_lengkap`, `nama_panggilan`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `agama`, `kewarganegaraan`, `anak_ke`, `jumlah_saudara_kandung`, `jumlah_saudara_tiri`, `jumlah_saudara_angkat`, `status_anak`, `bahasa_sehari_hari`, `alamat`, `no_kk`, `kelurahan`, `kecamatan`, `kota`, `kode_pos`, `nomor_telepon`, `tempat_alamat`, `nama_pemilik_tempat_alamat`, `jarak_ke_sekolah`, `metode_transportasi`, `golongan_darah`, `riwayat_rawat`, `riwayat_penyakit`, `kelainan_jasmani`, `tinggi_badan`, `berat_badan`, `nama_sekolah_asal`, `tanggal_ijazah`, `nomor_ijazah`, `tanggal_skhun`, `nomor_skhun`, `lama_belajar`, `nisn`, `tipe_riwayat_sekolah`, `nama_riwayat_sekolah`, `tanggal_pindah`, `alasan_pindah`, `kesenian`, `olahraga`, `organisasi`, `prestasi_lainnya`,`hobi`,`cita_cita`, `created_at`, `updated_at`) 
        VALUES (:ridcalonsiswa, :rnoform, :rnamalengkap, :rnamapanggilan, :rjeniskelamin, :rtempatlahir, :rtanggallahir, :ragama, :rkewarganegaraan, :ranakke, :rjumlahsaudarakandung, :rjumlahsaudaratiri, :rjumlahsaudaraangkat, :rstatusanak, :rbahasaseharihari, :ralamat, :rnokk, :rkelurahan, :rkecamatan, :rkota, :rkodepos, :rnomortelepon, :rtempatalamat, :rnamapemiliktempatalamat, :rjarakkesekolah, :rmetodetransportasi, :rgolongandarah, :rriwayatrawat, :rriwayatpenyakit, :rkelainanhasmani, :rtinggibadan, :rberatbadan, :rnamasekolahasal, :rtanggalijazah, :rnomorijazah, :rtanggalskhun, :rnomorskhun, :rlamabelajar, :rnisn, :rtiperiwayatsekolah, :rnamariwayatsekolah, :rtanggalpindah, :ralasanpindah, :rkesenian, :rolahraga, :rorganisasi, :rprestasilainnya, :rhobi, :rcitaCita, :rcreatedat, :rupdatedat)
        EOD;
        $conn = DB::connection('mysql')->insert($query,[
            'ridcalonsiswa' => $id_calon_siswa,
            'rnoform' => $this->getNoForm(),
            'rnamalengkap' => $this->getNamaSiswa(),
            'rnamapanggilan' => $this->getNamaPanggilan(),
            'rjeniskelamin' => $this->getJenisKelamin(),
            'rtempatlahir' => $this->getTempatLahir(),
            'rtanggallahir' => $this->getTanggalLahir(),
            'ragama' => $this->getAgama(),
            'rkewarganegaraan' => $this->getKewarganegaraan(),
            'ranakke' => $this->getAnakKeBerapa(),
            'rjumlahsaudarakandung' => $this->getJmlKandung(),
            'rjumlahsaudaratiri' => $this->getJmlTiri(),
            'rjumlahsaudaraangkat' => $this->getJmlAngkat(),
            'rstatusanak' => $this->getStatusAnak(),
            'rbahasaseharihari' => $this->getBahasa(),
            'ralamat' => $this->getAlamat(),
            'rnokk' => $this->getNoKK(),
            'rkelurahan' => $this->getKelurahan(),
            'rkecamatan' => $this->getKecamatan(),
            'rkota' => $this->getKotaKabupaten(),
            'rkodepos' => $this->getKodePos(),
            'rnomortelepon' => $this->getTelp(),
            'rtempatalamat' => $this->getAlamatTersebut(),
            'rnamapemiliktempatalamat' => $this->getNamaPemilikAlamat(),
            'rjarakkesekolah' => null,
            'rmetodetransportasi' => $this->getModeTransportasi(),
            'rgolongandarah' => $this->getGolonganDarah(),
            'rriwayatrawat' => $this->getTempatDirawat(),
            'rriwayatpenyakit' => $this->getPenyakit(),
            'rkelainanhasmani' => $this->getKelainanJasmani(),
            'rtinggibadan' => $this->getTinggiBadan(),
            'rberatbadan' => $this->getBeratBadan(),
            'rnamasekolahasal' => $this->getSdAsal(),
            'rtanggalijazah' => $this->getTanggalIjazah(),
            'rnomorijazah' => $this->getNomorIjazah(),
            'rtanggalskhun' => $this->getTanggalSkhun(),
            'rnomorskhun' => $this->getNomorSkhun(),
            'rlamabelajar' => $this->getLamaBelajar(),
            'rnisn' => $this->getNisn(),
            'rtiperiwayatsekolah' => $this->getTipeSekolah(),
            'rnamariwayatsekolah' => $this->getNamaSekolah(),
            'rtanggalpindah' => $this->getTanggalPindah(),
            'ralasanpindah' => $this->getAlasanPindah(),
            'rkesenian' => $this->getKesenian(),
            'rolahraga' => $this->getOlahraga(),
            'rorganisasi' => $this->getOrganisasi(),
            'rprestasilainnya' => $this->getPrestasiLainnya(),
            'rhobi'=>$this->getHobi(),
            'rcitaCita'=>$this->getCitaCita(),
            'rcreatedat' => now(),
            'rupdatedat' => now()
        ]);
        if(!$conn){
            return $conn;
        }
        $status = $this->store_berkas();
        return $status;
    }
    public function store_berkas(){
        $query = <<<EOD
        INSERT INTO berkas (no_form, pas_foto, kk, akte, created_at, updated_at) VALUES (:rnoform, :rpasfoto, :rkk, :rakte, :rcreatedat, :rupdatedat)
        EOD;
        $conn = DB::connection('mysql')->insert($query,[
            'rnoform' => $this->getNoForm(),
            'rpasfoto' => $this->getPasFoto(),
            'rkk' => $this->getFotoKK(),
            'rakte' => $this->getFotoAktaKelahiran(),
            'rcreatedat' => now(),
            'rupdatedat' => now()
        ]);
        return $conn;
    }
    public function store_orang_tua_wali(){
        $id_orangtua_wali = $this->counterIdOrangTuaWali();
        $query = <<<EOD
        INSERT INTO orang_tua_wali (id_orangtua_wali, no_form, nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, nik_ayah, agama_ayah, kewarganegaraan_ayah, pendidikan_terakhir_ayah, ijazah_tertinggi_ayah, pekerjaan_ayah, alamat_pekerjaan_ayah, penghasilan_ayah, alamat_rumah_ayah, telp_ayah, status_ayah,
            nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, nik_ibu, agama_ibu, kewarganegaraan_ibu, pendidikan_terakhir_ibu, ijazah_tertinggi_ibu, pekerjaan_ibu, alamat_pekerjaan_ibu, penghasilan_ibu, alamat_rumah_ibu, telp_ibu, status_ibu,
            nama_wali, tempat_lahir_wali,tanggal_lahir_wali ,nik_wali ,agama_wali ,kewarganegaraan_wali ,hubungan_keluarga_wali ,ijazah_tertinggi_wali ,pekerjaan_wali ,penghasilan_wali ,alamat_wali ,telp_wali,
            created_at, updated_at)
        VALUES (:ridorangtuwali,:rnoform,:rnamaayah,:rtempatlahirayah,:rtanggallahirayah,:rnikayah,:ragamaayah,:rkewarganegaraanayah,:rpendidikanterakhirayah,:rijazahtertinggiahya,:rpekerjaanayah,:ralamatpekerjaanayah,:rpenghasilanayah,:ralamatrumahayah,:rtelpayah,:rstatusayah,
            :rnamaibu,:rtempatlahiribu,:rtanggallahiribu,:rnikibu,:ragamaibu,:rkewarganegaraanibu,:rpendidikanterakhiribu,:rijazahtertinggiibu,:rpekerjaanibu,:ralamatpekerjaanibu,:rpenghasilanibu,:ralamatrumahiubu,:rtelpibu,:rstatusibu,
            :rnamawali,:rtempatlahirwali,:rtanggallahirwali,:rnikwali,:ragamawali,:rkewarganegaraanwali,:rhubungankeluargawali,:rijazahtertinggiwali,:rpekerjaanwali,:rpenghasilanwali,:ralamatwali,:rtelpwali,
            :rcreatedat, :rupdatedat)
        EOD;
        $conn = DB::connection('mysql')->insert($query,[
            'ridorangtuwali' => $id_orangtua_wali,
            'rnoform' => $this->getNoForm(),
            'rnamaayah' => $this->getNamaAyah(),
            'rtempatlahirayah' => $this->getTempatLahirAyah(),
            'rtanggallahirayah' => $this->getTanggalLahirAyah(),
            'rnikayah' => $this->getNikAyah(),
            'ragamaayah' => $this->getAgamaAyah(),
            'rkewarganegaraanayah' => $this->getKewarganegaraanAyah(),
            'rpendidikanterakhirayah' => $this->getPendidikanTerakhirAyah(),
            'rijazahtertinggiahya' => $this->getIjazahTertinggiAyah(),
            'rpekerjaanayah' => $this->getPekerjaanAyah(),
            'ralamatpekerjaanayah' => $this->getAlamatPekerjaanAyah(),
            'rpenghasilanayah' => $this->getPenghasilanAyah(),
            'ralamatrumahayah' => $this->getAlamatRumahAyah(),
            'rtelpayah' => $this->getTelpAyah(),
            'rstatusayah' => $this->getStatusAyah(),

            'rnamaibu' => $this->getNamaIbu(),
            'rtempatlahiribu' => $this->getTempatLahirIbu(),
            'rtanggallahiribu' => $this->getTanggalLahirIbu(),
            'rnikibu' => $this->getNikIbu(),
            'ragamaibu' => $this->getAgamaIbu(),
            'rkewarganegaraanibu' => $this->getKewarganegaraanIbu(),
            'rpendidikanterakhiribu' => $this->getPendidikanTerakhirIbu(),
            'rijazahtertinggiibu' => $this->getIjazahTertinggiIbu(),
            'rpekerjaanibu' => $this->getPekerjaanIbu(),
            'ralamatpekerjaanibu' => $this->getAlamatPekerjaanIbu(),
            'rpenghasilanibu' => $this->getPenghasilanIbu(),
            'ralamatrumahiubu' => $this->getAlamatRumahIbu(),
            'rtelpibu' => $this->getTelpIbu(),
            'rstatusibu' => $this->getStatusIbu(),
            'rnamawali' => $this->getNamaWali(),
            'rtempatlahirwali' => $this->getTempatLahirWali(),
            'rtanggallahirwali' => $this->getTanggalLahirWali(),
            'rnikwali' => $this->getNikWali(),
            'ragamawali' => $this->getAgamaWali(),
            'rkewarganegaraanwali' => $this->getKewarganegaraanWali(),
            'rhubungankeluargawali' => $this->getHubunganKeluargaWali(),
            'rijazahtertinggiwali' => $this->getIjazahTertinggiWali(),
            'rpekerjaanwali' => $this->getPekerjaanWali(),
            'rpenghasilanwali' => $this->getPenghasilanWali(),
            'ralamatwali' => $this->getAlamatWali(),
            'rtelpwali' => $this->getTelpWali(),
            'rcreatedat' => now(),
            'rupdatedat' => now(),
        ]);
        return $conn;
    }
    public function update($id_calon_siswa,$id_berkas)
    {
        // return $id_calon_siswa;
        $query = <<<EOD
        UPDATE calon_siswa SET
            nama_lengkap = :rnamalengkap,
            nama_panggilan = :rnamapanggilan,
            jenis_kelamin = :rjeniskelamin,
            tempat_lahir = :rtempatlahir,
            tanggal_lahir = :rtanggallahir,
            agama = :ragama,
            kewarganegaraan = :rkewarganegaraan,
            anak_ke = :ranakke,
            jumlah_saudara_kandung = :rjumlahsaudarakandung,
            jumlah_saudara_tiri = :rjumlahsaudaratiri,
            jumlah_saudara_angkat = :rjumlahsaudaraangkat,
            status_anak = :rstatusanak,
            bahasa_sehari_hari = :rbahasaseharihari,
            alamat = :ralamat,
            no_kk = :rnokk,
            kelurahan = :rkelurahan,
            kecamatan = :rkecamatan,
            kota = :rkota,
            kode_pos = :rkodepos,
            nomor_telepon = :rnomortelepon,
            tempat_alamat = :rtempatalamat,
            nama_pemilik_tempat_alamat = :rnamapemiliktempatalamat,
            jarak_ke_sekolah = :rjarakkesekolah,
            metode_transportasi = :rmetodetransportasi,
            golongan_darah = :rgolongandarah,
            riwayat_rawat = :rriwayatrawat,
            riwayat_penyakit = :rriwayatpenyakit,
            kelainan_jasmani = :rkelainanhasmani,
            tinggi_badan = :rtinggibadan,
            berat_badan = :rberatbadan,
            nama_sekolah_asal = :rnamasekolahasal,
            tanggal_ijazah = :rtanggalijazah,
            nomor_ijazah = :rnomorijazah,
            tanggal_skhun = :rtanggalskhun,
            nomor_skhun = :rnomorskhun,
            lama_belajar = :rlamabelajar,
            nisn = :rnisn,
            tipe_riwayat_sekolah = :rtiperiwayatsekolah,
            nama_riwayat_sekolah = :rnamariwayatsekolah,
            tanggal_pindah = :rtanggalpindah,
            alasan_pindah = :ralasanpindah,
            kesenian = :rkesenian,
            olahraga = :rolahraga,
            organisasi = :rorganisasi,
            prestasi_lainnya = :rprestasilainnya,
            hobi = :rhobi,
            cita_cita = :rcitaCita,
            updated_at = :rupdatedat
        WHERE id_calon_siswa = :ridcalonsiswa
    EOD;

        $result = DB::connection('mysql')->update($query, [
            'rnamalengkap' => $this->getNamaSiswa(),
            'rnamapanggilan' => $this->getNamaPanggilan(),
            'rjeniskelamin' => $this->getJenisKelamin(),
            'rtempatlahir' => $this->getTempatLahir(),
            'rtanggallahir' => $this->getTanggalLahir(),
            'ragama' => $this->getAgama(),
            'rkewarganegaraan' => $this->getKewarganegaraan(),
            'ranakke' => $this->getAnakKeBerapa(),
            'rjumlahsaudarakandung' => $this->getJmlKandung(),
            'rjumlahsaudaratiri' => $this->getJmlTiri(),
            'rjumlahsaudaraangkat' => $this->getJmlAngkat(),
            'rstatusanak' => $this->getStatusAnak(),
            'rbahasaseharihari' => $this->getBahasa(),
            'ralamat' => $this->getAlamat(),
            'rnokk' => $this->getNoKK(),
            'rkelurahan' => $this->getKelurahan(),
            'rkecamatan' => $this->getKecamatan(),
            'rkota' => $this->getKotaKabupaten(),
            'rkodepos' => $this->getKodePos(),
            'rnomortelepon' => $this->getTelp(),
            'rtempatalamat' => $this->getAlamatTersebut(),
            'rnamapemiliktempatalamat' => $this->getNamaPemilikAlamat(),
            'rjarakkesekolah' => null,
            'rmetodetransportasi' => $this->getModeTransportasi(),
            'rgolongandarah' => $this->getGolonganDarah(),
            'rriwayatrawat' => $this->getTempatDirawat(),
            'rriwayatpenyakit' => $this->getPenyakit(),
            'rkelainanhasmani' => $this->getKelainanJasmani(),
            'rtinggibadan' => $this->getTinggiBadan(),
            'rberatbadan' => $this->getBeratBadan(),
            'rnamasekolahasal' => $this->getSdAsal(),
            'rtanggalijazah' => $this->getTanggalIjazah(),
            'rnomorijazah' => $this->getNomorIjazah(),
            'rtanggalskhun' => $this->getTanggalSkhun(),
            'rnomorskhun' => $this->getNomorSkhun(),
            'rlamabelajar' => $this->getLamaBelajar(),
            'rnisn' => $this->getNisn(),
            'rtiperiwayatsekolah' => $this->getTipeSekolah(),
            'rnamariwayatsekolah' => $this->getNamaSekolah(),
            'rtanggalpindah' => $this->getTanggalPindah(),
            'ralasanpindah' => $this->getAlasanPindah(),
            'rkesenian' => $this->getKesenian(),
            'rolahraga' => $this->getOlahraga(),
            'rorganisasi' => $this->getOrganisasi(),
            'rprestasilainnya' => $this->getPrestasiLainnya(),
            'rhobi' => $this->getHobi(),
            'rcitaCita' => $this->getCitaCita(),
            'rupdatedat' => now(),
            'ridcalonsiswa' => $id_calon_siswa,
        ]);
        // dd($resultOrtu);
        if(!$result) {
            return false;
        }
        $resultBerkas = $this->updateBerkas($id_berkas);
        return $resultBerkas;
    }
    public function updateBerkas($id_berkas)
    {
        $query = <<<EOD
        UPDATE berkas SET
            pas_foto = :rpasfoto,
            kk = :rkk,
            akte = :rakte,
            updated_at = :rupdatedat
        WHERE id_berkas = :ridberkas
    EOD;

        $result = DB::connection('mysql')->update($query, [
            'rpasfoto' => $this->getPasFoto(),
            'rkk' => $this->getFotoKK(),
            'rakte' => $this->getFotoAktaKelahiran(),
            'rupdatedat' => now(),
            'ridberkas' => $id_berkas,
        ]);
        return $result;
    }

    public function updateOrangTuaWali($id_orangtua_wali)
    {
        $query = <<<EOD
        UPDATE orang_tua_wali SET
            nama_ayah = :rnamaayah,
            tempat_lahir_ayah = :rtempatlahirayah,
            tanggal_lahir_ayah = :rtanggallahirayah,
            nik_ayah = :rnikayah,
            agama_ayah = :ragamaayah,
            kewarganegaraan_ayah = :rkewarganegaraanayah,
            pendidikan_terakhir_ayah = :rpendidikanterakhirayah,
            ijazah_tertinggi_ayah = :rijazahtertinggiahya,
            pekerjaan_ayah = :rpekerjaanayah,
            alamat_pekerjaan_ayah = :ralamatpekerjaanayah,
            penghasilan_ayah = :rpenghasilanayah,
            alamat_rumah_ayah = :ralamatrumahayah,
            telp_ayah = :rtelpayah,
            status_ayah = :rstatusayah,

            nama_ibu = :rnamaibu,
            tempat_lahir_ibu = :rtempatlahiribu,
            tanggal_lahir_ibu = :rtanggallahiribu,
            nik_ibu = :rnikibu,
            agama_ibu = :ragamaibu,
            kewarganegaraan_ibu = :rkewarganegaraanibu,
            pendidikan_terakhir_ibu = :rpendidikanterakhiribu,
            ijazah_tertinggi_ibu = :rijazahtertinggiibu,
            pekerjaan_ibu = :rpekerjaanibu,
            alamat_pekerjaan_ibu = :ralamatpekerjaanibu,
            penghasilan_ibu = :rpenghasilanibu,
            alamat_rumah_ibu = :ralamatrumahiubu,
            telp_ibu = :rtelpibu,
            status_ibu = :rstatusibu,

            nama_wali = :rnamawali,
            tempat_lahir_wali= :rtempatlahirwali,
            tanggal_lahir_wali= :rtanggallahirwali,
            nik_wali= :rnikwali,
            agama_wali= :ragamawali,
            kewarganegaraan_wali= :rkewarganegaraanwali,
            hubungan_keluarga_wali= :rhubungankeluargawali,
            ijazah_tertinggi_wali= :rijazahtertinggiwali,
            pekerjaan_wali= :rpekerjaanwali,
            penghasilan_wali= :rpenghasilanwali,
            alamat_wali= :ralamatwali,
            telp_wali= :rtelpwali,
            updated_at = :rupdatedat
        WHERE id_orangtua_wali = :ridorangtuwali
    EOD;
        $result = DB::connection('mysql')->update($query, [
            'rnamaayah' => $this->getNamaAyah(),
            'rtempatlahirayah' => $this->getTempatLahirAyah(),
            'rtanggallahirayah' => $this->getTanggalLahirAyah(),
            'rnikayah' => $this->getNikAyah(),
            'ragamaayah' => $this->getAgamaAyah(),
            'rkewarganegaraanayah' => $this->getKewarganegaraanAyah(),
            'rpendidikanterakhirayah' => $this->getPendidikanTerakhirAyah(),
            'rijazahtertinggiahya' => $this->getIjazahTertinggiAyah(),
            'rpekerjaanayah' => $this->getPekerjaanAyah(),
            'ralamatpekerjaanayah' => $this->getAlamatPekerjaanAyah(),
            'rpenghasilanayah' => $this->getPenghasilanAyah(),
            'ralamatrumahayah' => $this->getAlamatRumahAyah(),
            'rtelpayah' => $this->getTelpAyah(),
            'rstatusayah' => $this->getStatusAyah(),

            'rnamaibu' => $this->getNamaIbu(),
            'rtempatlahiribu' => $this->getTempatLahirIbu(),
            'rtanggallahiribu' => $this->getTanggalLahirIbu(),
            'rnikibu' => $this->getNikIbu(),
            'ragamaibu' => $this->getAgamaIbu(),
            'rkewarganegaraanibu' => $this->getKewarganegaraanIbu(),
            'rpendidikanterakhiribu' => $this->getPendidikanTerakhirIbu(),
            'rijazahtertinggiibu' => $this->getIjazahTertinggiIbu(),
            'rpekerjaanibu' => $this->getPekerjaanIbu(),
            'ralamatpekerjaanibu' => $this->getAlamatPekerjaanIbu(),
            'rpenghasilanibu' => $this->getPenghasilanIbu(),
            'ralamatrumahiubu' => $this->getAlamatRumahIbu(),
            'rtelpibu' => $this->getTelpIbu(),
            'rstatusibu' => $this->getStatusIbu(),
            'rnamawali' => $this->getNamaWali(),
            'rtempatlahirwali' => $this->getTempatLahirWali(),
            'rtanggallahirwali' => $this->getTanggalLahirWali(),
            'rnikwali' => $this->getNikWali(),
            'ragamawali' => $this->getAgamaWali(),
            'rkewarganegaraanwali' => $this->getKewarganegaraanWali(),
            'rhubungankeluargawali' => $this->getHubunganKeluargaWali(),
            'rijazahtertinggiwali' => $this->getIjazahTertinggiWali(),
            'rpekerjaanwali' => $this->getPekerjaanWali(),
            'rpenghasilanwali' => $this->getPenghasilanWali(),
            'ralamatwali' => $this->getAlamatWali(),
            'rtelpwali' => $this->getTelpWali(),
            'rupdatedat' => now(),
            'ridorangtuwali' => $id_orangtua_wali,
        ]);
        // dd($result);
        return $result;
    }
    public function getFormulirPeriode()
    {
        $query = "SELECT periode FROM formulir WHERE id_user = :riduser ORDER BY periode";
        $conn = DB::connection('mysql')->select($query, [
            'riduser' => session('id_user'),
        ]);
        return $conn;
    }
}
?>