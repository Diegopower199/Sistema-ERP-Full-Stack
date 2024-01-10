package tfg.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.backend.models.NominaEmpleadoModel;
import tfg.backend.repositories.NominaEmpleadoRepository;
import tfg.backend.repositories.PersonaRepository;

@Service
public class NominaEmpleadoService {

    @Autowired
    private NominaEmpleadoRepository nominaEmpleadoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public List<Map<String, Object>> getAllNominasEmpleados() {
        List<NominaEmpleadoModel> listaNominasEmpleados = nominaEmpleadoRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        return resultado;
    }

    public NominaEmpleadoModel saveNominaEmpleado(NominaEmpleadoModel nuevoNominaEmpleado) {

        return nuevoNominaEmpleado;
    }

    public Map<String, Object> getNominaEmpleadoById(int idNominaEmpleado) {
        NominaEmpleadoModel nominaEmpleadoEncontrado = nominaEmpleadoRepository.findById(idNominaEmpleado)
                .orElseThrow(
                        () -> new RuntimeException("Nomina empleado con id " + idNominaEmpleado + " no encontrado"));

        Map<String, Object> nominaEmpleadoMap = nominaEmpleadoEncontrado.toMap();

        return nominaEmpleadoMap;
    }

    public NominaEmpleadoModel updateNominaEmpleado(NominaEmpleadoModel cambiosNominaEmpleado, int idNominaEmpleado) {

        return cambiosNominaEmpleado;
    }

    public void deleteNominaEmpleado(int idNominaEmpleado) {
        nominaEmpleadoRepository.findById(idNominaEmpleado)
                .orElseThrow(
                        () -> new RuntimeException("Nomina empleado con id " + idNominaEmpleado + " no encontrado"));

        nominaEmpleadoRepository.deleteById(idNominaEmpleado);
    }
}
