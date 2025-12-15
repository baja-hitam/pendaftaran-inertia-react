<?php

namespace App\Http\Controllers;

use App\Http\Helper\RSA;
use Illuminate\Http\Request;
use App\Http\Helper\Whatsapp;
use App\Http\Modulus\Mperiode;
use App\Http\Modulus\Pendaftaran;

use App\Http\Modulus\Tpembayaran;
use Illuminate\Support\Facades\Storage;

class TransaksiPembayaran extends Controller
{
    public function index()
    {
        $modul = new Tpembayaran;
        $modul1 = new Mperiode;
        $modul2 = new Pendaftaran;
        $rsa = new RSA;
        $data = $modul->getAllUser();
        // dd($data);
        $data1 = $modul->getAllPembayaran();
        $data2 = $modul->getAllTransaksi();
        $data3 = $modul1->getAllPeriode();
        $data4 = $modul2->getAllFormulir();
        // dd($data4);
        $fieldsFormulir = [
            'nama_lengkap','nama_ayah','nama_ibu','nama_wali'
        ];
        if(!empty($data2)) {
            foreach ($data2 as $key => $row) {
                $row->jumlah_hrsbayar = !empty($row->jumlah_hrsbayar) ? $rsa->decrypt($row->jumlah_hrsbayar) : null;
                $row->path_bukti = !empty($row->path_bukti) ? Storage::url($rsa->decrypt($row->path_bukti)) : null;
                $row->nama_siswa = !empty($row->nama_siswa) ? $rsa->decrypt($row->nama_siswa) : null;
            }
        }
        if(!empty($data4)) {
            foreach ($data4 as $key => $row) {
                foreach ($fieldsFormulir as $field) {
                    if (isset($row->$field) && !is_null($row->$field)) {
                        $row->$field = $rsa->decrypt($row->$field);
                    }
                }
            }
        }
        // dd($data4);
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datasUserOption' => $data,
            'datasFormulirOption' => $data4,
            'datasJenPembayaranOption' =>$data1,
            'datasPeriodeOption' => $data3,
            'datas'=>$data2
        ]);
    }
    public function search(Request $request)
    {
        $modul = new Tpembayaran;
        // dd($request->all());
        $modul1 = new Mperiode;
        $modul2 = new Pendaftaran;
        $rsa = new RSA;
        $modul->periode = $request->input('periode') ?? ''; 
        $modul->search = $request->input('user') ?? '';
        $modul->id_pembayaran = $request->input('jenPembayaran') ?? '';
        $data3 = $modul1->getAllPeriode();
        $data4 = $modul2->getAllFormulir();
        $data = $modul->search();
        $fieldsFormulir = [
            'nama_lengkap','nama_ayah','nama_ibu','nama_wali'
        ];
        if(!empty($data4)) {
            foreach ($data4 as $key => $row) {
                foreach ($fieldsFormulir as $field) {
                    if (isset($row->$field) && !is_null($row->$field)) {
                        $row->$field = $rsa->decrypt($row->$field);
                    }
                }
            }
        }
        if(!empty($data)) {
            foreach ($data as $key => $row) {
                $row->jumlah_hrsbayar = !empty($row->jumlah_hrsbayar) ? $rsa->decrypt($row->jumlah_hrsbayar) : null;
                $row->path_bukti = !empty($row->path_bukti) ? Storage::url($rsa->decrypt($row->path_bukti)) : null;
                $row->nama_siswa = !empty($row->nama_siswa) ? $rsa->decrypt($row->nama_siswa) : null;
            }
        }
        return inertia('admin/transaksi_pembayaran/TransaksiPembayaran',[
            'datas' => $data,
            'search' => $request->input('user'),
            'jenPembayaran' => $request->input('jenPembayaran'),
            'tahun' => $request->input('periode'),
            'datasPeriodeOption' => $data3,
            'datasUserOption' => $modul->getAllUser(),
            'datasFormulirOption' => $data4,
            'datasJenPembayaranOption' => $modul->getAllPembayaran(),
        ]);
    }
    public function store(Request $request)
    {
        // dd($request->all()); 
        $startYear = date( 'Y');
        $endYear = $startYear + 1;
        $modul = new Tpembayaran;
        $rsa = new RSA;
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->periode = $startYear.$endYear;
        $total_pembayaran = $modul->getTotalPembayaran();
        $modul->id_user = $request->selectedUser['value'] ?? null;
        $modul->no_form = $request->selectedFormulir['value'] ?? null;
        $data = $modul->checkCicilan();
        // dd($data);
        if(!empty($data)){
            session()->flash('error', 'Anda sudah membuat cicilan yang harus dibayar');
            return to_route('admin.transaksi-pembayaran');
        }
        $cicilan = $request->cicilan ?? 1;
        $jumlah_hrsbayar = (int)$total_pembayaran / (int)$cicilan;
        $modul->jumlah_hrsbayar = $rsa->encrypt((int)$jumlah_hrsbayar);
        for ($i = 1; $i <= $cicilan; $i++) {
            $data = $modul->store();
        }
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil ditambahkan');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal ditambahkan');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    //calon siswa buat angsuran
    public function konfirmasi_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request->input('id');
        $modul->verif_by = session('id_user');
        $data = $modul->konfirmasiPembayaran();
        // dd($modul);
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dikonfirmasi');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dikonfirmasi');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    public function konfirmasi_batal_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request->input('id');
        $data = $modul->konfirmasiBatalPembayaran();
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dibatalkan');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dibatalkan');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    public function destroy(Request $request){
        $modul = new Tpembayaran;
        $data = $modul->destroy($request->input('id'));
        if ($data) {
            session()->flash('success', 'Transaksi pembayaran berhasil dihapus');
        } else {
            session()->flash('error', 'Transaksi pembayaran gagal dihapus');
        }
        return to_route('admin.transaksi-pembayaran');
    }
    // Calon Siswa
    public function storeAngsuran(Request $request)
    {
        $rsa = new RSA;
        if($request->input('periode') != session('periode')){
            session()->flash('error', 'Periode '.$request->input('periode').' sudah tidak berlaku '); 
            return to_route('riwayat.pembayaran',[
                'periode' => $request->input('periode') ?? session('periode'),
            ]);
        }
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul1->periode = session('periode');
        $no_form = empty($modul1->getNoFormulir()) ? null : $modul1->getNoFormulir();
        // dd($no_form);
        $modul->id_pembayaran = $request->selectedPembayaran['value'];
        $modul->periode = $request->periode ?? session('periode');
        $total_pembayaran = $modul->getTotalPembayaran();
        $transaksiPembayaran = [];
        if($request->selectedPembayaran['value'] == '1'){
            $modul->id_user = session('id_user');
            $data = $modul->checkCicilan();
            if(!empty($data)){
                session()->flash('error', 'Anda sudah membuat kwitansi yang harus dibayar');
                return to_route('riwayat.pembayaran');
            }
        }else{
            if($no_form == null){
                session()->flash('error', 'Anda belum mengisi formulir pendaftaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->id_user = session('id_user');
            $modul->no_form = $no_form;
            $data = $modul->checkCicilan();
            if(count($data) > 1){
                session()->flash('error', 'Anda sudah membuat cicilan yang harus dibayar');
                return to_route('riwayat.pembayaran');
            }
            $transaksiPembayaran = $modul->getTransaksiPembayaranById();
        }
        if(!empty($transaksiPembayaran)){
            if($transaksiPembayaran[0]->path_bukti != null){
                session()->flash('error', 'Tidak bisa membuat angsuran, karena sudah ada bukti pembayaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->destroy($transaksiPembayaran[0]->id_transaksi_pembayaran);
        }
        $cicilan = $request->cicilan ?? 1;
        $jumlah_hrsbayar = (int)$total_pembayaran / (int)$cicilan;
        $modul->jumlah_hrsbayar = $rsa->encrypt((int)$jumlah_hrsbayar);
        for ($i = 1; $i <= $cicilan; $i++) {
            $data = $modul->store();
        }
        if ($data) {
            session()->flash('success', 'Cicilan pembayaran berhasil dibuat');
        } else {
            session()->flash('error', 'Cicilan pembayaran gagal dibuat');
        }
        return to_route('riwayat.pembayaran');
    }
    public function create_kwitansi(Request $request)
    {
        $rsa = new RSA;
        if($request->input('periode') != session('periode')){
            session()->flash('error', 'Periode '.$request->input('periode').' sudah tidak berlaku '); 
            return to_route('riwayat.pembayaran',[
                'periode' => $request->input('periode') ?? session('periode'),
            ]);
        }
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul1->periode = session('periode');
        $no_form = empty($modul1->getNoFormulir()) ? null : $modul1->getNoFormulir();
        $modul->id_pembayaran = $request->input('id_pembayaran');
        $total_pembayaran = $modul->getTotalPembayaran();
        if($request->input('id_pembayaran') == '1'){
            $modul->id_user = session('id_user');
            $modul->periode = session('periode');
            $modul->jumlah_hrsbayar = $rsa->encrypt($total_pembayaran);
            $modul->no_form = null;
        }else{
            if($no_form == null){
                session()->flash('error', 'Anda belum mengisi formulir pendaftaran');
                return to_route('riwayat.pembayaran');
            }
            $modul->no_form = $no_form;
            $modul->periode = session('periode');
            $modul->jumlah_hrsbayar = $rsa->encrypt($total_pembayaran);
        }
        $data = $modul->store();

        if ($data) {
            session()->flash('success', 'Kwitansi berhasil dibuat');
        } else {
            session()->flash('error', 'Kwitansi gagal dibuat');
        }
        return to_route('riwayat.pembayaran');
    }
    public function riwayat_pembayaran(Request $request)
    {
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $modul2 = new Mperiode;
        $rsa = new RSA;
        $data = [];
        $modul1->periode = $request->periode ?? session('periode');
        $no_form = $modul1->getNoFormulir();
        $modul->periode = $request->periode ?? session('periode');
        $periode = $modul2->getAllPeriode();
        // dd($periode);   
        $data = $modul->getTransaksiPembayaranByIdGroup();
        $groupedData = [];
        foreach ($data as $row) {
            $decryptedAmount = $rsa->decrypt($row->jumlah_hrsbayar);
            $groupKey = $row->id_user . '-' . ($row->no_form ?? 'null') . '-' . $row->id_pembayaran;

            if (!isset($groupedData[$groupKey])) {
                $row->decrypted_jumlah_hrsbayar = $decryptedAmount;
                $row->total_hrsbayar = (int) $decryptedAmount; // Cast to integer for summation
                $groupedData[$groupKey] = $row;
            } else {
                $groupedData[$groupKey]->total_hrsbayar += (int) $decryptedAmount;
            }
        }
        $data = array_values($groupedData);

        return inertia('calon_siswa/pembayaran/RiwayatPembayaran',[
            'datas' => $data,
            'utilsPeriode' => $periode,
            'periodeSession' => $request->periode ?? session('periode'),
            'utilsPembayaran' => $modul->getAllPembayaran()
        ]);
    }
    public function detail_riwayat_pembayaran(Request $request)
    {
        // dd($request->all());
        $modul = new Tpembayaran;
        $modul1 = new Pendaftaran;
        $rsa = new RSA;
        $modul->id_user = session('id_user');
        $modul->id_pembayaran = $request->input('id');
        $modul->periode = $request->input('periode');
        $modul1->periode = $request->input('periode');
        $no_form = $modul1->getNoFormulir();
        // dd($no_form);
        $modul->no_form = $no_form;
        $data = $modul->riwayatPembayaran();
        // dd($data);
        foreach ($data as $key => $row) {
            if($row->path_bukti != null){
                $data[$key]->path_bukti = Storage::url($rsa->decrypt($row->path_bukti));
            }
            if($row->jumlah_hrsbayar != null){
                $data[$key]->jumlah_hrsbayar = $rsa->decrypt($row->jumlah_hrsbayar);
            }
        }
        // dd($data);
        if(empty($data)){
            session()->flash('error', 'Anda belum membuat kwitansi untuk pembayaran ini');
            return to_route('riwayat.pembayaran',[
                'periode' => $request->periode ?? session('periode'),
            ]);
        }
        // dd($data);
        return inertia('calon_siswa/pembayaran/DetailRiwayatPembayaran',[
            'datas' => $data,
        ]);
    }
    public function upload_bukti(Request $request)
    {
        // dd($request->all());
        // dd($request->file('file'));
        $rsa = new RSA;
        $path = $request->file('file')->store('bukti_pembayaran', 'public');
        // dd($path,basename($path));
        $modul = new Tpembayaran;
        $modul->id_transaksi_pembayaran = $request['idTransaksiPembayaran'];
        $modul->path_bukti = $rsa->encrypt($path);
        $modul->nama_bukti = $request->file('file')->getClientOriginalName();
        // dd($modul);
        $data = $modul->uploadBukti();
        // dd($data);
        if ($data) {
            // Send WhatsApp notification
            $whatsappp = new Whatsapp(session('no_telp'), session('nama_lengkap') . ' dengan nomor ' . session('no_telp') . ' sudah mengupload bukti pembayaran. Segera konfirmasi pembayaran.');
            $response = $whatsappp->send();
            session()->flash('success', 'Bukti pembayaran berhasil diupload');
        } else {
            session()->flash('error', 'Bukti pembayaran gagal diupload');
        }
        return to_route('riwayat.pembayaran');
    }
}
