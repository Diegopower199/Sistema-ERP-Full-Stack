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
import * as Antd from "antd";
import Link from "next/link";
import {
  deleteSolicitudEmpleado,
  getAllSolicitudesEmpleados,
} from "@/services/SolicitudEmpleadoService";
import FormSolicitudesEmpleados from "./FormSolicitudesEmpleados";
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
  noContent: false,
};

export default function SolicitudesEmpleados() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idSolicitudEmpleadoSelected, setIdSolicitudEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaSolicitudEmpleadoSelected,
    setDniPersonaSolicitudEmpleadoSelected,
  ] = useState("");
  const [fechaSolicitudEmpleadoSelected, setFechaSolicitudEmpleadoSelected] =
    useState("");

  const [solicitudEmpleadoDelete, setSolicitudEmpleadoDelete] = useState(false);
  const [solicitudEmpleadoFormUpdated, setSolicitudEmpleadoFormUpdated] =
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
      field: "fecha_solicitud",
      headerName: "Fecha solicitud",
      width: 180,
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
      field: "tipo_solicitud",
      headerName: "Tipo solicitud",
      width: 180,
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
          ...(permisosUser && permisosUser.borrar_solicitudes
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

  const fetchGetAllSolicitudesEmpleadosAndHandleErrors = async () => {
    setTableLoading(true);

    try {
      const responseGetAllSolicitudesEmpleados =
        await getAllSolicitudesEmpleados();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllSolicitudesEmpleados
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllSolicitudesEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const solicitudesEmpleadosMap =
        responseGetAllSolicitudesEmpleados.data.map((solicitudEmpleado) => {
          const { nombre, apellidos, dni } = solicitudEmpleado.persona;

          return {
            id: solicitudEmpleado.id_solicitud_empleado,
            fecha_solicitud: solicitudEmpleado.fecha_solicitud,
            observacion: solicitudEmpleado.observacion,
            id_persona: solicitudEmpleado.persona.id_persona,
            personaInfo: `${nombre + " " + apellidos} - ${dni}`,
            tipo_solicitud: solicitudEmpleado.tipo_solicitud.tipo_solicitud,
            id_tipo_solicitud:
              solicitudEmpleado.tipo_solicitud.id_tipo_solicitud,
            tipo_estado: solicitudEmpleado.tipo_estado.tipo_estado,
            id_tipo_estado: solicitudEmpleado.tipo_estado.id_tipo_estado,
          };
        });

      setDataSource(solicitudesEmpleadosMap);
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
      fetchGetAllSolicitudesEmpleadosAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      solicitudEmpleadoFormUpdated ||
      solicitudEmpleadoDelete ||
      cancelOrExitClicked
    ) {
      fetchGetAllSolicitudesEmpleadosAndHandleErrors();
      setSolicitudEmpleadoFormUpdated(false);
      setSolicitudEmpleadoDelete(false);
      setCancelOrExitClicked(false);
    }
  }, [
    solicitudEmpleadoFormUpdated,
    solicitudEmpleadoDelete,
    cancelOrExitClicked,
  ]);

  function solicitudEmpleadoFormUpdatedTrigger() {
    setSolicitudEmpleadoFormUpdated(!solicitudEmpleadoFormUpdated);
  }

  function solicitudEmpleadoFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleCreateSolicitudEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateSolicitudEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueSolicitudEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    toggleCreateSolicitudEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleUpdateSolicitudEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    const personaPorPartes = filaSeleccionada.personaInfo.split("-");

    setIdSolicitudEmpleadoSelected(id);
    setFechaSolicitudEmpleadoSelected(filaSeleccionada.fecha_solicitud);
    setDniPersonaSolicitudEmpleadoSelected(personaPorPartes[1]);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleViewUniqueSolicitudEmpleadoForm();
  };

  const handleModalOk = async () => {
    try {
      const responseDeleteSolicitudEmpleado = await deleteSolicitudEmpleado(
        idSolicitudEmpleadoSelected
      );

      errorHandlingInfo = checkResponseForErrors(
        responseDeleteSolicitudEmpleado
      );

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeleteSolicitudEmpleado.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseDeleteSolicitudEmpleado.errorMessage
        );
        return;
      }

      setSolicitudEmpleadoDelete(true);
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
    setIdSolicitudEmpleadoSelected(0);
    setDniPersonaSolicitudEmpleadoSelected("");
    setFechaSolicitudEmpleadoSelected("");
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
          const filename = "SolicitudesEmpleados.json";
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
          const filename = "SolicitudesEmpleados.csv";
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

  const renderTableSolicitudEmpleado = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar la solicitud asociada a la persona con DNI ${dniPersonaSolicitudEmpleadoSelected} en la fecha ${fechaSolicitudEmpleadoSelected}?`}
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
        <h1>Solicitudes Empleados</h1>
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
              color: "#1a3e72",
              fontWeight: "bold",
              fontFamily: "fangsong",
              borderBottom: "2px solid #ccc",
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ccc",
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-cell": {},
          }}
        >
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Añadir solicitud empleado
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
        <FormSolicitudesEmpleados
          toggleForm={toggleCreateSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={""}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            solicitudEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormSolicitudesEmpleados>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormSolicitudesEmpleados
          toggleForm={toggleUpdateSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={rowSelected}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            solicitudEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormSolicitudesEmpleados>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormSolicitudesEmpleados
          toggleForm={toggleViewUniqueSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={rowSelected}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            solicitudEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormSolicitudesEmpleados>
      </div>
    );
  } else {
    return renderTableSolicitudEmpleado();
  }
}
