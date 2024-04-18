package commonclasses;

import java.io.Serializable;
import java.util.List;

public class MensajeClienteServidor implements Serializable {

    private static final long serialVersionUID = 1L;

    private String tipoOperacion;
    private TransaccionVacacion transaccionVacacionAutorizada;
    private List<TransaccionVacacion> listaTransaccionesVacacionesAutorizadas;

    public MensajeClienteServidor(String tipoOperacion, TransaccionVacacion transaccionVacacionAutorizada,
            List<TransaccionVacacion> listaTransaccionesVacacionesAutorizadas) {
        this.tipoOperacion = tipoOperacion;
        this.transaccionVacacionAutorizada = transaccionVacacionAutorizada;
        this.listaTransaccionesVacacionesAutorizadas = listaTransaccionesVacacionesAutorizadas;

    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public TransaccionVacacion getTransaccionVacacionAutorizada() {
        return transaccionVacacionAutorizada;
    }

    public List<TransaccionVacacion> getListaTransaccionesVacacionesAutorizadas() {
        return listaTransaccionesVacacionesAutorizadas;
    }

    @Override
    public String toString() {
        return "MensajeClienteServidor{" +
                "tipoOperacion=\"" + tipoOperacion + '\"' +
                ", transaccionVacacionAutorizada=" + transaccionVacacionAutorizada +
                '}';
    }

}