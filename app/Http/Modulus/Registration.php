<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Registration
{
    public $email;
    public $password;

    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function checkEmail(){
        $query = "SELECT * FROM users WHERE email = :remail";
        $conn = DB::connection(name: "mysql")->select($query, [
            'remail' => $this->email
        ]);
        return $conn;
    }
    public function register()
    {
        $query = "INSERT INTO users (email, password,level,created_at,updated_at) VALUES (:remail, :rpassword,:rlevel,NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'remail' => $this->email,
            'rpassword' => Hash::make($this->password),
            'rlevel' => '1'
        ]);
        return $conn;
    }
}
?>