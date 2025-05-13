<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
    public function login()
    {
        $query = "SELECT * FROM users WHERE email = :xemail";
        $conn = DB::connection("mysql")->select($query, [
            'xemail' => $this->email,
        ]);
        if(!Hash::check($this->password, $conn[0]->password)){
            return [];
        }
        return $conn;
    }
}
?>