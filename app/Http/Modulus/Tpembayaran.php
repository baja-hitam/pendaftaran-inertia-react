<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;
class Tpembayaran
{
    public $cperiode;
    public $id_user;
    public $id_pembayaran;
    public $tanggal_pembayaran;
    public $njumlah;

    public function getCperiode()
    {
        return $this->cperiode;
    }
    public function getIdUser()
    {
        return $this->id_user;
    }
    public function getIdPembayaran()
    {
        return $this->id_pembayaran;
    }
    public function getTanggalPembayaran()
    {
        return $this->tanggal_pembayaran;
    }
    public function getNjumlah()
    {
        return $this->njumlah;
    }

    public function getAllPembayaran()
    {
        $query = "SELECT * FROM mpembayaran ORDER BY id_pembayaran DESC";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function getAllUser(){
        $query = "SELECT id_user,email FROM users where level = 1";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function getAllTransaksi(){
        $query = <<<EOD
            SELECT 
            a.id_transaksi_pembayaran,
            a.id_user,
            a.id_pembayaran,
            a.cperiode as periode,
            c.email,
            a.jumlah_pembayaran,
            a.tanggal_pembayaran,
            b.nama_pembayaran as jenis_pembayaran
            FROM transaksi_pembayaran a
            INNER JOIN mpembayaran b
            ON a.id_pembayaran = b.id_pembayaran
            INNER JOIN users c
            ON a.id_user = c.id_user
        EOD;
        $conn = DB::connection('mysql')->select($query);
        return $conn;
    }
    public function checkTransaksiFormulir(){
        $query = "SELECT * FROM transaksi_pembayaran WHERE id_user = :id_user AND cperiode = :cperiode AND id_pembayaran = 1";
        $conn = DB::connection("mysql")->select($query, [
            'id_user' => $this->getIdUser(),
            'cperiode' => $this->getCperiode()
        ]);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function store()
    {
        $query = "INSERT INTO transaksi_pembayaran (id_user,id_pembayaran,cperiode,tanggal_pembayaran, jumlah_pembayaran, created_at, updated_at) VALUES (:id_user, :id_pembayaran, :rcperiode, :rtanggalpembayaran, :rnjumlah, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'id_user' => $this->getIdUser(),
            'id_pembayaran' => $this->getIdPembayaran(),
            'rcperiode' => $this->getCperiode(),
            'rtanggalpembayaran' => $this->getTanggalPembayaran(),
            'rnjumlah' => $this->getNjumlah()
        ]);
        return $conn;
    }

    public function update($id_transaksi_pembayaran)
    {
        $query = "UPDATE transaksi_pembayaran SET id_user = :id_user, id_pembayaran = :id_pembayaran, cperiode = :rcperiode, jumlah_pembayaran = :rnjumlah, updated_at = NOW() WHERE id_transaksi_pembayaran = :id_transaksi_pembayaran";
        $conn = DB::connection("mysql")->update($query, [
            'id_user' => $this->getIdUser(),
            'id_pembayaran' => $this->getIdPembayaran(),
            'rcperiode' => $this->getCperiode(),
            'rnjumlah' => $this->getNjumlah(),
            'id_transaksi_pembayaran' => $id_transaksi_pembayaran
        ]);
        return $conn;
    }
    public function destroy($id_transaksi_pembayaran)
    {
        $query = "DELETE FROM transaksi_pembayaran WHERE id_transaksi_pembayaran = :id_transaksi_pembayaran";
        $conn = DB::connection("mysql")->delete($query, [
            'id_transaksi_pembayaran' => $id_transaksi_pembayaran
        ]);
        return $conn;
    }
}
?>