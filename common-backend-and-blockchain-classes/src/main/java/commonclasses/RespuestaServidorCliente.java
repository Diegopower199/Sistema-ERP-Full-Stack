package commonclasses;

import java.io.Serializable;
import java.util.List;

public class RespuestaServidorCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<Block> libroTransaccionesVacacionesAutorizadas;
    private String mensaje;
    private int codigo;
    private Block blockActual;
    private List<TransaccionVacacion> listaVacacionesAutorizadasConInconsistencias;

    public RespuestaServidorCliente(List<Block> libroTransaccionesVacacionesAutorizadas, String mensaje, int codigo) {
        this.libroTransaccionesVacacionesAutorizadas = libroTransaccionesVacacionesAutorizadas;
        this.mensaje = mensaje;
        this.codigo = codigo;
    }

    public RespuestaServidorCliente(String mensaje, int codigo, Block blockActual,
            List<TransaccionVacacion> listaVacacionesAutorizadasConInconsistencias) {
        this.mensaje = mensaje;
        this.codigo = codigo;
        this.blockActual = blockActual;
        this.listaVacacionesAutorizadasConInconsistencias = listaVacacionesAutorizadasConInconsistencias;
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

    public Block getBlockActual() {
        return blockActual;
    }

    public List<TransaccionVacacion> getListaVacacionesAutorizadasConInconsistencias() {
        return listaVacacionesAutorizadasConInconsistencias;
    }

    @Override
    public String toString() {
        return "RespuestaServidorCliente{" +
                "mensaje=\"" + mensaje + '\"' +
                ", libroTransaccionesVacacionesAutorizadas=" + libroTransaccionesVacacionesAutorizadas +
                ", codigo=" + codigo +
                ", blockActual=" + blockActual +
                ", listaVacacionesAutorizadasConInconsistencias=" + listaVacacionesAutorizadasConInconsistencias +
                '}';
    }

}