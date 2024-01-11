package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.AyudaEmpleadoModel;
import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoAyudaModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.AyudaEmpleadoRepository;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoAyudaRepository;
import tfg.backend.repositories.TipoEstadoRepository;

@Service
public class AyudaEmpleadoService {

        @Autowired
        private AyudaEmpleadoRepository ayudaEmpleadoRepository;

        @Autowired
        private TipoAyudaRepository tipoAyudaRepository;

        @Autowired
        private TipoEstadoRepository tipoEstadoRepository;

        @Autowired
        private PersonaRepository personaRepository;

        public List<Map<String, Object>> getAllAyudasEmpleados() {
                List<AyudaEmpleadoModel> listaAyudasEmpleados = ayudaEmpleadoRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (AyudaEmpleadoModel ayudaEmpleado : listaAyudasEmpleados) {
                        Map<String, Object> ayudaEmpleadoMap = ayudaEmpleado.toMap();

                        ayudaEmpleadoMap.put("persona",
                                        ayudaEmpleado.getPersona() != null ? ayudaEmpleado.getPersona().toMap() : null);

                        ayudaEmpleadoMap.put("tipo_ayuda",
                                        ayudaEmpleado.getTipo_ayuda() != null ? ayudaEmpleado.getTipo_ayuda().toMap()
                                                        : null);

                        ayudaEmpleadoMap.put("tipo_estado",
                                        ayudaEmpleado.getTipo_estado() != null ? ayudaEmpleado.getTipo_estado().toMap()
                                                        : null);

                        resultado.add(ayudaEmpleadoMap);
                }

                return resultado;
        }

        public AyudaEmpleadoModel saveAyudaEmpleado(AyudaEmpleadoModel nuevoAyudaEmpleado) {

                int id_persona = nuevoAyudaEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                nuevoAyudaEmpleado.setPersona(personaEncontrado);
                personaEncontrado.getAyudasEmpleados().add(nuevoAyudaEmpleado);

                int id_tipo_ayuda = nuevoAyudaEmpleado.getTipo_ayuda().getId_tipo_ayuda();

                TipoAyudaModel tipoAyudaEncontrado = tipoAyudaRepository.findById(id_tipo_ayuda)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo ayuda con id " + id_tipo_ayuda + " no encontrado"));

                nuevoAyudaEmpleado.setTipo_ayuda(tipoAyudaEncontrado);
                tipoAyudaEncontrado.getAyudasEmpleados().add(nuevoAyudaEmpleado);

                int id_tipo_estado = nuevoAyudaEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                nuevoAyudaEmpleado.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getAyudasEmpleados().add(nuevoAyudaEmpleado);

                AyudaEmpleadoModel ayudaEmpleadoGuardado = ayudaEmpleadoRepository.save(nuevoAyudaEmpleado);

                return ayudaEmpleadoGuardado;
        }

        public Map<String, Object> getAyudaEmpleadoById(int idAyudaEmpleado) {
                AyudaEmpleadoModel ayudaEmpleadoEncontrado = ayudaEmpleadoRepository.findById(idAyudaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Ayuda empleado con id " + idAyudaEmpleado + " no encontrado"));

                Map<String, Object> ayudaEmpleadoMap = ayudaEmpleadoEncontrado.toMap();

                ayudaEmpleadoMap.put("persona",
                                ayudaEmpleadoEncontrado.getPersona() != null
                                                ? ayudaEmpleadoEncontrado.getPersona().toMap()
                                                : null);

                ayudaEmpleadoMap.put("tipo_solicitud",
                                ayudaEmpleadoEncontrado.getTipo_ayuda() != null
                                                ? ayudaEmpleadoEncontrado.getTipo_ayuda().toMap()
                                                : null);

                ayudaEmpleadoMap.put("tipo_estado",
                                ayudaEmpleadoEncontrado.getTipo_estado() != null
                                                ? ayudaEmpleadoEncontrado.getTipo_estado().toMap()
                                                : null);

                return ayudaEmpleadoMap;
        }

        public AyudaEmpleadoModel updateAyudaEmpleado(AyudaEmpleadoModel cambiosAyudaEmpleado, int idAyudaEmpleado) {

                AyudaEmpleadoModel ayudaEmpleadoExistente = ayudaEmpleadoRepository.findById(idAyudaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Ayuda empleado con id " + idAyudaEmpleado + " no encontrado"));

                ayudaEmpleadoExistente.setFecha_inicio(cambiosAyudaEmpleado.getFecha_inicio());
                ayudaEmpleadoExistente.setFecha_fin(cambiosAyudaEmpleado.getFecha_fin());
                ayudaEmpleadoExistente.setValor_asociado(cambiosAyudaEmpleado.getValor_asociado());

                int id_persona = cambiosAyudaEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                ayudaEmpleadoExistente.getPersona().getAyudasEmpleados().remove(ayudaEmpleadoExistente);
                ayudaEmpleadoExistente.setPersona(personaEncontrado);
                personaEncontrado.getAyudasEmpleados().add(ayudaEmpleadoExistente);

                int id_tipo_ayuda = cambiosAyudaEmpleado.getTipo_ayuda().getId_tipo_ayuda();

                TipoAyudaModel tipoAyudaEncontrado = tipoAyudaRepository.findById(id_tipo_ayuda)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo ayuda con id " + id_tipo_ayuda + " no encontrado"));

                ayudaEmpleadoExistente.getTipo_ayuda().getAyudasEmpleados().remove(ayudaEmpleadoExistente);
                ayudaEmpleadoExistente.setTipo_ayuda(tipoAyudaEncontrado);
                tipoAyudaEncontrado.getAyudasEmpleados().add(ayudaEmpleadoExistente);

                int id_tipo_estado = cambiosAyudaEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                ayudaEmpleadoExistente.getTipo_estado().getAyudasEmpleados().remove(ayudaEmpleadoExistente);
                ayudaEmpleadoExistente.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getAyudasEmpleados().add(ayudaEmpleadoExistente);

                AyudaEmpleadoModel ayudaEmpleadoActualizado = ayudaEmpleadoRepository.save(ayudaEmpleadoExistente);

                return ayudaEmpleadoActualizado;

        }

        public void deleteAyudaEmpleado(int idAyudaEmpleado) {
                ayudaEmpleadoRepository.findById(idAyudaEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Ayuda empleado con id " + idAyudaEmpleado + " no encontrado"));

                ayudaEmpleadoRepository.deleteById(idAyudaEmpleado);
        }
}
