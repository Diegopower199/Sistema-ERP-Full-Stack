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
import FormClientes from "./FormClientes";
import styles from "./styles.module.css";
import { getAllClientes } from "@/services/ClienteService";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

export default function Clientes() {
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

  const [clienteFormUpdated, setClienteFormUpdated] = useState(false);
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
      width: 85,
      editable: false,
    },
    {
      field: "nif",
      headerName: "NIF",
      width: 180,
      editable: false,
    },
    {
      field: "nombre_apellidos",
      headerName: "Nombre y apellidos",
      width: 180,
      editable: false,
    },
    {
      field: "razon_social",
      headerName: "Razon social",
      width: 180,
      editable: false,
    },
    {
      field: "numero_telefono",
      headerName: "Numero telefono",
      width: 180,
      editable: false,
    },
    {
      field: "correo_electronico",
      headerName: "Correo electronico",
      width: 180,
      editable: false,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 130,
      editable: false,
    },
    {
      field: "codigo_postal",
      headerName: "Codigo postal",
      width: 180,
      editable: false,
    },
    {
      field: "provincia",
      headerName: "Provincia",
      width: 180,
      editable: false,
    },
    {
      field: "ciudad",
      headerName: "Ciudad",
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
        ];
      },
    },
  ];

  const fetchGetAllClientes = async () => {
    try {
      setTableLoading(true);
      const responseGetAllClientes = await getAllClientes();
      if (responseGetAllClientes.status === 200) {
        const clientesMap = responseGetAllClientes.data.map((cliente) => {
          return {
            id: cliente.id_cliente,
            nif: cliente.nif,
            nombre_apellidos: cliente.nombre_apellidos,
            razon_social: cliente.razon_social,
            numero_telefono: cliente.numero_telefono,
            correo_electronico: cliente.correo_electronico,
            direccion: cliente.direccion,
            codigo_postal: cliente.codigo_postal,
            provincia: cliente.provincia,
            ciudad: cliente.ciudad,
          };
        });
        setDataSource(clientesMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de clientes: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllClientes();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (clienteFormUpdated === true) {
        await fetchGetAllClientes();
        setClienteFormUpdated(false);
      }
    };
    fetchData();
  }, [clienteFormUpdated]);

  function clienteFormUpdatedTrigger() {
    setClienteFormUpdated(!clienteFormUpdated);
  }

  function toggleCreateClienteForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateClienteForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueClienteForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir un nuevo cliente");
    toggleCreateClienteForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar un cliente");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateClienteForm();
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver un cliente");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueClienteForm();
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
          const filename = "Clientes.json";
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
          const filename = "Clientes.csv";
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

  const renderTableClientes = () => {
    return (
      <div>
        <Header />
        <h1>Clientes</h1>
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
            Añadir cliente
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

  if (showFormCreate) {
    return (
      <>
        <FormClientes
          toggleForm={toggleCreateClienteForm}
          clienteDataForm={""}
          formUpdateTrigger={clienteFormUpdatedTrigger}
          operationType={"create"}
        ></FormClientes>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormClientes
          toggleForm={toggleUpdateClienteForm}
          clienteDataForm={rowSelected}
          formUpdateTrigger={clienteFormUpdatedTrigger}
          operationType={"update"}
        ></FormClientes>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormClientes
          toggleForm={toggleViewUniqueClienteForm}
          clienteDataForm={rowSelected}
          formUpdateTrigger={clienteFormUpdatedTrigger}
          operationType={"view"}
        ></FormClientes>
      </>
    );
  } else {
    return renderTableClientes();
  }
}
