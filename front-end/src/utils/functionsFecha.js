import { REGEX_DATE_YYYYMMDD } from "./regexPatterns";

export function validarFechaYYYYMMDD(fecha) {
  return fecha.match(REGEX_DATE_YYYYMMDD);
}

export function fechaCumpleFormatoYYYYMMDD(fecha) {
  return REGEX_DATE_YYYYMMDD.test(fecha);
}

export function formatearFechaYYYYMMDD(fechaConFormatoOriginal) {
  const [dia, mes, year] = fechaConFormatoOriginal.split("-");
  const fechaFormateada = `${year}-${mes}-${dia}`;
  return fechaFormateada;
}
