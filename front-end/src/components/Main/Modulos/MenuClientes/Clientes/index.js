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
  GridCsvExportMenuItem,
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
import FormClientes from "./FormClientes";
import styles from "./styles.module.css";
import { getAllClientes } from "@/services/ClienteService";

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
  const [showDelete, setShowDelete] = useState(false);

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

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);
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
      field: "ciudad",
      headerName: "Ciudad",
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

  const fetchGetAllClientes = async () => {
    try {
      setTableLoading(true);
      const responseReadAllClientes = await getAllClientes();
      if (responseReadAllClientes.status === 200) {
        const clientesMap = responseReadAllClientes.data.map((cliente) => {
          return {
            id: cliente.id_cliente,
            nif: cliente.nif,
            nombre_apellidos: cliente.nombre_apellidos,
            razon_social: cliente.razon_social,
            numero_telefono: cliente.numero_telefono,
            correo_electronico: cliente.correo_electronico,
            direccion: cliente.direccion,
            codigo_postal: cliente.codigo_postal,
            ciudad: cliente.ciudad,
            provincia: cliente.provincia,
          };
        });
        setRows(clientesMap);
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
      if (vacacionEmpleadoFormUpdated === true) {
        await fetchGetAllClientes();
        setVacacionEmpleadoFormUpdated(false);
      } else if (vacacionEmpleadoDelete === true) {
        await fetchGetAllClientes();
        setVacacionEmpleadoDelete(false);
      }
    };
    fetchData();
  }, [vacacionEmpleadoFormUpdated, vacacionEmpleadoDelete]);

  function clienteFormUpdatedTrigger() {
    setVacacionEmpleadoFormUpdated(!vacacionEmpleadoFormUpdated);
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
    console.log("Boton para actualizar");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateClienteForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = rows.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);
    setIdVacacionEmpleadoSelected(id);
    setDniPersonaVacacionEmpleadoSelected(filaSeleccionada.dni);
    setFechaInicioAndFinVacacionEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una vacacion empleado");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueClienteForm();
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const responseDeleteVacacionEmpleado = await deleteVacacionEmpleado(
      idVacacionEmpleadoSelected
    );
    if (responseDeleteVacacionEmpleado.status === 200) {
      setVacacionEmpleadoDelete(true);
    }
    // console.log("Response delete: ", response);
    resetStates();
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
          const jsonString = getJson(apiRef);
          const blob = new Blob([jsonString], {
            type: "text/json",
          });
          exportBlob(blob, "DataGrid_demo.json"); // ESTE ES EL NOMBRE DEL FICHERO

          // Hide the export menu after the export
          hideMenu?.();
        }}
      >
        Export JSON
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
        ></Antd.Modal>
      );
    }

    return (
      <div>
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
            rows={rows}
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
      </div>
    );
  };

  if (showFormCreate) {
    return (
      <>
        <FormClientes
          toggleForm={toggleCreateClienteForm}
          vacacionEmpleadoDataForm={""}
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
          vacacionEmpleadoDataForm={rowSelected}
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
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={clienteFormUpdatedTrigger}
          operationType={"view"}
        ></FormClientes>
      </>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
