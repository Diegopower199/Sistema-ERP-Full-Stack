package tfg.backend.clasesComunBackendAndBlockchain;

import java.io.Serializable;

public class MensajeClienteServidor implements Serializable {
    private static final long serialVersionUID = 1L;

    private String tipoOperacion;

    private TransaccionVacacion transaccionVacacion;

    // Constructor vacío con información por defecto
    /*
     * public MensajeClienteServidor() {
     * this.tipoOperacion = "OperacionPorDefecto";
     * this.transaccionVacacion = new TransaccionVacacion(); // Ajusta esto según
     * las necesidades de tu aplicación
     * }
     */
    public MensajeClienteServidor(String tipoOperacion, TransaccionVacacion transaccionVacacion) {
        this.tipoOperacion = tipoOperacion;
        this.transaccionVacacion = transaccionVacacion;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public TransaccionVacacion getTransaccionVacacion() {
        return transaccionVacacion;
    }

    @Override
    public String toString() {
        return "MensajeClienteServidor{" +
                "tipoOperacion='" + tipoOperacion + '\'' +
                ", transaccionVacacion=" + transaccionVacacion +
                '}';
    }
}
