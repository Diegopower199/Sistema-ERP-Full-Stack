package tfg.backend.models;

public class BlockchainInfo {
    private String hashTransaccionVacacion;
    private String hashBlock;
    private String previousHashBlock;
    private boolean errorBlockchain;

    public BlockchainInfo(String hashTransaccionVacacion, String hashBlock, String previousHashBlock,
            boolean errorBlockchain) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
        this.hashBlock = hashBlock;
        this.previousHashBlock = previousHashBlock;
        this.errorBlockchain = errorBlockchain;
    }

    public BlockchainInfo(String hashTransaccionVacacion, String hashBlock, String previousHashBlock) {
        this.hashTransaccionVacacion = hashTransaccionVacacion;
        this.hashBlock = hashBlock;
        this.previousHashBlock = previousHashBlock;
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

    public String getHashBlock() {
        return hashBlock;
    }

    public void setHashBlock(String hashBlock) {
        this.hashBlock = hashBlock;
    }

    public String getPreviousHashBlock() {
        return previousHashBlock;
    }

    public void setPreviousHashBlock(String previousHashBlock) {
        this.previousHashBlock = previousHashBlock;
    }

    public boolean getErrorBlockchain() {
        return errorBlockchain;
    }

    public void setErrorBlockchain(boolean errorBlockchain) {
        this.errorBlockchain = errorBlockchain;
    }
}
