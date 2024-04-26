import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
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
import FormVacacionesEmpleados from "./FormVacacionesEmpleados";
import * as Antd from "antd";
import Link from "next/link";
import {
  deleteVacacionEmpleado,
  getAllVacacionesEmpleados,
} from "@/services/VacacionEmpleadoService";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import styles from "./styles.module.css";
import HistorialVacacionesAutorizadas from "./HistorialVacacionesAutorizadas";
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

export default function VacacionesEmpleados() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [
    showHistorialVacacionesAutorizadas,
    setShowHistorialVacacionesAutorizadas,
  ] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idVacacionEmpleadoSelected, setIdVacacionEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaVacacionEmpleadoSelected,
    setDniPersonaVacacionEmpleadoSelected,
  ] = useState("");
  const [
    fechaInicioAndFinVacacionEmpleadoSelected,
    setFechaInicioAndFinVacacionEmpleadoSelected,
  ] = useState([]);

  const [vacacionEmpleadoDelete, setVacacionEmpleadoDelete] = useState(false);
  const [vacacionEmpleadoFormUpdated, setVacacionEmpleadoFormUpdated] =
    useState(false);

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rowSelected, setRowSelected] = useState(null);
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
      field: "fecha_inicio",
      headerName: "Fecha inicio",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "fecha_fin",
      headerName: "Fecha fin",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dias_disponibles",
      headerName: "Días disponibles",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dias_pendientes",
      headerName: "Días pendientes",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dias_solicitados",
      headerName: "Días solicitados",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dias_disfrutados",
      headerName: "Días disfrutados",
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
      field: "tipo_estado",
      headerName: "Tipo estado",
      width: 180,
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
          ...(permisosUser && permisosUser.borrar_vacaciones
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

  const fetchGetAllVacacionesEmpleadosAndHandleErrors = async () => {
    setTableLoading(true);

    try {
      const responseGetAllVacacionesEmpleados =
        await getAllVacacionesEmpleados();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllVacacionesEmpleados
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllVacacionesEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const vacacionesEmpleadosMap = responseGetAllVacacionesEmpleados.data.map(
        (vacacionEmpleado) => {
          const { nombre, apellidos, dni } = vacacionEmpleado.persona;

          return {
            id: vacacionEmpleado.id_vacacion_empleado,
            fecha_inicio: vacacionEmpleado.fecha_inicio,
            fecha_fin: vacacionEmpleado.fecha_fin,
            dias_disponibles: vacacionEmpleado.dias_disponibles,
            dias_pendientes: vacacionEmpleado.dias_pendientes,
            dias_solicitados: vacacionEmpleado.dias_solicitados,
            dias_disfrutados: vacacionEmpleado.dias_disfrutados,
            observacion: vacacionEmpleado.observacion,
            id_persona: vacacionEmpleado.persona.id_persona,
            personaInfo: `${nombre + " " + apellidos} - ${dni}`,
            tipo_estado: vacacionEmpleado.tipo_estado.tipo_estado,
            id_tipo_estado: vacacionEmpleado.tipo_estado.id_tipo_estado,
            hash_transaccion_vacacion:
              vacacionEmpleado.hash_transaccion_vacacion,
            hash_block: vacacionEmpleado.hash_block,
            previous_hash_block: vacacionEmpleado.previous_hash_block,
            error_blockchain: vacacionEmpleado.error_blockchain,
            gestionado_con_blockchain:
              vacacionEmpleado.gestionado_con_blockchain,
          };
        }
      );

      setDataSource(vacacionesEmpleadosMap);
      setTableLoading(false);

      return true;
    } catch (error) {
      // console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllVacacionesEmpleadosAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      vacacionEmpleadoFormUpdated ||
      vacacionEmpleadoDelete ||
      cancelOrExitClicked
    ) {
      fetchGetAllVacacionesEmpleadosAndHandleErrors();
      setVacacionEmpleadoFormUpdated(false);
      setVacacionEmpleadoDelete(false);
      setCancelOrExitClicked(false);
    }
  }, [
    vacacionEmpleadoFormUpdated,
    vacacionEmpleadoDelete,
    cancelOrExitClicked,
  ]);

  function vacacionEmpleadoFormUpdatedTrigger() {
    setVacacionEmpleadoFormUpdated(!vacacionEmpleadoFormUpdated);
  }

  function vacacionEmpleadoFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleCreateVacacionEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateVacacionEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueVacacionEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  function toggleShowHistorialVacacionesAutorizadas() {
    setShowHistorialVacacionesAutorizadas(!showHistorialVacacionesAutorizadas);
  }

  const handleCreateClick = () => {
    toggleCreateVacacionEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleUpdateVacacionEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    const personaPorPartes = filaSeleccionada.personaInfo.split("-");

    setIdVacacionEmpleadoSelected(id);
    setDniPersonaVacacionEmpleadoSelected(personaPorPartes[1]);
    setFechaInicioAndFinVacacionEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleViewUniqueVacacionEmpleadoForm();
  };

  const handleShowHistorialVacacionesAutorizadasClick = () => {
    toggleShowHistorialVacacionesAutorizadas();
  };

  const handleModalOk = async () => {
    try {
      const responseDeleteVacacionEmpleado = await deleteVacacionEmpleado(
        idVacacionEmpleadoSelected
      );

      errorHandlingInfo = checkResponseForErrors(
        responseDeleteVacacionEmpleado
      );

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeleteVacacionEmpleado.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseDeleteVacacionEmpleado.errorMessage
        );
        return;
      }

      setVacacionEmpleadoDelete(true);
      resetStates();
    } catch (error) {
      // console.error("Ha ocurrido algo inesperado", error);
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
    setIdVacacionEmpleadoSelected(0);
    setDniPersonaVacacionEmpleadoSelected("");
    setFechaInicioAndFinVacacionEmpleadoSelected([]);
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
          const filename = "VacacionesEmpleados.json";
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
          const filename = "VacacionesEmpleados.csv";
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

  const renderTableVacacionesEmpleados = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar las vacaciones asociadas a la persona con dni ${dniPersonaVacacionEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinVacacionEmpleadoSelected[0]} hasta el ${fechaInicioAndFinVacacionEmpleadoSelected[1]}?`}
          open={showDelete}
          okText="Aceptar"
          onOk={handleModalOk}
          cancelText="Cancelar"
          onCancel={handleModalClose}
          centered
        >
          {errorMessage.length !== 0 && backendError && (
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
        <h1>Vacaciones Empleados</h1>
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
            "& .highlighted-rowErrorBlockchainRow": {
              backgroundColor: "#ffcccc",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#ffa8a8",
              },
            },
            "& .highlighted-rowNoErrorBlockchainRow": {
              backgroundColor: "#4CAF50",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#4CAF50",
              },
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ccc",
              borderRight: "1px solid #ccc",
            },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
            >
              Añadir vacación empleado
            </Button>

            <Button
              color="primary"
              startIcon={<HistoryIcon />}
              onClick={handleShowHistorialVacacionesAutorizadasClick}
            >
              {" "}
              Historial Vacaciones Autorizadas
            </Button>
          </div>

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
            getRowClassName={(params) => {
              if (
                params.row.gestionado_con_blockchain &&
                !params.row.error_blockchain
              ) {
                return "highlighted-rowNoErrorBlockchainRow";
              } else if (
                params.row.gestionado_con_blockchain &&
                params.row.error_blockchain
              ) {
                return "highlighted-rowErrorBlockchainRow";
              } else {
                return "";
              }
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
        <FormVacacionesEmpleados
          toggleForm={toggleCreateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={""}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            vacacionEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormVacacionesEmpleados>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormVacacionesEmpleados
          toggleForm={toggleUpdateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            vacacionEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormVacacionesEmpleados>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormVacacionesEmpleados
          toggleForm={toggleViewUniqueVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            vacacionEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormVacacionesEmpleados>
      </div>
    );
  } else if (showHistorialVacacionesAutorizadas) {
    return (
      <div>
        <HistorialVacacionesAutorizadas
          toggleView={toggleShowHistorialVacacionesAutorizadas}
          cancelOrExitClickTrigger={
            vacacionEmpleadoFormClickCancelOrExitTrigger
          }
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></HistorialVacacionesAutorizadas>
      </div>
    );
  } else {
    return renderTableVacacionesEmpleados();
  }
}
