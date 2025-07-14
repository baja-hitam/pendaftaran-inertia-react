<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Registration
{
    public $email;
    public $nama_lengkap;
    public $no_telp;
    public $password;

    public function getEmail(){
        return $this->email;
    }
    public function getNamaLengkap(){
        return $this->nama_lengkap;
    }
    public function getNoTelp(){
        return $this->no_telp;
    }
    public function getPassword(){
        return $this->password;
    }
    public function checkEmail(){
        $query = "SELECT * FROM users WHERE email = :remail";
        $conn = DB::connection(name: "mysql")->select($query, [
            'remail' => $this->getEmail()
        ]);
        return $conn;
    }
    public function register()
    {
        $query = "INSERT INTO users (email, nama_lengkap, no_telp, password,level,created_at,updated_at) VALUES (:remail,:rnamalnkp,:rnotelp, :rpassword,:rlevel,NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'remail' => $this->getEmail(),
            'rnamalnkp' => $this->getNamaLengkap(),
            'rnotelp' => $this->getNoTelp(),
            'rpassword' => Hash::make($this->password),
            'rlevel' => '1'
        ]);
        return $conn;
    }
}
?>