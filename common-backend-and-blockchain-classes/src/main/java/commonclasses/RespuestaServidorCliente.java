package commonclasses;

import java.io.Serializable;
import java.util.List;

public class RespuestaServidorCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<Block> libroTransaccionesVacacionesAutorizadas;
    private String mensaje;
    private int codigo;

    // Constructor para el caso "GET ALL"
    public RespuestaServidorCliente(List<Block> libroTransaccionesVacacionesAutorizadas, int codigo) {
        this.libroTransaccionesVacacionesAutorizadas = libroTransaccionesVacacionesAutorizadas;
        this.codigo = codigo;
    }

    public RespuestaServidorCliente(String mensaje, int codigo) {
        this.mensaje = mensaje;
        this.codigo = codigo;
    }

    public List<Block> getLibroTransaccionesVacacionesAutorizadas() {
        return libroTransaccionesVacacionesAutorizadas;
    }

    public String getMensaje() {
        return mensaje;
    }

    public int getCodigo() {
        return codigo;
    }

    @Override
    public String toString() {
        return "RespuestaServidorCliente{" +
                ", mensaje='" + mensaje + '\'' +
                ", libroTransaccionesVacacionesAutorizadas=" + libroTransaccionesVacacionesAutorizadas +
                ", codigo=" + codigo +
                '}';
    }

}
