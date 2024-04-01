import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
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
import { getAllTransaccionesVacacionesAutorizadas } from "@/services/BlockchainVacacionAutorizadaService";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

export default function HistorialVacacionesAutorizadas({ toggleView }) {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  const [tableLoading, setTableLoading] = useState(true);

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
      field: "dias_disponibles",
      headerName: "Dias disponibles",
      width: 180,
      editable: false,
    },
    {
      field: "dias_pendientes",
      headerName: "Dias pendientes",
      width: 180,
      editable: false,
    },
    {
      field: "dias_solicitados",
      headerName: "Dias solicitados",
      width: 180,
      editable: false,
    },
    {
      field: "dias_disfrutados",
      headerName: "Dias disfrutados",
      width: 130,
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
      field: "tipo_estado",
      headerName: "Tipo estado",
      width: 180,
      editable: false,
    },
    {
      field: "hashTransaccionVacacion",
      headerName: "Hash transaccion vacacion",
      width: 280,
      editable: false,
    },
    {
      field: "hashBlock",
      headerName: "Hash block",
      width: 280,
      editable: false,
    },
    {
      field: "hashPreviousHash",
      headerName: "Hash previous hash",
      width: 280,
      editable: false,
    },
  ];

  const fetchGetAllTransaccionesVacacionesAutorizadas = async () => {
    try {
      setTableLoading(true);
      const responseGetAllTransaccionesVacacionesAutorizadas =
        await getAllTransaccionesVacacionesAutorizadas();

      console.log(
        "responseReadAllTransaccionesVacacionesAutorizadas: ",
        responseGetAllTransaccionesVacacionesAutorizadas
      );
      if (responseGetAllTransaccionesVacacionesAutorizadas.status === 200) {
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
                  transaccionVacacionAutorizada.dataTransaccionVacacion.hash,
                hashBlock: transaccionVacacionAutorizada.hash,
                hashPreviousHash: transaccionVacacionAutorizada.previousHash,
              };
            }
          );
        setDataSource(vacacionesEmpleadosMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de historial vacaciones autorizadas: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllTransaccionesVacacionesAutorizadas();
    }
  }, [authUser]);

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
    return (
      <div>
        <Header />
        <h1>Historial Vacaciones Autorizadas</h1>

        <button onClick={toggleView}>Salir</button>
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

  return renderTableHistorialVacacionAutorizada();
}
