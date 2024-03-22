package blockchain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import commonclasses.Block;
import commonclasses.TransaccionVacacion;

public class Blockchain implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<Block> libroTransaccionesVacacionesAutorizadas;

    // Constructor vacío
    public Blockchain() {
        this.libroTransaccionesVacacionesAutorizadas = new ArrayList<>();
    }

    // Constructor con parámetro
    public Blockchain(List<Block> libroTransaccionesVacacionesAutorizadas) {
        this.libroTransaccionesVacacionesAutorizadas = libroTransaccionesVacacionesAutorizadas;
    }

    public List<Block> getLibroTransaccionesVacacionesAutorizadas() {
        return libroTransaccionesVacacionesAutorizadas;
    }

    // Método para obtener el último bloque de la cadena
    private Block getLatestBlock() {
        if (libroTransaccionesVacacionesAutorizadas.isEmpty()) {
            createGenesisBlock();
        }
        return libroTransaccionesVacacionesAutorizadas.get(libroTransaccionesVacacionesAutorizadas.size() - 1);
    }

    private void createGenesisBlock() {
        libroTransaccionesVacacionesAutorizadas.add(new Block(0, new TransaccionVacacion(), "Hello"));
    }

    public Block addBlock(TransaccionVacacion data) { // Data será mi objeto Vacacion
        Block previousBlock = getLatestBlock();
        Block newBlock = new Block(previousBlock.getIndex() + 1, data, previousBlock.getHash());
        libroTransaccionesVacacionesAutorizadas.add(newBlock);
        return newBlock;
    }

    public boolean isChainValid() {
        for (int i = 1; i < libroTransaccionesVacacionesAutorizadas.size(); i++) {
            Block currentBlock = libroTransaccionesVacacionesAutorizadas.get(i);
            Block previousBlock = libroTransaccionesVacacionesAutorizadas.get(i - 1);
            if (!currentBlock.getHash().equals(currentBlock.calculateHash())) {
                return false;
            }
            if (!currentBlock.getPreviousHash().equals(previousBlock.getHash())) {
                return false;
            }
        }
        return true;
    }

}