<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;

class Mperiode
{
    public $periode;
    public $dstart_date;
    public $dend_date;
    public $caktif;
    
    public function getPeriode()
    {
        return $this->periode;
    }
    public function getDstartDate()
    {
        return $this->dstart_date;
    }
    public function getDendDate()
    {
        return $this->dend_date;
    }
    public function getCaktif()
    {
        return $this->caktif;
    }

    public function getAllPeriode(){
        $query = "SELECT * FROM Mperiode order by periode desc";
        $conn = DB::connection("mysql")->select($query);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function checkPeriode(){
        $query = "SELECT * FROM Mperiode WHERE periode = :rcperiode and aktif = 'T'";
        $conn = DB::connection("mysql")->select($query, [
            'rcperiode' => $this->getPeriode()
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function store(){
        $query = "INSERT INTO Mperiode (periode, start_date, end_date, aktif,created_at,updated_at) VALUES (:rcperiode, :rdstart_date, :rend_date, :rcaktif, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'rcperiode' => $this->getPeriode(),
            'rdstart_date' => $this->getDstartDate(),
            'rend_date' => $this->getDendDate(),
            'rcaktif' => $this->getCaktif()
        ]);
        return $conn;
    }
    public function update(){
        $query = "UPDATE Mperiode SET start_date = :rdstart_date, end_date = :rend_date, aktif = :rcaktif, updated_at = NOW() WHERE periode = :rcperiode";
        $conn = DB::connection("mysql")->update($query, [
            'rdstart_date' => $this->getDstartDate(),
            'rend_date' => $this->getDendDate(),
            'rcaktif' => $this->getCaktif(),
            'rcperiode' => $this->getPeriode()
        ]);
        return $conn;
    }
    public function delete(){
        $query = "DELETE FROM Mperiode WHERE periode = :rcperiode";
        $conn = DB::connection("mysql")->delete($query, [
            'rcperiode' => $this->getPeriode()
        ]);
        return $conn;
    }
}
?>