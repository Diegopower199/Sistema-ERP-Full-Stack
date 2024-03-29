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
  deleteSolicitudEmpleado,
  getAllSolicitudesEmpleados,
} from "@/services/SolicitudEmpleadoService";
import FormSolicitudesEmpleados from "./FormSolicitudesEmpleados";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import styles from "./styles.module.css";

export default function SolicitudesEmpleados() {
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

  const [idSolicitudEmpleadoSelected, setIdSolicitudEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaSolicitudEmpleadoSelected,
    setDniPersonaSolicitudEmpleadoSelected,
  ] = useState("");
  const [fechaSolicitudEmpleadoSelected, setFechaSolicitudEmpleadoSelected] =
    useState("");

  const [solicitudEmpleadoDelete, setSolicitudEmpleadoDelete] = useState(false);
  const [solicitudEmpleadoFormUpdated, setSolicitudEmpleadoFormUpdated] =
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
      field: "fecha_solicitud",
      headerName: "Fecha solicitud",
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
      field: "dni",
      headerName: "Dni persona",
      width: 180,
      editable: false,
    },
    {
      field: "tipo_solicitud",
      headerName: "Tipo solicitud",
      width: 130,
      editable: false,
    },
    {
      field: "tipo_estado",
      headerName: "Tipo estado",
      width: 130,
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

  const fetchGetAllSolicitudesEmpleados = async () => {
    try {
      setTableLoading(true);
      const responseReadAllSolicitudesEmpleados =
        await getAllSolicitudesEmpleados();
      if (responseReadAllSolicitudesEmpleados.status === 200) {
        const solicitudesEmpleadosMap =
          responseReadAllSolicitudesEmpleados.data.map((solicitudEmpleado) => {
            return {
              id: solicitudEmpleado.id_solicitud_empleado,
              fecha_solicitud: solicitudEmpleado.fecha_solicitud,
              observacion: solicitudEmpleado.observacion,
              id_persona: solicitudEmpleado.persona.id_persona,
              dni: solicitudEmpleado.persona.dni,
              tipo_solicitud: solicitudEmpleado.tipo_solicitud.tipo_solicitud,
              id_tipo_solicitud:
                solicitudEmpleado.tipo_solicitud.id_tipo_solicitud,
              tipo_estado: solicitudEmpleado.tipo_estado.tipo_estado,
              id_tipo_estado: solicitudEmpleado.tipo_estado.id_tipo_estado,
            };
          });
        setDataSource(solicitudesEmpleadosMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de solicitudes empleados: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllSolicitudesEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitudEmpleadoFormUpdated === true) {
        await fetchGetAllSolicitudesEmpleados();
        setSolicitudEmpleadoFormUpdated(false);
      } else if (solicitudEmpleadoDelete === true) {
        await fetchGetAllSolicitudesEmpleados();
        setSolicitudEmpleadoDelete(false);
      }
    };
    fetchData();
  }, [solicitudEmpleadoFormUpdated, solicitudEmpleadoDelete]);

  function solicitudEmpleadoFormUpdatedTrigger() {
    setSolicitudEmpleadoFormUpdated(!solicitudEmpleadoFormUpdated);
  }

  function toggleCreateSolicitudEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateSolicitudEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueSolicitudEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nueva solicitud empleado");
    toggleCreateSolicitudEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateSolicitudEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);
    setIdSolicitudEmpleadoSelected(id);
    setFechaSolicitudEmpleadoSelected(filaSeleccionada.fecha_solicitud);
    setDniPersonaSolicitudEmpleadoSelected(filaSeleccionada.dni);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una solicitud empleado");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueSolicitudEmpleadoForm();
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const responseDeleteSolicitudEmpleado = await deleteSolicitudEmpleado(
      idSolicitudEmpleadoSelected
    );
    if (responseDeleteSolicitudEmpleado.status === 200) {
      setSolicitudEmpleadoDelete(true);
    }
    // console.log("Resultado delete: ", resultado);
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
    setIdSolicitudEmpleadoSelected(0);
    setDniPersonaSolicitudEmpleadoSelected("");
    setFechaSolicitudEmpleadoSelected("");
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
          const filename = "SolicitudesEmpleados.json";
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
          const filename = "SolicitudesEmpleados.csv";
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

  const renderTableSolicitudEmpleado = () => {
    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar la solicitud asociada a la persona con DNI ${dniPersonaSolicitudEmpleadoSelected} en la fecha ${fechaSolicitudEmpleadoSelected}?`}
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
        <h1>Solicitudes Empleados</h1>
        <h2>
          <Link href={"/menu-recursos-humanos"}>Menu Recursos humanos</Link>
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
            Añadir solicitud empleado
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
        <FormSolicitudesEmpleados
          toggleForm={toggleCreateSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={""}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormSolicitudesEmpleados>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormSolicitudesEmpleados
          toggleForm={toggleUpdateSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={rowSelected}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormSolicitudesEmpleados>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormSolicitudesEmpleados
          toggleForm={toggleViewUniqueSolicitudEmpleadoForm}
          solicitudEmpleadoDataForm={rowSelected}
          formUpdateTrigger={solicitudEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormSolicitudesEmpleados>
      </>
    );
  } else {
    return renderTableSolicitudEmpleado();
  }
}
