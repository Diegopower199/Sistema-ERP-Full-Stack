package blockchain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import commonclasses.Block;
import commonclasses.TransaccionVacacion;

public class Blockchain implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<Block> libroTransaccionesVacacionesAutorizadas;

    public Blockchain() {
        this.libroTransaccionesVacacionesAutorizadas = new ArrayList<>();
    }

    public Blockchain(List<Block> libroTransaccionesVacacionesAutorizadas) {
        this.libroTransaccionesVacacionesAutorizadas = libroTransaccionesVacacionesAutorizadas;
    }

    public List<Block> getLibroTransaccionesVacacionesAutorizadas() {
        return libroTransaccionesVacacionesAutorizadas;
    }

    private Block getLatestBlock() {
        if (libroTransaccionesVacacionesAutorizadas.isEmpty()) {
            createGenesisBlock();
        }
        return libroTransaccionesVacacionesAutorizadas.get(libroTransaccionesVacacionesAutorizadas.size() - 1);
    }

    private void createGenesisBlock() {
        libroTransaccionesVacacionesAutorizadas.add(new Block(0, new TransaccionVacacion(),
                "e276561d728d35821ec042db26585172dff6615fba1c539d91e18220f0c44f4f"));
    }

    public Block calculateBlock(TransaccionVacacion data) {
        Block previousBlock = getLatestBlock();
        Block newBlock = new Block(previousBlock.getIndex() + 1, data, previousBlock.getHashBlock());
        return newBlock;
    }

    public Block addBlock(TransaccionVacacion data) {
        Block newBlock = calculateBlock(data);
        libroTransaccionesVacacionesAutorizadas.add(newBlock);
        return newBlock;
    }

    public boolean verificarVacacionAutorizadaExiste(Blockchain blockchain, int idVacacion) {
        for (Block block : blockchain.getLibroTransaccionesVacacionesAutorizadas()) {

            if (block.getDataTransaccionVacacion().getId_vacacion_empleado() == idVacacion) {
                return true;
            }
        }
        return false;
    }

    public boolean isChainValid() {
        for (int i = 1; i < libroTransaccionesVacacionesAutorizadas.size(); i++) {
            Block currentBlock = libroTransaccionesVacacionesAutorizadas.get(i);
            Block previousBlock = libroTransaccionesVacacionesAutorizadas.get(i - 1);
            if (!currentBlock.getHashBlock().equals(currentBlock.calculateHashBlock())) {
                return false;
            }
            if (!currentBlock.getPreviousHashBlock().equals(previousBlock.getHashBlock())) {
                return false;
            }
        }
        return true;
    }

}