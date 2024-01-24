import React, { useState, useEffect,useContext } from "react";
import styles from "./styles.module.css";
import Main from "../../";
import Panel from "../../../Container/Panel";
import GIBECTable from "../../../InterestingComponents/GIBECTable";
import { Button, Checkbox, Modal, Form, Select, Skeleton } from "antd";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarioPersona from "./CalendarioPersona";
import LoadingAnimation from "../../../InterestingComponents/LoadingAnimation";
import PersonaForm from "./PersonaForm";
import {
  getPersonas,
  getBajaOptions,
  modifyPersona,
  PersonasBECService,
  updateHeadcounts,
} from "../../../../services/PersonasBECService";
import { USING_BACKEND } from "../../../../context/constants";
import { UserContext } from "../../../../context/UserContext";

/**
 * This component represents the section of the main page that displays the PersonasBEC table.
 * It receives the following props:
 * - switcher: boolean. Used to switch between main personasBEC and others (modify, delete, etc.)
 * - toggleSwitcher: function. Used to modify switcher value
 */
export default function PersonasBECSection(props) {
  const { permission } = useContext(UserContext);
  const [dataSource, setDataSource] = useState([]); // Full personasBEC data array
  const [filteredDataSource, setFilteredDataSource] = useState([]); // Filtered personasBEC data array (for example, only active personasBECs)
  const [loadingData, setLoadingData] = useState(false); // Used to show loading animation while fetching data
  //Used for the detection of current checkbox selected
  const [currentCheckedValue, setCurrentCheckedValue] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [activeID, setActiveID] = useState(-1);
  const [activeName, setActiveName] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [actualForm, setActualForm] = useState(null);

  const [personaUpdated, setPersonaUpdated] = useState(false);

  // For personasBEC 'deleting'
  const [layoffDate, setLayoffDate] = useState(null);
  const [layoffReason, setLayoffReason] = useState(null);
  const [confirmDate, setConfirmDate] = useState(false);
  const [registrationDateSelected, setRegistrationDateSelected] = useState(null);


  useEffect(() => {
    if (props.switcher) {
      setActiveID(-1);
      setActiveName("");
      setShowCalendar(false);
      setShowModify(false);
      setShowDelete(false);
    }
  }, [props.Switcher]);

  const [bajaOptions, setBajaOptions] = useState([]);
  useEffect(() => {
    getBajaOptions().then((result) => {
      // console.log("RESULTADO OPCION: ", result)
      setBajaOptions(result);
    });
  }, []);


  // Load data into PersonasBEC table
  function updateTable() {
    setLoadingData(true);
    let mappedData = [];
    // If using backend, fetch Personas from backend
    getPersonas().then((result) => {
      if (result && result.length > 0) {
        mappedData = result.map((personaBEC, index) => {
          // console.log("Informacion de cada una de las personasBec (poner el index): ", personaBEC)
          console.log(personaBEC, "personaBEC");
          return {
            // Data shown in table:
            key: index,
            id: personaBEC.personabec_id,
            nameERP: personaBEC.nameERP,
            proyecto_car: personaBEC.proyecto_car ? personaBEC.proyecto_car.proyecto_car : "Sin proyecto asignado",
            categoria: personaBEC.categoria.categoria,
            categoria_id: personaBEC.categoria.categoria_id,
            /* Create string with all clients separated by ', ' */
            cliente: personaBEC.cliente ? personaBEC.cliente.cliente : "Sin clientes asignados",
            cliente_id:
              personaBEC.cliente ? personaBEC.cliente.cliente_id : undefined,
            cuenta: personaBEC.cuenta ? personaBEC.cuenta.cuenta : undefined,
            oficina: personaBEC.oficina.oficina,
            zona: personaBEC.zona.zona,
            linea: personaBEC.linea.linea,
            sueldo: personaBEC.sueldo,
            // If motivo_baja is null, baja is false. If not, true
            baja: personaBEC.motivo_baja ? "true" : "false",
            motivo_baja: personaBEC.motivo_baja ? personaBEC.motivo_baja.motivo_baja : undefined,

            // Data not shown in table:
            nombre: personaBEC.nameERP.split(", ")[1],
            apellidos: personaBEC.nameERP.split(", ")[0],
            numero_empleado: personaBEC.numero_empleado,
            email: "nohayemailenbd@xd.com",
            cuenta_id: personaBEC.cuenta ? personaBEC.cuenta.cuenta_id : undefined,
            oficina_id: personaBEC.oficina.oficina_id,
            zona_id: personaBEC.zona.zona_id,
            linea_id: personaBEC.linea.linea_id,
            sublinea_id: personaBEC.sublinea.Sublinea_id,
            sublinea: personaBEC.sublinea.sublinea,
            headcount: personaBEC.headcount ? 1 : 0, // Si es true headcount vale 1, si es false el headcount es 0
            fecha_de_alta: personaBEC.fecha_de_alta,
            
            // Necessary for csr table in form
            csr:
              personaBEC.historicoCSR && personaBEC.historicoCSR.length > 0
                ? JSON.stringify(personaBEC.historicoCSR)
                : undefined,
            //csr_value: personaBEC.historicoCSR[personaBEC.historicoCSR.length - 1].csr, esto no funciona porque hay personas que no tienen csr. Este comentario debe ser borrado cuando la bbdd este formada por datos coherentes
            fecha_de_baja: personaBEC.fecha_de_baja ? personaBEC.fecha_de_baja : undefined,
            proyecto_car_id: personaBEC.proyecto_car.proyecto_car_id,
            comentarios: personaBEC.comentarios ? personaBEC.comentarios : undefined,
            // origen_id: personaBEC.origen.origen_id,
            origen_id: personaBEC.origen.origen_id,
            origen: personaBEC.origen.origen,
            puntero_id: personaBEC.puntero ? personaBEC.puntero.personabec_id : undefined,
            puntero_nameERP: personaBEC.puntero ? personaBEC.puntero.nameERP : undefined,
            usuario: personaBEC.usuario ? personaBEC.usuario.usuario : undefined,

          };
        });
        // console.log("Mapped data", mappedData)
      }
      setDataSource(mappedData);
      setLoadingData(false);
      // console.log("Data source: ", dataSource)
    });
  }

  useEffect(() => {
    if (USING_BACKEND) {
      updateTable();
    } else {
      // If not using backend
      console.log("No backend")
      }
  }, []);

  // Depending on checkbox value, filter shown data
  useEffect(() => {
    // If currentCheckedValue is 0, only store active personasBECs
    if (currentCheckedValue == 0) {
      setFilteredDataSource(
        dataSource.filter((personaBEC) => personaBEC.baja == "false")
      );
    }
    // If currentCheckedValue is 1, only store inactive personasBECs
    else if (currentCheckedValue == 1) {
      setFilteredDataSource(
        dataSource.filter((personaBEC) => personaBEC.baja == "true")
      );
    }
    // If currentCheckedValue is 2, store all personasBECs
    else {
      setFilteredDataSource(dataSource);
    }
  }, [currentCheckedValue, dataSource]);

  function showCalendarById(record) {
    setActiveID(record.id);
    setActiveName(record.name);
    setShowCalendar(true);
    props.toggleSwitcher();
    //alert("showing calendar");
  }

  function showModifyById(record) {
    setActiveID(record.id);
    setActiveName(record.name);
    setShowModify(true);
    console.log("record: ", record)
    props.toggleSwitcher();
    //alert("showing modify");
  }

  function showDeleteById(record) {
    setActiveID(record.id);
    setActiveName(record.nameERP);
    setRegistrationDateSelected(record.fecha_de_alta)
    setShowDelete(true);
    console.log("record en delete: ", record)
    // props.toggleSwitcher();
    //alert("showing delete");
  }

  function personaUpdatedTrigger() {
    setPersonaUpdated(!personaUpdated);
  }

  useEffect(() => {
    if (personaUpdated == true) {
      updateTable();
      setPersonaUpdated(false);
    }
  }, [personaUpdated]);


  // Handles 'delete' modal ok button
  function handleModalOk() {
    if (!layoffReason || layoffReason[0] === null) {
      alert("Debe seleccionar un motivo de baja");
    } else {
      if (layoffDate < new Date() && !confirmDate) {
        alert("Si desea dar de baja a un empleado con fecha anterior a hoy, debe confirmarlo marcando la casilla");
      } else {
        const formattedDate = layoffDate.toISOString().slice(0, 10);
        const data = {
          fecha_de_alta: registrationDateSelected,
          fecha_de_baja: formattedDate,
          motivo_baja: {
            motivo_baja: layoffReason.label,
            motivo_baja_id: layoffReason.value,
          },
        };

        console.log("DATA: ", data)
        modifyPersona(activeID, data) // ESTO HAY QUE DESCOMENTARLO
          .then(() => {
            // After modifyPersona has completed, call getPersonas to update table
            updateTable();
          })
          .catch((error) => {
            console.error("Error modifying Persona: ", error);
          });
        resetStates();
      }
    }
  }

  function handleModalClose() {
    resetStates();
  }

  function toggleForm() {
    if (showForm) {
      setShowForm(false);
    }
    if (showModify) {
      setShowModify(false);
    }
  }

  function toggleEditForm() {
    setShowModify(!showModify);
  }

  function toggleCalendarVer() {
    setShowCalendar(!showCalendar);
  }

  function resetStates() {
    setShowCalendar(false);
    setShowModify(false);
    setShowDelete(false);
    setActiveID(-1);
    setActiveName("");
    setLayoffDate(null);
    setLayoffReason(null);
    setConfirmDate(false);
  }

  //Table's filters options
  const options = [
    {
      label: "Mostrar solo empleados activos",
      value: false,
    },
    {
      label: "Mostrar solo empleados de baja",
      value: false,
    },
    {
      label: "Mostrar todos los empleados",
      value: true,
    },
  ];

  //Table columns definition

  const columns_definition = [
    {
      title: "NOMBRE",
      dataIndex: "nameERP",
      key: "nombre",
    },
    {
      title: "PROYECTO",
      dataIndex: "proyecto_car",
      key: "proyecto_car",
    },
    {
      title: "CATEGORIA",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "CLIENTE",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "OFICINA",
      dataIndex: "oficina",
      key: "oficina",
    },
    {
      title: "ZONA",
      dataIndex: "zona",
      key: "zona",
    },
    {
      title: "LINEA",
      dataIndex: "linea",
      key: "linea",
    },
    // Fila sueldo depende de permisos de listado_facturacion
    ...(permission && permission.listado_facturacion) ?
      [{
        title: "SUELDO",
        dataIndex: "sueldo",
        key: "sueldo",
      }] : [],
    {
      title: "MOTIVO DE BAJA",
      dataIndex: "motivo_baja",
      key: "motivo_baja",
    },
  ]

  const [columns, setColumns] = useState(columns_definition);

  useEffect(() => {
    if (options[0].value) {
      setColumns(columns_definition.filter((column) => column.key != "motivo_baja"));
    } else {
      setColumns(columns_definition);
    }
  }, [currentCheckedValue]);


  const fields = [
    "categorias",
    "clientes",
    "cuentas",
    "lineas",
    "oficinas",
    "origenes",
    "proyectosCAR",
    "punteros",
    "sublineas",
    "zonas",
  ];

  useEffect(() => { // mirarme esta funcion
    const fetchData = async () => {
      let final = [];
      const promises = fields.map(async (item) => {
        const entry = {};
        // Fetch data for each item in the "fields" array
        let field = await PersonasBECService("GETALL", item, false);
        // console.log("FIELD: ", field)
        entry["name"] = item;
        entry["options"] = field.map((item2) => {
          // console.log("ITEM 2", item2)
          /* If it has a "relation" field, include it along with the label and value fields */
          if (item2.relation) {
            return {
              label: item2.label,
              value: item2.value,
              relation: item2.relation,
            };
          }
          return { label: item2.label, value: item2.value };
        });
        final.push(entry);
      });
      await Promise.all(promises);
      // Update the state with the fetched data
      setActualForm(final);
    };

    fetchData();

  }, [personaUpdated]);


  // For layoff form layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 7 },
  };

  function modifyForm() {
    const formData = filteredDataSource.filter(data => data.id === activeID)[0];
    
    /* Make a copy of the variable so that the original is not affected by modifications */
    let formDataCopy = JSON.parse(JSON.stringify(formData));

    /* Make a copy of actualForm so that the original is not affected by modifications */
    let actualFormCopy = JSON.parse(JSON.stringify(actualForm));

    /* actualFormCopy is a list of dictionaries. One of those dictionaries has a value of name = "punteros". 
    That dictionary has another value called options which is another array of dictionaries. 
    We need to know if there is a value in that dictionary with a field value that has the same value as formDataCopy.puntero_id. 
    If it is not, it will be added as another entry in the options */
    actualFormCopy.forEach((item) => {
      if (item.name === "punteros") {
        let found = false;
        item.options.forEach((option) => {
          if (option.value === formDataCopy.puntero_id) {
            found = true;
          }
        });
        if (!found) {
          item.options.push({
            label: formDataCopy.puntero_nameERP,
            value: formDataCopy.puntero_id,
          });
        }
      }
    });
    return <PersonaForm toggleForm={toggleEditForm} formFields={actualFormCopy} actualData={formDataCopy} updateTrigger={personaUpdatedTrigger} personaForm={"registered"} type={"persona"}/>;
  }

  // Rendering function. Checks states and renders the corresponding components.
  const renderContent = () => {
    // Calendar component
    /*if (showCalendar) {
      return <CalendarioPersona id={activeID} toggleCalendario={toggleCalendarVer}/>;
    }*/

    function deleteModal() {
      return (<Modal
        title={`Inserte fecha y motivo de baja del empleado ${activeName}`}
        open={showDelete}
        okText="Aceptar"
        onOk={handleModalOk}
        cancelText="Cancelar"
        onCancel={handleModalClose}
        centered
        okButtonProps={{ disabled: !layoffDate || !layoffReason || layoffReason[0] === null || (layoffDate < new Date() && !confirmDate) }}
      >
        <Form {...layout} name="delete-form" style={{ marginTop: "5%" }}>
          <Form.Item label="Fecha de baja">
            <ReactDatePicker
              dateFormat="dd/MM/yyyy"
              selected={layoffDate || new Date()}
              onChange={(date) => setLayoffDate(date)}
            />
            {layoffDate && layoffDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && (
              <div style={{ marginTop: "10px" }}>
                {/* Hacer que el texto del checkbox ocupe lo máximo posible */}
                <Checkbox
                  checked={confirmDate}
                  onChange={(e) => setConfirmDate(e.target.checked)}
                  style={{ width: "150%" }}
                >
                  Confirmo que la fecha de baja es anterior a hoy
                </Checkbox>
              </div>
            )}
          </Form.Item>
          <Form.Item label="Motivo de baja">
            <Select
              defaultValue={layoffReason ? layoffReason : 0} /* Bind defaultValue to layoffReason */
              defaultActiveFirstOption={true}
              style={{ width: "150%" }}
              onChange={(value) => {
                console.log("layoffDate: ", layoffDate)
                console.log("Value de bajas options:", value, "ID: ", activeID, "OPTIONS BAJAS",)
                const opcionElegidaDespido = bajaOptions.find( (optionValue) => {
                  console.log("optionValue", optionValue)
                  if (value === optionValue.value) {
                    console.log(optionValue.label)
                    return optionValue;
                  }
                })
                console.log("opcionElegidaDespido: ", opcionElegidaDespido.label)
                setLayoffReason(opcionElegidaDespido)
                } 
              }
            >
              <Select.Option value={0}>
                Seleccione un motivo
              </Select.Option>
              {bajaOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            
          </Form.Item>
        </Form>
      </Modal >);
    }

    // JSX code to render the main content, including Button, Panel, and GIBECTable components
    // ...
    return (
      <>
        <div className={styles.buttonContainer}>
          {/* JSX code for the addEmployeeButton component */}
          {permission && permission.dar_alta && (
          <Button
            type="primary"
            className={styles.Button}
            onClick={() => setShowForm(true)}
          >
            <img
              className={styles.AddIcon}
              src="/common_icons/add_icon.png"
              alt="Add employee"
            />
            Nuevo empleado
          </Button>)}

          {/*JSX code for the updateHeadcount component*/}
          <Button
            type="primary"
            className={styles.Button}
            onClick={updateHeadcounts}
          >
            <img
              className={styles.ReloadIcon}
              src="/common_icons/reload_icon.png"
              alt="Reload hc"
            />
            Actualizar HC
          </Button>
        </div>

        {/* JSX code for the Panel component containing the Checkbox elements */}
        <div className={styles.CommonContainer}>
          <Panel>
            {options.map((option, index) => {
              currentCheckedValue == index
                ? (option.value = true)
                : (option.value = false);
              return (
                <Checkbox
                  className={`${styles.allCheckboxs} ${index == 1 ? styles.MiddleCheckbox : undefined
                    }`}
                  key={option.label}
                  checked={option.value}
                  onClick={() => setCurrentCheckedValue(index)}
                >
                  {option.label}
                </Checkbox>
              );
            })}
          </Panel>
        </div>

        {/* JSX code for the GIBECTable component */}
        <div className={styles.CommonContainer}>
          <GIBECTable
            title="PersonasBEC"
            dataSource={filteredDataSource}
            columns={columns}
            actions={
              /*(permission && permission.ausencias ? [{ icon: "calendar", function: showCalendarById }] : [])
                .concat(*/
                  (permission && permission.modificar_informacion ? [{ icon: "modify", function: showModifyById }] : [])
                .concat(
                  (permission && permission.dar_baja ? [{ icon: "delete", function: showDeleteById }] : [])
                )
            }
            loading={loadingData}
            showSelectors={false}
          />
        </div>

            {/* <p onClick={() => console.log(filteredDataSource)}>---------------------------------------</p> */}
        {/* JSX code for the Modal component */}
        {showDelete && deleteModal()}
      </>
    );
  };

  // Conditional rendering based on showForm state
  if (showForm) {
    
    return actualForm ? (
      <PersonaForm toggleForm={toggleForm} formFields={actualForm} updateTrigger={personaUpdatedTrigger} personaForm={"new"} type={"persona"}/>
    ) : (
      <LoadingAnimation />
    );
  } else if (showModify) {
    console.log("ACTUAL FORM LINEA 554", actualForm);
    return modifyForm();
  } else {
    return <Main ownMainStyle={styles.personasBEC}>{renderContent()}</Main>;
  }
}