package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.BajaLaboralEmpleadoModel;
import tfg.backend.models.MotivoBajaModel;
import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.repositories.BajaLaboralEmpleadoRepository;
import tfg.backend.repositories.MotivoBajaRepository;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoEstadoRepository;

@Service
public class BajaLaboralEmpleadoService {

        @Autowired
        private BajaLaboralEmpleadoRepository bajaLaboralEmpleadoRepository;

        @Autowired
        private MotivoBajaRepository motivoBajaRepository;

        @Autowired
        private TipoEstadoRepository tipoEstadoRepository;

        @Autowired
        private PersonaRepository personaRepository;

        public List<Map<String, Object>> getAllBajasLaboralesEmpleados() {
                List<BajaLaboralEmpleadoModel> listaBajasLaboralesEmpleados = bajaLaboralEmpleadoRepository.findAll();
                List<Map<String, Object>> resultado = new ArrayList<>();

                for (BajaLaboralEmpleadoModel bajaLaboralEmpleado : listaBajasLaboralesEmpleados) {
                        Map<String, Object> bajaLaboralEmpleadoMap = bajaLaboralEmpleado.toMap();

                        bajaLaboralEmpleadoMap.put("persona",
                                        bajaLaboralEmpleado.getPersona() != null
                                                        ? bajaLaboralEmpleado.getPersona().toMap()
                                                        : null);

                        bajaLaboralEmpleadoMap.put("motivo_baja",
                                        bajaLaboralEmpleado.getMotivo_baja() != null
                                                        ? bajaLaboralEmpleado.getMotivo_baja().toMap()
                                                        : null);

                        bajaLaboralEmpleadoMap.put("tipo_estado",
                                        bajaLaboralEmpleado.getTipo_estado() != null
                                                        ? bajaLaboralEmpleado.getTipo_estado().toMap()
                                                        : null);

                        resultado.add(bajaLaboralEmpleadoMap);
                }

                return resultado;
        }

        public BajaLaboralEmpleadoModel saveBajaLaboralEmpleado(BajaLaboralEmpleadoModel nuevoBajaLaboralEmpleado) {

                int id_persona = nuevoBajaLaboralEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                nuevoBajaLaboralEmpleado.setPersona(personaEncontrado);
                personaEncontrado.getBajasLaboralesEmpleados().add(nuevoBajaLaboralEmpleado);

                int id_motivo_baja = nuevoBajaLaboralEmpleado.getMotivo_baja().getId_motivo_baja();

                MotivoBajaModel motivoBajaEncontrado = motivoBajaRepository.findById(id_motivo_baja)
                                .orElseThrow(() -> new RuntimeException(
                                                "Motivo baja con id " + id_motivo_baja + " no encontrado"));

                nuevoBajaLaboralEmpleado.setMotivo_baja(motivoBajaEncontrado);
                motivoBajaEncontrado.getBajasLaboralesEmpleados().add(nuevoBajaLaboralEmpleado);

                int id_tipo_estado = nuevoBajaLaboralEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                nuevoBajaLaboralEmpleado.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getBajasLaboralesEmpleados().add(nuevoBajaLaboralEmpleado);

                BajaLaboralEmpleadoModel bajaLaboralEmpleadoGuardado = bajaLaboralEmpleadoRepository
                                .save(nuevoBajaLaboralEmpleado);

                return bajaLaboralEmpleadoGuardado;
        }

        public Map<String, Object> getBajaLaboralEmpleadoById(int idBajaLaboralEmpleado) {
                BajaLaboralEmpleadoModel bajaLaboralEmpleadoEncontrado = bajaLaboralEmpleadoRepository
                                .findById(idBajaLaboralEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Baja laboral empleado con id " + idBajaLaboralEmpleado
                                                                + " no encontrado"));

                Map<String, Object> solicitudMap = bajaLaboralEmpleadoEncontrado.toMap();
                
                solicitudMap.put("persona",
                                bajaLaboralEmpleadoEncontrado.getPersona() != null
                                                ? bajaLaboralEmpleadoEncontrado.getPersona().toMap()
                                                : null);

