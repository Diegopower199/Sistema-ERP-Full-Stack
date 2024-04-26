import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
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
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import FormPagosFacturasClientes from "./FormPagosFacturasClientes";
import styles from "./styles.module.css";
import { getAllPagosFacturasClientes } from "@/services/PagoFacturaClienteService";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function PagosFacturasClientes() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [pagoFacturaClienteFormUpdated, setPagoFacturaClienteFormUpdated] =
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
      field: "fecha_pago_realizada",
      headerName: "Fecha pago realizada",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "importe_pagado",
      headerName: "Importe pagado",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "metodo_pago",
      headerName: "Método pago",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "id_factura_cliente",
      headerName: "ID factura cliente",
      width: 200,
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
    setTableLoading(true);

    try {
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
      // console.error("Ha ocurrido algo inesperado", error);
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
    if (pagoFacturaClienteFormUpdated || cancelOrExitClicked) {
      fetchGetAllPagosFacturasClientesAndHandleErrors();
      setPagoFacturaClienteFormUpdated(false);
      setCancelOrExitClicked(false);
    }
  }, [pagoFacturaClienteFormUpdated, cancelOrExitClicked]);

  function pagoFacturaClienteFormUpdatedTrigger() {
    setPagoFacturaClienteFormUpdated(!pagoFacturaClienteFormUpdated);
  }

  function pagoFacturaClienteFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleCreatePagoFacturaClienteForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdatePagoFacturaClienteForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniquePagoFacturaClienteForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    toggleCreatePagoFacturaClienteForm();
  };

  const handleUpdateClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleUpdatePagoFacturaClienteForm();
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleViewUniquePagoFacturaClienteForm();
  };

  function resetStates() {
    setShowFormCreate(false);
    setShowFormUpdate(false);
    setShowFormViewUnique(false);
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

  const renderTablePagoFacturaCliente = () => {
    return (
      <div>
        <Header />
        <h1>Pagos Facturas Clientes</h1>
        <h2>
          <Link href={"/menu-facturacion"}>Menú Facturación</Link>
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
        <FormPagosFacturasClientes
          toggleForm={toggleCreatePagoFacturaClienteForm}
          pagoFacturaClienteDataForm={""}
          formUpdateTrigger={pagoFacturaClienteFormUpdatedTrigger}
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
          toggleForm={toggleUpdatePagoFacturaClienteForm}
          pagoFacturaClienteDataForm={rowSelected}
          formUpdateTrigger={pagoFacturaClienteFormUpdatedTrigger}
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
          toggleForm={toggleViewUniquePagoFacturaClienteForm}
          pagoFacturaClienteDataForm={rowSelected}
          formUpdateTrigger={pagoFacturaClienteFormUpdatedTrigger}
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
    return renderTablePagoFacturaCliente();
  }
}
