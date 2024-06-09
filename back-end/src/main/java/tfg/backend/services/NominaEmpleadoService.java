package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.NominaEmpleadoModel;
import tfg.backend.models.PersonaModel;
import tfg.backend.repositories.NominaEmpleadoRepository;
import tfg.backend.repositories.PersonaRepository;

@Service
public class NominaEmpleadoService {

    @Autowired
    private NominaEmpleadoRepository nominaEmpleadoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public List<Map<String, Object>> getAllNominasEmpleados() {
        List<NominaEmpleadoModel> listaNominasEmpleados = nominaEmpleadoRepository.findAllOrderedById();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (NominaEmpleadoModel nominaEmpleado : listaNominasEmpleados) {
            Map<String, Object> nominaEmpleadoMap = nominaEmpleado.toMap();

            nominaEmpleadoMap.put("persona",
                    nominaEmpleado.getPersona() != null ? nominaEmpleado.getPersona().toMap() : null);

            resultado.add(nominaEmpleadoMap);
        }

        return resultado;
    }

    public NominaEmpleadoModel saveNominaEmpleado(NominaEmpleadoModel nuevoNominaEmpleado) {

        int id_persona = nuevoNominaEmpleado.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException(
                        "Persona con id " + id_persona + " no encontrado"));

        nuevoNominaEmpleado.setPersona(personaEncontrado);
        personaEncontrado.getNominasEmpleados().add(nuevoNominaEmpleado);

        NominaEmpleadoModel nominaEmpleadoGuardado = nominaEmpleadoRepository
                .save(nuevoNominaEmpleado);

        return nominaEmpleadoGuardado;
    }

    public Map<String, Object> getNominaEmpleadoById(int idNominaEmpleado) {
        NominaEmpleadoModel nominaEmpleadoEncontrado = nominaEmpleadoRepository.findById(idNominaEmpleado)
                .orElseThrow(
                        () -> new RuntimeException("Nomina empleado con id " + idNominaEmpleado
                                + " no encontrado"));

        Map<String, Object> nominaEmpleadoMap = nominaEmpleadoEncontrado.toMap();

        nominaEmpleadoMap.put("persona",
                nominaEmpleadoEncontrado.getPersona() != null ? nominaEmpleadoEncontrado.getPersona().toMap() : null);

        return nominaEmpleadoMap;
    }

    public NominaEmpleadoModel updateNominaEmpleado(NominaEmpleadoModel cambiosNominaEmpleado,
            int idNominaEmpleado) {

        NominaEmpleadoModel nominaEmpleadoExistente = nominaEmpleadoRepository.findById(idNominaEmpleado)
                .orElseThrow(() -> new RuntimeException(
                        "Nomina empleado con id " + idNominaEmpleado + " no encontrado"));

        int id_persona = cambiosNominaEmpleado.getPersona().getId_persona();

        PersonaModel personaEncontrado = personaRepository.findById(id_persona)
                .orElseThrow(() -> new RuntimeException(
                        "Persona con id " + id_persona + " no encontrado"));

        nominaEmpleadoExistente.getPersona().getNominasEmpleados().remove(nominaEmpleadoExistente);
        nominaEmpleadoExistente.setPersona(personaEncontrado);
        personaEncontrado.getNominasEmpleados().add(nominaEmpleadoExistente);

        NominaEmpleadoModel nominaEmpleadoActualizado = nominaEmpleadoRepository.save(nominaEmpleadoExistente);

        return nominaEmpleadoActualizado;
    }

    public void deleteNominaEmpleado(int idNominaEmpleado) {
        nominaEmpleadoRepository.findById(idNominaEmpleado)
                .orElseThrow(
                        () -> new RuntimeException("Nomina empleado con id " + idNominaEmpleado
                                + " no encontrado"));

        nominaEmpleadoRepository.deleteById(idNominaEmpleado);
    }

}