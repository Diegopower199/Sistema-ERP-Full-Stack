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
import FormPedidosClientes from "./FormPedidosClientes";
import styles from "./styles.module.css";
import { getAllPedidosClientes } from "@/services/PedidoClienteService";
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

export default function PedidosClientes() {
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

  const [tableLoading, setTableLoading] = useState(true);

  const [pedidoClienteFormUpdated, setPedidoClienteFormUpdated] =
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
      field: "direccion_entrega",
      headerName: "Direccion entrega",
      width: 180,
      editable: false,
    },
    {
      field: "fecha_solicitud_pedido",
      headerName: "Fecha solicitud pedido",
      width: 180,
      editable: false,
    },
    {
      field: "fecha_entrega_prevista",
      headerName: "Fecha entrega prevista",
      width: 180,
      editable: false,
    },
    {
      field: "fecha_entrega_real",
      headerName: "Fecha entrega real",
      width: 180,
      editable: false,
    },
    {
      field: "hora_inicio_desplazamiento",
      headerName: "Hora inicio desplazamiento",
      width: 220,
      editable: false,
    },
    {
      field: "hora_fin_desplazamiento",
      headerName: "Hora fin desplazamiento",
      width: 200,
      editable: false,
    },
    {
      field: "tiempo_desplazamiento_total",
      headerName: "Tiempo desplazamiento total",
      width: 210,
      editable: false,
    },
    {
      field: "hora_inicio_servicio",
      headerName: "Hora inicio servicio",
      width: 160,
      editable: false,
    },
    {
      field: "hora_fin_servicio",
      headerName: "Hora fin servicio",
      width: 160,
      editable: false,
    },
    {
      field: "tiempo_servicio_total",
      headerName: "Tiempo servicio total",
      width: 180,
      editable: false,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
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
      field: "clienteInfo",
      headerName: "Cliente info",
      width: 280,
      editable: false,
    },
    {
      field: "personaInfo",
      headerName: "Info persona",
      width: 280,
      editable: false,
    },
    {
      field: "tipo_estado",
      headerName: "Tipo estado",
      width: 200,
      editable: false,
    },
    {
      field: "tipo_estado_factura",
      headerName: "Tipo estado factura",
      width: 200,
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

  const fetchGetAllPedidosClientesAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseGetAllPedidosClientes = await getAllPedidosClientes();

      errorHandlingInfo = checkResponseForErrors(responseGetAllPedidosClientes);

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllPedidosClientes.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const pedidosClientesMap = responseGetAllPedidosClientes.data.map(
        (pedidoCliente) => {
          const { nombre_apellidos, razon_social, nif } = pedidoCliente.cliente;
          const nombreOrRazonSocial = nombre_apellidos || razon_social;
          const { nombre, apellidos, dni } = pedidoCliente.persona_encargado;

          return {
            id: pedidoCliente.id_pedido_cliente,
            direccion_entrega: pedidoCliente.direccion_entrega,
            fecha_solicitud_pedido: pedidoCliente.fecha_solicitud_pedido,
            fecha_entrega_prevista: pedidoCliente.fecha_entrega_prevista,
            fecha_entrega_real: pedidoCliente.fecha_entrega_real,
            hora_inicio_desplazamiento:
              pedidoCliente.hora_inicio_desplazamiento,
            hora_fin_desplazamiento: pedidoCliente.hora_fin_desplazamiento,
            tiempo_desplazamiento_total:
              pedidoCliente.tiempo_desplazamiento_total,
            hora_inicio_servicio: pedidoCliente.hora_inicio_servicio,
            hora_fin_servicio: pedidoCliente.hora_fin_servicio,
            tiempo_servicio_total: pedidoCliente.tiempo_servicio_total,
            descripcion: pedidoCliente.descripcion,
            observacion: pedidoCliente.observacion,
            id_cliente: pedidoCliente.cliente.id_cliente,
            clienteInfo: `${nombreOrRazonSocial} - ${nif}`,
            id_persona: pedidoCliente.persona_encargado.id_persona,
            personaInfo: `${nombre + " " + apellidos} - ${dni}`,
            tipo_estado: pedidoCliente.tipo_estado.tipo_estado,
            id_tipo_estado: pedidoCliente.tipo_estado.id_tipo_estado,
            tipo_estado_factura:
              pedidoCliente.tipo_estado_factura.tipo_estado_factura,
            id_tipo_estado_factura:
              pedidoCliente.tipo_estado_factura.id_tipo_estado_factura,
          };
        }
      );
      setDataSource(pedidosClientesMap);
      setTableLoading(false);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de pedidos clientes: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllPedidosClientesAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (pedidoClienteFormUpdated === true) {
      fetchGetAllPedidosClientesAndHandleErrors();
      setPedidoClienteFormUpdated(false);
    }
  }, [pedidoClienteFormUpdated]);

  function pedidoClienteFormUpdatedTrigger() {
    setPedidoClienteFormUpdated(!pedidoClienteFormUpdated);
  }

  function toggleCreatePedidoClienteForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdatePedidoClienteForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniquePedidoClienteForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nuevo pedido cliente");

    toggleCreatePedidoClienteForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");

    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdatePedidoClienteForm();
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver un pedido cliente");

    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniquePedidoClienteForm();
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
          const filename = "PedidosClientes.json";
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
          const filename = "PedidosClientes.csv";
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
    return (
      <div>
        <Header />
        <h1>Pedidos Clientes</h1>
        <h2>
          <Link href={"/menu-clientes"}>Menu Clientes</Link>
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
            Añadir pedido cliente
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

  if (backendOrDDBBConnectionError === true) {
    return (
      <div>
        <ServerConnectionError message={errorMessage} />
      </div>
    );
  } else if (showFormCreate) {
    return (
      <div>
        <FormPedidosClientes
          toggleForm={toggleCreatePedidoClienteForm}
          pedidoClienteDataForm={""}
          formUpdateTrigger={pedidoClienteFormUpdatedTrigger}
          operationType={"create"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPedidosClientes>
      </div>
    );
  } else if (showFormUpdate) {
    return (
      <div>
        <FormPedidosClientes
          toggleForm={toggleUpdatePedidoClienteForm}
          pedidoClienteDataForm={rowSelected}
          formUpdateTrigger={pedidoClienteFormUpdatedTrigger}
          operationType={"update"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPedidosClientes>
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormPedidosClientes
          toggleForm={toggleViewUniquePedidoClienteForm}
          pedidoClienteDataForm={rowSelected}
          formUpdateTrigger={pedidoClienteFormUpdatedTrigger}
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormPedidosClientes>
      </div>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
