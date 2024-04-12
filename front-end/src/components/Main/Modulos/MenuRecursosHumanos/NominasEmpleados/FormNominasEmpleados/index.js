import React, { useEffect, useState } from "react";
import { savePersona, updatePersona } from "@/services/PersonaService";
import { getAllTiposPersonas } from "@/services/TipoPersonaService";
import {
  REGEX_DNI,
  REGEX_EMAIL,
  REGEX_TELEFONO_CON_PREFIJO,
} from "@/utils/regexPatterns";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
};

export default function FormNominasEmpleados({
  toggleForm,
  nominaEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    year: "",
    mes: "",
    tipo_nomina: "",
    salario_base: "",
    deducciones: "",
    bonificacion: "",
    salario_bruto: "",
    irpf: "",
    seguridad_social: "",
    anticipos: "",
    salario_neto: "",
    cuenta_bancaria: "",
    id_persona: "",
    personaInfo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("operationType: ", operationType);

        console.log("nominaEmpleadoDataForm: ", nominaEmpleadoDataForm);

        if (operationType === "update" || operationType === "view") {
          setFormData(() => ({
            ...nominaEmpleadoDataForm,
          }));
        }
      } catch (error) {
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Año">
          <Antd.Input
            type="text"
            name="year"
            value={formData.year}
            className={styles.StyleInputSelectDisabled}
            readOnly={true}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Mes">
          <Antd.Input
            type="text"
            name="mes"
            value={formData.mes}
            className={styles.StyleInputSelectDisabled}
            readOnly={true}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="tipo_nomina">
          <Antd.Input
            type="text"
            name="tipo_nomina"
            value={formData.tipo_nomina}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="salario_base">
          <Antd.Input
            type="text"
            name="salario_base"
            value={formData.salario_base + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="deducciones">
          <Antd.Input
            type="text"
            name="deducciones"
            value={formData.deducciones + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="bonificacion">
          <Antd.Input
            type="text"
            name="bonificacion"
            value={formData.bonificacion + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="salario_bruto">
          <Antd.Input
            type="text"
            name="salario_bruto"
            value={formData.salario_bruto + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="irpf">
          <Antd.Input
            type="text"
            name="irpf"
            value={formData.irpf}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="seguridad_social">
          <Antd.Input
            type="text"
            name="seguridad_social"
            value={formData.seguridad_social}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="anticipos">
          <Antd.Input
            type="text"
            name="anticipos"
            value={formData.anticipos + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="cuenta_bancaria">
          <Antd.Input
            type="text"
            name="cuenta_bancaria"
            value={formData.cuenta_bancaria}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="personaInfo">
          <Antd.Input
            type="text"
            name="personaInfo"
            value={formData.personaInfo}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Button onClick={toggleForm}>Salir</Antd.Button>
      </Antd.Form>
      <Footer />
    </div>
  );
}
