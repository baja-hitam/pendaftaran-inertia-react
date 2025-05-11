<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;

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
        $query = "INSERT INTO users (email, password) VALUES (:email, :password)";
        $conn = DB::connection("mysql")->insert($query, [
            'email' => $this->email,
            'password' => password_hash($this->password, PASSWORD_BCRYPT)
        ]);
        return $conn;
    }
}
?>