package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.AsistenciaEmpleadoModel;
import tfg.backend.models.PersonaModel;
import tfg.backend.repositories.AsistenciaEmpleadoRepository;
import tfg.backend.repositories.PersonaRepository;

@Service
public class AsistenciaEmpleadoService {

        @Autowired
        private AsistenciaEmpleadoRepository asistenciaEmpleadoRepository;

        @Autowired
        private PersonaRepository personaRepository;

        public List<Map<String, Object>> getAllAsistenciasEmpleados() {
                List<AsistenciaEmpleadoModel> listaAsistenciasEmpleados = asistenciaEmpleadoRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (AsistenciaEmpleadoModel asistenciaEmpleado : listaAsistenciasEmpleados) {
                        Map<String, Object> asistenciaEmpleadoMap = asistenciaEmpleado.toMap();
                        asistenciaEmpleadoMap.put("persona",
                                        asistenciaEmpleado.getPersona() != null
                                                        ? asistenciaEmpleado.getPersona().toMap()
                                                        : null);

                        resultado.add(asistenciaEmpleadoMap);
                }

                return resultado;
        }

        public AsistenciaEmpleadoModel saveAsistenciaEmpleado(AsistenciaEmpleadoModel nuevoAsistenciaEmpleado) {

                int id_persona = nuevoAsistenciaEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                nuevoAsistenciaEmpleado.setPersona(personaEncontrado);
                personaEncontrado.getAsistenciasEmpleados().add(nuevoAsistenciaEmpleado);

                if (asistenciaEmpleadoRepository.existsByPersonaAndFecha_AsistenciaEmpleado(personaEncontrado,
                                nuevoAsistenciaEmpleado.getFecha())) {
                        throw new RuntimeException("La persona con id " + id_persona
                                        + " ya tiene una asistencia en esta fecha");
                }

                AsistenciaEmpleadoModel asistenciaEmpleadoGuardado = asistenciaEmpleadoRepository
                                .save(nuevoAsistenciaEmpleado);

                return asistenciaEmpleadoGuardado;
        }

        public Map<String, Object> getAsistenciaEmpleadoById(int idAsistenciaEmpleado) {
                AsistenciaEmpleadoModel asistenciaEmpleadoEncontrado = asistenciaEmpleadoRepository
                                .findById(idAsistenciaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Asistencia empleado con id " + idAsistenciaEmpleado
                                                                + " no encontrado"));

                Map<String, Object> asistenciaEmpleadoMap = asistenciaEmpleadoEncontrado.toMap();
                asistenciaEmpleadoMap.put("persona",
                                asistenciaEmpleadoEncontrado.getPersona() != null
                                                ? asistenciaEmpleadoEncontrado.getPersona().toMap()
                                                : null);

                return asistenciaEmpleadoMap;
        }

        public AsistenciaEmpleadoModel updateAsistenciaEmpleado(AsistenciaEmpleadoModel cambiosAsistenciaEmpleado,
                        int idAsistenciaEmpleado) {

                AsistenciaEmpleadoModel asistenciaEmpleadoExistente = asistenciaEmpleadoRepository
                                .findById(idAsistenciaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Asistencia empleado con id " + idAsistenciaEmpleado
                                                                + " no encontrado"));

                asistenciaEmpleadoExistente.setFecha(cambiosAsistenciaEmpleado.getFecha());
                asistenciaEmpleadoExistente.setHora_entrada(cambiosAsistenciaEmpleado.getHora_entrada());
                asistenciaEmpleadoExistente.setHora_salida(cambiosAsistenciaEmpleado.getHora_salida());
                asistenciaEmpleadoExistente
                                .setTotal_horas_trabajadas(cambiosAsistenciaEmpleado.getTotal_horas_trabajadas());

                int id_persona = cambiosAsistenciaEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                asistenciaEmpleadoExistente.getPersona().getAsistenciasEmpleados().remove(asistenciaEmpleadoExistente);

                asistenciaEmpleadoExistente.setPersona(personaEncontrado);
                personaEncontrado.getAsistenciasEmpleados().add(asistenciaEmpleadoExistente);

                AsistenciaEmpleadoModel asistenciaEmpleadoActualizado = asistenciaEmpleadoRepository
                                .save(asistenciaEmpleadoExistente);

                return asistenciaEmpleadoActualizado;

        }

        public void deleteAsistenciaEmpleado(int idAsistenciaEmpleado) {
                asistenciaEmpleadoRepository.findById(idAsistenciaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Asistencia empleado con id " + idAsistenciaEmpleado
                                                                + " no encontrado"));

                asistenciaEmpleadoRepository.deleteById(idAsistenciaEmpleado);
        }
}
