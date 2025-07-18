import React, { useState, useRef } from 'react';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(''); // State baru untuk pesan error

  const handleFileChange = (event) => {
    // Reset error message setiap kali file baru dipilih
    setError('');
    setSelectedFile(null); // Bersihkan file sebelumnya untuk validasi baru

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
      const maxFileSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxFileSize) {
        setError('Ukuran file terlalu besar. Maksimal 5 MB.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      
    } else {
      setError('Pilih file terlebih dahulu!');
    }
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    setError(''); // Bersihkan error saat menghapus pilihan
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Unggah Gambar</h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file_input">
          Pilih File Gambar Anda:
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          id="file_input"
          type="file"
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

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleUpload}
          // Tombol unggah dinonaktifkan jika tidak ada file yang dipilih ATAU ada error
          disabled={!selectedFile || !!error}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
            !selectedFile || !!error
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
        >
          Unggah
        </button>
        {selectedFile && (
          <button
            onClick={handleClearSelection}
            className="px-6 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200"
          >
            Hapus Pilihan
          </button>
        )}
      </div>

      {!selectedFile && !error && (
        <p className="text-center text-gray-500 text-sm mt-4">Silakan pilih file gambar untuk diunggah.</p>
      )}
    </div>
  );
};

export default FileUploader;