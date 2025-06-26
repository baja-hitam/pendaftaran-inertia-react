<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;
class Mpembayaran
{
    public $id;
    public $nama_pembayaran;
    public $total_pembayaran;
    public $periode;


    public function getNamaPembayaran()
    {
        return $this->nama_pembayaran;
    }
    public function getTotalPembayaran()
    {
        return $this->total_pembayaran;
    }
    public function getId()
    {
        return $this->id;
    }
    public function getPeriode()
    {
        return $this->periode;
    }
    public function getAllPembayaran()
    {
        $query = "SELECT * FROM mpembayaran";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function store()
    {
        $query = "INSERT INTO mpembayaran (nama_pembayaran, periode, total_pembayaran, created_at, updated_at) VALUES (:rnama_pembayaran, :rperiode, :rtotal_pembayaran, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'rnama_pembayaran' => $this->getNamaPembayaran(),
            'rperiode' => $this->getPeriode(),
            'rtotal_pembayaran' => $this->getTotalPembayaran()
        ]);
        return $conn;
    }
    public function destroy()
    {
        $query = "DELETE FROM mpembayaran WHERE id_pembayaran = :rid";
        $conn = DB::connection("mysql")->delete($query, [
            'rid' => $this->getId()
        ]);
        return $conn;
    }
    public function update()
    {
        $query = "UPDATE mpembayaran SET nama_pembayaran = :rnama_pembayaran, total_pembayaran = :rtotal_pembayaran, updated_at = NOW() WHERE id_pembayaran = :rid";
        $conn = DB::connection("mysql")->update($query, [
            'rnama_pembayaran' => $this->getNamaPembayaran(),
            'rtotal_pembayaran' => $this->getTotalPembayaran(),
            'rid' => $this->getId()
        ]);
        return $conn;
    }
}
?>