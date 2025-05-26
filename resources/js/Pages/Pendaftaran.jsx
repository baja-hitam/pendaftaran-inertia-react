import {TemplateFormulir} from "../Pages/template/TemplateFormulir"
import { Head } from "@inertiajs/react";
const Pendaftaran = () => {
    return (
    <div className="bg-[#226F54] relative min-h-screen flex flex-row justify-end pb-3">
        <Head>
            <title>Pendaftaran</title>
        </Head>
        <TemplateFormulir/>
    </div>
    );
}
export default Pendaftaran;