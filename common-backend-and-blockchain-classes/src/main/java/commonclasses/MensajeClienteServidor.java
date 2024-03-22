package commonclasses;

import java.io.Serializable;

public class MensajeClienteServidor implements Serializable {

    private static final long serialVersionUID = 1L;

    private String tipoOperacion;
    private TransaccionVacacion transaccionVacacionAutorizada;

    public MensajeClienteServidor(String tipoOperacion, TransaccionVacacion transaccionVacacionAutorizada) {
        this.tipoOperacion = tipoOperacion;
        this.transaccionVacacionAutorizada = transaccionVacacionAutorizada;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public TransaccionVacacion getTransaccionVacacionAutorizada() {
        return transaccionVacacionAutorizada;
    }

    @Override
    public String toString() {
        return "MensajeClienteServidor{" +
                "tipoOperacion='" + tipoOperacion + '\'' +
                ", transaccionVacacionAutorizada=" + transaccionVacacionAutorizada +
                '}';
    }

}