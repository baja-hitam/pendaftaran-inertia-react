<?php
    namespace App\Http\Modulus;

    use Illuminate\Support\Facades\DB;
    class Nilai
    {
        public $id_nilai;
        public $no_peserta;
        public $periode;
        public $id_ujian;
        public $nilai;
        public function getIdNilai()
        {
            return $this->id_nilai;
        }
        public function getPeriode()
        {
            return $this->periode;
        }

        public function getNoPeserta()
        {
            return $this->no_peserta;
        }
        public function getIdUjian()
        {
            return $this->id_ujian;
        }

        public function getNilai()
        {
            return $this->nilai;
        }
        public function getDetailNilai(){
            $query = <<<EOD
                SELECT 
                a.id_nilai,
                c.id_ujian,
                a.no_peserta,
                c.nama_ujian,
                a.nilai
                from nilai a
                INNER JOIN kartu_peserta b
                ON a.no_peserta = b.no_peserta
                INNER JOIN mujian c
                ON a.id_ujian = c.id_ujian
                WHERE a.no_peserta = :rno_peserta
            EOD;
            $result = DB::connection('mysql')->select($query,[
                'rno_peserta' => $this->getNoPeserta()
            ]);
            return $result;
        }
        public function getNilaiTertinggi(){
            $query = <<<EOD
                SELECT AVG(a.nilai) as rata_rata,
                a.no_peserta,
                e.nama_lengkap,
                d.periode
                from nilai a
                INNER JOIN kartu_peserta b
                ON a.no_peserta = b.no_peserta
                INNER JOIN formulir d
                ON b.no_form = d.no_form
                INNER JOIN calon_siswa e
                ON b.no_form = e.no_form
                WHERE d.periode = :rperiode
                GROUP BY a.no_peserta, e.nama_lengkap, d.periode
                ORDER BY rata_rata DESC
            EOD;
            $result = DB::connection('mysql')->select($query,[
                'rperiode' => $this->getPeriode()
            ]);
            return $result;
        }
        public function storeNilai(){
            $query = <<<EOD
                INSERT INTO nilai (no_peserta, id_ujian, nilai, created_at, updated_at)
                VALUES (:rno_peserta, :rid_ujian, :rnilai, NOW(), NOW())
            EOD;
            $result = DB::connection('mysql')->insert($query, [
                'rno_peserta' => $this->getNoPeserta(),
                'rid_ujian' => $this->getIdUjian(),
                'rnilai' => $this->getNilai()
            ]);
            return $result;
        }
        public function updateNilai(){
            $query = <<<EOD
                UPDATE nilai 
                SET id_ujian = :rid_ujian, nilai = :rnilai, updated_at = NOW()
                WHERE id_nilai = :rid_nilai
            EOD;
            $result = DB::connection('mysql')->update($query, [
                'rid_nilai' => $this->getIdNilai(),
                'rid_ujian' => $this->getIdUjian(),
                'rnilai' => $this->getNilai()
            ]);
            return $result;
        }
        public function deleteNilai(){
            $query = <<<EOD
                DELETE FROM nilai 
                WHERE id_nilai = :rid_nilai
            EOD;
            $result = DB::connection('mysql')->delete($query, [
                'rid_nilai' => $this->getIdNilai()
            ]);
            return $result;
        }
    }
?>