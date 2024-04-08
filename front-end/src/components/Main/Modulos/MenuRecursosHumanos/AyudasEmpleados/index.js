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
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import * as Antd from "antd";
import Link from "next/link";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import {
  deleteAyudaEmpleado,
  getAllAyudasEmpleados,
} from "@/services/AyudaEmpleadoService";
import FormAyudasEmpleados from "./FormAyudasEmpleados";
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
  noContent: false,
};

export default function AyudasEmpleados() {
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

  const [idAyudaEmpleadoSelected, setIdAyudaEmpleadoSelected] = useState(0);
  const [dniPersonaAyudaEmpleadoSelected, setDniPersonaAyudaEmpleadoSelected] =
    useState("");
  const [
    fechaInicioAndFinAyudaEmpleadoSelected,
    setFechaInicioAndFinAyudaEmpleadoSelected,
  ] = useState([]);

  const [ayudaEmpleadoDelete, setAyudaEmpleadoDelete] = useState(false);
  const [ayudaEmpleadoFormUpdated, setAyudaEmpleadoFormUpdated] =
    useState(false);
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
      field: "fecha_inicio",
      headerName: "Fecha inicio",
      width: 180,
      editable: false,
    },
    {
      field: "fecha_fin",
      headerName: "Fecha fin",
      width: 180,
      editable: false,
    },
    {
      field: "valor_asociado",
      headerName: "Valor asociado",
      width: 180,
      editable: false,
    },
    {
      field: "observacion",
      headerName: "Observacion",
      width: 180,
      editable: false,
    },
    {
      field: "dni",
      headerName: "Dni persona",
      width: 180,
      editable: false,
    },
    {
      field: "tipo_ayuda",
      headerName: "Tipo ayuda",
      width: 180,
      editable: false,
    },
    {
      field: "tipo_estado",
      headerName: "Tipo estado",
      width: 180,
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

  const fetchGetAllAyudasEmpleadosAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseGetAllAyudasEmpleados = await getAllAyudasEmpleados();

      errorHandlingInfo = checkResponseForErrors(responseGetAllAyudasEmpleados);

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllAyudasEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const ayudasEmpleadosMap = responseGetAllAyudasEmpleados.data.map(
        (ayudaEmpleado) => {
          return {
            id: ayudaEmpleado.id_ayuda_empleado,
            fecha_inicio: ayudaEmpleado.fecha_inicio,
            fecha_fin: ayudaEmpleado.fecha_fin,
            valor_asociado: ayudaEmpleado.valor_asociado,
            observacion: ayudaEmpleado.observacion,
            id_persona: ayudaEmpleado.persona.id_persona,
            dni: ayudaEmpleado.persona.dni,
            tipo_ayuda: ayudaEmpleado.tipo_ayuda.tipo_ayuda,
            id_tipo_ayuda: ayudaEmpleado.tipo_ayuda.id_tipo_ayuda,
            tipo_estado: ayudaEmpleado.tipo_estado.tipo_estado,
            id_tipo_estado: ayudaEmpleado.tipo_estado.id_tipo_estado,
          };
        }
      );
      setDataSource(ayudasEmpleadosMap);

      setTableLoading(false);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de ayudas empleados: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllAyudasEmpleadosAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (ayudaEmpleadoFormUpdated === true) {
      fetchGetAllAyudasEmpleadosAndHandleErrors();
      setAyudaEmpleadoFormUpdated(false);
    } else if (ayudaEmpleadoDelete === true) {
      fetchGetAllAyudasEmpleadosAndHandleErrors();
      setAyudaEmpleadoDelete(false);
    }
  }, [ayudaEmpleadoFormUpdated, ayudaEmpleadoDelete]);

  function ayudaEmpleadoFormUpdatedTrigger() {
    setAyudaEmpleadoFormUpdated(!ayudaEmpleadoFormUpdated);
  }

  function toggleCreateAyudaEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateAyudaEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueAyudaEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nueva ayuda empleado");

    toggleCreateAyudaEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");

    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateAyudaEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);

    setIdAyudaEmpleadoSelected(id);
    setDniPersonaAyudaEmpleadoSelected(filaSeleccionada.dni);
    setFechaInicioAndFinAyudaEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una ayuda empleado");

    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueAyudaEmpleadoForm();
  };

  const handleModalOk = async () => {
    try {
      const responseDeleteAyudaEmpleado = await deleteAyudaEmpleado(
        idAyudaEmpleadoSelected
      );

      errorHandlingInfo = checkResponseForErrors(responseDeleteAyudaEmpleado);

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeleteAyudaEmpleado.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseDeleteAyudaEmpleado.errorMessage
        );
        return;
      }

      setAyudaEmpleadoDelete(true);
      resetStates();
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
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
    setIdAyudaEmpleadoSelected(0);
    setDniPersonaAyudaEmpleadoSelected("");
    setFechaInicioAndFinAyudaEmpleadoSelected([]);
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
          const filename = "AyudasEmpleados.json";
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
          const filename = "AyudasEmpleados.csv";
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

  const renderTableAyudaEmpleado = () => {
    // Hacer aqui el deleteModal

    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar la ayuda asociada al DNI ${dniPersonaAyudaEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinAyudaEmpleadoSelected[0]} hasta el ${fechaInicioAndFinAyudaEmpleadoSelected[1]}?`}
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
        <h1>Ayudas Empleados</h1>
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
            Añadir ayuda empleado
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
        <FormAyudasEmpleados
          toggleForm={toggleCreateAyudaEmpleadoForm}
          ayudaEmpleadoDataForm={""}
          formUpdateTrigger={ayudaEmpleadoFormUpdatedTrigger}
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAyudasEmpleados>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormAyudasEmpleados
          toggleForm={toggleUpdateAyudaEmpleadoForm}
          ayudaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={ayudaEmpleadoFormUpdatedTrigger}
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAyudasEmpleados>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormAyudasEmpleados
          toggleForm={toggleViewUniqueAyudaEmpleadoForm}
          ayudaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={ayudaEmpleadoFormUpdatedTrigger}
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAyudasEmpleados>
      </div>
    );
  } else {
    return renderTableAyudaEmpleado();
  }
}
