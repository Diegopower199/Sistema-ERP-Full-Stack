import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import * as Antd from "antd";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import styles from "./styles.module.css";
import {
  checkVacacionesAutorizadas,
  getAllTransaccionesVacacionesAutorizadas,
} from "@/services/BlockchainVacacionAutorizadaService";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function HistorialVacacionesAutorizadas({
  toggleView,
  cancelOrExitClickTrigger,
}) {
  const [tableLoading, setTableLoading] = useState(true);

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
      field: "dni",
      headerName: "Dni persona",
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
      field: "hashTransaccionVacacion",
      headerName: "Hash transacción vacación",
      width: 580,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hashBlock",
      headerName: "Hash block",
      width: 580,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "previousHashBlock",
      headerName: "Previous hash block",
      width: 580,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
  ];

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
  }

  const fetchCheckVacacionesAutorizadasAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseCheckVacacionesAutorizadas =
        await checkVacacionesAutorizadas();

      errorHandlingInfo = checkResponseForErrors(
        responseCheckVacacionesAutorizadas
      );

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseCheckVacacionesAutorizadas.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchGetAllTransaccionesVacacionesAutorizadasAndHandleErrors =
    async () => {
      try {
        setTableLoading(true);
        const responseGetAllTransaccionesVacacionesAutorizadas =
          await getAllTransaccionesVacacionesAutorizadas();

        errorHandlingInfo = checkResponseForErrors(
          responseGetAllTransaccionesVacacionesAutorizadas
        );

        if (errorHandlingInfo.noContent) {
          setDataSource([]);
          setTableLoading(false);
          return false;
        }

        if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseGetAllTransaccionesVacacionesAutorizadas.errorMessage
          );
          setTableLoading(false);
          return false;
        }

        const vacacionesEmpleadosMap =
          responseGetAllTransaccionesVacacionesAutorizadas.data.map(
            (transaccionVacacionAutorizada) => {
              return {
                id: transaccionVacacionAutorizada.index,
                fecha_inicio:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .fecha_inicio,
                fecha_fin:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .fecha_fin,
                dias_disponibles:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .dias_disponibles,
                dias_pendientes:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .dias_pendientes,
                dias_solicitados:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .dias_solicitados,
                dias_disfrutados:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .dias_disfrutados,
                observacion:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .observacion,
                dni: transaccionVacacionAutorizada.dataTransaccionVacacion.dni,
                tipo_estado:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .tipo_estado,
                hashTransaccionVacacion:
                  transaccionVacacionAutorizada.dataTransaccionVacacion
                    .hashTransaccionVacacion,
                hashBlock: transaccionVacacionAutorizada.hashBlock,
                previousHashBlock:
                  transaccionVacacionAutorizada.previousHashBlock,
              };
            }
          );

        setDataSource(vacacionesEmpleadosMap);
        setTableLoading(false);

        return true;
      } catch (error) {
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected =
          await fetchCheckVacacionesAutorizadasAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected =
          await fetchGetAllTransaccionesVacacionesAutorizadasAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }
      } catch (error) {
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

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
          const filename = "HistorialVacacionesAutorizadas.json";
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
          const filename = "HistorialVacacionesAutorizadas.csv";
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

  const renderTableHistorialVacacionAutorizada = () => {
    const renderErrorMessage = () => (
      <div className={styles.BackendError}>{errorMessage}</div>
    );

    const renderMainContent = () => (
      <div>
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
      </div>
    );

    return (
      <div>
        <Header />
        <h1>Historial Vacaciones Autorizadas</h1>

        <Antd.Button
          onClick={() => {
            toggleView();
            cancelOrExitClickTrigger();
          }}
        >
          Salir
        </Antd.Button>

        {errorMessage.length !== 0 && backendOrDDBBConnectionError
          ? renderErrorMessage()
          : renderMainContent()}
        <Footer />
      </div>
    );
  };

  return renderTableHistorialVacacionAutorizada();
}
