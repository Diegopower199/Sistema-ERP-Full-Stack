package tfg.backend.ExcepcionControlada;

public class UnhandledException extends Exception {

    private int status;

    public UnhandledException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
