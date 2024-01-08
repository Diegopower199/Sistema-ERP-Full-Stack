package tfg.backend.ExcepcionControlada;

public class ExcepcionPersonalizada extends Exception {

    private int codigo;

    // Constructor que acepta un mensaje y un código
    public ExcepcionPersonalizada(String mensaje, int codigo) {
        super(mensaje);
        this.codigo = codigo;
    }

    // Método para obtener el código de la excepción
    public int getCodigo() {
        return codigo;
    }
}

/*
 * public class Ejemplo {
 * 
 * public static void main(String[] args) {
 * try {
 * // Simulando una situación que arroja la excepción
 * throw new MiExcepcion("Este es un mensaje personalizado", 500);
 * } catch (MiExcepcion e) {
 * // Captura de la excepción y manejo
 * System.out.println("Excepción capturada: " + e.getMessage());
 * System.out.println("Código de error: " + e.getCodigo());
 * }
 * }
 * }
 */


// https://chat.openai.com/share/c19d4249-83a4-4111-ae68-b6c44502dbb3