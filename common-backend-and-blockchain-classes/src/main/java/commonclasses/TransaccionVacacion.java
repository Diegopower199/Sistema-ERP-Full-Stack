package commonclasses;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class TransaccionVacacion implements Serializable {

    private static final long serialVersionUID = 1L;

    private int id_vacacion_empleado;
    private String fecha_inicio;
    private String fecha_fin;
    private int dias_disponibles;
    private int dias_pendientes;
    private int dias_solicitados;
    private int dias_disfrutados;
    private String observacion;
    private String dni;
    private String tipo_estado;
    private Long timestamp;
    private String hashTransaccionVacacion;

    public TransaccionVacacion() {

        LocalDate fechaActual = LocalDate.now();
        LocalDate fechaActualPlusSieteDias = LocalDate.now().plusDays(7);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String fechaInicioString = fechaActual.format(formatter);
        String fechaFinString = fechaActualPlusSieteDias.format(formatter);

        this.id_vacacion_empleado = 0;
        this.fecha_inicio = fechaInicioString;
        this.fecha_fin = fechaFinString;
        this.dias_disponibles = 0;
        this.dias_pendientes = 0;
        this.dias_solicitados = 0;
        this.dias_disfrutados = 0;
        this.observacion = "";
        this.dni = "";
        this.tipo_estado = "";
        this.timestamp = System.currentTimeMillis();
        this.hashTransaccionVacacion = calcularHashTransaccion();
    }

    public TransaccionVacacion(int id_vacacion_empleado, String fecha_inicio, String fecha_fin,
            int dias_disponibles, int dias_pendientes,
            int dias_solicitados, int dias_disfrutados, String observacion, String dni,
            String tipo_estado) {
        this.id_vacacion_empleado = id_vacacion_empleado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.dias_disponibles = dias_disponibles;
        this.dias_pendientes = dias_pendientes;
        this.dias_solicitados = dias_solicitados;
        this.dias_disfrutados = dias_disfrutados;
        this.observacion = observacion;
        this.dni = dni;
        this.tipo_estado = tipo_estado;
        this.timestamp = System.currentTimeMillis();
        this.hashTransaccionVacacion = calcularHashTransaccion();
    }

    public TransaccionVacacion(int id_vacacion_empleado, String fecha_inicio, String fecha_fin,
            int dias_disponibles, int dias_pendientes,
            int dias_solicitados, int dias_disfrutados, String observacion, String dni,
            String tipo_estado, Long timestamp) {
        this.id_vacacion_empleado = id_vacacion_empleado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.dias_disponibles = dias_disponibles;
        this.dias_pendientes = dias_pendientes;
        this.dias_solicitados = dias_solicitados;
        this.dias_disfrutados = dias_disfrutados;
        this.observacion = observacion;
        this.dni = dni;
        this.tipo_estado = tipo_estado;
        this.timestamp = timestamp;
        this.hashTransaccionVacacion = calcularHashTransaccion();
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getHashTransaccionVacacion() {
        return hashTransaccionVacacion;
    }

    public void setHashTransaccionVacacion(String hashTransaccionVacacion) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
    }

    public int getId_vacacion_empleado() {
        return id_vacacion_empleado;
    }

    public void setId_vacacion_empleado(int id_vacacion_empleado) {
        this.id_vacacion_empleado = id_vacacion_empleado;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public String getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public int getDias_disponibles() {
        return dias_disponibles;
    }

    public void setDias_disponibles(int dias_disponibles) {
        this.dias_disponibles = dias_disponibles;
    }

    public int getDias_pendientes() {
        return dias_pendientes;
    }

    public void setDias_pendientes(int dias_pendientes) {
        this.dias_pendientes = dias_pendientes;
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

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
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

    public String calcularHashTransaccion() {

        String text = String.valueOf(id_vacacion_empleado) + String.valueOf(fecha_inicio) + String.valueOf(fecha_fin)
                + String.valueOf(dias_disponibles) + String.valueOf(dias_pendientes) + String.valueOf(dias_solicitados)
                + String.valueOf(dias_disfrutados) + String.valueOf(observacion) + String.valueOf(dni)
                + String.valueOf(tipo_estado) + String.valueOf(timestamp);

        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
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
                "hashTransaccionVacacion=\"" + hashTransaccionVacacion + '\"'
                + ", id_vacacion_empleado=" + id_vacacion_empleado
                + ", fecha_inicio=" + fecha_inicio
                + ", fecha_fin=" + fecha_fin
                + ", dias_disponibles=" + dias_disponibles
                + ", dias_pendientes=" + dias_pendientes
                + ", dias_solicitados=" + dias_solicitados
                + ", dias_disfrutados=" + dias_disfrutados
                + ", observacion=\"" + observacion + '\"'
                + ", dni=\"" + dni + '\"'
                + ", tipo_estado=\"" + tipo_estado + '\"'
                + ", timestamp=" + timestamp +
                "}";
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();

        map.put("id_vacacion_empleado", id_vacacion_empleado);
        map.put("fecha_inicio", fecha_inicio);
        map.put("fecha_fin", fecha_fin);
        map.put("dias_disponibles", dias_disponibles);
        map.put("dias_pendientes", dias_pendientes);
        map.put("dias_solicitados", dias_solicitados);
        map.put("dias_disfrutados", dias_disfrutados);
        map.put("observacion", observacion);
        map.put("dni", dni);
        map.put("tipo_estado", tipo_estado);
        map.put("timestamp", timestamp);
        map.put("hashTransaccionVacacion", hashTransaccionVacacion);

        return map;
    }

    public void printTransactionData() {
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Datos de la Transaccion                                                          |");
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| ID Vacacion Empleado: " + id_vacacion_empleado);
        System.out.println("| Fecha Inicio: " + fecha_inicio);
        System.out.println("| Fecha Fin: " + fecha_fin);
        System.out.println("| Dias Disponibles: " + dias_disponibles);
        System.out.println("| Dias Pendientes: " + dias_pendientes);
        System.out.println("| Dias Solicitados: " + dias_solicitados);
        System.out.println("| Dias Disfrutados: " + dias_disfrutados);
        System.out.println("| Observacion: " + observacion);
        System.out.println("| DNI: " + dni);
        System.out.println("| Tipo Estado: " + tipo_estado);
        System.out.println("| Timestamp: " + timestamp);
        System.out.println("| HashTransaccionVacacion: " + hashTransaccionVacacion);
        System.out.println("+----------------------------------------------------------------------------------+");
    }

}