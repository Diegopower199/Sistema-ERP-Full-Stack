package tfg.backend.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.PersonaModel;
import tfg.backend.models.TipoEstadoModel;
import tfg.backend.models.VacacionEmpleadoModel;
import tfg.backend.repositories.PersonaRepository;
import tfg.backend.repositories.TipoEstadoRepository;
import tfg.backend.repositories.VacacionEmpleadoRepository;



@Service
public class VacacionEmpleadoService {

    @Autowired
    private VacacionEmpleadoRepository vacacionEmpleadoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private TipoEstadoRepository tipoEstadoRepository;

    public List<Map<String, Object>> getAllVacacionesEmpleados() {
        List<VacacionEmpleadoModel> listaVacacionEmpleado = vacacionEmpleadoRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (VacacionEmpleadoModel vacacionEmpleado : listaVacacionEmpleado) {
            Map<String, Object> vacacionEmpleadoMap = vacacionEmpleado.toMap();
            vacacionEmpleadoMap.put("persona",
                    vacacionEmpleado.getPersona() != null ? vacacionEmpleado.getPersona().toMap() : null);

            vacacionEmpleadoMap.put("tipo_estado",
                    vacacionEmpleado.getTipo_estado() != null ? vacacionEmpleado.getTipo_estado().toMap() : null);

            resultado.add(vacacionEmpleadoMap);
        }

        return resultado;
    }

