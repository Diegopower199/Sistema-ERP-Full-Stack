package tfg.backend.clasesComunBackendAndBlockchain;

import java.io.Serializable;
import java.util.List;




public class RespuestaServidorCliente implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<Block> libroVacaciones;

    private String mensaje;
    private int codigo;

    // Constructor vacío con información por defecto
    /*public RespuestaServidorCliente() {
        this.libroVacaciones = new ArrayList<>(); // Crea una lista vacía por defecto
        this.mensaje = "MensajePorDefecto";
        this.codigo = 0; // Ajusta esto según las necesidades de tu aplicación
    }*/

    // Constructor para el caso "GET ALL"
    public RespuestaServidorCliente(List<Block> libroVacaciones, int codigo) {
        this.libroVacaciones = libroVacaciones;
        this.codigo = codigo;
    }

    public RespuestaServidorCliente(String mensaje, int codigo) {
        this.mensaje = mensaje;
        this.codigo = codigo;
    }

    public List<Block> getLibroVacaciones() {
        return libroVacaciones;
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
                ", libroVacaciones=" + libroVacaciones +
                ", codigo=" + codigo +
                '}';
    }
}
