import { REGEX_DATE_YYYYMMDD } from "./regexPatterns";

export function validarFechaYYYYMMDD(fecha) {
  return fecha.match(REGEX_DATE_YYYYMMDD);
}

export function formatearFechaYYYYMMDD(fechaConFormatoOriginal) {
  const [dia, mes, year] = fechaConFormatoOriginal.split("-");
  const fechaFormateada = `${year}-${mes}-${dia}`;
  return fechaFormateada;
}
