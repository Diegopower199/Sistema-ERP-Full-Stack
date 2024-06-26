import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import { useAuth } from "@/context/UserContext";
import {
  generateFacturasClientes,
  getAllFacturasClientes,
} from "@/services/FacturaClienteService";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import AddIcon from "@mui/icons-material/Add";
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
import FormFacturasClientes from "./FormFacturasClientes";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FacturasClientes() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showModalGenerate, setShowModalGenerate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [facturaClienteFormUpdated, setFacturaClienteFormUpdated] =
    useState(false);

  const [facturaClienteGenerateUpdated, setFacturaClienteGenerateUpdated] =
    useState(false);

  const [
    contadorFacturasClientesGeneradas,
    setContadorFacturasClientesGeneradas,
  ] = useState(0);
  const [
    cargandoInformacionFacturasClientes,
    setCargandoInformacionFacturasClientes,
  ] = useState(false);
  const [
    aceptarBotonParaVerResultadosFacturasClientes,
    setAceptarBotonParaVerResultadosFacturasClientes,
  ] = useState(false);

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
    useState(false);

  const [rowSelected, setRowSelected] = useState(null);

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
      field: "descripcion_servicio",
      headerName: "Descripción servicio",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "direccion_entrega",
      headerName: "Dirección entrega",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_inicio_desplazamiento",
      headerName: "Hora inicio desplazamiento",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_fin_desplazamiento",
      headerName: "Hora fin desplazamiento",
      width: 230,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "tiempo_desplazamiento_total",
      headerName: "Tiempo desplazamiento total",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_inicio_servicio",
      headerName: "Hora inicio servicio",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hora_fin_servicio",
      headerName: "Hora fin servicio",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "tiempo_servicio_total",
      headerName: "Tiempo servicio total",
      width: 205,
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
      field: "fecha_entrega_real_pedido",
      headerName: "Fecha entrega real pedido",
      width: 230,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "fecha_factura_emitida",
      headerName: "Fecha factura emitida",
      width: 210,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "tarifa_hora_desplazamiento",
      headerName: "Tarifa hora desplazamiento",
      width: 230,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "tarifa_hora_servicio",
      headerName: "Tarifa hora servicio",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "subtotal_factura_sin_iva",
      headerName: "Subtotal factura sin iva",
      width: 220,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "iva",
      headerName: "IVA",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "total_factura",
      headerName: "Total factura",
      width: 160,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "clienteInfo",
      headerName: "Datos del cliente",
      width: 280,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "id_pedido_cliente",
      headerName: "ID pedido cliente",
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

  const fetchGetAllFacturasClientesAndHandleErrors = async () => {
    setTableLoading(true);

    try {
      const responseGetAllFacturasClientes = await getAllFacturasClientes();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllFacturasClientes
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllFacturasClientes.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const facturasClientesMap = responseGetAllFacturasClientes.data.map(
        (facturaCliente) => {
          const { nombre_apellidos, razon_social, nif } =
            facturaCliente.cliente;
          const nombreOrRazonSocial = nombre_apellidos || razon_social;

          return {
            id: facturaCliente.id_factura_cliente,
            descripcion_servicio: facturaCliente.descripcion_servicio,
            direccion_entrega: facturaCliente.direccion_entrega,
            hora_inicio_desplazamiento:
              facturaCliente.hora_inicio_desplazamiento,
            hora_fin_desplazamiento: facturaCliente.hora_fin_desplazamiento,
            tiempo_desplazamiento_total:
              facturaCliente.tiempo_desplazamiento_total,
            hora_inicio_servicio: facturaCliente.hora_inicio_servicio,
            hora_fin_servicio: facturaCliente.hora_fin_servicio,
            tiempo_servicio_total: facturaCliente.tiempo_servicio_total,
            observacion: facturaCliente.observacion,
            fecha_entrega_real_pedido: facturaCliente.fecha_entrega_real_pedido,
            fecha_factura_emitida: facturaCliente.fecha_factura_emitida,
            tarifa_hora_desplazamiento:
              facturaCliente.tarifa_hora_desplazamiento,
            tarifa_hora_servicio: facturaCliente.tarifa_hora_servicio,
            subtotal_factura_sin_iva: facturaCliente.subtotal_factura_sin_iva,
            iva: facturaCliente.iva,
            total_factura: facturaCliente.total_factura,
            id_cliente: facturaCliente.cliente.id_cliente,
            nif_cliente: facturaCliente.cliente.nif,
            clienteInfo: `${nombreOrRazonSocial} - ${nif}`,
            id_pedido_cliente: facturaCliente.pedido_cliente.id_pedido_cliente,
            tipo_estado: facturaCliente.tipo_estado.tipo_estado,
            id_tipo_estado: facturaCliente.tipo_estado.id_tipo_estado,
          };
        }
      );

      setDataSource(facturasClientesMap);
      setTableLoading(false);

      return true;
    } catch (error) {}
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllFacturasClientesAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      facturaClienteFormUpdated ||
      facturaClienteGenerateUpdated ||
      cancelOrExitClicked
    ) {
      fetchGetAllFacturasClientesAndHandleErrors();
      setFacturaClienteFormUpdated(false);
      setFacturaClienteGenerateUpdated(false);
      setCancelOrExitClicked(false);
    }
  }, [
    facturaClienteFormUpdated,
    facturaClienteGenerateUpdated,
    cancelOrExitClicked,
  ]);

  function facturaClienteGenerateUpdatedTrigger() {
    setFacturaClienteGenerateUpdated(!facturaClienteGenerateUpdated);
  }

  function facturaClienteFormUpdatedTrigger() {
    setFacturaClienteFormUpdated(!facturaClienteFormUpdated);
  }

  function facturaClienteFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleGenerateFacturasClientesModal() {
    setShowModalGenerate(!showModalGenerate);
  }

  function toggleViewUniqueFacturaClienteForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleGenerateClick = async () => {
    toggleGenerateFacturasClientesModal();
    setCargandoInformacionFacturasClientes(true);

    try {
      const responseGenerateFacturasClientes = await generateFacturasClientes();

      errorHandlingInfo = checkResponseForErrors(
        responseGenerateFacturasClientes
      );

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGenerateFacturasClientes.errorMessage
        );
        return;
      }

      setContadorFacturasClientesGeneradas(
        responseGenerateFacturasClientes.data
      );
      setCargandoInformacionFacturasClientes(false);
    } catch (error) {}
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => {
      return row.id === id;
    });

    setRowSelected(filaSeleccionada);
    toggleViewUniqueFacturaClienteForm();
  };

  const handleModalGenerateFacturasClientesOk = () => {
    resetStates();
    facturaClienteGenerateUpdatedTrigger();
  };

  const handleModalClose = () => {
    resetStates();
  };

  function resetStates() {
    setShowModalGenerate(false);
    setShowFormViewUnique(false);

    setContadorFacturasClientesGeneradas(0);
    setCargandoInformacionFacturasClientes(false);
    setAceptarBotonParaVerResultadosFacturasClientes(false);
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
          const filename = "FacturasClientes.json";
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
          const filename = "FacturasClientes.csv";
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

  const renderTableFacturaCliente = () => {
    function generateFacturasClientesModal() {
      if (!aceptarBotonParaVerResultadosFacturasClientes) {
        return (
          <Antd.Modal
            title={`Generando facturas...`}
            open={showModalGenerate}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={handleModalClose}
            centered
          >
            <Antd.Form style={{ marginTop: "5%" }}>
              {!cargandoInformacionFacturasClientes && (
                <div>
                  <Antd.Button
                    onClick={() =>
                      setAceptarBotonParaVerResultadosFacturasClientes(true)
                    }
                  >
                    {"Ver los resultados"}
                  </Antd.Button>
                </div>
              )}
            </Antd.Form>
          </Antd.Modal>
        );
      } else if (aceptarBotonParaVerResultadosFacturasClientes) {
        return (
          <Antd.Modal
            title={`Resultados facturas clientes generadas`}
            open={showModalGenerate}
            okText="Aceptar"
            onOk={handleModalGenerateFacturasClientesOk}
            onCancel={handleModalClose}
            cancelText="Cancelar"
            cancelButtonProps={{ style: { display: "none" } }}
            centered
          >
            <div>
              <Antd.Form style={{ marginTop: "5%" }}>
                <p>
                  Facturas totales generadas:{" "}
                  {contadorFacturasClientesGeneradas}
                </p>
              </Antd.Form>
            </div>
          </Antd.Modal>
        );
      }
    }

    return (
      <div>
        <Header />
        <h1>Facturas Clientes</h1>
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
            onClick={handleGenerateClick}
          >
            Generar facturas
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

          {showModalGenerate && generateFacturasClientesModal()}
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
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormFacturasClientes
          toggleForm={toggleViewUniqueFacturaClienteForm}
          facturaClienteDataForm={rowSelected}
          formUpdateTrigger={facturaClienteFormUpdatedTrigger}
          cancelOrExitClickTrigger={facturaClienteFormClickCancelOrExitTrigger}
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormFacturasClientes>
      </div>
    );
  } else {
    return renderTableFacturaCliente();
  }
}
