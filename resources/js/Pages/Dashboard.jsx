import { TemplateDashboard } from "./template/TemplateDashboard";
import { Head } from "@inertiajs/react";
const Dashboard = () => {
  return (
    <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
      <Head>
        <title>Dashboard</title>
      </Head>
        <TemplateDashboard/>
    </div>
  )
}
export default Dashboard;