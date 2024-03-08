package tfg.backend.services;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        List<VacacionEmpleadoModel> listaVacacionEmpleado = vacacionEmpleadoRepository.findAllOrderedById();
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

        if (nuevoVacacionEmpleado.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getPersona().getDni() == null) {
            throw new RuntimeException("El campo 'dni' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getTipo_estado() == null) {
            throw new RuntimeException("El objeto 'tipo_estado' no puede ser null");
        }

        if (nuevoVacacionEmpleado.getTipo_estado().getId_tipo_estado() == 0) {
            throw new RuntimeException("El campo 'id_tipo_estado' no puede ser 0");
        }

        // En el front estas variables no las tiene que poner el usuario:
        // dias_disponibles, dias_disfrutados, dias_restantes
        String dniPersona = nuevoVacacionEmpleado.getPersona().getDni();

        PersonaModel personaEncontrado = personaRepository.findByDni(dniPersona)
                .orElseThrow(() -> new RuntimeException("Persona con dni " + dniPersona + " no encontrado"));

        TipoEstadoModel tipoEstadoAceptada = new TipoEstadoModel();
        tipoEstadoAceptada.setId_tipo_estado(2);

        Optional<VacacionEmpleadoModel> ultimaVacacionEmpleado = vacacionEmpleadoRepository
                .findUltimaVacacionAceptada(personaEncontrado, tipoEstadoAceptada);

        int diasSolicitadosCalculado = (int) ChronoUnit.DAYS.between(nuevoVacacionEmpleado.getFecha_inicio(),
                nuevoVacacionEmpleado.getFecha_fin()) + 1;

        // Imprimir el resultado
        System.out.println("\n\n\n\n\n\nNúmero de días entre " + nuevoVacacionEmpleado.getFecha_inicio() + " y "
                + nuevoVacacionEmpleado.getFecha_fin() + ": " + diasSolicitadosCalculado + "\n\n\n\n\n");

        if (ultimaVacacionEmpleado.isEmpty()) {
            nuevoVacacionEmpleado.setDias_disponibles(30);
            nuevoVacacionEmpleado.setDias_pendientes(0);
            nuevoVacacionEmpleado.setDias_disfrutados(0);
            nuevoVacacionEmpleado.setDias_solicitados(diasSolicitadosCalculado);
        } else {
            nuevoVacacionEmpleado.setDias_disponibles(ultimaVacacionEmpleado.get().getDias_disponibles());
            nuevoVacacionEmpleado.setDias_pendientes(ultimaVacacionEmpleado.get().getDias_pendientes());
            nuevoVacacionEmpleado.setDias_solicitados(diasSolicitadosCalculado);
            nuevoVacacionEmpleado.setDias_disfrutados(ultimaVacacionEmpleado.get().getDias_disfrutados());
        }

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

        // return nuevoVacacionEmpleado;
    }

    public Map<String, Object> getVacacionEmpleadoById(int idVacacionEmpleado) {
        VacacionEmpleadoModel vacacionEmpleadoEncontrado = vacacionEmpleadoRepository.findById(idVacacionEmpleado)
                .orElseThrow(() -> new RuntimeException(
                        "Vacacion empleado con id " + idVacacionEmpleado + " no encontrado"));

        Map<String, Object> vacacionEmpleadoMap = vacacionEmpleadoEncontrado.toMap();

        vacacionEmpleadoMap.put("persona",
                vacacionEmpleadoEncontrado.getPersona() != null ? vacacionEmpleadoEncontrado.getPersona().toMap()
                        : null);

        vacacionEmpleadoMap.put("tipo_estado", vacacionEmpleadoEncontrado.getTipo_estado() != null
                ? vacacionEmpleadoEncontrado.getTipo_estado().toMap()
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

        if (cambiosVacacionEmpleado.getPersona() == null) {
            throw new RuntimeException("El objeto 'persona' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getPersona().getDni() == null) {
            throw new RuntimeException("El campo 'dni' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getTipo_estado() == null) {
            throw new RuntimeException("El objeto 'tipo_estado' no puede ser null");
        }

        if (cambiosVacacionEmpleado.getTipo_estado().getId_tipo_estado() == 0) {
            throw new RuntimeException("El campo 'id_tipo_estado' no puede ser 0");
        }

        String dniPersona = cambiosVacacionEmpleado.getPersona().getDni();

        PersonaModel personaEncontrado = personaRepository.findByDni(dniPersona)
                .orElseThrow(() -> new RuntimeException("Persona con dni " + dniPersona + " no encontrado"));
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
                && !vacacionEmpleadoExistente.getFecha_fin().equals(cambiosVacacionEmpleado.getFecha_fin())) {
            if (vacacionEmpleadoRepository.existsByPersonaAndFecha_inicioAndFecha_fin(personaEncontrado,
                    cambiosVacacionEmpleado.getFecha_inicio(), cambiosVacacionEmpleado.getFecha_fin())) {
                throw new RuntimeException("Solapamiento de fechas");
            }

            vacacionEmpleadoExistente.setFecha_inicio(cambiosVacacionEmpleado.getFecha_inicio());
            vacacionEmpleadoExistente.setFecha_fin(cambiosVacacionEmpleado.getFecha_fin());
        }

        TipoEstadoModel tipoEstadoAceptada = new TipoEstadoModel();
        tipoEstadoAceptada.setId_tipo_estado(2);

        Optional<VacacionEmpleadoModel> ultimaVacacionEmpleado = vacacionEmpleadoRepository
                .findUltimaVacacionAceptada(personaEncontrado, tipoEstadoAceptada);

        int diasSolicitadosCalculado = (int) ChronoUnit.DAYS.between(cambiosVacacionEmpleado.getFecha_inicio(),
                cambiosVacacionEmpleado.getFecha_fin()) + 1;

        // Imprimir el resultado
        System.out.println("\n\n\n\n\n\nNúmero de días entre " + cambiosVacacionEmpleado.getFecha_inicio() + " y "
                + cambiosVacacionEmpleado.getFecha_fin() + ": " + diasSolicitadosCalculado + "\n\n\n\n\n");

        if (tipoEstadoEncontrado.getTipo_estado().equals("Aprobada")) {
            vacacionEmpleadoExistente.setTipo_estado(tipoEstadoEncontrado);

            if (ultimaVacacionEmpleado.isEmpty()) {
                vacacionEmpleadoExistente.setDias_disponibles(
                        vacacionEmpleadoExistente.getDias_disponibles() - diasSolicitadosCalculado);
                vacacionEmpleadoExistente.setDias_pendientes(diasSolicitadosCalculado);
                vacacionEmpleadoExistente.setDias_disfrutados(0);
                vacacionEmpleadoExistente.setDias_solicitados(diasSolicitadosCalculado);
            } else { // TODO TAMBIEN TENGO QUE CALCULARLO, Y ADEMAS EN DIAS DISFRUTADOS CONTROLAR
                vacacionEmpleadoExistente.setDias_disfrutados(ultimaVacacionEmpleado.get().getDias_disfrutados());
                vacacionEmpleadoExistente.setDias_pendientes(
                        ultimaVacacionEmpleado.get().getDias_pendientes() + diasSolicitadosCalculado);
                vacacionEmpleadoExistente.setDias_solicitados(diasSolicitadosCalculado);
                vacacionEmpleadoExistente.setDias_disponibles(
                        ultimaVacacionEmpleado.get().getDias_disponibles() - diasSolicitadosCalculado);
            }
        }

        vacacionEmpleadoExistente.setObservacion(cambiosVacacionEmpleado.getObservacion());

        VacacionEmpleadoModel vacacionEmpleadoActualizado = vacacionEmpleadoRepository.save(vacacionEmpleadoExistente);

        return vacacionEmpleadoActualizado;

    }

    public void deleteVacacionEmpleado(int idVacacionEmpleado) {
        vacacionEmpleadoRepository.findById(idVacacionEmpleado).orElseThrow(
                () -> new RuntimeException("Vacacion empleado con id " + idVacacionEmpleado + " no encontrado"));

        vacacionEmpleadoRepository.deleteById(idVacacionEmpleado);
    }

}
