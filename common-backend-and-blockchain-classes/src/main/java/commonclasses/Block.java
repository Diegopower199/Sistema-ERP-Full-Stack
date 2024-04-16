package commonclasses;

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
    private String previousHashBlock;
    private String hashBlock;

    public Block(int index, TransaccionVacacion dataTransaccionVacacion, String previousHashBlock) {
        this.index = index;
        this.dataTransaccionVacacion = dataTransaccionVacacion;
        this.previousHashBlock = previousHashBlock;
        this.timestamp = System.currentTimeMillis();
        this.hashBlock = calculateHashBlock();
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
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

    public String getPreviousHashBlock() {
        return previousHashBlock;
    }

    public void setPreviousHashBlock(String previousHashBlock) {
        this.previousHashBlock = previousHashBlock;
    }

    public String getHashBlock() {
        return hashBlock;
    }

    public void setHashBlock(String hashBlock) {
        this.hashBlock = hashBlock;
    }

    public String calculateHashBlock() {

        String text = String.valueOf(index + previousHashBlock + String.valueOf(timestamp)
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
                ", previousHashBlock='" + previousHashBlock + '\'' +
                ", hashBlock='" + hashBlock + '\'' +
                '}';
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();

        map.put("index", index);
        map.put("timestamp", timestamp);
        map.put("dataTransaccionVacacion", dataTransaccionVacacion.toMap());
        map.put("previousHashBlock", previousHashBlock);
        map.put("hashBlock", hashBlock);

        return map;
    }

    public void printBlockData() {
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Datos del Bloque                                                                 |");
        System.out.println("+----------------------------------------------------------------------------------+");
        System.out.println("| Index: " + index);
        System.out.println("| Timestamp: " + timestamp);
        dataTransaccionVacacion.printTransactionData();
        System.out.println("| PreviousHashBlock: " + previousHashBlock);
        System.out.println("| HashBlock: " + hashBlock);
        System.out.println("+----------------------------------------------------------------------------------+");
    }

}