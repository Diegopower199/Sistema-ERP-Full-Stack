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
                "Hello"));
    }

    public Block calculateBlock(TransaccionVacacion data) {
        Block previousBlock = getLatestBlock();
        Block newBlock = new Block(previousBlock.getIndex() + 1, data, previousBlock.getHashBlock());
        return newBlock;
    }

    public Block addBlock(TransaccionVacacion data) {
        Block newBlock = calculateBlock(data);
        System.out.println("\n\nVALOR EN LA FUNCION: " + newBlock.toMap());
        libroTransaccionesVacacionesAutorizadas.add(newBlock);
        return newBlock;
    }

    public boolean verificarVacacionAutorizadaExiste(Blockchain blockchain, int idVacacion) {
        int index = 1;
        for (Block block : blockchain.getLibroTransaccionesVacacionesAutorizadas()) {
            System.out.println("VALOR DEL BLOQUE " + index + ": " + block.toMap() + "\n\n\n");
            if (block.getDataTransaccionVacacion().getId_vacacion_empleado() == idVacacion) {
                System.out.println("ESTO ES VERDADERO " + "\n\n\n");
                return true;
            }
            index += 1;
        }
        return false;
    }

    public boolean isChainValid() {
        for (int i = 1; i < libroTransaccionesVacacionesAutorizadas.size(); i++) {
            Block currentBlock = libroTransaccionesVacacionesAutorizadas.get(i);
            Block previousBlock = libroTransaccionesVacacionesAutorizadas.get(i - 1);
            if (!currentBlock.getHashBlock().equals(currentBlock.calculateHash())) {
                return false;
            }
            if (!currentBlock.getPreviousHashBlock().equals(previousBlock.getHashBlock())) {
                return false;
            }
        }
        return true;
    }

}