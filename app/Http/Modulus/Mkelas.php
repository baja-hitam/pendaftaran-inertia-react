<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;

class Mkelas
{
    public $id_kelas;
    public $kelas;
    public $max;

    public function getIdKelas()
    {
        return $this->id_kelas;
    }

    public function getKelas()
    {
        return $this->kelas;
    }

    public function getMax()
    {
        return $this->max;
    }

    public function getAllKelas()
    {
        $query = <<<EOD
            SELECT * FROM mkelas
        EOD;
        $conn = DB::connection('mysql')->select($query);
        return $conn;
    }
    public function store(){
        $query = "INSERT INTO mkelas (kelas, max, created_at, updated_at) VALUES (:kelas, :max, NOW(), NOW())";
        $conn = DB::connection('mysql')->insert($query, [
            'kelas' => $this->getKelas(),
            'max' => $this->getMax()
        ]);
        return $conn;
    }
    public function update()
    {
        $query = "UPDATE mkelas SET kelas = :kelas, max = :max, updated_at = NOW() WHERE id_kelas = :id_kelas";
        $conn = DB::connection('mysql')->update($query, [
            'kelas' => $this->getKelas(),
            'max' => $this->getMax(),
            'id_kelas' => $this->getIdKelas()
        ]);
        return $conn;
    }
    public function destroy()
    {
        $query = "DELETE FROM mkelas WHERE id_kelas = :id_kelas";
        $conn = DB::connection('mysql')->delete($query, [
            'id_kelas' => $this->getIdKelas()
        ]);
        return $conn;
    }
}
?>