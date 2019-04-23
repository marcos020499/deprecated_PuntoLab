// modules
import { toast } from "react-toastify";
import axios from "axios";

// moment
import moment from "moment";
import "moment/locale/es";

// utl
import ServiciosList from "../servicios/servicios";

export const notificarServiciosAlerta = (_id) => {

    const hoy = moment.utc().startOf('day').format();
    const fechaMenor = moment.utc().startOf('day').add(4, 'days').format();

    axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/alerta", { fechaMayor: hoy, fechaMenor, _id })
        .then(res => {
            if (!res.data) {
                return;
            }

            const servicios = res.data;
            let autoClose = 8000;

            servicios.map(servicio => {
                autoClose += 3000

                const vencimientoServicio = moment.utc(servicio.fechaTentativa);
                const diasRestantes = parseInt(moment.duration(vencimientoServicio.diff(hoy, "days")).asDays());
                const tipo = ServiciosList.filter(item => item.id === servicio.tipo);
                let text = `Tienes ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"} para realizar ${tipo[0].descripcion} en ${servicio.cliente.comunidad ? servicio.cliente.comunidad + ", " : ""}${servicio.cliente.ciudad}`;
                if (diasRestantes === 0) {
                    text = `Hoy es la fecha límite de ${tipo[0].descripcion} en ${servicio.cliente.comunidad ? servicio.cliente.comunidad + ", " : ""}${servicio.cliente.ciudad}`;
                }

                if (diasRestantes === 0) {
                    // si faltan 0 o 1 dìas
                    return toast.error(text, { autoClose })
                } else if (diasRestantes === 1 || diasRestantes === 2) {
                    // si faltan 2 días
                    return toast.warn(text, { autoClose })
                }

                // si faltan mas de dos dias
                return toast.info(text, { autoClose })
            })
            
        })
        .catch(err => toast.error("No se pudo realizar la acción - " + err))
}