package tfg.backend.utils;

public class RegexPatterns {

    public static final String REGEX_DNI = "\\d{8}[A-HJ-NP-TV-Z]";
    public static final String REGEX_EMAIL = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    public static final String REGEX_TELEFONO_CON_PREFIJO = "^34[6-9]\\d{8}$";
    public static final String REGEX_NIF_PERSONAS_FISICAS = "^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$";
    public static final String REGEX_NIF_PERSONAS_JURIDICAS = "^[A-HJNP-SUVW]{1}[0-9]{7}[0-9A-J]$";
    public static final String REGEX_CODIGO_POSTAL_SPAIN = "\\b\\d{5}\\b";;
    public static final String REGEX_SEGURIDAD_SOCIAL = "\\b\\d{12}\\b";;
    public static final String REGEX_CUENTA_BANCARIA = "\\b[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}\\b";

}
