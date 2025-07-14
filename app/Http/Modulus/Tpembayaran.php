<?php
namespace App\Http\Modulus;
use Illuminate\Support\Facades\DB;
class Tpembayaran
{
    public $periode;
    public $id_user;
    public $id_pembayaran;
    public $tanggal_dibayar;
    public $id_transaksi_pembayaran;
    public $search;
    public $jumlah_hrsbayar;
    public $nama_entry_admin;
    public $no_form;


    public function getPeriode()
    {
        return $this->periode;
    }
    public function getIdTransaksiPembayaran()
    {
        return $this->id_transaksi_pembayaran;
    }
    public function getIdUser()
    {
        return $this->id_user;
    }
    public function getIdPembayaran()
    {
        return $this->id_pembayaran;
    }
    public function getTanggalDibayar()
    {
        return $this->tanggal_dibayar;
    }
    public function getJumlahHrsBayar()
    {
        return $this->jumlah_hrsbayar;
    }
    public function getNamaEntryAdmin()
    {
        return $this->nama_entry_admin;
    }
    public function getSearch()
    {
        return $this->search;
    }
    public function getNoForm()
    {
        return $this->no_form;
    }

    public function getAllPembayaran()
    {
        $query = "SELECT * FROM mpembayaran where aktif = 'T' ORDER BY nama_pembayaran DESC";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function getTotalPembayaran()
    {
        $query = "SELECT total_pembayaran FROM mpembayaran WHERE id_pembayaran = :ridpembayaran";
        $conn = DB::connection("mysql")->select($query, [
            'ridpembayaran' => $this->getIdPembayaran()
        ]);
        if (empty($conn)) {
            return [];
        }
        return $conn[0]->total_pembayaran;
    }
    public function checkCicilan(){
        if($this->getIdUser() != null){
            $where = "WHERE id_pembayaran = :ridpembayaran and periode = :rperiode and id_user = :riduser and no_form is null";
            $params = [
                'riduser' => $this->getIdUser(),
                'rperiode' => $this->getPeriode(),
                'ridpembayaran' => $this->getIdPembayaran(),
            ];
        }else if($this->getNoForm() != null){
            $where = "WHERE id_pembayaran = :ridpembayaran and periode = :rperiode and no_form = :rnoform and id_user is null";
            $params = [
                'rnoform' => $this->getNoForm(),
                'rperiode' => $this->getPeriode(),
                'ridpembayaran' => $this->getIdPembayaran(),
            ];
        }
        $query = "SELECT * FROM transaksi_pembayaran $where";
        $conn = DB::connection("mysql")->select($query,$params);
        return $conn;
    }
    public function getAllUser(){
        $query = "SELECT id_user,email FROM users where level = 1";
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function getAllTransaksi(){
        $query = <<<EOD
            SELECT 
            a.id_transaksi_pembayaran,
            a.id_user,
            a.id_pembayaran,
            c.nama_lengkap,
            a.periode,
            c.email,
            a.jumlah_hrsbayar,
            a.tanggal_dibayar,
            b.nama_pembayaran,
            a.nama_entry_admin,
            e.nama_lengkap as nama_siswa
            FROM transaksi_pembayaran a
            INNER JOIN mpembayaran b
            ON a.id_pembayaran = b.id_pembayaran
            LEFT JOIN users c
            ON a.id_user = c.id_user
            LEFT JOIN formulir d
            ON a.no_form = d.no_form
            LEFT JOIN calon_siswa e
            ON a.no_form = e.no_form
        EOD;
        $conn = DB::connection("mysql")->select($query);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function search(){
        if($this->getIdPembayaran() == 1){
            $where = "WHERE c.email LIKE CONCAT('%', :rsearch, '%') AND a.periode LIKE CONCAT('%', :rperiode, '%') AND a.id_pembayaran LIKE CONCAT('%', :rjenpembayaran, '%')";
            $params = [
                'rsearch' => $this->getSearch(),
                'rperiode' => $this->getPeriode(),
                'rjenpembayaran' => $this->getIdPembayaran()
            ];
        }else{
            $where = "WHERE e.nama_lengkap LIKE CONCAT('%', :rsearch, '%') AND a.periode LIKE CONCAT('%', :rperiode, '%') AND a.id_pembayaran LIKE CONCAT('%', :rjenpembayaran, '%')";
            $params = [
                'rsearch' => $this->getSearch(),
                'rperiode' => $this->getPeriode(),
                'rjenpembayaran' => $this->getIdPembayaran()
            ];
        }
        $query = <<<EOD
            SELECT 
            a.id_transaksi_pembayaran,
            a.id_user,
            a.id_pembayaran,
            c.nama_lengkap,
            a.periode,
            c.email,
            a.jumlah_hrsbayar,
            a.tanggal_dibayar,
            b.nama_pembayaran,
            a.nama_entry_admin,
            e.nama_lengkap as nama_siswa
            FROM transaksi_pembayaran a
            INNER JOIN mpembayaran b
            ON a.id_pembayaran = b.id_pembayaran
            LEFT JOIN users c
            ON a.id_user = c.id_user
            LEFT JOIN formulir d
            ON a.no_form = d.no_form
            LEFT JOIN calon_siswa e
            ON a.no_form = e.no_form
            $where
        EOD;
        $conn = DB::connection('mysql')->select($query, $params);
        return $conn;
    }
    public function riwayatPembayaran()
    {
        if($this->getIdPembayaran() == 1){
            $where = "transaksi_pembayaran.id_user = :riduser";
            $params = [
                'rperiode' => $this->getPeriode(),
                'ridpembayaran' => $this->getIdPembayaran(),
                'riduser' => $this->getIdUser()
            ];
        }else{
            if(empty($this->getNoForm())){
                return [];
            }
            $where = "transaksi_pembayaran.no_form = :rnoform";
            $params = [
                'rperiode' => $this->getPeriode(),
                'ridpembayaran' => $this->getIdPembayaran(),
                'rnoform' => $this->getNoForm()
            ];
        }
        $query = <<<EOD
            SELECT 
            mpembayaran.id_pembayaran,
            mpembayaran.nama_pembayaran,
            mpembayaran.total_pembayaran,
            transaksi_pembayaran.id_transaksi_pembayaran,
            transaksi_pembayaran.id_user,
            transaksi_pembayaran.tanggal_dibayar,
            transaksi_pembayaran.periode,
            transaksi_pembayaran.jumlah_hrsbayar,
            transaksi_pembayaran.nama_entry_admin
            from mpembayaran 
            RIGHT JOIN transaksi_pembayaran 
            on mpembayaran.id_pembayaran = transaksi_pembayaran.id_pembayaran 
            AND $where
            AND transaksi_pembayaran.periode = :rperiode
            WHERE mpembayaran.id_pembayaran = :ridpembayaran
        EOD;
        $conn = DB::connection("mysql")->select($query, $params);
        return $conn;
    }
    public function riwayatPembayaranSiswa()
    {
        $query = <<<EOD
            SELECT 
            mpembayaran.id_pembayaran,
            mpembayaran.nama_pembayaran,
            mpembayaran.total_pembayaran,
            transaksi_pembayaran.id_transaksi_pembayaran,
            transaksi_pembayaran.no_form,
            transaksi_pembayaran.tanggal_dibayar,
            transaksi_pembayaran.periode,
            transaksi_pembayaran.jumlah_hrsbayar,
            transaksi_pembayaran.nama_entry_admin
            from mpembayaran 
            RIGHT JOIN transaksi_pembayaran 
            on mpembayaran.id_pembayaran = transaksi_pembayaran.id_pembayaran 
            AND transaksi_pembayaran.no_form = :rnoform
            AND transaksi_pembayaran.periode = :rperiode
            WHERE mpembayaran.id_pembayaran = :ridpembayaran
        EOD;
        $conn = DB::connection("mysql")->select($query, [
            'rnoform' => $this->getNoForm(),
            'rperiode' => $this->getPeriode(),
            'ridpembayaran' => $this->getIdPembayaran()
        ]);
        return $conn;
    }

    public function checkTransaksiFormulir(){
        $query = "SELECT transaksi_pembayaran.id_user, transaksi_pembayaran.periode, transaksi_pembayaran.id_pembayaran, mpembayaran.nama_pembayaran, mpembayaran.total_pembayaran, CAST(SUM(jumlah_hrsbayar) as UNSIGNED) as total_jumlah_hrsbayar FROM transaksi_pembayaran LEFT JOIN mpembayaran ON transaksi_pembayaran.id_pembayaran = mpembayaran.id_pembayaran WHERE id_user = :riduser AND transaksi_pembayaran.periode = :rperiode AND mpembayaran.id_pembayaran = :ridpembayaran AND transaksi_pembayaran.tanggal_dibayar IS NOT NULL GROUP BY transaksi_pembayaran.id_user, transaksi_pembayaran.periode, transaksi_pembayaran.id_pembayaran, mpembayaran.nama_pembayaran, mpembayaran.total_pembayaran";
        $conn = DB::connection("mysql")->select($query, [
            'riduser' => $this->getIdUser(),
            'rperiode' => $this->getPeriode(),
            'ridpembayaran' => $this->getIdPembayaran()
        ]);
        if (empty($conn)) {
            return [];
        }
        if($conn[0]->total_jumlah_hrsbayar == (int)$conn[0]->total_pembayaran){
            $conn[0]->lunas = 'T';
        }else{
            $conn[0]->lunas = 'F';
        }
        return $conn;
    }
    public function store()
    {
        $query = "INSERT INTO transaksi_pembayaran (id_user,id_pembayaran,periode,tanggal_dibayar, no_form, jumlah_hrsbayar, nama_entry_admin, created_at, updated_at) VALUES (:riduser, :ridpembayaran, :rperiode, NULL, :rnoform, :rjumlah_hrsbayar, NULL, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'riduser' => $this->getIdUser(),
            'ridpembayaran' => $this->getIdPembayaran(),
            'rperiode' => $this->getPeriode(),
            'rjumlah_hrsbayar' => $this->getJumlahHrsBayar(),
            'rnoform' => $this->getNoForm()
        ]);
        return $conn;
    }
    public function konfirmasiPembayaran()
    {
        $query = "UPDATE transaksi_pembayaran SET tanggal_dibayar = :rtanggal_dibayar, nama_entry_admin = :rnama_entry_admin, updated_at = NOW() WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
        $conn = DB::connection("mysql")->update($query, [
            'rtanggal_dibayar' => $this->getTanggalDibayar(),
            'rnama_entry_admin' => $this->getNamaEntryAdmin(),
            'ridtransaksipembayaran' => $this->getIdTransaksiPembayaran()
        ]);
        return $conn;
    }
    public function konfirmasiBatalPembayaran()
    {
        $query = "UPDATE transaksi_pembayaran SET tanggal_dibayar = NULL, nama_entry_admin = NULL, updated_at = NOW() WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
        $conn = DB::connection("mysql")->update($query, [
            'ridtransaksipembayaran' => $this->getIdTransaksiPembayaran()
        ]);
        return $conn;
    }
    // public function update($id_transaksi_pembayaran)
    // {
    //     $query = "UPDATE transaksi_pembayaran SET id_user = :riduser, id_pembayaran = :ridpembayaran, periode = :rcperiode, jumlah_pembayaran = :rnjumlah, updated_at = NOW() WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
    //     $conn = DB::connection("mysql")->update($query, [
    //         'riduser' => $this->getIdUser(),
    //         'ridpembayaran' => $this->getIdPembayaran(),
    //         'rcperiode' => $this->getCperiode(),
    //         'rnjumlah' => $this->getNjumlah(),
    //         'ridtransaksipembayaran' => $id_transaksi_pembayaran
    //     ]);
    //     return $conn;
    // }
    public function destroy($id_transaksi_pembayaran)
    {
        $query = "DELETE FROM transaksi_pembayaran WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
        $conn = DB::connection("mysql")->delete($query, [
            'ridtransaksipembayaran' => $id_transaksi_pembayaran
        ]);
        return $conn;
    }
}
?>