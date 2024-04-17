package tfg.backend.models;

public class BlockchainInfo {
    private String hashTransaccionVacacion;
    private String hashBlock;
    private String previousHashBlock;
    private String timestampTransaccionVacacion;
    private boolean errorBlockchain;

    public BlockchainInfo(String hashTransaccionVacacion, String hashBlock, String previousHashBlock,
            String timestampTransaccionVacacion,
            boolean errorBlockchain) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
        this.hashBlock = hashBlock;
        this.previousHashBlock = previousHashBlock;
        this.timestampTransaccionVacacion = timestampTransaccionVacacion;
        this.errorBlockchain = errorBlockchain;
    }

    public BlockchainInfo(String hashTransaccionVacacion, String hashBlock, String previousHashBlock,
            String timestampTransaccionVacacion) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
        this.hashBlock = hashBlock;
        this.previousHashBlock = previousHashBlock;
        this.timestampTransaccionVacacion = timestampTransaccionVacacion;
        this.errorBlockchain = false;
    }

    public BlockchainInfo(boolean errorBlockchain) {
        this.hashTransaccionVacacion = null;
        this.hashBlock = null;
        this.previousHashBlock = null;
        this.errorBlockchain = errorBlockchain;
    }

    public String getHashTransaccionVacacion() {
        return hashTransaccionVacacion;
    }

    public void setHashTransaccionVacacion(String hashTransaccionVacacion) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
    }

    public String getTimestampTransaccionVacacion() {
        return timestampTransaccionVacacion;
    }

    public void setTimestampTransaccionVacacion(String timestampTransaccionVacacion) {
        this.timestampTransaccionVacacion = timestampTransaccionVacacion;
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

    public boolean getErrorBlockchain() {
        return errorBlockchain;
    }

    public void setErrorBlockchain(boolean errorBlockchain) {
        this.errorBlockchain = errorBlockchain;
    }
}
