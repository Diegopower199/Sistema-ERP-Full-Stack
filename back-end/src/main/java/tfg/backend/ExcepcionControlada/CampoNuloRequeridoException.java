package tfg.backend.ExcepcionControlada;

public class CampoNuloRequeridoException extends Exception {

    private int status;

    public CampoNuloRequeridoException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
