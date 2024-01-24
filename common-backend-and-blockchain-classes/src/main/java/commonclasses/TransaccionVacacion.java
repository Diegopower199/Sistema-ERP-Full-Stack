package commonclasses;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class TransaccionVacacion implements Serializable {

    private static final long serialVersionUID = 1L;

    private int id_vacacion_empleado;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private int dias_solicitados;
    private int dias_disfrutados;
    private int dias_restantes;
    private String comentarios;
    private String dni;
    private String tipo_estado;
    private Long timestamp;
    private String hash;

    public TransaccionVacacion() {
        // Inicializar algunos valores por defecto
        this.id_vacacion_empleado = 0; // O el valor que consideres adecuado
        this.fecha_inicio = LocalDate.now(); // Fecha actual
        this.fecha_fin = LocalDate.now().plusDays(7); // Fecha actual + 7 días
        this.dias_solicitados = 0;
        this.dias_disfrutados = 0;
        this.dias_restantes = 0;
        this.comentarios = "";
        this.dni = "";
        this.tipo_estado = "";
        this.timestamp = System.currentTimeMillis();
        this.hash = calcularHashTransaccion();
    }

    public TransaccionVacacion(int id_vacacion_empleado, LocalDate fecha_inicio, LocalDate fecha_fin,
            int dias_solicitados, int dias_disfrutados, int dias_restantes, String comentarios, String dni,
            String tipo_estado) {
        this.id_vacacion_empleado = id_vacacion_empleado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.dias_solicitados = dias_solicitados;
        this.dias_disfrutados = dias_disfrutados;
        this.dias_restantes = dias_restantes;
        this.comentarios = comentarios;
        this.dni = dni;
        this.tipo_estado = tipo_estado;
        this.timestamp = System.currentTimeMillis();
        this.hash = calcularHashTransaccion();
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public int getId_vacacion_empleado() {
        return id_vacacion_empleado;
    }

    public void setId_vacacion_empleado(int id_vacacion_empleado) {
        this.id_vacacion_empleado = id_vacacion_empleado;
    }

    public LocalDate getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(LocalDate fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public LocalDate getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(LocalDate fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public int getDias_solicitados() {
        return dias_solicitados;
    }

    public void setDias_solicitados(int dias_solicitados) {
        this.dias_solicitados = dias_solicitados;
    }

    public int getDias_disfrutados() {
        return dias_disfrutados;
    }

    public void setDias_disfrutados(int dias_disfrutados) {
        this.dias_disfrutados = dias_disfrutados;
    }

    public int getDias_restantes() {
        return dias_restantes;
    }

    public void setDias_restantes(int dias_restantes) {
        this.dias_restantes = dias_restantes;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getTipo_estado() {
        return tipo_estado;
    }

    public void setTipo_estado(String tipo_estado) {
        this.tipo_estado = tipo_estado;
    }

    // Método para calcular el hash de la transacción de vacacion
    public String calcularHashTransaccion() {

        String text = String.valueOf(id_vacacion_empleado) + String.valueOf(fecha_inicio) + String.valueOf(fecha_fin)
                + String.valueOf(dias_solicitados) + String.valueOf(dias_disfrutados) +
                String.valueOf(dias_restantes) + String.valueOf(comentarios) + String.valueOf(dni)
                + String.valueOf(tipo_estado) + String.valueOf(timestamp);

        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null; // Manejo de error, puedes ajustarlo según tus necesidades
        }

        final byte bytes[] = digest.digest(text.getBytes());
        final StringBuilder hexString = new StringBuilder();
        for (final byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }

        return hexString.toString();
    }

    @Override
    public String toString() {
        return "{" +
                "hash='" + hash + '\'' + "id_vacacion_empleado=" + id_vacacion_empleado + ", fecha_inicio="
                + fecha_inicio + ", fecha_fin=" + fecha_fin + ", dias_solicitados=" + dias_solicitados +
                ", dias_disfrutados=" + dias_disfrutados + ", dias_restantes=" + dias_restantes + ", comentarios='"
                + comentarios + '\'' + ", dni='" + dni + '\'' + ", tipo_estado='" + tipo_estado + '\'' +
                ", timestamp=" + timestamp + '}';
    }

    // Método toMap() para convertir la instancia de la clase a un mapa
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();

        map.put("id_vacacion_empleado", id_vacacion_empleado);
        map.put("fecha_inicio", fecha_inicio);
        map.put("fecha_fin", fecha_fin);
        map.put("dias_solicitados", dias_solicitados);
        map.put("dias_disfrutados", dias_disfrutados);
        map.put("dias_restantes", dias_restantes);
        map.put("comentarios", comentarios);
        map.put("dni", dni);
        map.put("tipo_estado", tipo_estado);
        map.put("timestamp", timestamp);
        map.put("hash", hash);

        return map;
    }

    // Método para imprimir todos los datos de la transacción
    public void printTransactionData() {
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Datos de la Transaccion                                                          |");
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| ID Vacacion Empleado: " + id_vacacion_empleado);
        System.out.println("| Fecha Inicio: " + fecha_inicio);
        System.out.println("| Fecha Fin: " + fecha_fin);
        System.out.println("| Dias Solicitados: " + dias_solicitados);
        System.out.println("| Dias Disfrutados: " + dias_disfrutados);
        System.out.println("| Dias Restantes: " + dias_restantes);
        System.out.println("| Comentarios: " + comentarios);
        System.out.println("| DNI: " + dni);
        System.out.println("| Tipo Estado: " + tipo_estado);
        System.out.println("| Timestamp: " + timestamp);
        System.out.println("| Hash: " + hash);
        System.out.println("+----------------------------------------------------------------------------------+");
    }

}
