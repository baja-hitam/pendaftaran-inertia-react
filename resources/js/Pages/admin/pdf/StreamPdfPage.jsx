// resources/js/Pages/admin/pdf/StreamPdfPage.jsx
import React, { Suspense, lazy } from 'react';

// Dynamically import the actual StreamPdf component that uses react-pdf
// Adjust the path based on where you placed StreamPdf.jsx
const LazyLoadedStreamPdfComponent = lazy(() => import('./StreamPdf'));

const StreamPdfPage = ({ datas }) => {
  return (
    // Use Suspense to show a fallback while the component is loading
    <Suspense fallback={<div>Loading PDF Viewer...</div>}>
      <LazyLoadedStreamPdfComponent datas={datas} />
    </Suspense>
  );
};

export default StreamPdfPage;