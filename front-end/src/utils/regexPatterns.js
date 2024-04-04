export const REGEX_DATE_YYYYMMDD =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const REGEX_DNI = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

export const REGEX_EMAIL =
  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

export const REGEX_TELEFONO_CON_PREFIJO = /^34[6-9]\d{8}$/;

export const REGEX_NIF_PERSONAS_FISICAS = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

export const REGEX_NIF_PERSONAS_JURIDICAS =
  /^[A-HJNP-SUVW]{1}[0-9]{7}[0-9A-J]$/;

export const REGEX_CODIGO_POSTAL_SPAIN = /\b\d{5}\b/;

export const REGEX_SEGURIDAD_SOCIAL = /\b\d{12}\b/;

export const REGEX_CUENTA_BANCARIA = /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}\b/;
