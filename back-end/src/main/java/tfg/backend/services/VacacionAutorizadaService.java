package tfg.backend.services;

import java.io.*;
import java.net.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import tfg.backend.clasesComunBackendAndBlockchain.MensajeClienteServidor;
import tfg.backend.clasesComunBackendAndBlockchain.RespuestaServidorCliente;
import tfg.backend.clasesComunBackendAndBlockchain.TransaccionVacacion;
import tfg.backend.models.VacacionEmpleadoModel;

// Propósito: Contiene la lógica de negocio relacionada con las operaciones de vacaciones autorizadas.

@Service
public class VacacionAutorizadaService {

    public List<Map<String, Object>> getAllVacacionesEmpleados() {
        List<VacacionEmpleadoModel> listaVacacionEmpleado = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public TransaccionVacacion saveVacacionAutorizada(TransaccionVacacion transaccionVacacion) {
        try (Socket socket = new Socket("localhost", 12345);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + transaccionVacacion);

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("siuuuu", transaccionVacacion);

            System.out.println("NO HAY ERROR" + transaccionVacacion);
            objectOutputStream.writeObject(mensajeAlServidor);

            // Recibir la respuesta del servidor

            // Recibir la respuesta del servidor
            RespuestaServidorCliente respuestaDelServidor = null;
            try {
                respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();
            } catch (ClassNotFoundException e) {
                System.out.println("ERROR");
                // e.printStackTrace();
            }
            System.out.println(respuestaDelServidor);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return transaccionVacacion;
        // return transaccionVacacion;
    }

}
