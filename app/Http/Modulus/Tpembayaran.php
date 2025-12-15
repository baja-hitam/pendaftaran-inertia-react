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
    public $path_bukti;
    public $nama_bukti;
    public $verif_by;


    public function getPeriode()
    {
        return $this->periode;
    }
    public function getPathBukti()
    {
        return $this->path_bukti;
    }
    public function getVerifBy()
    {
        return $this->verif_by;
    }
    public function getNamaBukti()
    {
        return $this->nama_bukti;
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
        $query = "SELECT * FROM mpembayaran ORDER BY nama_pembayaran DESC";
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
    public function getTransaksiPembayaranById()
    {
        $query = "SELECT * FROM transaksi_pembayaran WHERE no_form = :rnoform AND periode = :rperiode AND id_pembayaran = :ridpembayaran ORDER BY path_bukti DESC";
        $conn = DB::connection("mysql")->select($query, [
            'rnoform' => $this->getNoForm(),
            'rperiode' => $this->getPeriode(),
            'ridpembayaran' => $this->getIdPembayaran()
        ]);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }

    public function getTransaksiPembayaranByIdGroup(){
        $conditions = [];
        $params = [];

        $conditions[] = "a.periode = :rperiode";
        $params['rperiode'] = $this->getPeriode();

        $whereClause = implode(' AND ', $conditions);

        $query = "SELECT
        a.id_user,
        a.no_form,
        a.id_pembayaran,
        b.nama_pembayaran,
        a.periode,
        a.jumlah_hrsbayar
        FROM
        transaksi_pembayaran a
        JOIN
        mpembayaran b
        ON
        a.id_pembayaran = b.id_pembayaran
        WHERE
        $whereClause";
        $conn = DB::connection("mysql")->select($query, $params);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function checkCicilan(){
        // dd($this->getIdUser());
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
            e.nama_lengkap as nama_siswa,
            a.verif_by,
            f.nama_lengkap as verif_name,
            a.verif_date,
            a.path_bukti,
            a.nama_bukti
            FROM transaksi_pembayaran a
            INNER JOIN mpembayaran b
            ON a.id_pembayaran = b.id_pembayaran
            LEFT JOIN users c
            ON a.id_user = c.id_user
            LEFT JOIN formulir d
            ON a.no_form = d.no_form
            LEFT JOIN calon_siswa e
            ON a.no_form = e.no_form
            LEFT JOIN admin f
            ON a.verif_by = f.id_admin
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
            a.verif_by,
            a.verif_date,
            e.nama_lengkap as nama_siswa,
            a.path_bukti,
            a.nama_bukti,
            f.nama_lengkap as verif_name
            FROM transaksi_pembayaran a
            INNER JOIN mpembayaran b
            ON a.id_pembayaran = b.id_pembayaran
            LEFT JOIN users c
            ON a.id_user = c.id_user
            LEFT JOIN formulir d
            ON a.no_form = d.no_form
            LEFT JOIN calon_siswa e
            ON a.no_form = e.no_form
            LEFT JOIN admin f
            ON a.verif_by = f.id_admin
            $where
        EOD;
        $conn = DB::connection('mysql')->select($query, $params);
        return $conn;
    }
    public function riwayatPembayaran()
    {
        // dd($this->getPeriode());
        if($this->getIdPembayaran() == 1){
            // dd('test');
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
            transaksi_pembayaran.verif_by,
            admin.nama_lengkap as verif_name,
            transaksi_pembayaran.verif_date,
            transaksi_pembayaran.path_bukti,
            transaksi_pembayaran.nama_bukti
            from mpembayaran 
            RIGHT JOIN transaksi_pembayaran 
            on mpembayaran.id_pembayaran = transaksi_pembayaran.id_pembayaran
            LEFT JOIN admin 
            on transaksi_pembayaran.verif_by = admin.id_admin 
            WHERE mpembayaran.id_pembayaran = :ridpembayaran and transaksi_pembayaran.periode = :rperiode AND $where
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
        $query = "SELECT transaksi_pembayaran.id_user, transaksi_pembayaran.periode, transaksi_pembayaran.id_pembayaran, mpembayaran.nama_pembayaran, mpembayaran.total_pembayaran, jumlah_hrsbayar FROM transaksi_pembayaran LEFT JOIN mpembayaran ON transaksi_pembayaran.id_pembayaran = mpembayaran.id_pembayaran WHERE id_user = :riduser AND transaksi_pembayaran.periode = :rperiode AND mpembayaran.id_pembayaran = :ridpembayaran AND transaksi_pembayaran.tanggal_dibayar IS NOT NULL AND transaksi_pembayaran.verif_by IS NOT NULL";
        $conn = DB::connection("mysql")->select($query, [
            'riduser' => $this->getIdUser(),
            'rperiode' => $this->getPeriode(),
            'ridpembayaran' => $this->getIdPembayaran()
        ]);
        // dd($conn);
        if (empty($conn)) {
            return [];
        }
        return $conn;
    }
    public function store()
    {
        $query = "INSERT INTO transaksi_pembayaran (id_user,id_pembayaran,periode,tanggal_dibayar, no_form, jumlah_hrsbayar, verif_by, verif_date, path_bukti, nama_bukti, created_at, updated_at) VALUES (:riduser, :ridpembayaran, :rperiode, NULL, :rnoform, :rjumlah_hrsbayar, NULL, NULL, NULL, NULL, NOW(), NOW())";
        $conn = DB::connection("mysql")->insert($query, [
            'riduser' => $this->getIdUser(),
            'ridpembayaran' => $this->getIdPembayaran(),
            'rperiode' => $this->getPeriode(),
            'rjumlah_hrsbayar' => $this->getJumlahHrsBayar(),
            'rnoform' => $this->getNoForm()
        ]);
        return $conn;
    }
    public function uploadBukti(){
        $query = "UPDATE transaksi_pembayaran SET path_bukti = :rpath, tanggal_dibayar = NOW(), nama_bukti = :rnama_bukti, updated_at = NOW() WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
        $conn = DB::connection("mysql")->update($query, [
            'rpath' => $this->getPathBukti(),
            'rnama_bukti' => $this->getNamaBukti(),
            'ridtransaksipembayaran' => $this->getIdTransaksiPembayaran()
        ]);
        return $conn;
    }
    public function konfirmasiPembayaran()
    {
        $query = "UPDATE transaksi_pembayaran SET verif_by = :rverif_by, verif_date = NOW(), updated_at = NOW() WHERE id_transaksi_pembayaran = :ridtransaksipembayaran";
        $conn = DB::connection("mysql")->update($query, [
            'rverif_by' => $this->getVerifBy(),
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