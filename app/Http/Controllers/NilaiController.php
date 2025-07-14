<?php

namespace App\Http\Controllers;

use App\Http\Modulus\DetailUjian;
use App\Http\Modulus\KartuPeserta;
use App\Http\Modulus\Nilai;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function index()
    {
        $modul = new KartuPeserta;
        $datas = $modul->getAllKartuPeserta();
        // dd($datas);
        return inertia('admin/nilai/Nilai', [
            'datas' => $datas,
        ]);
    }
    public function detail(Request $request)
    {
        $modul = new KartuPeserta;
        $modul1 = new DetailUjian;
        $modul2 = new Nilai;
        // dd($request->all());
        $modul2->no_peserta = $request->no_peserta;
        $datasDetailKartuPeserta = $modul->getKartuPesertaByNoPeserta($request->no_peserta);
        $datasOptionsUjian = $modul1->getAllUjianAktif();
        $datasNilai = $modul2->getDetailNilai();
        // dd($datasNilai, $datasDetailKartuPeserta, $datasOptionsUjian);
        return inertia('admin/nilai/DetailNilai', [
            'datasDetailKartuPeserta' => $datasDetailKartuPeserta,
            'datasOptionsUjian' => $datasOptionsUjian,
            'datasNilai' => $datasNilai,
        ]);
    }
    public function store(Request $request)
    {
        $modul = new Nilai;
        // dd($request->all());
        foreach($request->all() as $data) {
            $modul->no_peserta = $data['noPeserta'];
            $modul->id_ujian = $data['selectedUjian']['value'];
            $modul->nilai = $data['nilai'];
            $result= $modul->storeNilai();
        }
        if ($result) {
            session()->flash('success', 'Data nilai berhasil disimpan');
        } else {
            session()->flash('error', 'Gagal menyimpan data nilai');
        }
        return to_route('admin.nilai.detail', [
            'no_peserta' => $request->all()[0]['noPeserta']
        ]);
    }
    public function update(Request $request)
    {
        $modul = new Nilai;
        // dd($request->all());
        $modul->id_nilai = $request->idNilai;
        $modul->id_ujian = $request->selectedUjian['value'];
        $modul->nilai = $request->nilai;
        $result = $modul->updateNilai();
        if ($result) {
            session()->flash('success', 'Data nilai berhasil diupdate');
        } else {
            session()->flash('error', 'Gagal mengupdate data nilai');
        }
        return to_route('admin.nilai.detail', [
            'no_peserta' => $request->noPeserta
        ]);
    }
    public function destroy(Request $request)
    {
        $modul = new Nilai;
        // dd($request->all());
        $modul->id_nilai = $request->id_nilai;
        $result = $modul->deleteNilai();
        if ($result) {
            session()->flash('success', 'Data nilai berhasil dihapus');
        } else {
            session()->flash('error', 'Gagal menghapus data nilai');
        }
        return to_route('admin.nilai.detail', [
            'no_peserta' => $request->no_peserta
        ]);
    }
}
