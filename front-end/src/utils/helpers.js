// Función para asignar null si el valor es una cadena vacía
export function asignarNullSiCadenaVacia(valor) {
  if (valor === "") {
    return null;
  } else {
    return valor;
  }
}
