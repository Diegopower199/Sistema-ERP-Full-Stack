package tfg.backend.services;

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import commonclasses.Block;
import commonclasses.MensajeClienteServidor;
import commonclasses.RespuestaServidorCliente;
import commonclasses.TransaccionVacacion;

// Propósito: Contiene la lógica de negocio relacionada con las operaciones de vacaciones autorizadas.

@Service
public class BlockchainVacacionAutorizadaService {

    private static int PORT = 12345;
    private static String HOST = "localhost";

    public List<Map<String, Object>> getAllTransaccionesVacacionesAutorizadas() {
        List<Block> libroTransaccionesVacacionesAutorizadas = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        try (Socket socket = new Socket(HOST, PORT);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("GET ALL", null);

            objectOutputStream.writeObject(mensajeAlServidor);

            // Recibir la respuesta del servidor
            RespuestaServidorCliente respuestaDelServidor = null;
            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            libroTransaccionesVacacionesAutorizadas = respuestaDelServidor.getLibroTransaccionesVacacionesAutorizadas();
            for (Block transaccionesVacacionesAutorizadas : libroTransaccionesVacacionesAutorizadas) {
                Map<String, Object> transaccionesVacacionesAutorizadasMap = transaccionesVacacionesAutorizadas.toMap();

                resultado.add(transaccionesVacacionesAutorizadasMap);
            }
            System.out.println(respuestaDelServidor);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public TransaccionVacacion saveTransaccionVacacionAutorizada(TransaccionVacacion transaccionVacacionAutorizada) {
        try (Socket socket = new Socket(HOST, PORT);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("ADD", transaccionVacacionAutorizada);

            objectOutputStream.writeObject(mensajeAlServidor);

            // Recibir la respuesta del servidor
            RespuestaServidorCliente respuestaDelServidor = null;
            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            System.out.println(respuestaDelServidor);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return transaccionVacacionAutorizada;
        // return transaccionVacacion;
    }

}
