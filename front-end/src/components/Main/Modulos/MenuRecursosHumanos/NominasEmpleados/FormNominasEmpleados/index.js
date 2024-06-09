import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import * as Antd from "antd";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
};

export default function FormNominasEmpleados({
  toggleForm,
  nominaEmpleadoDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
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
        setFormData(() => ({
          ...nominaEmpleadoDataForm,
        }));
      } catch (error) {}
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

        <Antd.Form.Item label="Tipo nómina">
          <Antd.Input
            type="text"
            name="tipo_nomina"
            value={formData.tipo_nomina}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Salario base">
          <Antd.Input
            type="text"
            name="salario_base"
            value={formData.salario_base + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Deducciones">
          <Antd.Input
            type="text"
            name="deducciones"
            value={formData.deducciones + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Bonificación">
          <Antd.Input
            type="text"
            name="bonificacion"
            value={formData.bonificacion + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Salario bruto">
          <Antd.Input
            type="text"
            name="salario_bruto"
            value={formData.salario_bruto + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="IRPF">
          <Antd.Input
            type="text"
            name="irpf"
            value={formData.irpf + " %"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Seguridad social">
          <Antd.Input
            type="text"
            name="seguridad_social"
            value={formData.seguridad_social}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Anticipos">
          <Antd.Input
            type="text"
            name="anticipos"
            value={formData.anticipos + " €"}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Cuenta bancaria">
          <Antd.Input
            type="text"
            name="cuenta_bancaria"
            value={formData.cuenta_bancaria}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Datos de la persona">
          <Antd.Input
            type="text"
            name="personaInfo"
            value={formData.personaInfo}
            readOnly={true}
            className={styles.StyleInputSelectDisabled}
          />
        </Antd.Form.Item>

        <Antd.Button
          onClick={() => {
            toggleForm();
            cancelOrExitClickTrigger();
          }}
        >
          Salir
        </Antd.Button>
      </Antd.Form>
      <Footer />
    </div>
  );
}
