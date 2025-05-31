<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;

class Mperiode
{
    public $cperiode;
    public $dstart_date;
    public $dend_date;
    public $caktif;
    
    public function getCperiode()
    {
        return $this->cperiode;
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
        $query = "SELECT * FROM Mperiode order by cperiode desc";
        $conn = DB::connection("mysql")->select($query);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function checkPeriode(){
        $query = "SELECT * FROM Mperiode WHERE cperiode = :rcperiode";
        $conn = DB::connection("mysql")->select($query, [
            'rcperiode' => $this->getCperiode()
        ]);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
    public function store(){
        $query = "INSERT INTO Mperiode (cperiode, dstart_date, dend_date, caktif,created_at,updated_at) VALUES (:rcperiode, :rdstart_date, :rend_date, :rcaktif, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'rcperiode' => $this->getCperiode(),
            'rdstart_date' => $this->getDstartDate(),
            'rend_date' => $this->getDendDate(),
            'rcaktif' => $this->getCaktif()
        ]);
        return $conn;
    }
    public function update(){
        $query = "UPDATE Mperiode SET dstart_date = :rdstart_date, dend_date = :rend_date, caktif = :rcaktif, updated_at = NOW() WHERE cperiode = :rcperiode";
        $conn = DB::connection("mysql")->update($query, [
            'rdstart_date' => $this->getDstartDate(),
            'rend_date' => $this->getDendDate(),
            'rcaktif' => $this->getCaktif(),
            'rcperiode' => $this->getCperiode()
        ]);
        return $conn;
    }
    public function delete(){
        $query = "DELETE FROM Mperiode WHERE cperiode = :rcperiode";
        $conn = DB::connection("mysql")->delete($query, [
            'rcperiode' => $this->getCperiode()
        ]);
        return $conn;
    }
}
?>