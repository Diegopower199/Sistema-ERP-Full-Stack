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
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import {
  deleteAsistenciaEmpleado,
  getAllAsistenciaEmpleados,
} from "@/services/AsistenciaEmpleadoService";
import FormAsistenciasEmpleados from "./FormAsistenciasEmpleados";
import styles from "./styles.module.css";

export default function AsistenciasEmpleados() {
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

  const [idAsistenciaEmpleadoSelected, setIdAsistenciaEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaAsistenciaEmpleadoSelected,
    setDniPersonaAsistenciaEmpleadoSelected,
  ] = useState("");
  const [fechaAsistenciaEmpleadoSelected, setFechaAsistenciaEmpleadoSelected] =
    useState("");

  const [asistenciaEmpleadoDelete, setAsistenciaEmpleadoDelete] =
    useState(false);
  const [asistenciaEmpleadoFormUpdated, setAsistenciaEmpleadoFormUpdated] =
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
      field: "fecha",
      headerName: "Fecha",
      width: 180,
      editable: false,
    },
    {
      field: "hora_entrada",
      headerName: "Hora entrada",
      width: 180,
      editable: false,
    },
    {
      field: "hora_salida",
      headerName: "Hora salida",
      width: 180,
      editable: false,
    },
    {
      field: "total_horas_trabajadas",
      headerName: "Total horas trabajadas",
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

  const fetchGetAllAsistenciasEmpleados = async () => {
    try {
      setTableLoading(true);
      const responseReadAllAsistenciasEmpleados =
        await getAllAsistenciaEmpleados();
      if (responseReadAllAsistenciasEmpleados.status === 200) {
        const asistenciasEmpleadosMap = responseReadAllAsistenciasEmpleados.data.map(
          (asistenciaEmpleado) => {
            return {
              id: asistenciaEmpleado.id_asistencia_empleado,
              fecha: asistenciaEmpleado.fecha,
              hora_entrada: asistenciaEmpleado.hora_entrada,
              hora_salida: asistenciaEmpleado.hora_salida,
              total_horas_trabajadas: asistenciaEmpleado.total_horas_trabajadas,
              observacion: asistenciaEmpleado.observacion,
              id_persona: asistenciaEmpleado.persona.id_persona,
              dni: asistenciaEmpleado.persona.dni,
            };
          }
        );
        setRows(asistenciasEmpleadosMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de asistencias empleados: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllAsistenciasEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (asistenciaEmpleadoFormUpdated === true) {
        await fetchGetAllAsistenciasEmpleados();
        setAsistenciaEmpleadoFormUpdated(false);
      } else if (asistenciaEmpleadoDelete === true) {
        await fetchGetAllAsistenciasEmpleados();
        setAsistenciaEmpleadoDelete(false);
      }
    };
    fetchData();
  }, [asistenciaEmpleadoFormUpdated, asistenciaEmpleadoDelete]);

  function asistenciaEmpleadoFormUpdatedTrigger() {
    setAsistenciaEmpleadoFormUpdated(!asistenciaEmpleadoFormUpdated);
  }

  function toggleCreateAsistenciaEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateAsistenciaEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueAsistenciaEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nueva asistencia empleado");
    toggleCreateAsistenciaEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateAsistenciaEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = rows.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);
    setIdAsistenciaEmpleadoSelected(id);
    setDniPersonaAsistenciaEmpleadoSelected(filaSeleccionada.dni);
    setFechaAsistenciaEmpleadoSelected(filaSeleccionada.fecha);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una asistencia empleado");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueAsistenciaEmpleadoForm();
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const responseDeleteAsistenciaEmpleado = await deleteAsistenciaEmpleado(
      idAsistenciaEmpleadoSelected
    );
    if (responseDeleteAsistenciaEmpleado.status === 200) {
      setAsistenciaEmpleadoDelete(true);
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
    setIdAsistenciaEmpleadoSelected(0);
    setDniPersonaAsistenciaEmpleadoSelected("");
    setFechaAsistenciaEmpleadoSelected("");
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

  const renderTableAsistenciaEmpleado = () => {
    // Hacer aqui el deleteModal

    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar la asistencia asociadas al DNI ${dniPersonaAsistenciaEmpleadoSelected} en esta fecha ${fechaAsistenciaEmpleadoSelected}?`}
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
        <h1>Asistencia Empleados</h1>
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
            Añadir asistencia empleado
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
        <FormAsistenciasEmpleados
          toggleForm={toggleCreateAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={""}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormAsistenciasEmpleados>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormAsistenciasEmpleados
          toggleForm={toggleUpdateAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormAsistenciasEmpleados>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormAsistenciasEmpleados
          toggleForm={toggleViewUniqueAsistenciaEmpleadoForm}
          asistenciaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={asistenciaEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormAsistenciasEmpleados>
      </>
    );
  } else {
    return renderTableAsistenciaEmpleado();
  }
}
