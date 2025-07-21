import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Head } from '@inertiajs/react';
import PdfFormulirSiswa from './PdfFormulirSiswa';

const StreamPdf = ({ datas }) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <Head>
            <title>Cetak Formulir Siswa</title>
            </Head>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <PdfFormulirSiswa datas={datas} />
            </PDFViewer>
        </div>
    );
};

export default StreamPdf;
// This component is used to render a PDF document using ReactPDF.