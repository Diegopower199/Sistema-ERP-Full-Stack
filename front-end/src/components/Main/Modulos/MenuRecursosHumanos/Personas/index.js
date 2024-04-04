import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarExportContainer,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { deletePersona, getAllPersonas } from "@/services/PersonaService";
import FormPersonas from "./FormPersonas";
import * as Antd from "antd";
import Link from "next/link";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import ErrorIcon from "@mui/icons-material/Error";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
};

export default function Personas() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idPersonaSelected, setIdPersonaSelected] = useState(0);
  const [namePersonaSelected, setNamePersonaSelected] = useState("");

  const [personaDelete, setPersonaDelete] = useState(false);
  const [personaFormUpdated, setPersonaFormUpdated] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 85,
      editable: false,
    },
    {
      field: "numero_empleado",
      headerName: "Numero empleado",
      width: 180,
      editable: false,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 180,
      editable: false,
    },
    {
      field: "apellidos",
      headerName: "Apellidos",
      width: 180,
      editable: false,
    },
    {
      field: "genero",
      headerName: "Genero",
      width: 130,
      editable: false,
    },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha nacimiento",
      width: 180,
      editable: false,
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 180,
      editable: false,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 180,
      editable: false,
    },
    {
      field: "numero_telefono",
      headerName: "Numero telefono",
      width: 180,
      editable: false,
    },
    {
      field: "correo_electronico",
      headerName: "Correo electronico",
      width: 180,
      editable: false,
    },
    {
      field: "tipo_persona",
      headerName: "Tipo persona",
      width: 130,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Visibility"
            onClick={handleViewUniqueClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleUpdateClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
  }

  const fetchGetAllPersonasAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseGetAllPersonas = await getAllPersonas();

      errorHandlingInfo = checkResponseForErrors(responseGetAllPersonas);

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseGetAllPersonas.errorMessage);
        return false;
      }

      const personasMap = responseGetAllPersonas.data.map((persona) => {
        return {
          id: persona.id_persona,
          numero_empleado: persona.numero_empleado,
          nombre: persona.nombre,
          apellidos: persona.apellidos,
          genero: persona.genero,
          fecha_nacimiento: persona.fecha_nacimiento,
          dni: persona.dni,
          direccion: persona.direccion,
          numero_telefono: persona.numero_telefono,
          correo_electronico: persona.correo_electronico,
          tipo_persona: persona.tipo_persona.tipo_persona,
          id_tipo_persona: persona.tipo_persona.id_tipo_persona,
        };
      });
      setDataSource(personasMap);
      setTableLoading(false);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  };

  useEffect(() => {
    console.log("Pagina de personas: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllPersonasAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (personaFormUpdated === true) {
      fetchGetAllPersonasAndHandleErrors();
      setPersonaFormUpdated(false);
    } else if (personaDelete === true) {
      fetchGetAllPersonasAndHandleErrors();
      setPersonaDelete(false);
    }
  }, [personaFormUpdated, personaDelete]);

  function personaFormUpdatedTrigger() {
    setPersonaFormUpdated(!personaFormUpdated);
  }

  function toggleCreatePersonaForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdatePersonaForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniquePersonaForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nueva persona");
    
    toggleCreatePersonaForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");

    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdatePersonaForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);

    setIdPersonaSelected(id);
    setNamePersonaSelected(filaSeleccionada.nombre);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una persona");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniquePersonaForm();
  };

  const handleModalOk = async () => {
    try {
      const responseDeletePersona = await deletePersona(idPersonaSelected);

      errorHandlingInfo = checkResponseForErrors(responseDeletePersona);

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeletePersona.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseDeletePersona.errorMessage);
        return;
      }

      setPersonaDelete(true);
      resetStates();
    } catch (error) {
      console.error("Ha ocurrido algo inesperado");
    }
  };

  const handleModalClose = () => {
    resetStates();
  };

  function resetStates() {
    setShowFormCreate(false);
    setShowFormUpdate(false);
    setShowFormViewUnique(false);
    setShowDelete(false);
    setIdPersonaSelected(0);
    setNamePersonaSelected("");
  }

  const getJson = (apiRef) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    // Stringify with some indentation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
    return JSON.stringify(data, null, 2);
  };

  function getCsv(apiRef) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Header row
    let csv = visibleColumnsField.join(";") + "\n";

    // Data rows
    filteredSortedRowIds.forEach((id) => {
      const row = visibleColumnsField.map((field) => {
        return apiRef.current.getCellParams(id, field).value;
      });
      csv += row.join(";") + "\n";
    });

    return csv;
  }

  const exportBlob = (blob, filename) => {
    // Save the blob in a json file
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  function JsonExportMenuItem(props) {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const filename = "Personas.json";
          const jsonString = getJson(apiRef);
          const blob = new Blob([jsonString], {
            type: "text/json",
          });
          exportBlob(blob, filename);

          hideMenu?.();
        }}
      >
        Export JSON
      </MenuItem>
    );
  }

  function GridCsvExportMenuItem(props) {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const filename = "Personas.csv";
          const csvString = getCsv(apiRef);
          const blob = new Blob([csvString], {
            type: "text/csv",
          });
          exportBlob(blob, filename);

          hideMenu?.();
        }}
      >
        Export CSV
      </MenuItem>
    );
  }

  const csvOptions = { delimiter: ";" };

  function CustomExportButton(props) {
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
        <JsonExportMenuItem />
      </GridToolbarExportContainer>
    );
  }

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
        <CustomExportButton />
      </GridToolbarContainer>
    );
  }

  const renderTablePersona = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Eliminar a la siguiente persona ${namePersonaSelected}?`}
          open={showDelete}
          okText="Aceptar"
          onOk={handleModalOk}
          cancelText="Cancelar"
          onCancel={handleModalClose}
          centered
        >
          {errorMessage.length !== 0 && backendError === true && (
            <div>
              <p className={styles.BackendError}>
                <ErrorIcon fontSize="medium" color="red" />
                Error: {errorMessage}
              </p>
            </div>
          )}
        </Antd.Modal>
      );
    }

    return (
      <div>
        <Header />
        <h1>Personas</h1>
        <h2>
          <Link href={"/menu-recursos-humanos"}>Menu Recursos humanos</Link>
        </h2>
        <Box
          sx={{
            height: 700,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Añadir persona
          </Button>

          <DataGrid
            rows={dataSource}
            columns={columns}
            loading={tableLoading}
            localeText={LOCALIZED_COLUMN_MENU_TEXTS}
            checkboxSelection={false}
            disableRowSelectionOnClick={false}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
          {showDelete && deleteModal()}
        </Box>
        <Footer />
      </div>
    );
  };

  if (backendOrDDBBConnectionError === true) {
    return (
      <div>
        <ServerConnectionError message={errorMessage} />
      </div>
    );
  } else if (showFormCreate) {
    return (
      <div>
        <FormPersonas
          toggleForm={toggleCreatePersonaForm}
          personaDataForm={""}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPersonas>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormPersonas
          toggleForm={toggleUpdatePersonaForm}
          personaDataForm={rowSelected}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPersonas>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormPersonas
          toggleForm={toggleViewUniquePersonaForm}
          personaDataForm={rowSelected}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPersonas>
      </div>
    );
  } else {
    return renderTablePersona();
  }
}
