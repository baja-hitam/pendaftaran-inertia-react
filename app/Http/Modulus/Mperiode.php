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
        $query = "SELECT * FROM Mperiode WHERE caktif = 'T'";
        $conn = DB::connection("mysql")->select($query);
        if(empty($conn)){
            return [];
        }
        return $conn;
    }
}
?>