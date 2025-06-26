import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfKartuPeserta from './PdfKartuPeserta';
import { Head } from '@inertiajs/react';

const StreamPdf = ({ datas }) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Head>
                <title>Cetak Kartu Peserta</title>
            </Head>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <PdfKartuPeserta datas={datas} />
            </PDFViewer>
        </div>
    );
};

export default StreamPdf;
// This component is used to render a PDF document using ReactPDF.