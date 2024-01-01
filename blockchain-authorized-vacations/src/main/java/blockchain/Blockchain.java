package blockchain;



import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import commonclasses.Block;
import commonclasses.TransaccionVacacion;

public class Blockchain implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<Block> libroVacaciones;

    // Constructor vacío
    public Blockchain() {
        this.libroVacaciones = new ArrayList<>();
    }

    // Constructor con parámetro
    public Blockchain(List<Block> libroVacaciones) {
        this.libroVacaciones = libroVacaciones;
    }

    public List<Block> getLibroVacaciones() {
        return libroVacaciones;
    }

    // Método para obtener el último bloque de la cadena
    private Block getLatestBlock() {
        if (libroVacaciones.isEmpty()) {
            createGenesisBlock();
        }
        return libroVacaciones.get(libroVacaciones.size() - 1);
    }

    private void createGenesisBlock() {
        libroVacaciones.add(new Block(0, new TransaccionVacacion(), "Hello"));
    }

    public Block addBlock(TransaccionVacacion data) { // Data será mi objeto Vacacion
        Block previousBlock = getLatestBlock();
        Block newBlock = new Block(previousBlock.getIndex() + 1, data, previousBlock.getHash());
        libroVacaciones.add(newBlock);
        return newBlock;
    }

    public boolean isChainValid() {
        for (int i = 1; i < libroVacaciones.size(); i++) {
            Block currentBlock = libroVacaciones.get(i);
            Block previousBlock = libroVacaciones.get(i - 1);
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
