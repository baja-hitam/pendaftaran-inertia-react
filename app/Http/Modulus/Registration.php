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
        $query = "SELECT * FROM users WHERE email = :email";
        $conn = DB::connection("mysql")->select($query, [
            'email' => $this->email
        ]);
        return $conn;
    }
    public function register()
    {
        $query = "INSERT INTO users (email, password,level) VALUES (:xemail, :xpassword,:xlevel)";
        $conn = DB::connection("mysql")->insert($query, [
            'xemail' => $this->email,
            'xpassword' => Hash::make($this->password),
            'xlevel' => '2'
        ]);
        return $conn;
    }
}
?>