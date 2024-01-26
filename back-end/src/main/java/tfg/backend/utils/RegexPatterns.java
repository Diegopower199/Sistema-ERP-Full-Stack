package tfg.backend.utils;

public class RegexPatterns {
    public static final String DNI_REGEX = "\\d{8}[A-HJ-NP-TV-Z]";
    public static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    public static final String TELEFONO_CON_PREFIJO_REGEX = "^34[6-9]\\d{8}$";

}
