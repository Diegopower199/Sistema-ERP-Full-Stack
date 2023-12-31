package tfg.backend.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.SolicitudEmpleadoModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.models.TipoSolicitudModel;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.SolicitudEmpleadoRepository;
import tfg.backend.repositories.TipoEstadoRepository;
import tfg.backend.repositories.TipoSolicitudRepository;



@Service
public class SolicitudEmpleadoService {
        @Autowired
        private SolicitudEmpleadoRepository solicitudEmpleadoRepository;

        @Autowired
        private TipoSolicitudRepository tipoSolicitudRepository;

        @Autowired
        private TipoEstadoRepository tipoEstadoRepository;

        @Autowired
        private PersonaRepository personaRepository;

        public List<Map<String, Object>> getAllSolicitudesEmpleados() {
                List<SolicitudEmpleadoModel> listaSolicitudesEmpleados = solicitudEmpleadoRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (SolicitudEmpleadoModel solicitudEmpleado : listaSolicitudesEmpleados) {
                        Map<String, Object> solicitudEmpleadoMap = solicitudEmpleado.toMap();
                        solicitudEmpleadoMap.put("persona",
                                        solicitudEmpleado.getPersona() != null ? solicitudEmpleado.getPersona().toMap()
                                                        : null);

                        solicitudEmpleadoMap.put("tipo_solicitud",
                                        solicitudEmpleado.getTipo_solicitud() != null
                                                        ? solicitudEmpleado.getTipo_solicitud().toMap()
                                                        : null);

                        solicitudEmpleadoMap.put("tipo_estado",
                                        solicitudEmpleado.getTipo_estado() != null
                                                        ? solicitudEmpleado.getTipo_estado().toMap()
                                                        : null);

                        resultado.add(solicitudEmpleadoMap);
                }

                return resultado;
        }

        public SolicitudEmpleadoModel saveSolicitudEmpleado(SolicitudEmpleadoModel nuevoSolicitudEmpleado) {

                int id_persona = nuevoSolicitudEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                nuevoSolicitudEmpleado.setPersona(personaEncontrado);
                personaEncontrado.getSolicitudesEmpleados().add(nuevoSolicitudEmpleado);

                int id_tipo_solicitud = nuevoSolicitudEmpleado.getTipo_solicitud().getId_tipo_solicitud();

                TipoSolicitudModel tipoSolicitudEncontrado = tipoSolicitudRepository.findById(id_tipo_solicitud)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo solicitud con id " + id_tipo_solicitud + " no encontrado"));

                nuevoSolicitudEmpleado.setTipo_solicitud(tipoSolicitudEncontrado);
                tipoSolicitudEncontrado.getSolicitudesEmpleados().add(nuevoSolicitudEmpleado);

                int id_tipo_estado = nuevoSolicitudEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                nuevoSolicitudEmpleado.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getSolicitudesEmpleados().add(nuevoSolicitudEmpleado);

                if (solicitudEmpleadoRepository.existsByPersonaAndFecha_solicitud(personaEncontrado,
                                nuevoSolicitudEmpleado.getFecha_solicitud())) {
                        throw new RuntimeException(
                                        "La persona con id " + id_persona
                                                        + " ya tiene una solicitud en esta fecha");
                }

                SolicitudEmpleadoModel solicitudEmpleadoGuardado = solicitudEmpleadoRepository
                                .save(nuevoSolicitudEmpleado);

                return solicitudEmpleadoGuardado;
        }

        public Map<String, Object> getSolicitudEmpleadoById(int idSolicitudEmpleado) {
                SolicitudEmpleadoModel solicitudEncontrado = solicitudEmpleadoRepository.findById(idSolicitudEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Solicitud empleado con id " + idSolicitudEmpleado + " no encontrado"));

                Map<String, Object> solicitudMap = solicitudEncontrado.toMap();
                solicitudMap.put("persona",
                                solicitudEncontrado.getPersona() != null ? solicitudEncontrado.getPersona().toMap()
                                                : null);

                solicitudMap.put("tipo_solicitud",
                                solicitudEncontrado.getTipo_solicitud() != null
                                                ? solicitudEncontrado.getTipo_solicitud().toMap()
                                                : null);

                solicitudMap.put("tipo_estado",
                                solicitudEncontrado.getTipo_estado() != null
                                                ? solicitudEncontrado.getTipo_estado().toMap()
                                                : null);

                return solicitudMap;
        }

        public SolicitudEmpleadoModel updateSolicitudEmpleado(SolicitudEmpleadoModel cambiosSolicitudEmpleado,
                        int idSolicitud) {

                SolicitudEmpleadoModel solicitudEmpleadoExistente = solicitudEmpleadoRepository.findById(idSolicitud)
                                .orElseThrow(() -> new RuntimeException(
                                                "Solicitud empleado con id " + idSolicitud + " no encontrado"));

                solicitudEmpleadoExistente.setComentarios(cambiosSolicitudEmpleado.getComentarios());

                int id_persona = cambiosSolicitudEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                solicitudEmpleadoExistente.getPersona().getSolicitudesEmpleados().remove(solicitudEmpleadoExistente);

                solicitudEmpleadoExistente.setPersona(personaEncontrado);
                personaEncontrado.getSolicitudesEmpleados().add(solicitudEmpleadoExistente);

                if (!solicitudEmpleadoExistente.getFecha_solicitud()
                                .equals(cambiosSolicitudEmpleado.getFecha_solicitud())) {
                        if (solicitudEmpleadoRepository.existsByPersonaAndFecha_solicitud(personaEncontrado,
                                        cambiosSolicitudEmpleado.getFecha_solicitud())) {
                                throw new RuntimeException(
                                                "La persona con id " + personaEncontrado.getId_persona()
                                                                + " ya tiene una solicitud en esta fecha");
                        }
                        solicitudEmpleadoExistente.setFecha_solicitud(cambiosSolicitudEmpleado.getFecha_solicitud());
                }

                int id_tipo_solicitud = cambiosSolicitudEmpleado.getTipo_solicitud().getId_tipo_solicitud();

                TipoSolicitudModel tipoSolicitudEncontrado = tipoSolicitudRepository.findById(id_tipo_solicitud)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo solicitud con id " + id_tipo_solicitud + " no encontrado"));

                solicitudEmpleadoExistente.getTipo_solicitud().getSolicitudesEmpleados()
                                .remove(solicitudEmpleadoExistente);

                solicitudEmpleadoExistente.setTipo_solicitud(tipoSolicitudEncontrado);
                tipoSolicitudEncontrado.getSolicitudesEmpleados().add(cambiosSolicitudEmpleado);

                int id_tipo_estado = cambiosSolicitudEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                solicitudEmpleadoExistente.getTipo_estado().getSolicitudesEmpleados()
                                .remove(solicitudEmpleadoExistente);

                solicitudEmpleadoExistente.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getSolicitudesEmpleados().add(cambiosSolicitudEmpleado);

                SolicitudEmpleadoModel solicitudActualizado = solicitudEmpleadoRepository
                                .save(solicitudEmpleadoExistente);

                return solicitudActualizado;

        }

        public void deleteSolicitudEmpleado(int idSolicitudEmpleado) {
                solicitudEmpleadoRepository.findById(idSolicitudEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Solicitud empleado con id " + idSolicitudEmpleado + " no encontrado"));

                solicitudEmpleadoRepository.deleteById(idSolicitudEmpleado);
        }

}

