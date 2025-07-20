import { Menu } from "../UI/molecules/Menu";
import { IconDashboard } from "../UI/atoms/IconDashboard";
import { IconForm } from "../UI/atoms/IconForm";
import Sidebar from "../UI/organisms/Sidebar";
const TemplateSidebar = () => {
    return(
        <Sidebar>
        <Menu text='Dashboard' link='/dashboard'>
          <IconDashboard/>
        </Menu>
        <Menu text='Formulir Pendaftaran' link='/pendaftaran'>
          <IconForm/>
        </Menu>
        <Menu text='Kwitansi Pembayaran' link='/riwayat-pembayaran'>
          <IconForm/>
        </Menu>
      </Sidebar>
    )
}
export default TemplateSidebar;