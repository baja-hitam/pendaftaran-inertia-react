import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';

const FileUploaderBerkas = ({name,handleChangeFile,selectedFile}) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(''); // State baru untuk pesan error
  // console.log('selectedFile', selectedFile);
  const handleFileChange = (event) => {
    // Reset error message setiap kali file baru dipilih
    setError('');
    handleChangeFile(event.target.name,null); // Bersihkan file sebelumnya untuk validasi baru

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];

      // Validasi Tipe File
      if (!validImageTypes.includes(file.type)) {
        setError('File yang dipilih bukan gambar. Harap unggah file JPG, PNG, GIF, BMP, WebP, atau SVG.');
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset input file
        }
        return; // Hentikan proses lebih lanjut
      }

      // Anda bisa menambahkan validasi ukuran file di sini juga, misalnya:
      const maxFileSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxFileSize) {
        setError('Ukuran file terlalu besar. Maksimal 2 MB.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      handleChangeFile(event.target.name, file);
    } else {
      handleChangeFile(event.target.name, null);
    }
  };

  const handleClearSelection = () => {
    handleChangeFile(name, null);
    setError(''); // Bersihkan error saat menghapus pilihan
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md">
      <div className="mb-4">
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          id="file_input"
          type="file"
          name={name}
          onChange={handleFileChange}
          ref={fileInputRef}
          // Tambahkan atribut 'accept' untuk memfilter jenis file di dialog pemilihan
          accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/svg+xml"
        />
        {/* Tampilkan pesan error jika ada */}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      {selectedFile && (
        <p className="text-sm text-gray-600 mb-4">
          File terpilih: <strong className="text-gray-800">{selectedFile.name}</strong> ({selectedFile.type || 'unknown type'})
        </p>
      )}
    </div>
  );
};

export default FileUploaderBerkas;