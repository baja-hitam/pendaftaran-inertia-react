<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;

class DetailUjian
{
    public $id_ujian;
    public $id_detail_ujian;
    public $periode;
    public $waktu_mulai;
    public $tanggal_ujian;
    public $waktu_selesai;
    public $ruang_ujian;
    public $status;

    public function getIdUjian()
    {
        return $this->id_ujian;
    }
    public function getPeriode()
    {
        return $this->periode;
    }
    public function getIdDetailUjian()
    {
        return $this->id_detail_ujian;
    }
    public function getWaktuMulai()
    {
        return $this->waktu_mulai;
    }

    public function getWaktuSelesai()
    {
        return $this->waktu_selesai;
    }

    public function getRuangUjian()
    {
        return $this->ruang_ujian;
    }

    public function getStatus()
    {
        return $this->status;
    }
    public function getTanggalUjian()
    {
        return $this->tanggal_ujian;
    }
    public function index(){
        $query = <<<EOD
            SELECT 
            a.id_detail_ujian,
            a.id_ujian,
            a.periode,
            b.nama_ujian,
            a.tanggal_ujian,
            a.waktu_mulai,
            a.waktu_selesai,
            a.ruang_ujian,
            a.caktif
            FROM detail_ujian a
            INNER JOIN mujian b 
            ON a.id_ujian = b.id_ujian
            order by a.caktif desc , a.tanggal_ujian asc, a.waktu_mulai asc
        EOD;
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function getAllUjianAktif(){
        $query = <<<EOD
            SELECT 
            a.id_detail_ujian,
            a.id_ujian,
            b.nama_ujian,
            a.tanggal_ujian,
            a.waktu_mulai,
            a.waktu_selesai,
            a.ruang_ujian,
            a.caktif
            FROM detail_ujian a
            INNER JOIN mujian b 
            ON a.id_ujian = b.id_ujian
            WHERE a.caktif = 'T'
            order by a.tanggal_ujian asc, a.waktu_mulai asc
        EOD;
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function checkDetailUjianAktif(){
        $query = "SELECT * FROM detail_ujian WHERE caktif = 'T' AND id_ujian = :rid_ujian";
        $conn = DB::connection("mysql")->select($query,[
            'rid_ujian' => $this->getIdUjian()
        ]);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function store(){
        $query = "INSERT INTO detail_ujian (id_ujian, periode, waktu_mulai, tanggal_ujian, waktu_selesai, ruang_ujian, caktif, created_at, updated_at) VALUES (:rid_ujian, :rperiode, :rwaktu_mulai, :rtanggal_ujian, :rwaktu_selesai, :rruang_ujian, :rstatus, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'rid_ujian' => $this->getIdUjian(),
            'rperiode' => $this->getPeriode(),
            'rwaktu_mulai' => $this->getWaktuMulai(),
            'rtanggal_ujian' => $this->getTanggalUjian(),
            'rwaktu_selesai' => $this->getWaktuSelesai(),
            'rruang_ujian' => $this->getRuangUjian(),
            'rstatus' => $this->getStatus()
        ]);
        return $conn;
    }
    public function update(){
        $query = "UPDATE detail_ujian SET id_ujian = :rid_ujian, waktu_mulai = :rwaktu_mulai, tanggal_ujian = :rtanggal_ujian, waktu_selesai = :rwaktu_selesai, ruang_ujian = :rruang_ujian, caktif = :rstatus, updated_at = NOW() WHERE id_detail_ujian = :rid_detail_ujian";
        $conn = DB::connection("mysql")->update($query, [
            'rid_ujian' => $this->getIdUjian(),
            'rwaktu_mulai' => $this->getWaktuMulai(),
            'rtanggal_ujian' => $this->getTanggalUjian(),
            'rwaktu_selesai' => $this->getWaktuSelesai(),
            'rruang_ujian' => $this->getRuangUjian(),
            'rstatus' => $this->getStatus(),
            'rid_detail_ujian' => $this->getIdDetailUjian()
        ]);
        return $conn;
    }
    public function destroy(){
        $query = "DELETE FROM detail_ujian WHERE id_detail_ujian = :rid_detail_ujian";
        $conn = DB::connection("mysql")->delete($query, [
            'rid_detail_ujian' => $this->getIdDetailUjian()
        ]);
        return $conn;
    }
}
?>