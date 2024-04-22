package blockchain;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import commonclasses.Block;
import commonclasses.MensajeClienteServidor;
import commonclasses.RespuestaServidorCliente;
import commonclasses.TransaccionVacacion;

public class BlockchainServerMain {

    private static final String ARCHIVO_LIBRO_VACACIONES = "libroVacaciones.dat";
    private static final String PROPERTIES_FILE_PATH = "src/main/java/resources/application.properties";

    private static Blockchain libroVacaciones = cargarLibroVacaciones();

    public static void main(String[] args) {

        Properties properties = new Properties();

        int PORT = 0;

        try {
            properties.load(new FileInputStream(new File(PROPERTIES_FILE_PATH)));
            String valuePORT = properties.getProperty("PORT");
            if (valuePORT == null) {
                PORT = 12345;
            } else {
                PORT = Integer.parseInt(valuePORT);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {

            System.out.println("Servidor en espera en el puerto " + PORT);

            while (true) {
                try (Socket socketCliente = serverSocket.accept();
                        ObjectInputStream objectInputStream = new ObjectInputStream(socketCliente.getInputStream());
                        ObjectOutputStream objectOutputStream = new ObjectOutputStream(
                                socketCliente.getOutputStream());) {

                    MensajeClienteServidor mensajeDelCliente = (MensajeClienteServidor) objectInputStream.readObject();

                    String tipoOperacionRecibida = mensajeDelCliente.getTipoOperacion().toUpperCase();
                    TransaccionVacacion transaccionVacacionRecibido = mensajeDelCliente
                            .getTransaccionVacacionAutorizada();
                    List<TransaccionVacacion> listaTransaccionesVacacionesAutorizadasRecibido = mensajeDelCliente
                            .getListaTransaccionesVacacionesAutorizadas();

                    RespuestaServidorCliente respuestaAlCliente;

                    switch (tipoOperacionRecibida) {
                        case "GET ALL":

                            respuestaAlCliente = new RespuestaServidorCliente(
                                    libroVacaciones.getLibroTransaccionesVacacionesAutorizadas(), 200);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                        case "ADD":

                            Block bloqueGuardado = guardarTransaccionVacacion(transaccionVacacionRecibido);

                            if (bloqueGuardado == null) {
                                respuestaAlCliente = new RespuestaServidorCliente(
                                        "Transaccion vacacion rechazada. Ya se autorizó la vacación", 409, null, null);
                                objectOutputStream.writeObject(respuestaAlCliente);
                                break;
                            }

                            respuestaAlCliente = new RespuestaServidorCliente(
                                    "Transaccion vacacion recibido y guardado exitosamente", 200, bloqueGuardado, null);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                        case "CHECK":

                            List<TransaccionVacacion> inconsistenciasEncontradas = obtenerVacacionesConInconsistencias(
                                    listaTransaccionesVacacionesAutorizadasRecibido);

                            respuestaAlCliente = new RespuestaServidorCliente(
                                    "Check blockchain realizado", 200, null, inconsistenciasEncontradas);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                        default:
                            respuestaAlCliente = new RespuestaServidorCliente(
                                    "Operacion no valida", 200, null, null);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                    }
                } catch (IOException | ClassNotFoundException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static Blockchain cargarLibroVacaciones() {
        List<Block> listaBloquesDeVacacionesAlmacenados = new ArrayList<>();

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(ARCHIVO_LIBRO_VACACIONES))) {
            Object objetoLeido = ois.readObject();
            Blockchain blockchainDesdeArchivo = (Blockchain) objetoLeido;
            listaBloquesDeVacacionesAlmacenados = blockchainDesdeArchivo.getLibroTransaccionesVacacionesAutorizadas();

        } catch (FileNotFoundException e) {
            System.err.println("Archivo no encontrado. Se creara uno nuevo");
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error en la entrada/salida o en la deserialización");
        }

        return new Blockchain(listaBloquesDeVacacionesAlmacenados);
    }

    private static Block guardarTransaccionVacacion(TransaccionVacacion newTransaccionVacacion) {
        Block newBlock = null;

        boolean existeVacacionAutorizadaPorId = libroVacaciones.verificarVacacionAutorizadaExiste(libroVacaciones,
                newTransaccionVacacion.getId_vacacion_empleado());

        if (existeVacacionAutorizadaPorId == true) {
            return null;
        }

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(ARCHIVO_LIBRO_VACACIONES))) {
            newBlock = libroVacaciones.addBlock(newTransaccionVacacion);
            oos.writeObject(libroVacaciones);
        } catch (IOException e) {
            System.err.println("Ocurrió un error al escribir en el archivo: " + e.getMessage());
        }

        return newBlock;
    }

    private static List<TransaccionVacacion> obtenerVacacionesConInconsistencias(
            List<TransaccionVacacion> listaTransaccionesVacaciones) {
        List<Block> bloquesVacacionesAutorizadas = libroVacaciones.getLibroTransaccionesVacacionesAutorizadas();

        // Variable para almacenar las inconsistencias encontradas
        List<TransaccionVacacion> transaccionesVacacionesInconsistentes = new ArrayList<>();

        for (int pos = 1; pos < bloquesVacacionesAutorizadas.size(); pos++) {
            Block infoBlockVacacionesAutorizadas = bloquesVacacionesAutorizadas.get(pos);

            for (TransaccionVacacion infoTransaccionVacacionDeBBDD : listaTransaccionesVacaciones) {

                // Verificamos si el ID de vacación es el mismo en ambos registros
                boolean mismoIdVacacionBlockchainAndBBDD = infoBlockVacacionesAutorizadas.getDataTransaccionVacacion()
                        .getId_vacacion_empleado() == infoTransaccionVacacionDeBBDD.getId_vacacion_empleado();

                // Verificamos si el hash de la transacción de vacaciones ha cambiado
                boolean hashTransaccionVacacionDiferenteBlockchainAndBBDD = !infoBlockVacacionesAutorizadas
                        .getDataTransaccionVacacion()
                        .getHashTransaccionVacacion()
                        .equals(infoTransaccionVacacionDeBBDD.getHashTransaccionVacacion());

                if (mismoIdVacacionBlockchainAndBBDD && hashTransaccionVacacionDiferenteBlockchainAndBBDD) {
                    transaccionesVacacionesInconsistentes.add(infoTransaccionVacacionDeBBDD);

                    break;
                }

            }
        }

        return transaccionesVacacionesInconsistentes;
    }

}
