import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import { useAuth } from "@/context/UserContext";
import {
  deleteBajaLaboralEmpleado,
  getAllBajasLaboralesEmpleados,
} from "@/services/BajaLaboralEmpleadoService";
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
import FormBajasLaboralesEmpleados from "./FormBajasLaboralesEmpleados";
import styles from "./styles.module.css";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function BajasLaboralesEmpleados() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idBajaLaboralEmpleadoSelected, setIdBajaLaboralEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaBajaLaboralEmpleadoSelected,
    setDniPersonaBajaLaboralEmpleadoSelected,
  ] = useState("");
  const [
    fechaInicioAndFinBajaLaboralEmpleadoSelected,
    setFechaInicioAndFinBajaLaboralEmpleadoSelected,
  ] = useState([]);

  const [bajaLaboralEmpleadoDelete, setBajaLaboralEmpleadoDelete] =
    useState(false);
  const [bajaLaboralEmpleadoFormUpdated, setBajaLaboralEmpleadoFormUpdated] =
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
      field: "motivo_baja",
      headerName: "Motivo de baja",
      width: 190,
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
          ...(permisosUser && permisosUser.borrar_bajas_laborales
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

  const fetchGetAllBajasLaboralesEmpleados = async () => {
    setTableLoading(true);

    try {
      const responseGetAllBajasLaboralesEmpleados =
        await getAllBajasLaboralesEmpleados();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllBajasLaboralesEmpleados
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllBajasLaboralesEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const bajasLaboralesEmpleadosMap =
        responseGetAllBajasLaboralesEmpleados.data.map(
          (bajaLaboralEmpleado) => {
            const { nombre, apellidos, dni } = bajaLaboralEmpleado.persona;

            return {
              id: bajaLaboralEmpleado.id_baja_laboral_empleado,
              fecha_inicio: bajaLaboralEmpleado.fecha_inicio,
              fecha_fin: bajaLaboralEmpleado.fecha_fin,
              observacion: bajaLaboralEmpleado.observacion,
              id_persona: bajaLaboralEmpleado.persona.id_persona,
              personaInfo: `${nombre + " " + apellidos} - ${dni}`,
              motivo_baja: bajaLaboralEmpleado.motivo_baja.motivo_baja,
              id_motivo_baja: bajaLaboralEmpleado.motivo_baja.id_motivo_baja,
              tipo_estado: bajaLaboralEmpleado.tipo_estado.tipo_estado,
              id_tipo_estado: bajaLaboralEmpleado.tipo_estado.id_tipo_estado,
            };
          }
        );

      setDataSource(bajasLaboralesEmpleadosMap);
      setTableLoading(false);

      return true;
    } catch (error) {}
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllBajasLaboralesEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      bajaLaboralEmpleadoFormUpdated ||
      bajaLaboralEmpleadoDelete ||
      cancelOrExitClicked
    ) {
      fetchGetAllBajasLaboralesEmpleados();
      setBajaLaboralEmpleadoFormUpdated(false);
      setBajaLaboralEmpleadoDelete(false);
      setCancelOrExitClicked(false);
    }
  }, [
    bajaLaboralEmpleadoFormUpdated,
    bajaLaboralEmpleadoDelete,
    cancelOrExitClicked,
  ]);

  function bajaLaboralEmpleadoFormUpdatedTrigger() {
    setBajaLaboralEmpleadoFormUpdated(!bajaLaboralEmpleadoFormUpdated);
  }

  function bajaLaboralEmpleadoFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleCreateBajaLaboralEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateBajaLaboralEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueBajaLaboralEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    toggleCreateBajaLaboralEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleUpdateBajaLaboralEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    const personaPorPartes = filaSeleccionada.personaInfo.split("-");

    setIdBajaLaboralEmpleadoSelected(id);
    setDniPersonaBajaLaboralEmpleadoSelected(personaPorPartes[1]);
    setFechaInicioAndFinBajaLaboralEmpleadoSelected([
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
    toggleViewUniqueBajaLaboralEmpleadoForm();
  };

  const handleModalOk = async () => {
    try {
      const responseDeleteBajaLaboralEmpleado = await deleteBajaLaboralEmpleado(
        idBajaLaboralEmpleadoSelected
      );

      errorHandlingInfo = checkResponseForErrors(
        responseDeleteBajaLaboralEmpleado
      );

      if (errorHandlingInfo.backendError) {
        handleBackendError(responseDeleteBajaLaboralEmpleado.errorMessage);
        return;
      } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseDeleteBajaLaboralEmpleado.errorMessage
        );
        return;
      }

      setBajaLaboralEmpleadoDelete(true);
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
    setIdBajaLaboralEmpleadoSelected(0);
    setDniPersonaBajaLaboralEmpleadoSelected("");
    setFechaInicioAndFinBajaLaboralEmpleadoSelected([]);
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
          const filename = "BajasLaborales.json";
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
          const filename = "BajasLaborales.csv";
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

  const renderTableBajaLaboralEmpleado = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar las vacaciones asociadas al DNI ${dniPersonaBajaLaboralEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinBajaLaboralEmpleadoSelected[0]} hasta el ${fechaInicioAndFinBajaLaboralEmpleadoSelected[1]}?`}
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
        <h1>Bajas Laborales Empleados</h1>
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
            Añadir baja laboral empleado
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
        <FormBajasLaboralesEmpleados
          toggleForm={toggleCreateBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={""}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            bajaLaboralEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormBajasLaboralesEmpleados>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormBajasLaboralesEmpleados
          toggleForm={toggleUpdateBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={rowSelected}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            bajaLaboralEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormBajasLaboralesEmpleados>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormBajasLaboralesEmpleados
          toggleForm={toggleViewUniqueBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={rowSelected}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            bajaLaboralEmpleadoFormClickCancelOrExitTrigger
          }
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormBajasLaboralesEmpleados>
      </div>
    );
  } else {
    return renderTableBajaLaboralEmpleado();
  }
}
