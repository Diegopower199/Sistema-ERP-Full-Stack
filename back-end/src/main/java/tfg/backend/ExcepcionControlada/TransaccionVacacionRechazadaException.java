package tfg.backend.ExcepcionControlada;

public class TransaccionVacacionRechazadaException extends Exception {

    private int status;

    public TransaccionVacacionRechazadaException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
