package main;


import java.io.Serializable;

public class MensajeClienteServidor implements Serializable {
    private static final long serialVersionUID = 1L;

    private String tipoOperacion;
    private TransaccionVacacion transaccionVacacion;

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