    public VacacionEmpleadoModel saveVacacionEmpleado(VacacionEmpleadoModel nuevoVacacionEmpleado) {

        if (nuevoVacacionEmpleado.getFecha_inicio() == null) {
            throw new RuntimeException("El campo 'fecha_inicio' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getFecha_fin() == null) {
            throw new RuntimeException("El campo 'fecha_finalizacion' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getDias_solicitados() == 0) {
            throw new RuntimeException("El campo 'dias_solicitados' no puede ser 0");
        }

        if (nuevoVacacionEmpleado.getDias_disfrutados() == 0) {
            throw new RuntimeException("El campo 'dias_disfrutados' no puede ser 0");
        }

        if (nuevoVacacionEmpleado.getDias_restantes() == 0) {
            throw new RuntimeException("El campo 'dias_restantes' no puede ser 0");
        }

        if (nuevoVacacionEmpleado.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getPersona().getId_persona() == 0) {
            throw new RuntimeException("El campo 'id_persona' no puede ser 0");
        }

        if (nuevoVacacionEmpleado.getTipo_estado() == null) {
            throw new RuntimeException("El objeto 'tipo_estado' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getTipo_estado().getId_tipo_estado() == 0) {
            throw new RuntimeException("El campo 'id_tipo_estado' no puede ser 0");
        }

        // En el front estas variables no las tiene que poner el usuario:
        // dias_disponibles, dias_disfrutados, dias_restantes
        int id_persona = nuevoVacacionEmpleado.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + id_persona + " no encontrado"));

        nuevoVacacionEmpleado.setPersona(personaEncontrado);
        personaEncontrado.getVacacionesEmpleados().add(nuevoVacacionEmpleado);

        int id_tipo_estado = nuevoVacacionEmpleado.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        nuevoVacacionEmpleado.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getVacacionesEmpleados().add(nuevoVacacionEmpleado);

        if (vacacionEmpleadoRepository.existsByPersonaAndFecha_inicioAndFecha_fin(personaEncontrado,
                nuevoVacacionEmpleado.getFecha_inicio(), nuevoVacacionEmpleado.getFecha_fin())) {
            throw new RuntimeException("Solapamiento de fechas");
        }

        VacacionEmpleadoModel vacacionEmpleadoGuardado = vacacionEmpleadoRepository.save(nuevoVacacionEmpleado);

        return vacacionEmpleadoGuardado;
    }

    public Map<String, Object> getVacacionEmpleadoById(int idVacacionEmpleado) {
        VacacionEmpleadoModel VacacionEmpleadoEncontrado = vacacionEmpleadoRepository.findById(idVacacionEmpleado)
                .orElseThrow(() -> new RuntimeException(
                        "Vacacion empleado con id " + idVacacionEmpleado + " no encontrado"));

        Map<String, Object> vacacionEmpleadoMap = VacacionEmpleadoEncontrado.toMap();
        vacacionEmpleadoMap.put("persona",
                VacacionEmpleadoEncontrado.getPersona() != null ? VacacionEmpleadoEncontrado.getPersona().toMap()
                        : null);

        vacacionEmpleadoMap.put("tipo_estado",
                VacacionEmpleadoEncontrado.getTipo_estado() != null
                        ? VacacionEmpleadoEncontrado.getTipo_estado().toMap()
                        : null);

        return vacacionEmpleadoMap;
    }

    public VacacionEmpleadoModel updateVacacionEmpleado(VacacionEmpleadoModel cambiosVacacionEmpleado,
            int idVacacionEmpleado) {
        VacacionEmpleadoModel vacacionEmpleadoExistente = vacacionEmpleadoRepository.findById(idVacacionEmpleado)
                .orElseThrow(() -> new RuntimeException(
                        "Vacacion empleado con id " + idVacacionEmpleado + " no encontrado"));

        if (cambiosVacacionEmpleado.getFecha_inicio() == null) {
            throw new RuntimeException("El campo 'fecha_inicio' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getFecha_fin() == null) {
            throw new RuntimeException("El campo 'fecha_finalizacion' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getDias_solicitados() == 0) {
            throw new RuntimeException("El campo 'dias_disponibles' no puede ser 0");
        }

        if (cambiosVacacionEmpleado.getDias_disfrutados() == 0) {
            throw new RuntimeException("El campo 'dias_disfrutados' no puede ser 0");
        }

        if (cambiosVacacionEmpleado.getDias_restantes() == 0) {
            throw new RuntimeException("El campo 'dias_restantes' no puede ser 0");
        }

        if (cambiosVacacionEmpleado.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getPersona().getId_persona() == 0) {
            throw new RuntimeException("El campo 'id_persona' no puede ser 0");
        }

        if (cambiosVacacionEmpleado.getTipo_estado() == null) {
            throw new RuntimeException("El objeto 'tipo_estado' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getTipo_estado().getId_tipo_estado() == 0) {
            throw new RuntimeException("El campo 'id_tipo_estado' no puede ser 0");
        }

        vacacionEmpleadoExistente.setDias_disfrutados(cambiosVacacionEmpleado.getDias_disfrutados());
        vacacionEmpleadoExistente.setDias_solicitados(cambiosVacacionEmpleado.getDias_solicitados());
        vacacionEmpleadoExistente.setDias_restantes(cambiosVacacionEmpleado.getDias_restantes());
        vacacionEmpleadoExistente.setComentarios(cambiosVacacionEmpleado.getComentarios());

        int id_persona = cambiosVacacionEmpleado.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException("Persona con id " + id_persona + " no encontrado"));

        vacacionEmpleadoExistente.getPersona().getVacacionesEmpleados().remove(vacacionEmpleadoExistente);

        vacacionEmpleadoExistente.setPersona(personaEncontrado);
        personaEncontrado.getVacacionesEmpleados().add(vacacionEmpleadoExistente);

        int id_tipo_estado = cambiosVacacionEmpleado.getTipo_estado().getId_tipo_estado();

        TipoEstadoModel tipoEstadoEncontrado = tipoEstadoRepository.findById(id_tipo_estado)
                .orElseThrow(() -> new RuntimeException("Tipo estado con id " + id_tipo_estado + " no encontrado"));

        vacacionEmpleadoExistente.getTipo_estado().getVacacionesEmpleados().remove(vacacionEmpleadoExistente);

        vacacionEmpleadoExistente.setTipo_estado(tipoEstadoEncontrado);
        tipoEstadoEncontrado.getVacacionesEmpleados().add(vacacionEmpleadoExistente);

        if (!vacacionEmpleadoExistente.getFecha_inicio().equals(cambiosVacacionEmpleado.getFecha_inicio())
                && !vacacionEmpleadoExistente.getFecha_fin()
                        .equals(cambiosVacacionEmpleado.getFecha_fin())) {
            if (vacacionEmpleadoRepository.existsByPersonaAndFecha_inicioAndFecha_fin(personaEncontrado,
                    cambiosVacacionEmpleado.getFecha_inicio(), cambiosVacacionEmpleado.getFecha_fin())) {
                throw new RuntimeException("Solapamiento de fechas");
            }
            vacacionEmpleadoExistente.setFecha_inicio(cambiosVacacionEmpleado.getFecha_inicio());
            vacacionEmpleadoExistente.setFecha_fin(cambiosVacacionEmpleado.getFecha_fin());
        }

        VacacionEmpleadoModel vacacionEmpleadoActualizado = vacacionEmpleadoRepository.save(vacacionEmpleadoExistente);

        return vacacionEmpleadoActualizado;

    }

    public void deleteVacacionEmpleado(int idVacacionEmpleado) {
        vacacionEmpleadoRepository.findById(idVacacionEmpleado)
                .orElseThrow(() -> new RuntimeException(
                        "Vacacion empleado con id " + idVacacionEmpleado + " no encontrado"));

        vacacionEmpleadoRepository.deleteById(idVacacionEmpleado);
    }

}
