<?php
namespace App\Http\Helper;
class RSA {
    // Mendefinisikan nilai awal p dan q sebagai bilangan prima
    public $p = 61;
    public $q = 53;
    // Nilai n (modulus), phi (totien), e (eksponen publik), dan d (eksponen privat)
    public $n;
    public $phi;
    public $e = 17; // Dipilih supaya coprime dengan phi
    public $d;      // Akan diisi dengan invers dari e modulo phi



    // Konstruktor akan langsung menghitung n, phi, dan d
    public function __construct() {
        $this->n = $this->p * $this->q; // n = 61 * 53 = 3233
        $this->phi = ($this->p - 1) * ($this->q - 1); // phi = (61-1)*(53-1) = 3120
        $this->d = $this->modInverse($this->e, $this->phi); // Cari d = invers e mod phi
       
    }



    // Fungsi untuk mencari invers modular: e × d ≡ 1 (mod phi)
    public function modInverse($a, $m) {
        $m0 = $m;       // Simpan nilai awal m untuk nanti digunakan
        $x0 = 0;        // Inisialisasi nilai awal untuk Extended Euclidean Algorithm
        $x1 = 1;

        if ($m == 1) return 0; // Jika modulus adalah 1, tidak ada invers

        // Algoritma Euclidean Extended
        while ($a > 1) {
            $q = intdiv($a, $m); // Pembagian integer (q = a div m)
            $t = $m;             // Simpan nilai m

            $m = $a % $m;        // m menjadi sisa bagi (a mod m)
            $a = $t;             // a menjadi m sebelumnya

            $t = $x0;            // Simpan nilai x0
            $x0 = $x1 - $q * $x0; // Update x0 (turunan dari Euclidean Extended)
            $x1 = $t;             // x1 menjadi nilai x0 sebelumnya
        }

        // Jika hasil x1 negatif, ubah menjadi positif dengan menambahkan m0
        return ($x1 < 0) ? $x1 + $m0 : $x1;
    }



    // Modular Exponentiation: (base^exp) % mod
    public function modPow($base, $exp, $mod) {
        $result = 1;                  // Inisialisasi hasil
        $base = (int)$base % $mod;   // Pastikan base dalam batasan modulus

        // Selama eksponen masih > 0
        while ($exp > 0) {
            if ($exp % 2 == 1) { // Jika bit ganjil
                $result = ($result * $base) % $mod; // Kalikan dan modulus
            }
            $exp = intdiv($exp, 2);        // Bagi dua eksponen
            $base = ($base * $base) % $mod; // Pangkatkan base ke 2 lalu modulus
        }

        return $result;
    }

    

    // Fungsi untuk enkripsi string menjadi angka (ciphertext) . c = (m^e) mod n
    public function encrypt($plaintext) {
        if (empty($plaintext)) {
            return ''; // Jika kosong, kembalikan string kosong
        }

        $chars = str_split($plaintext); // Pisahkan per karakter
        $chipher = [];

        foreach ($chars as $char) {
            $m = ord($char); // Ubah karakter menjadi kode ASCII (m)
            $c = $this->modPow($m, $this->e, $this->n); // Enkripsi: c = (m^e) mod n
            $chipher[] = $c; // Simpan hasil ke array
        }

        return implode(',', $chipher); // Gabungkan menjadi satu string dipisahkan koma
    }

    // Fungsi untuk dekripsi ciphertext menjadi string asli . m = c^d mod n
    public function decrypt($chipertext) {
        if (empty($chipertext)) {
            return ''; // Jika kosong, kembalikan string kosong
        }

        $cipher_array = explode(',', $chipertext); // Pisahkan berdasarkan koma
        $plaintext = '';

        foreach ($cipher_array as $c) {
            $m = $this->modPow($c, $this->d, $this->n); // Dekripsi: m = (c^d) mod n
            $plaintext .= chr($m); // Ubah angka ASCII ke karakter
        }

        return $plaintext;
    }
}
?>
