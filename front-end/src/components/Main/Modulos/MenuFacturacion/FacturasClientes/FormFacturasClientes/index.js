import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";
import moment from "moment";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormFacturasClientes({
  toggleForm,
  facturaClienteDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [formData, setFormData] = useState({
    descripcion_servicio: "",
    direccion_entrega: "",
    hora_inicio_desplazamiento: "",
    hora_fin_desplazamiento: "",
    tiempo_desplazamiento_total: "",
    hora_inicio_servicio: "",
    hora_fin_servicio: "",
    tiempo_servicio_total: "",
    observacion: "",
    fecha_entrega_real_pedido: "",
    fecha_factura_emitida: "",
    tarifa_hora_desplazamiento: "",
    tarifa_hora_servicio: "",
    subtotal_factura_sin_iva: "",
    iva: "",
    total_factura: "",
    id_cliente: "",
    nif_cliente: "",
    clienteInfo: "",
    pedido_cliente: "",
    id_pedido_cliente: "",
    tipo_estado: "",
    id_tipo_estado: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fechaEntregaRealPedidoValida = validarFechaYYYYMMDD(
          facturaClienteDataForm.fecha_entrega_real_pedido
        );

        const fechaFacturaEmitidaValida = validarFechaYYYYMMDD(
          facturaClienteDataForm.fecha_factura_emitida
        );

        if (
          fechaEntregaRealPedidoValida === null ||
          fechaFacturaEmitidaValida === null
        ) {
          const fechaEntregaRealPedidoFormateada = formatearFechaYYYYMMDD(
            facturaClienteDataForm.fecha_entrega_real_pedido
          );

          const fechaFacturaEmitidaFormateada = formatearFechaYYYYMMDD(
            facturaClienteDataForm.fecha_factura_emitida
          );

          setFormData(() => ({
            ...facturaClienteDataForm,
            fecha_entrega_real_pedido: fechaEntregaRealPedidoFormateada,
            fecha_factura_emitida: fechaFacturaEmitidaFormateada,
          }));
        } else {
          setFormData(() => ({
            ...facturaClienteDataForm,
          }));
        }
      } catch (error) {
        // console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Descripción del servicio">
          <Antd.Input
            type="text"
            name="descripcion_servicio"
            value={formData.descripcion_servicio}
            className={styles.StyleInputTimePickerDisabled}
            readOnly={true}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Dirección entrega">
          <Antd.Input
            type="text"
            name="direccion_entrega"
            value={formData.direccion_entrega}
            className={styles.StyleInputTimePickerDisabled}
            readOnly={true}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora inicio desplazamiento">
          <Antd.TimePicker
            name="hora_inicio_desplazamiento"
            value={
              formData.hora_inicio_desplazamiento
                ? moment(formData.hora_inicio_desplazamiento, "HH:mm")
                : null
            }
            className={styles.StyleInputTimePickerDisabled}
            readOnly={true}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora fin desplazamiento">
          <Antd.TimePicker
            name="hora_fin_desplazamiento"
            value={
              formData.hora_fin_desplazamiento
                ? moment(formData.hora_fin_desplazamiento, "HH:mm")
                : null
            }
            className={styles.StyleInputTimePickerDisabled}
            readOnly={true}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Tiempo desplazamiento total">
          <Antd.TimePicker
            name="tiempo_desplazamiento_total"
            value={
              formData.tiempo_desplazamiento_total
                ? moment(formData.tiempo_desplazamiento_total, "HH:mm")
                : null
            }
            className={styles.StyleInputTimePickerDisabled}
            readOnly={true}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora inicio servicio">
          <Antd.TimePicker
            name="hora_inicio_servicio"
            value={
              formData.hora_inicio_servicio
                ? moment(formData.hora_inicio_servicio, "HH:mm")
                : null
            }
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Hora fin servicio">
          <Antd.TimePicker
            name="hora_fin_servicio"
            value={
              formData.hora_fin_servicio
                ? moment(formData.hora_fin_servicio, "HH:mm")
                : null
            }
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Tiempo servicio total">
          <Antd.TimePicker
            name="tiempo_servicio_total"
            value={
              formData.tiempo_servicio_total
                ? moment(formData.tiempo_servicio_total, "HH:mm")
                : null
            }
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
            format="HH:mm:ss"
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Observación">
          <Antd.Input
            type="text"
            name="observacion"
            value={formData.observacion}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha entrega real pedido">
          <Antd.Input
            type="date"
            name="fecha_entrega_real_pedido"
            value={formData.fecha_entrega_real_pedido}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha factura emitida">
          <Antd.Input
            type="date"
            name="fecha_factura_emitida"
            value={formData.fecha_factura_emitida}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Tarifa hora desplazamiento">
          <Antd.Input
            type="text"
            name="tarifa_hora_desplazamiento"
            value={formData.tarifa_hora_desplazamiento + " €"}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Tarifa hora servicio">
          <Antd.Input
            type="text"
            name="tarifa_hora_servicio"
            value={formData.tarifa_hora_servicio + " €"}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Subtotal factura sin iva">
          <Antd.Input
            type="text"
            name="subtotal_factura_sin_iva"
            value={formData.subtotal_factura_sin_iva + " €"}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="IVA">
          <Antd.Input
            type="text"
            name="iva"
            value={formData.iva + "%"}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Total factura">
          <Antd.Input
            type="text"
            name="total_factura"
            value={formData.total_factura + " €"}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Datos del cliente">
          <Antd.Input
            type="text"
            name="clienteInfo"
            value={formData.clienteInfo}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="ID pedido cliente">
          <Antd.Input
            type="text"
            name="id_pedido_cliente"
            value={formData.id_pedido_cliente}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Tipo estado">
          <Antd.Input
            type="text"
            name="tipo_estado"
            value={formData.tipo_estado}
            readOnly={true}
            className={styles.StyleInputTimePickerDisabled}
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