                solicitudMap.put("motivo_baja",
                                bajaLaboralEmpleadoEncontrado.getMotivo_baja() != null
                                                ? bajaLaboralEmpleadoEncontrado.getMotivo_baja().toMap()
                                                : null);

                solicitudMap.put("tipo_estado",
                                bajaLaboralEmpleadoEncontrado.getTipo_estado() != null
                                                ? bajaLaboralEmpleadoEncontrado.getTipo_estado().toMap()
                                                : null);

                return solicitudMap;
        }

        public BajaLaboralEmpleadoModel updateBajaLaboralEmpleado(BajaLaboralEmpleadoModel cambiosBajaLaboralEmpleado,
                        int idBajaLaboralEmpleado) {

                BajaLaboralEmpleadoModel bajaLaboralEmpleadoExistente = bajaLaboralEmpleadoRepository
                                .findById(idBajaLaboralEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Baja laboral empleado con id " + idBajaLaboralEmpleado
                                                                + " no encontrado"));

                bajaLaboralEmpleadoExistente.setFecha_inicio(cambiosBajaLaboralEmpleado.getFecha_inicio());
                bajaLaboralEmpleadoExistente.setFecha_fin(cambiosBajaLaboralEmpleado.getFecha_fin());
                bajaLaboralEmpleadoExistente.setComentarios(cambiosBajaLaboralEmpleado.getComentarios());

                int id_persona = cambiosBajaLaboralEmpleado.getPersona().getId_persona();

                PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                                .orElseThrow(() -> new RuntimeException(
                                                "Persona con id " + id_persona + " no encontrado"));

                bajaLaboralEmpleadoExistente.getPersona().getBajasLaboralesEmpleados()
                                .remove(bajaLaboralEmpleadoExistente);
                bajaLaboralEmpleadoExistente.setPersona(personaEncontrado);
                personaEncontrado.getBajasLaboralesEmpleados().add(bajaLaboralEmpleadoExistente);

                int id_motivo_baja = cambiosBajaLaboralEmpleado.getMotivo_baja().getId_motivo_baja();

                MotivoBajaModel motivoBajaEncontrado = motivoBajaRepository.findById(id_motivo_baja)
                                .orElseThrow(() -> new RuntimeException(
                                                "Motivo baja con id " + id_motivo_baja + " no encontrado"));

                bajaLaboralEmpleadoExistente.getMotivo_baja().getBajasLaboralesEmpleados()
                                .remove(bajaLaboralEmpleadoExistente);
                bajaLaboralEmpleadoExistente.setMotivo_baja(motivoBajaEncontrado);
                motivoBajaEncontrado.getBajasLaboralesEmpleados().add(bajaLaboralEmpleadoExistente);

                int id_tipo_estado = cambiosBajaLaboralEmpleado.getTipo_estado().getId_tipo_estado();

                TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tipo estado con id " + id_tipo_estado + " no encontrado"));

                bajaLaboralEmpleadoExistente.getTipo_estado().getBajasLaboralesEmpleados()
                                .remove(bajaLaboralEmpleadoExistente);
                bajaLaboralEmpleadoExistente.setTipo_estado(tipoEstadoEncontrado);
                tipoEstadoEncontrado.getBajasLaboralesEmpleados().add(bajaLaboralEmpleadoExistente);

                BajaLaboralEmpleadoModel bajaLaboralEmpleadoActualizado = bajaLaboralEmpleadoRepository
                                .save(bajaLaboralEmpleadoExistente);

                return bajaLaboralEmpleadoActualizado;

        }

        public void deleteBajaLaboralEmpleado(int idBajaLaboralEmpleado) {
                bajaLaboralEmpleadoRepository.findById(idBajaLaboralEmpleado)
                                .orElseThrow(() -> new RuntimeException(
                                                "Baja laboral con id " + idBajaLaboralEmpleado + " no encontrado"));

                bajaLaboralEmpleadoRepository.deleteById(idBajaLaboralEmpleado);
        }

}
