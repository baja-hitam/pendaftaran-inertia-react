<?php
namespace App\Http\Helper;

class RSA{
    // Kunci publik dan privat
    public $p = 61;
    public $q = 53;
    public $n; // Modulus
    public $phi; //nilai totien
    public $e = 17; // Harus coprime dengan phi
    public $d; // Invers dari e modulo phi

    //kunci publi (e, n) dan kunci privat (d, n)

    public function __construct() {
        $this->n = $this->p * $this->q;
        $this->phi = ($this->p - 1) * ($this->q - 1);
        $modInverse = $this->modInverse($this->e, $this->phi);
        $this->setd($modInverse);
    }
    
    public function setd($modInverse) {
        $this->d = $modInverse;
    }
    // Fungsi untuk menghitung invers modulo
    public function modInverse($a, $m) {
    $m0 = $m;
    $x0 = 0;
    $x1 = 1;
    if ($m == 1) return 0;
    while ($a > 1) {
        $q = intdiv($a, $m);
        $t = $m;
        $m = $a % $m;
        $a = $t;
        $t = $x0;
        $x0 = $x1 - $q * $x0;
        $x1 = $t;
    }
        return ($x1 < 0) ? $x1 + $m0 : $x1;
    }
    
    // Fungsi pangkat modular tanpa bcpowmod (modular exponentiation)
    public function modPow($base, $exp, $mod) {
        $result = 1;
        $base = (int)$base % $mod;

        while ($exp > 0) {
            if ($exp % 2 == 1) {
                $result = ($result * $base) % $mod;
            }
            $exp = intdiv($exp, 2);
            $base = ($base * $base) % $mod;
        }

        return $result;
    }

    public function encrypt($plaintext){
        if (empty($plaintext)) {
            return '';
        }
        $chars = str_split($plaintext);
        $chipher = [];
        foreach ($chars as $char) {
            $m = ord($char);
            $c = $this->modPow($m, $this->e, $this->n);
            $chipher[] = $c;
        }
        return implode(',', $chipher);
    }
    public function decrypt($chipertext) {
        if(empty($chipertext)){
            return '';
        }
        $cipher_array = explode(',', $chipertext);
        $plaintext = '';
        foreach ($cipher_array as $c) {
            $m = $this->modPow($c, $this->d, $this->n);
            $plaintext .= chr($m);
        }
        return $plaintext;
    }



}
?>