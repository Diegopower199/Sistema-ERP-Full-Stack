package tfg.backend.services;

import java.io.*;
import java.net.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commonclasses.Block;
import commonclasses.MensajeClienteServidor;
import commonclasses.RespuestaServidorCliente;
import commonclasses.TransaccionVacacion;
import tfg.backend.ExcepcionControlada.ConexionServidoresException;
import tfg.backend.ExcepcionControlada.TransaccionVacacionRechazadaException;
import tfg.backend.models.BlockchainInfo;
import tfg.backend.models.VacacionEmpleadoModel;
import tfg.backend.repositories.VacacionEmpleadoRepository;
import tfg.backend.utils.GlobalConstants;

@Service
public class BlockchainVacacionAutorizadaService {

    @Autowired
    private VacacionEmpleadoService vacacionEmpleadoService;

    @Autowired
    private VacacionEmpleadoRepository vacacionEmpleadoRepository;

    public List<Map<String, Object>> getAllTransaccionesVacacionesAutorizadas() throws ConexionServidoresException {
        List<Block> libroTransaccionesVacacionesAutorizadas = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        try (Socket socket = new Socket(GlobalConstants.HOST_BLOCKCHAIN_SERVER, GlobalConstants.PORT_BLOCKCHAIN_SERVER);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("GET ALL", null, null);

            objectOutputStream.writeObject(mensajeAlServidor);

            RespuestaServidorCliente respuestaDelServidor = null;
            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            libroTransaccionesVacacionesAutorizadas = respuestaDelServidor.getLibroTransaccionesVacacionesAutorizadas();
            for (Block transaccionesVacacionesAutorizadas : libroTransaccionesVacacionesAutorizadas) {
                Map<String, Object> transaccionesVacacionesAutorizadasMap = transaccionesVacacionesAutorizadas.toMap();

                resultado.add(transaccionesVacacionesAutorizadasMap);
            }

        } catch (ConnectException ce) {
            throw new ConexionServidoresException("El servidor esta caido", 500);
        } catch (IOException | ClassNotFoundException e) {
            
        }

        return resultado;
    }

    public TransaccionVacacion saveTransaccionVacacionAutorizada(TransaccionVacacion transaccionVacacionAutorizada)
            throws ConexionServidoresException, TransaccionVacacionRechazadaException {

        RespuestaServidorCliente respuestaDelServidor = null;
        try (Socket socket = new Socket(GlobalConstants.HOST_BLOCKCHAIN_SERVER, GlobalConstants.PORT_BLOCKCHAIN_SERVER);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            // Se calcula el hash de la transacción de vacaciones antes de enviarla al
            // servidor para asegura que el hash sea consistente con los datos que se
            // están enviando.
            transaccionVacacionAutorizada
                    .setHashTransaccionVacacion(transaccionVacacionAutorizada.calcularHashTransaccion());

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("ADD", transaccionVacacionAutorizada,
                    null);

            objectOutputStream.writeObject(mensajeAlServidor);

            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            int idVacacionEmpleado = transaccionVacacionAutorizada.getId_vacacion_empleado();

            if (respuestaDelServidor.getCodigo() == 409) {
                BlockchainInfo blockchainInfo = new BlockchainInfo(null, null, null, null, true);
                vacacionEmpleadoService.actualizarVacacionesAutorizadasBlockchain(blockchainInfo, idVacacionEmpleado);

                throw new TransaccionVacacionRechazadaException(respuestaDelServidor.getMensaje(), 409);

            }

            String hashBlock = respuestaDelServidor.getBlockActual().getHashBlock();
            String previousHashBlock = respuestaDelServidor.getBlockActual().getPreviousHashBlock();
            String hashTransaccionVacacion = respuestaDelServidor.getBlockActual().getDataTransaccionVacacion()
                    .getHashTransaccionVacacion();
            String timestampTransaccionVacacion = String
                    .valueOf(respuestaDelServidor.getBlockActual().getDataTransaccionVacacion().getTimestamp());

            BlockchainInfo blockchainInfo = new BlockchainInfo(hashTransaccionVacacion, hashBlock, previousHashBlock,
                    timestampTransaccionVacacion,
                    false);

            vacacionEmpleadoService.actualizarVacacionesAutorizadasBlockchain(blockchainInfo, idVacacionEmpleado);

        } catch (ConnectException ce) {
            throw new ConexionServidoresException("El servidor esta caido", 500);
        } catch (IOException | ClassNotFoundException e) {
            // throw new UnhandledException("Error", 1000);
        }
        return transaccionVacacionAutorizada;
    }

