package tfg.backend.ExcepcionControlada;

public class ConexionServidoresException extends Exception {

    private int status;

    public ConexionServidoresException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
