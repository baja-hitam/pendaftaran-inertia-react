<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;

class KartuPeserta
{
    public $id_kartu_peserta;
    public $no_form;
    public $no_peserta;
    public $keterangan;

    public function getIdKartuPeserta()
    {
        return $this->id_kartu_peserta;
    }
    public function getNoForm()
    {
        return $this->no_form;
    }
    public function getNoPeserta()
    {
        return $this->no_peserta;
    }
    public function getKeterangan()
    {
        return $this->keterangan;
    }
    public function getRandomNoPeserta($periode){
        $nilai_awal = 1;
        $query = <<<EOD
            SELECT * 
            FROM kartu_peserta
            WHERE no_peserta LIKE CONCAT(:rperiode, '%')
        EOD;
        $result = DB::connection('mysql')->select($query, [
            'rperiode' => $periode
        ]);
        // $nilai_awal += count($result);
        $nilai_awal = str_pad($nilai_awal + count($result), 3, '0', STR_PAD_LEFT);
        $no_peserta = $periode.$nilai_awal;
        return $no_peserta;
    }
    public function checkCalonSiswa(){
        $query = <<<EOD
            SELECT * 
            FROM kartu_peserta
            WHERE no_form = :rnoform
        EOD;
        $result = DB::connection('mysql')->select($query, [
            'rnoform' => $this->getNoForm()
        ]);
        return $result;
    }
    public function getDataKartuPeserta(){
        $query = <<<EOD
            SELECT * 
            FROM kartu_peserta a
            INNER JOIN formulir b
            ON a.no_form = b.no_form
            INNER JOIN calon_siswa c
            ON b.no_form = c.no_form
            WHERE a.no_form = :no_form
        EOD;
        $result = DB::connection('mysql')->select($query, [
            'no_form' => $this->getNoForm()
        ]);
        return $result[0];
    }
    public function store($no_peserta){
        $query = <<<EOD
            INSERT INTO kartu_peserta (no_form, no_peserta, keterangan, created_at, updated_at)
            VALUES (:no_form, :no_peserta, :keterangan, NOW(), NOW())
        EOD;

        $conn = DB::connection('mysql')->insert($query, [
            'no_form' => $this->getNoForm(),
            'no_peserta' => $no_peserta,
            'keterangan' => NULL
        ]);
        return $conn;
    }
}
?>