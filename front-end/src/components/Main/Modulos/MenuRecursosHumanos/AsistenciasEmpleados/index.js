import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import { useAuth } from "@/context/UserContext";
import {
  deleteAsistenciaEmpleado,
  getAllAsistenciaEmpleados,
} from "@/services/AsistenciaEmpleadoService";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import * as Antd from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormAsistenciasEmpleados from "./FormAsistenciasEmpleados";
import styles from "./styles.module.css";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function AsistenciasEmpleados() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idAsistenciaEmpleadoSelected, setIdAsistenciaEmpleadoSelected] =
    useState(0);

  const [
    dniPersonaAsistenciaEmpleadoSelected,
    setDniPersonaAsistenciaEmpleadoSelected,
  ] = useState("");
  const [fechaAsistenciaEmpleadoSelected, setFechaAsistenciaEmpleadoSelected] =
    useState("");

  const [asistenciaEmpleadoDelete, setAsistenciaEmpleadoDelete] =
    useState(false);
  const [asistenciaEmpleadoFormUpdated, setAsistenciaEmpleadoFormUpdated] =
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
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "fecha_asistencia",
      headerName: "Fecha asistencia",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_entrada",
      headerName: "Hora entrada",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_salida",
      headerName: "Hora salida",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "horas_trabajadas_dia",
      headerName: "Horas trabajadas",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "observacion",
      headerName: "Observación",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "personaInfo",
      headerName: "Datos de la persona",
      width: 280,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 140,
      headerClassName: "custom-header",
      headerAlign: "center",
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
          ...(permisosUser && permisosUser.borrar_asistencias
            ? [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ]
            : []),
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

  const fetchGetAllAsistenciasEmpleadosAndHandleErrors = async () => {
    setTableLoading(true);

    try {
      const responseGetAllAsistenciasEmpleados =
        await getAllAsistenciaEmpleados();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllAsistenciasEmpleados
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllAsistenciasEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const asistenciasEmpleadosMap =
        responseGetAllAsistenciasEmpleados.data.map((asistenciaEmpleado) => {
          const { nombre, apellidos, dni } = asistenciaEmpleado.persona;
          return {
            id: asistenciaEmpleado.id_asistencia_empleado,
            fecha_asistencia: asistenciaEmpleado.fecha_asistencia,
            hora_entrada: asistenciaEmpleado.hora_entrada,
            hora_salida: asistenciaEmpleado.hora_salida,
            horas_trabajadas_dia: asistenciaEmpleado.horas_trabajadas_dia,
            observacion: asistenciaEmpleado.observacion,
            id_persona: asistenciaEmpleado.persona.id_persona,
            personaInfo: `${nombre + " " + apellidos} - ${dni}`,
          };
        });

      setDataSource(asistenciasEmpleadosMap);
      setTableLoading(false);

      return true;
    } catch (error) {}
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllAsistenciasEmpleadosAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      asistenciaEmpleadoFormUpdated ||
      asistenciaEmpleadoDelete ||
      cancelOrExitClicked
    ) {
      fetchGetAllAsistenciasEmpleadosAndHandleErrors();
      setAsistenciaEmpleadoFormUpdated(false);
      setAsistenciaEmpleadoDelete(false);
      setCancelOrExitClicked(false);
    }
  }, [
    asistenciaEmpleadoFormUpdated,
    asistenciaEmpleadoDelete,
    cancelOrExitClicked,
  ]);

  function asistenciaEmpleadoFormUpdatedTrigger() {
    setAsistenciaEmpleadoFormUpdated(!asistenciaEmpleadoFormUpdated);
  }

  function asistenciaEmpleadoFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleCreateAsistenciaEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateAsistenciaEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueAsistenciaEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    toggleCreateAsistenciaEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleUpdateAsistenciaEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    const personaPorPartes = filaSeleccionada.personaInfo.split("-");

    setIdAsistenciaEmpleadoSelected(id);
    setDniPersonaAsistenciaEmpleadoSelected(personaPorPartes[1]);
    setFechaAsistenciaEmpleadoSelected(filaSeleccionada.fecha_asistencia);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleViewUniqueAsistenciaEmpleadoForm();
  };

  const handleModalOk = async () => {
    try {
      const responseDeleteAsistenciaEmpleado = await deleteAsistenciaEmpleado(
        idAsistenciaEmpleadoSelected
      );

      errorHandlingInfo = checkResponseForErrors(
        responseDeleteAsistenciaEmpleado
      );

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeleteAsistenciaEmpleado.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseDeleteAsistenciaEmpleado.errorMessage
        );
        return;
      }

      setAsistenciaEmpleadoDelete(true);
      resetStates();
    } catch (error) {}
  };

  const handleModalClose = () => {
    resetStates();
  };

  function resetStates() {
    setShowFormCreate(false);
    setShowFormUpdate(false);
    setShowFormViewUnique(false);
    setShowDelete(false);
    setIdAsistenciaEmpleadoSelected(0);
    setDniPersonaAsistenciaEmpleadoSelected("");
    setFechaAsistenciaEmpleadoSelected("");
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
          const filename = "AsistenciasEmpleados.json";
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
          const filename = "AsistenciasEmpleados.csv";
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

  const renderTableAsistenciaEmpleado = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar la asistencia asociadas al DNI ${dniPersonaAsistenciaEmpleadoSelected} en esta fecha ${fechaAsistenciaEmpleadoSelected}?`}
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
        <h1>Asistencia Empleados</h1>
        <h2>
          <Link href={"/menu-recursos-humanos"}>Menú Recursos humanos</Link>
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
            "& .custom-header": {
              backgroundColor: "#e0e7fa",
              color: "#333",
              fontWeight: "bold",
              fontFamily: "fangsong",
              borderBottom: "2px solid #ccc",
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ccc",
              borderRight: "1px solid #ccc",
            },
          }}
        >
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Añadir asistencia empleado
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

  if (backendOrDDBBConnectionError) {
    return (
      <div>
        <ServerConnectionError message={errorMessage} />
      </div>
    );
  } else if (showFormCreate) {
    return (
      <div>
        <FormAsistenciasEmpleados
          toggleForm={toggleCreateAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={""}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            asistenciaEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAsistenciasEmpleados>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormAsistenciasEmpleados
          toggleForm={toggleUpdateAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            asistenciaEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAsistenciasEmpleados>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormAsistenciasEmpleados
          toggleForm={toggleViewUniqueAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            asistenciaEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormAsistenciasEmpleados>
      </div>
    );
  } else {
    return renderTableAsistenciaEmpleado();
  }
}
