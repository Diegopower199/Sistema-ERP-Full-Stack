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
import FormFacturasClientes from "./FormFacturasClientes";
import styles from "./styles.module.css";

export default function FacturasClientes() {
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
      field: "comentarios",
      headerName: "Comentarios",
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

  const fetchGetAllVacacionesEmpleados = async () => {
    try {
      setTableLoading(true);
      const responseGetAllVacacionesEmpleados =
        await getAllVacacionesEmpleados();
      if (responseGetAllVacacionesEmpleados.status === 200) {
        const vacacionesEmpleadosMap =
          responseGetAllVacacionesEmpleados.data.map((vacacionEmpleado) => {
            return {
              id: vacacionEmpleado.id_vacacion_empleado,
              fecha_inicio: vacacionEmpleado.fecha_inicio,
              fecha_fin: vacacionEmpleado.fecha_fin,
              dias_disponibles: vacacionEmpleado.dias_disponibles,
              dias_pendientes: vacacionEmpleado.dias_pendientes,
              dias_solicitados: vacacionEmpleado.dias_solicitados,
              dias_disfrutados: vacacionEmpleado.dias_disfrutados,
              comentarios: vacacionEmpleado.comentarios,
              id_persona: vacacionEmpleado.persona.id_persona,
              dni: vacacionEmpleado.persona.dni,
              tipo_estado: vacacionEmpleado.tipo_estado.tipo_estado,
              id_tipo_estado: vacacionEmpleado.tipo_estado.id_tipo_estado,
            };
          });
        setDataSource(vacacionesEmpleadosMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de vacaciones empleados: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllVacacionesEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (vacacionEmpleadoFormUpdated === true) {
        await fetchGetAllVacacionesEmpleados();
        setVacacionEmpleadoFormUpdated(false);
      } else if (vacacionEmpleadoDelete === true) {
        await fetchGetAllVacacionesEmpleados();
        setVacacionEmpleadoDelete(false);
      }
    };
    fetchData();
  }, [vacacionEmpleadoFormUpdated, vacacionEmpleadoDelete]);

  function vacacionEmpleadoFormUpdatedTrigger() {
    setVacacionEmpleadoFormUpdated(!vacacionEmpleadoFormUpdated);
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
    console.log("Añadir nueva vacacion empleado");
    toggleCreateVacacionEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateVacacionEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = dataSource.find((row) => row.id === id);
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
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueVacacionEmpleadoForm();
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
        <h1>Facturas Clientes</h1>
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
            Añadir vacacion empleado
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
      </div>
    );
  };

  if (showFormCreate) {
    return (
      <>
        <FormFacturasClientes
          toggleForm={toggleCreateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={""}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormFacturasClientes>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormFacturasClientes
          toggleForm={toggleUpdateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormFacturasClientes>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormFacturasClientes
          toggleForm={toggleViewUniqueVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormFacturasClientes>
      </>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
