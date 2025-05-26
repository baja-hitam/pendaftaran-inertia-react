import { Head } from "@inertiajs/react";
import Sidebar from "../../UI/organisms/Sidebar";
import { Menu } from "../../UI/molecules/Menu";
import { IconDashboard } from "../../UI/atoms/IconDashboard";
import { IconForm } from "../../UI/atoms/IconForm";
import { Card } from "../../UI/organisms/Card";
import React from "react";
import DataTable,{createTheme} from 'react-data-table-component';




const Periode = ({data}) => {

    createTheme('custom', {
        background: {
          default: 'transparent',
        },
      });
    
    const columns = [
      {
        name: 'Periode',
        selector: row => row.cperiode.slice(0, 4) + '/' + row.cperiode.slice(4),
      },
      {
        name: 'Tanggal Mulai',
        selector: row => row.dstart_date,
      },
      {
        name: 'Tanggal Akhir',
        selector: row => row.dend_date,
      },
      {
        name: 'Status',
        selector: row => (row.caktif == 'T') ? 'Aktif' : 'Tidak Aktif',
      },
    ];

  return (
    <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Sidebar>
          <Menu text='Dashboard' link='/'>
            <IconDashboard/>
          </Menu>
          <Menu text='Periode' link='/admin/periode'>
            <IconForm/>
          </Menu>
        </Sidebar>
        <div className="w-[70%] h-max sm:w-[80%] xl:w-[90%] xl:mt-12">
            <p className="text-xl font-poppins text-white sm:text-2xl xl:text-3xl">Periode Pendaftaran</p>
            <Card className={"w-[95%] p-5 bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-[80%] lg:w-[70%] xl:w-[50%]"}>
                <DataTable
                    columns={columns}
                    data={data}
                    theme="custom"
                />
            </Card>
        </div>
    </div>
  );
}

export default Periode;