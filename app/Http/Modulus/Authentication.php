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
        $query = "SELECT * FROM users WHERE email = :remail and level = '1'";
        $conn = DB::connection("mysql")->select($query, [
            'remail' => $this->email,
        ]);
        if(empty($conn)){
            return [];
        }else if(!Hash::check($this->password, $conn[0]->password)){
            return [];
        }
        return $conn;
    }
    public function login_admin()
    {
        $query = "SELECT * FROM admin WHERE email = :remail and level = '2'";
        $conn = DB::connection("mysql")->select($query, [
            'remail' => $this->email,
        ]);
        if(empty($conn)){
            return [];
        }else if(!Hash::check($this->password, $conn[0]->password)){
            return [];
        }
        return $conn;
    }
}
?>