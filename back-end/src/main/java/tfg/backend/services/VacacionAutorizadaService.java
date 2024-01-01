package tfg.backend.services;

import java.io.*;
import java.net.*;
import java.time.LocalDate;
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
public class VacacionAutorizadaService {

    public List<Map<String, Object>> getAllVacacionesEmpleados() {
        List<Block> libroVacaciones = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        try (Socket socket = new Socket("localhost", 12345);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("GET ALL", null);

            objectOutputStream.writeObject(mensajeAlServidor);

            // Recibir la respuesta del servidor
            RespuestaServidorCliente respuestaDelServidor = null;
            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();
            
            libroVacaciones = respuestaDelServidor.getLibroVacaciones();
            for (Block vacacion : libroVacaciones) {
                Map<String, Object> libroVacacionMap = vacacion.toMap();
                
                resultado.add(libroVacacionMap);
            }
            System.out.println(respuestaDelServidor);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public TransaccionVacacion saveVacacionAutorizada(TransaccionVacacion transaccionVacacion) {
        try (Socket socket = new Socket("localhost", 12345);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("ADD", transaccionVacacion);

            objectOutputStream.writeObject(mensajeAlServidor);

            // Recibir la respuesta del servidor
            RespuestaServidorCliente respuestaDelServidor = null;
            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            System.out.println(respuestaDelServidor);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return transaccionVacacion;
        // return transaccionVacacion;
    }

}
