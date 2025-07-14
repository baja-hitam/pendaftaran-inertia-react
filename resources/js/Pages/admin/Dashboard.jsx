import { Card } from "../UI/organisms/Card";
import { Head } from "@inertiajs/react";
import TemplateSidebar from "./SidebarAdmin";
import { Bar } from 'react-chartjs-2';
import DataTable, { createTheme } from "react-data-table-component";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Penting: Daftarkan komponen Chart.js yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({datasRangking,datasLabel,datasJumlah}) => {
  const data = {
    labels: datasLabel,
    datasets: [
      {
        label: 'Jumlah Pendaftar',
        data: datasJumlah,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        barThickness: 40, // Lebar bar fix 50px
        // minBarThickness: 20, // Lebar bar maksimum 70px
        // minBarLength: 10, // Lebar bar minimum 10px (berguna untuk nilai kecil)
      },
    ],
  };
    // Opsi konfigurasi untuk grafik
    const options = {
      responsive: true,
      maintainAspectRatio: false, // <-- Tambahkan ini!
      plugins: {
        legend: {
          position: 'top', // Posisi legenda: 'top', 'bottom', 'left', 'right'
        },
        title: {
          display: true,
          text: 'Data Jumlah Pendaftar Per Periode', // Judul grafik
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Mulai sumbu Y dari nol
          ticks: {
            callback: function(value) {
              if (Number.isInteger(value)) {
                return value;
              }
            },
          },
        },
      },
    };
    createTheme("custom", {
                background: {
                    default: "transparent",
                },
            });
        
            const customStyles = {
                rows: {
                    style: {
                        fontSize: "14px",
                    },
                },
                headCells: {
                    style: {
                        fontSize: "16px",
                        fontWeight: "bold",
                    },
                },
                cells: {
                    style: {
                        fontSize: "14px",
                    },
                },
            };
        
            const columns = [
                {
                    name: "No Peserta",
                    selector: (row) => row.no_peserta,
                },
                {
                    name: "Nama Lengkap",
                    selector: (row) => row.nama_lengkap,
                    wrap:true,
                },
                {
                    name: "Periode",
                    selector: (row) => row.periode.slice(0,4) + '/' + row.periode.slice(4),
                },
                {
                    name: "Rata-rata Nilai",
                    selector: (row) => parseInt(row.rata_rata),
                }
            ];
  return (
    <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
        <Head>
            <title>Dashboard</title>
        </Head>
        <TemplateSidebar />
        <div className="w-[70%] h-max m-2 sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">Dashboard</p>
            <Card className="w-[98%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[90%] lg:w-[90%] xl:w-[90%]">
                <div className="w-full h-[300px] lg:h-[500px]">
                    <Bar data={data} options={options} height={'240'} />
                </div>
                <div>
                    <p className="text-lg font-poppins mt-16">Rangking Calon Siswa/i</p>
                    <DataTable
                        columns={columns}
                        data={datasRangking}
                        theme="custom"
                        customStyles={customStyles}
                        pagination
                        noDataComponent={<i>Tidak Ada Peserta Ujian</i>}
                    />
                </div>
            </Card>
        </div>
    </div>
  )
}

export default Dashboard;
