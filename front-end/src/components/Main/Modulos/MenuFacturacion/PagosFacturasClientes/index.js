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
  deleteVacacionEmpleado,
  getAllVacacionesEmpleados,
} from "@/services/VacacionEmpleadoService";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import FormPagosFacturasClientes from "./FormPagosFacturasClientes";
import styles from "./styles.module.css";
import { getAllPagosFacturasClientes } from "@/services/PagoFacturaClienteService";
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

export default function PagosFacturasClientes() {
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
      field: "fecha_pago_realizada",
      headerName: "Fecha pago realizada",
      width: 180,
      editable: false,
    },
    {
      field: "importe_pagado",
      headerName: "Importe pagado",
      width: 180,
      editable: false,
    },
    {
      field: "metodo_pago",
      headerName: "Metodo pago",
      width: 180,
      editable: false,
    },
    {
      field: "id_factura_cliente",
      headerName: "ID factura cliente",
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

  const fetchGetAllPagosFacturasClientesAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseGetAllPagosFacturasClientes =
        await getAllPagosFacturasClientes();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllPagosFacturasClientes
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllPagosFacturasClientes.errorMessage
        );
        setTableLoading(false);
        return false;
      }
      
      const pagosFacturasClientesMap =
        responseGetAllPagosFacturasClientes.data.map((pagoFacturaCliente) => {
          return {
            id: pagoFacturaCliente.id_pago_factura_cliente,
            fecha_pago_realizada: pagoFacturaCliente.fecha_pago_realizada,
            importe_pagado: pagoFacturaCliente.importe_pagado,
            metodo_pago: pagoFacturaCliente.metodo_pago,
            id_factura_cliente:
              pagoFacturaCliente.factura_cliente.id_factura_cliente,
          };
        });

      setDataSource(pagosFacturasClientesMap);
      setTableLoading(false);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllPagosFacturasClientesAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      vacacionEmpleadoFormUpdated ||
      vacacionEmpleadoDelete ||
      cancelOrExitClicked
    ) {
      fetchGetAllPagosFacturasClientesAndHandleErrors();
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

  function pagoFacturaClienteFormClickCancelOrExitTrigger() {
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

  const handleCreateClick = () => {
    toggleCreateVacacionEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateVacacionEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => row.id === id);

    setIdVacacionEmpleadoSelected(id);
    setDniPersonaVacacionEmpleadoSelected(filaSeleccionada.dni);
    setFechaInicioAndFinVacacionEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueVacacionEmpleadoForm();
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
          const filename = "PagosFacturasClientes.json";
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
          const filename = "PagosFacturasClientes.csv";
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

  const renderTableVacacionEmpleado = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar las vacaciones asociadas a la persona con DNI ${dniPersonaVacacionEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinVacacionEmpleadoSelected[0]} hasta el ${fechaInicioAndFinVacacionEmpleadoSelected[1]}?`}
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
        <h1>Pagos Facturas Clientes</h1>
        <h2>
          <Link href={"/menu-facturacion"}>Menu Facturacion</Link>
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
            Añadir pago factura cliente
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
        <FormPagosFacturasClientes
          toggleForm={toggleCreateVacacionEmpleadoForm}
          pagoFacturaClienteDataForm={""}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            pagoFacturaClienteFormClickCancelOrExitTrigger
          }
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPagosFacturasClientes>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormPagosFacturasClientes
          toggleForm={toggleUpdateVacacionEmpleadoForm}
          pagoFacturaClienteDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            pagoFacturaClienteFormClickCancelOrExitTrigger
          }
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPagosFacturasClientes>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormPagosFacturasClientes
          toggleForm={toggleViewUniqueVacacionEmpleadoForm}
          pagoFacturaClienteDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={
            pagoFacturaClienteFormClickCancelOrExitTrigger
          }
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPagosFacturasClientes>
      </div>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
