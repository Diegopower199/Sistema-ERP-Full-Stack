package blockchain;

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

import commonclasses.Block;
import commonclasses.MensajeClienteServidor;
import commonclasses.RespuestaServidorCliente;
import commonclasses.TransaccionVacacion;

public class BlockchainServerMain {

    // Ruta del archivo donde se guardarán los usuarios
    private static final String ARCHIVO_LIBRO_VACACIONES = "libroVacaciones.dat";

    private static Blockchain libroVacaciones = cargarLibroVacaciones(); // Carga el historial existente al iniciar el
    // servidor

    public static void main(String[] args) {

        // Puerto en el que el servidor estará escuchando
        final int puerto = 12345;

        // Configurar el servidor para escuchar en el puerto 12345
        try (ServerSocket serverSocket = new ServerSocket(puerto)) {
            // Mensaje para indicar que el servidor está en espera en el puerto especificado
            System.out.println("Servidor en espera en el puerto " + puerto);

            // Esperar conexiones continuamente
            while (true) {
                try (Socket socketCliente = serverSocket.accept();
                        ObjectInputStream objectInputStream = new ObjectInputStream(socketCliente.getInputStream());
                        ObjectOutputStream objectOutputStream = new ObjectOutputStream(
                                socketCliente.getOutputStream());) {
                    // Configurar el flujo de entrada para recibir un objeto TransaccionVacacion del
                    // cliente (objectInputStream)

                    // Recibir el mensaje del cliente
                    MensajeClienteServidor mensajeDelCliente = (MensajeClienteServidor) objectInputStream.readObject();

                    // Procesar el mensaje
                    String tipoOperacionRecibida = mensajeDelCliente.getTipoOperacion();
                    TransaccionVacacion transaccionVacacionRecibido = mensajeDelCliente
                            .getTransaccionVacacionAutorizada();

                    // Usa los objetos según sea necesario
                    // System.out.println("Tipo operacion recibida: " + tipoOperacionRecibida);
                    // System.out.println("Transaccion vacacion recibida: " +
                    // transaccionVacacionRecibido.toString());

                    RespuestaServidorCliente respuestaAlCliente;

                    switch (tipoOperacionRecibida) {
                        case "GET ALL":
                            // Enviar una respuesta al cliente
                            respuestaAlCliente = new RespuestaServidorCliente(
                                    libroVacaciones.getLibroTransaccionesVacacionesAutorizadas(), 200);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                        case "ADD":
                            // Guardar el usuario en el archivo y actualizar la lista de usuarios
                            guardarTransaccionVacacion(transaccionVacacionRecibido);

                            // Enviar una respuesta al cliente
                            respuestaAlCliente = new RespuestaServidorCliente(
                                    "Transaccion vacacion recibido y guardado exitosamente", 200);
                            objectOutputStream.writeObject(respuestaAlCliente);

                            break;
                        default:
                            System.out.println("Operacion no valida - " + tipoOperacionRecibida);
                            respuestaAlCliente = new RespuestaServidorCliente(
                                    "Operacion no valida", 200);
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

    // Método para cargar la lista de usuarios desde el archivo
    private static Blockchain cargarLibroVacaciones() {
        // Crear una nueva lista para almacenar las vacaciones
        List<Block> listaBloquesDeVacacionesAlmacenados = new ArrayList<>();

        // Intentar cargar usuarios desde el archivo
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(ARCHIVO_LIBRO_VACACIONES))) {
            Object objetoLeido = ois.readObject();
            Blockchain blockchainDesdeArchivo = (Blockchain) objetoLeido;
            listaBloquesDeVacacionesAlmacenados = blockchainDesdeArchivo.getLibroTransaccionesVacacionesAutorizadas();
            System.out.println("Vacaciones cargados correctamente");
        } catch (FileNotFoundException e) {
            // El archivo no existe, imprimir mensaje y continuar
            System.out.println("Archivo no encontrado. Se creara uno nuevo");
        } catch (IOException | ClassNotFoundException e) {
            // Manejar excepciones de entrada/salida o deserialización
            e.printStackTrace();
        }

        // Devolver la lista de usuarios cargada
        return new Blockchain(listaBloquesDeVacacionesAlmacenados);
    }

    private static void guardarTransaccionVacacion(TransaccionVacacion newTransaccionVacacion) {
        // Lógica para guardar el historial en un archivo

        System.out.println("HOLA");
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(ARCHIVO_LIBRO_VACACIONES))) {
            libroVacaciones.addBlock(newTransaccionVacacion);
            oos.writeObject(libroVacaciones);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Método para mostrar todos los bloques de transacciones de vacaciones
    // almacenados en la lista en memoria
    /*
     * private static void mostrarInformacionLibroTransaccionVacacion() {
     * List<Block> blockChain =
     * libroVacaciones.getLibroTransaccionesVacacionesAutorizadas();
     * // Verificar si la lista de usuarios está vacía
     * if (blockChain.isEmpty()) {
     * System.out.println("No hay transacciones de vacaciones registrados");
     * } else {
     * System.out.println("Hay transacciones de vacaciones registrados");
     * }
     * }
     */

}
