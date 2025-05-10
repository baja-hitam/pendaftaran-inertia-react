<?php
namespace App\Http\Modulus;

use Illuminate\Support\Facades\DB;

class Authentication
{
    public $email;
    public $password;

    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function register()
    {
        $query = "INSERT INTO users (email, password) VALUES (:email, :password)";
        $conn = DB::connection("mysql")->insert($query, [
            'email' => $this->email,
            'password' => password_hash($this->password, PASSWORD_BCRYPT)
        ]);
        if(!$conn){
            return 'Data gagal disimpan';
        }
        return 'Data berhasil disimpan';
    }
}
?>