    public List<Map<String, Object>> checkVacacionesAutorizadas() throws ConexionServidoresException {
        List<TransaccionVacacion> listaTransaccionesVacacionesAutorizadas = new ArrayList<>();
        List<Map<String, Object>> resultado = new ArrayList<>();

        RespuestaServidorCliente respuestaDelServidor = null;

        try (Socket socket = new Socket(GlobalConstants.HOST_BLOCKCHAIN_SERVER, GlobalConstants.PORT_BLOCKCHAIN_SERVER);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream())) {

            Optional<List<VacacionEmpleadoModel>> listaVacacionEmpleado = vacacionEmpleadoRepository
                    .findVacacionesGestionadoConBlockchain();

            if (listaVacacionEmpleado.isPresent() == false) {
                return null;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            for (VacacionEmpleadoModel vacacionEmpleado : listaVacacionEmpleado.get()) {

                LocalDate fecha_inicio = vacacionEmpleado.getFecha_inicio();
                LocalDate fecha_fin = vacacionEmpleado.getFecha_fin();

                int id_vacacion_empleado = vacacionEmpleado.getId_vacacion_empleado();
                String fechaInicioString = fecha_inicio.format(formatter);
                String fechaFinString = fecha_fin.format(formatter);
                int dias_disponibles = vacacionEmpleado.getDias_disponibles();
                int dias_pendientes = vacacionEmpleado.getDias_pendientes();
                int dias_solicitados = vacacionEmpleado.getDias_solicitados();
                int dias_disfrutados = vacacionEmpleado.getDias_disfrutados();
                String observacion = vacacionEmpleado.getObservacion();
                String dni = vacacionEmpleado.getPersona().getDni();
                String tipo_estado = vacacionEmpleado.getTipo_estado().getTipo_estado();
                Long timestamp = Long.parseLong(vacacionEmpleado.getTimestamp_transaccion_vacacion());

                TransaccionVacacion transaccionVacacion = new TransaccionVacacion(id_vacacion_empleado,
                        fechaInicioString,
                        fechaFinString, dias_disponibles, dias_pendientes, dias_solicitados, dias_disfrutados,
                        observacion,
                        dni, tipo_estado, timestamp);

                listaTransaccionesVacacionesAutorizadas.add(transaccionVacacion);

            }

            MensajeClienteServidor mensajeAlServidor = new MensajeClienteServidor("CHECK", null,
                    listaTransaccionesVacacionesAutorizadas);

            objectOutputStream.writeObject(mensajeAlServidor);

            respuestaDelServidor = (RespuestaServidorCliente) objectInputStream.readObject();

            if (respuestaDelServidor.getListaVacacionesAutorizadasConInconsistencias().isEmpty() == false) {
                for (TransaccionVacacion transaccionVacacionError : respuestaDelServidor
                        .getListaVacacionesAutorizadasConInconsistencias()) {
                    int idVacacionEmpleado = transaccionVacacionError.getId_vacacion_empleado();

                    BlockchainInfo blockchainInfo = new BlockchainInfo(null, null, null, null, true);
                    vacacionEmpleadoService.actualizarVacacionesAutorizadasBlockchain(blockchainInfo,
                            idVacacionEmpleado);

                    resultado.add(transaccionVacacionError.toMap());

                }

            }

        } catch (ConnectException ce) {
            throw new ConexionServidoresException("El servidor esta caido", 500);
        } catch (IOException | ClassNotFoundException e) {
           
        }

        return resultado;
    }

}
