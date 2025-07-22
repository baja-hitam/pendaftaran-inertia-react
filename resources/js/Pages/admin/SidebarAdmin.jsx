import Sidebar from "../UI/organisms/Sidebar";
import { Menu } from "../UI/molecules/Menu";
import { IconDashboard } from "../UI/atoms/IconDashboard";
import { IconForm } from "../UI/atoms/IconForm";

const SidebarAdmin = () => {
    return (
        <Sidebar>
        <Menu text="Dashboard" link="/admin/dashboard">
            <IconDashboard />
        </Menu>
        <Menu text="Entri Master Periode" link="/admin/periode">
            <IconForm />
        </Menu>
        <Menu text="Entri Master Pembayaran" link="/admin/pembayaran">
            <IconForm />
        </Menu>
        <Menu text="Entri Transaksi Pembayaran" link="/admin/transaksi-pembayaran">
            <IconForm />
        </Menu>
        <Menu text="Formulir Pendaftaran" link="/admin/calon-siswa">
            <IconForm />
        </Menu>
        <Menu text="Kelas" link="/admin/kelas">
            <IconForm />
        </Menu>
        </Sidebar>
    )
}
export default SidebarAdmin;