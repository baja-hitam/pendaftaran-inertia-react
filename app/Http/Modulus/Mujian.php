<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;

class MUjian
{
    public $nama_ujian;
    public $id_ujian;
    
    public function getNamaUjian()
    {
        return $this->nama_ujian;
    }
    public function getIdUjian(){
        return $this->id_ujian;
    }

    public function getUjian(){
        $query = "SELECT * FROM mujian";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function store(){
        $query = "INSERT INTO mujian (nama_ujian, created_at, updated_at) VALUES (:rnama_ujian, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'rnama_ujian' => $this->getNamaUjian()
        ]);
        return $conn;
    }
    public function update(){
        $query = "UPDATE mujian SET nama_ujian = :rnama_ujian, updated_at = NOW() WHERE id_ujian = :rid_ujian";
        $conn = DB::connection("mysql")->update($query, [
            'rnama_ujian' => $this->getNamaUjian(),
            'rid_ujian' => $this->getIdUjian()
        ]);
        return $conn;
    }
    public function destroy(){
        $query = "DELETE FROM mujian WHERE id_ujian = :rid_ujian";
        $conn = DB::connection("mysql")->delete($query, [
            'rid_ujian' => $this->getIdUjian()
        ]);
        return $conn;
    }
}
?>