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
import tfg.backend.ExcepcionControlada.ConexionServidoresException;
import tfg.backend.ExcepcionControlada.TransaccionVacacionRechazadaException;
import tfg.backend.utils.GlobalConstants;

@Service
public class BlockchainVacacionAutorizadaService {

    public List<Map<String, Object>> getAllTransaccionesVacacionesAutorizadas() throws ConexionServidoresException {
        List<Block> libroTransaccionesVacacionesAutorizadas = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        try (Socket socket = new Socket(GlobalConstants.HOST_BLOCKCHAIN_SERVER, GlobalConstants.PORT_BLOCKCHAIN_SERVER);
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
            System.out.println("respuestaDelServidor GET ALL: " + respuestaDelServidor);

        } catch (ConnectException ce) {
            throw new ConexionServidoresException("El servidor esta caido", 500);
        } catch (IOException | ClassNotFoundException e) {
            // e.printStackTrace();
            System.out.println("HAY UN ERROR");
        }

        return resultado;
    }

    public TransaccionVacacion saveTransaccionVacacionAutorizada(TransaccionVacacion transaccionVacacionAutorizada)
            throws ConexionServidoresException, TransaccionVacacionRechazadaException {

        RespuestaServidorCliente respuestaDelServidor = null;
        try (Socket socket = new Socket(GlobalConstants.HOST_BLOCKCHAIN_SERVER, GlobalConstants.PORT_BLOCKCHAIN_SERVER);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("ADD", transaccionVacacionAutorizada);

            objectOutputStream.writeObject(mensajeAlServidor);

            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            System.out.println("respuestaDelServidor SAVE: " + respuestaDelServidor);

            if (respuestaDelServidor.getCodigo() == 409) {
                throw new TransaccionVacacionRechazadaException(respuestaDelServidor.getMensaje(), 409);
            }

        } catch (ConnectException ce) {
            throw new ConexionServidoresException("El servidor esta caido", 500);
        } catch (IOException | ClassNotFoundException e) {
            // throw new UnhandledException("Error", 1000);
        }
        return transaccionVacacionAutorizada;
    }

}