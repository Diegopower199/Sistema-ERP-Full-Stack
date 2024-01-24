import { useState, useEffect } from "react";
import FormularioPersonas from "../../../../FormularioPersonas";
import {
    savePersona,
    PersonasBECService,
    modifyPersona,
    getHistoricosCSRById,
} from "../../../../../services/PersonasBECService";
import CalendarioPersona from "../CalendarioPersona";
import { Button } from "antd";
import styles from "./styles.module.css";

export default function PersonaForm({
    formFields,
    toggleForm,
    actualData = null,
    updateTrigger,
    personaForm,
    type,
}) {
        // Tengo que cambiar el proyecto_car para que no haga falta poner valores, pero ahora me da igual

    // Initialize the state with default null values or with the information contained in actualData if it's not null
    const [formData, setFormData] = useState(
        actualData !== null
            ? { ...actualData }
            : {
                nombre: "",
                numero_empleado: undefined,
                proyecto_car_id: undefined,
                categoria_id: undefined,
                cuenta: undefined,
                cliente_id: undefined,
                linea_id: undefined,
                sublinea: undefined,
                sublinea_id: undefined,
                origen: undefined,
                origen_id: undefined,
                headcount: undefined,
                fecha_de_alta: "",
                fecha_de_baja: "",
                apellidos: "",
                oficina_id: undefined,
                zona_id: undefined,
                zona: undefined,
                csr: undefined,
                csr_value: 0,
                sueldo: undefined,
                punteros: undefined,
            }
    );

    /* If "csr" field != undefined, convert it to JSON format */
    if (formData.csr !== undefined && typeof formData.csr === "string") {
        formData.csr = JSON.parse(formData.csr);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getHistoricosCSRById(formData.id);
    
            if (result && result.length > 0) {
              setFormData(prevFormData => ({
                ...prevFormData,
                csr: result,
              }));
            }
          } catch (error) {
            console.error('Error al obtener historicosCSR:', error);
          }
        };
    
        fetchData();
    }, [formData.id]);


    const [firstCheck, setFirstCheck] = useState(true); //Takes the value of requiredFieldsFilled if it is false
    async function sendData() {
        // Check if all required fields are filled
        let requiredFieldsFilled = true;
        if (formData.nombre === "" || formData.nombre === undefined) {
            requiredFieldsFilled = false;
        }
        if (formData.apellidos === "" || formData.apellidos === undefined) {
            requiredFieldsFilled = false;            
        }
        if (formData.numero_empleado === undefined || formData.numero_empleado === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.proyecto_car_id === undefined || formData.proyecto_car_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.categoria_id === undefined || formData.categoria_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.cliente_id === undefined || formData.cliente_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.linea_id === undefined || formData.linea_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.sublinea_id === undefined || formData.sublinea_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.origen_id === undefined || formData.origen_id === "") {
            requiredFieldsFilled = false;           
        }
        if (formData.headcount === undefined || formData.headcount === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.fecha_de_alta === undefined || formData.fecha_de_alta === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.oficina_id === undefined || formData.oficina_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.zona_id === undefined || formData.zona_id === "") {
            requiredFieldsFilled = false;            
        }
        if (formData.sueldo === undefined || formData.sueldo === "") {
            requiredFieldsFilled = false;    
        }
        if (formData.puntero_id === undefined || formData.puntero_id === "") {
            requiredFieldsFilled = false;
        }

        if (requiredFieldsFilled) {
            // If all required fields are filled, send the data to the server
            if (actualData !== null) {
                console.log("baja", formData.fecha_de_baja);
                const saveData = {
                    numero_empleado: formData.numero_empleado,
                    headcount: formData.headcount,
                    sueldo: formData.sueldo,
                    comentarios: formData.comentarios,
                    nameERP: (formData.apellidos + ", " + formData.nombre),
                    categoria: {
                        categoria_id: parseInt(formData.categoria_id),
                    },
                    oficina: {
                        oficina_id: parseInt(formData.oficina_id),
                    },
                    origen: {
                        origen_id: parseInt(formData.origen_id), // ESTO ES ASI PORQUE EN EL INDEX DE PERSONAS BEC LLAMAMOS CON VARIABLE ORIGEN AL ORIGEN_ID eso lo deberia cambiar
                    },
                    sublinea: {
                        sublinea_id: parseInt(formData.sublinea_id),
                        linea: {
                            linea_id: parseInt(formData.linea_id),
                        }
                    },
                    cliente: {
                        cliente_id: parseInt(formData.cliente_id),
                    },
                    proyecto_car: {
                        proyectos_car_id: parseInt(formData.proyecto_car_id)  
                    },
                    puntero: {
                        personabec_id: parseInt(formData.puntero_id),
                    },
                    cuenta_id: parseInt(formData.cuenta_id),
                }

                console.log("Saving data modifyPersona(formData.id, saveData):", saveData);
                if (type == "persona") {
                    modifyPersona(formData.id, saveData).then(toggleForm()).then(updateTrigger());
                } else {
                    modifyPersona(formData.personabec_id, saveData).then(toggleForm()).then(updateTrigger());
                }
            } else {
                console.log("Saving data con la funcion PersonasBECService(save, formData):", formData);
                const response = await PersonasBECService("save", formData);
                // Show an alert with the server's response FOR DEBUGGING
                if (response === "OK") {
                    toggleForm();
                    updateTrigger();
                }
            }
        } else {
            // If not all required fields are filled, show an alert
            setFirstCheck(requiredFieldsFilled);
        }
    }

    /**
        * Handles the change event of the form fields. 
        * Updates the state with the value of the changed form field, 
        * parsing the value to an integer if possible, 
        * and sets the updated form data in the state.
        * @param {object} event - The change event object.
        * @returns {void} - This function does not return anything.
        */
    /* async function handleFormChange(event) { NO SE QUE HACE ESTA FUNCION
        // Update the state with the value of the changed form field
        const newValue = event.target.value;
        const intValue = parseInt(newValue, 10);
        const updatedFormData = {
            ...formData,
            [event.target.name]: isNaN(intValue) ? newValue : intValue,
        };
        await setFormData(updatedFormData);
    }*/

    /**
     * Handles the change event of the form fields. 
     * Updates the state with the value of the changed form field, 
     * and sets the updated form data in the state.
     * @param {object} event - The change event object.
     * @returns {void} - This function does not return anything.
     */
    async function handleFormChange(event) {
        const fieldValue = event.target.value

        const [apellidos, nombre] = fieldValue.split(",").map((part) => part.trim())
        
        setFormData({
            ...formData,
            apellidos: apellidos || "", 
            nombre: nombre || "",
        });
    }

    async function handleInputChange(event) {        
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSelectChange(id, value) {
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    //const isFieldEmpty = (fieldName) => formData[fieldName] === "" || formData[fieldName] === undefined; //Used to remark the border of an input if a field is empty

    /**
     * Handles the change event of the linea selector. 
     * Filters the options of the sublinea selector based on the selected linea, 
     * updates the state with the selected value in the linea selector and the filtered value in the sublinea selector, 
     * and sets the index of the sublinea selector to 0.
     * @param {object} event - The change event object.
     * @returns {void} - This function does not return anything.
     */
    /*async function handleLineaChange(event) {
        // Get the selected value in the linea selector
        //const lineaValue = event.target.value;
        // Update the state with the selected value in the linea selector and the filtered value in the sublinea selector
        setFormData({
            ...formData,
            linea: event,
            linea_id: event,
            sublinea_id: undefined,
        });
        // Set the index of the sublinea selector to 0
        document.getElementById("sublinea_id").selectedIndex = 0;
    }*/

    async function handleLineaChange(value, option) {
        const lineaSeleccionada = option?.children;
        const lineaSeleccionadaId = value;

        setFormData({
            ...formData,
            linea: lineaSeleccionada,
            linea_id: parseInt(lineaSeleccionadaId),
            sublinea_id: undefined,
        });

        document.getElementById("sublinea_id").selectedIndex = 0;
    }

    /**
     * Handles the change event of the date fields. 
     * Updates the state with the value of the changed form field, 
     * calculates the headcount based on the selected dates, 
     * and updates the state with the calculated headcount.
     * @param {object} event - The change event object.
     * @param {string} type - The type of date field being changed ("alta" or "baja").
     * @returns {void} - This function does not return anything.
     */
    function handleDateChange(event, type) {
        // Update the state with the value of the changed form field
        if (type === "alta") {
            const updatedFormData = {
                ...formData,
                fecha_de_alta: event.target.value,
            };
            setFormData(updatedFormData);
            const fechaAlta = new Date(updatedFormData.fecha_de_alta);
            const actualTime = new Date();
            let headcount = 0;
            if (updatedFormData.fecha_de_baja) {
                const fechaBaja = new Date(updatedFormData.fecha_de_baja);
                if (fechaAlta <= actualTime && actualTime <= fechaBaja) {
                    headcount = 1;
                }
            } else {
                if (fechaAlta <= actualTime) {
                    headcount = 1;
                }
            }
            setFormData({
                ...updatedFormData,
                headcount: headcount,
            });
        } else {
            const updatedFormData = {
                ...formData,
                fecha_de_baja: event.target.value,
            };
            setFormData(updatedFormData);
            const fechaAlta = new Date(updatedFormData.fecha_de_alta);
            const actualTime = new Date();
            let headcount = 0;
            if (updatedFormData.fecha_de_baja) {
                const fechaBaja = new Date(updatedFormData.fecha_de_baja);
                if (fechaAlta <= actualTime && actualTime <= fechaBaja) {
                    headcount = 1;
                }
            } else {
                if (fechaAlta <= actualTime) {
                    headcount = 1;
                }
            }
            setFormData({
                ...updatedFormData,
                headcount: headcount,
            });
        }
    }

    /**
     * Handles the change event of the "cuenta" selector. 
     * Filters the options of the "client" selector based on the selected "cuenta" value, 
     * updates the state with the selected "cuenta" value and the filtered "cliente" value, 
     * and sets the index of the "cliente" selector to 0.
     * @param {object} event - The change event object.
     * @returns {Promise<void>} - A Promise that resolves when the state is updated.
     */
    /*async function handleCuentaChange(event) {
        // Get the selected value in the cliente selector
        //const cuentaValue = event.target.value;
        // Get the options of the cliente selector
        const clienteOptions = getElementByFieldName("clientes").options;
        // Filter the options of the cliente selector based on the selected cuenta
        const filteredOptions = clienteOptions.filter(
            (option) => option.relation.cuenta_id.toString() === event
        );
        // Update the state with the selected value in the cuenta selector and the filtered value in the cliente selector
        setFormData({
            ...formData,
            cuenta_id: event,
            cliente_id: undefined,
        });
        // Set the index of the cuenta selector to 0
        document.getElementById("cliente_id").selectedIndex = 0;
    }*/

    async function handleCuentaChange(value, option) {
        const cuentaSeleccionada = option?.children;
        const cuentaSeleccionadaId = value;

        setFormData({
            ...formData,
            cuenta: cuentaSeleccionada,
            cuenta_id: parseInt(cuentaSeleccionadaId),
            cliente_id: undefined,
        });

        console.log(value);
        document.getElementById("cliente_id").selectedIndex = 0;
    }

    /**
     * Handles the change event of the "zona" selector. 
     * Filters the options of the "oficina" selector based on the selected "zona" value, 
     * updates the state with the selected "zona" value and the filtered "oficina" value, 
     * and sets the index of the "oficina" selector to 0.
     * @param {object} event - The change event object.
     * @returns {Promise<void>} - A Promise that resolves when the state is updated.
     */
    /*async function handleZonaChange(event) {
        // Get the selected value in the zona selector
        //const zonaValue = event.target.value;
        // console.log("zonaValue", zonaValue, "\nEvent.target.options[event.target.selectedIndex].text", event.target.options[event.target.selectedIndex].text)
        setFormData({
            ...formData,
            // zona_id: parseInt(zonaValue), Esto crea que esta mal
            zona: event,
            zona_id: event,
            // zona: event.target.options[event.target.selectedIndex].text,
            oficina_id: undefined,
        });
        // Set the index of the oficina selector to 0
        document.getElementById("oficina_id").selectedIndex = 0;
        console.log("form Data: ", formData)
        console.log("form Data: ", formData)
    }*/

    async function handleZonaChange(value, option) {
        const zonaSeleccionada = option?.children;
        const zonaSeleccionadaId = value;

        setFormData({
            ...formData,
            // zona_id: parseInt(zonaValue), Esto crea que esta mal
            zona: zonaSeleccionada,
            zona_id: parseInt(zonaSeleccionadaId),
            // zona: event.target.options[event.target.selectedIndex].text,
            oficina_id: undefined,
        });

        document.getElementById("oficina_id").selectedIndex = 0;
    }

    /**
     * Handles the change event of the "proyectoCAR" selector.
     *
     * This asynchronous function is responsible for updating the state
     * with the selected value in the "proyectoCAR" selector and filtering
     * the options in the "cuenta" selector based on the selected "proyectoCAR" value.
     * It also resets the "cuenta" and "cliente" selectors to their initial state.
     *
     * @param {Event} event - The change event object generated by the "proyectoCAR" selector.
     * @returns {Promise<void>} - A promise that resolves once the state update is completed.
     */
    /*async function handleProyectoCARChange(event) {
        // Get the selected value in the "proyectoCAR" selector
        //const proyectoCARValue = event.target.value;

        // Update the state with the selected value in the "proyectoCAR" selector and the filtered value in the "cuenta" selector
        setFormData({
            ...formData,
            //proyecto_car_id: parseInt(proyectoCARValue),
            proyecto_car: event,
            proyecto_car_id: event,
            cuenta_id: undefined,
            cliente_id: undefined,
        });

        // Set the index of the "cuenta" selector to 0
        document.getElementById("cuenta_id").selectedIndex = 0;
        // Set the index of the "cliente" selector to 0
        document.getElementById("cliente_id").selectedIndex = 0;
    }*/

    async function handleProyectoCARChange(value, option) {
        const proyectoSeleccionado = option?.children;
        const proyectoSeleccionadoId = value;

        setFormData({
            ...formData,
            proyecto_car: proyectoSeleccionado,
            proyecto_car_id: parseInt(proyectoSeleccionadoId),
            cuenta: undefined,
            cliente_id: undefined,
        });

        document.getElementById("cuenta_id").selectedIndex = 0;
        document.getElementById("cliente_id").selectedIndex = 0;
    }

    let counter = 0;
    /**
     * Maps the "csr" array from the form data to an array of objects with specific properties.
     * @returns {Array} - An array of objects with the properties "key", "fechainicio", "fechafin", "csr", and "csrbec".
     */
    const dataExample = formData.csr && formData.csr.length > 0 ? formData.csr.map((csr) => {
        return {
            key: counter++,
            fechainicio: csr.fecha_inicio,
            fechafin: csr.fecha_fin ? csr.fecha_fin : "",
            csr: JSON.stringify(csr.csr),
            csrbec: JSON.stringify(csr.csr_bec),
        };
    }) : [];

    dataExample.sort((a, b) => {
        const dateA = new Date(a.fechainicio);
        const dateB = new Date(b.fechainicio);
    
        return dateB - dateA;
    });


    /**
     * Returns the form field element that matches the specified name.
     * @param {string} name - The name of the form field element to find.
     * @returns {object} - The form field element that matches the specified name.
     */
    function getElementByFieldName(name) {
        return formFields.find(function (element) {
            return element.name === name;
        });
    }

    const ButtonSection = () => {
        return (
            <div className={styles.buttonSection}>
                    <Button
                        className={styles.SubmitBtn}
                        onClick={sendData}
                    >
                        Guardar
                    </Button>
                    <Button
                        danger
                        className={styles.CancelBtn}
                        onClick={toggleForm}
                    >
                        Cancelar
                    </Button>
                </div>
        );
    }

    if (personaForm == "registered") {
        return (
            <div>
                <FormularioPersonas
                    formData={formData}
                    handleFormChange={handleFormChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleLineaChange={handleLineaChange}
                    handleDateChange={handleDateChange}
                    handleCuentaChange={handleCuentaChange}
                    handleZonaChange={handleZonaChange}
                    handleProyectoCARChange={handleProyectoCARChange}
                    getElementByFieldName={getElementByFieldName}
                    firstCheck={firstCheck}
                    dataExample={dataExample}
                />
                <CalendarioPersona
                    id={type == "persona" ? formData.id : formData.personabec_id}
                    fecha_alta = {formData.fecha_de_alta}
                />
                <ButtonSection/>
            </div>
            
        );
    } else if (personaForm == "new") {
        return (
            <div>
                <FormularioPersonas
                    formData={formData}
                    handleFormChange={handleFormChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleLineaChange={handleLineaChange}
                    handleDateChange={handleDateChange}
                    handleCuentaChange={handleCuentaChange}
                    handleZonaChange={handleZonaChange}
                    handleProyectoCARChange={handleProyectoCARChange}
                    getElementByFieldName={getElementByFieldName}
                    firstCheck={firstCheck}
                    dataExample={dataExample}
                />
                <ButtonSection/>
            </div>
        );
    } 
};