package tfg.backend.clasesComunBackendAndBlockchain;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public class Block implements Serializable {

    private static final long serialVersionUID = 1L;

    private int index;
    private Long timestamp;

    private TransaccionVacacion dataTransaccionVacacion;
    private String previousHash;
    private String hash;

    // Constructor vacío con información por defecto
    /*
     * public Block() {
     * this.index = 0; // o cualquier valor por defecto que desees
     * this.timestamp = System.currentTimeMillis();
     * this.dataTransaccionVacacion = new TransaccionVacacion(); // o cualquier
     * valor predeterminado
     * this.previousHash = ""; // o cualquier valor por defecto que desees
     * this.hash = calculateHash();
     * }
     */

    public Block(int index, TransaccionVacacion dataTransaccionVacacion, String previousHash) {
        this.index = index;
        this.dataTransaccionVacacion = dataTransaccionVacacion;
        this.previousHash = previousHash;
        this.timestamp = System.currentTimeMillis();
        this.hash = calculateHash();
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public TransaccionVacacion getDataTransaccionVacacion() {
        return dataTransaccionVacacion;
    }

    public void setDataTransaccionVacacion(TransaccionVacacion dataTransaccionVacacion) {
        this.dataTransaccionVacacion = dataTransaccionVacacion;
    }

    public String getPreviousHash() {
        return previousHash;
    }

    public void setPreviousHash(String previousHash) {
        this.previousHash = previousHash;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String calculateHash() {

        String text = String.valueOf(index + previousHash + String.valueOf(timestamp)
                + String.valueOf(dataTransaccionVacacion.calcularHashTransaccion()));

        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
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
        return "Block{" +
                "index=" + index +
                ", timestamp=" + timestamp +
                ", dataTransaccionVacacion=" + dataTransaccionVacacion +
                ", previousHash='" + previousHash + '\'' +
                ", hash='" + hash + '\'' +
                '}';
    }

    // Método toMap() para convertir la instancia de la clase a un mapa
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();

        map.put("index", index);
        map.put("timestamp", timestamp);
        map.put("dataTransaccionVacacion", dataTransaccionVacacion.toMap()); // Convierte la transacción a un mapa
        map.put("previousHash", previousHash);
        map.put("hash", hash);

        return map;
    }

    // Método para imprimir todos los datos de un bloque
    public void printBlockData() {
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Datos del Bloque                                                                 |");
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Index: " + index);
        System.out.println("| Timestamp: " + timestamp);
        dataTransaccionVacacion.printTransactionData(); // Llama al método de TransaccionVacacion
        System.out.println("| PreviousHash: " + previousHash);
        System.out.println("| Hash: " + hash);
        System.out.println("+----------------------------------------------------------------------------------+");
    }
}
