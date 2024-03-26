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
import FormBajasLaboralesEmpleados from "./FormBajasLaboralesEmpleados";
import {
  deleteBajaLaboralEmpleado,
  getAllBajasLaboralesEmpleados,
} from "@/services/BajaLaboralEmpleadoService";
import styles from "./styles.module.css";

export default function BajasLaboralesEmpleados() {
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

  const [idBajaLaboralEmpleadoSelected, setIdBajaLaboralEmpleadoSelected] =
    useState(0);
  const [
    dniPersonaBajaLaboralEmpleadoSelected,
    setDniPersonaBajaLaboralEmpleadoSelected,
  ] = useState("");
  const [
    fechaInicioAndFinBajaLaboralEmpleadoSelected,
    setFechaInicioAndFinBajaLaboralEmpleadoSelected,
  ] = useState([]);
  const [motivoBajaSelected, setMotivoBajaSelected] = useState("");

  const [bajaLaboralEmpleadoDelete, setBajaLaboralEmpleadoDelete] =
    useState(false);
  const [bajaLaboralEmpleadoFormUpdated, setBajaLaboralEmpleadoFormUpdated] =
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
      field: "motivo_baja",
      headerName: "Motivo baja",
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

  const fetchGetAllBajasLaboralesEmpleados = async () => {
    try {
      setTableLoading(true);
      const responseReadAllBajasLaboralesEmpleados =
        await getAllBajasLaboralesEmpleados();
      if (responseReadAllBajasLaboralesEmpleados.status === 200) {
        const bajasLaboralesEmpleadosMap =
          responseReadAllBajasLaboralesEmpleados.data.map(
            (bajaLaboralEmpleado) => {
              return {
                id: bajaLaboralEmpleado.id_baja_laboral_empleado,
                fecha_inicio: bajaLaboralEmpleado.fecha_inicio,
                fecha_fin: bajaLaboralEmpleado.fecha_fin,
                observacion: bajaLaboralEmpleado.observacion,
                id_persona: bajaLaboralEmpleado.persona.id_persona,
                dni: bajaLaboralEmpleado.persona.dni,
                motivo_baja: bajaLaboralEmpleado.motivo_baja.motivo_baja,
                id_motivo_baja: bajaLaboralEmpleado.motivo_baja.id_motivo_baja,
                tipo_estado: bajaLaboralEmpleado.tipo_estado.tipo_estado,
                id_tipo_estado: bajaLaboralEmpleado.tipo_estado.id_tipo_estado,
              };
            }
          );
        setDataSource(bajasLaboralesEmpleadosMap);
      }
      setTableLoading(false);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de bajas laborales empleados: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllBajasLaboralesEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (bajaLaboralEmpleadoFormUpdated === true) {
        await fetchGetAllBajasLaboralesEmpleados();
        setBajaLaboralEmpleadoFormUpdated(false);
      } else if (bajaLaboralEmpleadoDelete === true) {
        await fetchGetAllBajasLaboralesEmpleados();
        setBajaLaboralEmpleadoDelete(false);
      }
    };
    fetchData();
  }, [bajaLaboralEmpleadoFormUpdated, bajaLaboralEmpleadoDelete]);

  function bajaLaboralEmpleadoFormUpdatedTrigger() {
    setBajaLaboralEmpleadoFormUpdated(!bajaLaboralEmpleadoFormUpdated);
  }

  function toggleCreateBajaLaboralEmpleadoForm() {
    setShowFormCreate(!showFormCreate);
  }

  function toggleUpdateBajaLaboralEmpleadoForm() {
    setShowFormUpdate(!showFormUpdate);
  }

  function toggleViewUniqueBajaLaboralEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleCreateClick = () => {
    console.log("Añadir nueva baja laboral empleado");
    toggleCreateBajaLaboralEmpleadoForm();
  };

  const handleUpdateClick = (id) => () => {
    console.log("Boton para actualizar");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateBajaLaboralEmpleadoForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);
    setIdBajaLaboralEmpleadoSelected(id);
    setDniPersonaBajaLaboralEmpleadoSelected(filaSeleccionada.dni);
    setFechaInicioAndFinBajaLaboralEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setMotivoBajaSelected(filaSeleccionada.motivo_baja);
    setShowDelete(true);
  };

  const handleViewUniqueClick = (id) => () => {
    console.log("Boton para ver una baja laboral empleado");
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueBajaLaboralEmpleadoForm();
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const responseDeleteBajaLaboralEmpleado = await deleteBajaLaboralEmpleado(
      idBajaLaboralEmpleadoSelected
    );
    if (responseDeleteBajaLaboralEmpleado.status === 200) {
      setBajaLaboralEmpleadoDelete(true);
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
    setIdBajaLaboralEmpleadoSelected(0);
    setDniPersonaBajaLaboralEmpleadoSelected("");
    setFechaInicioAndFinBajaLaboralEmpleadoSelected([]);
    setMotivoBajaSelected("");
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
          const filename = "BajasLaborales.json";
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
          const filename = "BajasLaborales.csv";
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

  const renderTableBajaLaboralEmpleado = () => {
    // Hacer aqui el deleteModal

    function deleteModal() {
      return (
        <Antd.Modal
          title={`¿Desea eliminar las vacaciones asociadas al DNI ${dniPersonaBajaLaboralEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinBajaLaboralEmpleadoSelected[0]} hasta el ${fechaInicioAndFinBajaLaboralEmpleadoSelected[1]}?`}
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
        <h1>Bajas Laborales Empleados</h1>
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
            Añadir baja laboral empleado
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
        <FormBajasLaboralesEmpleados
          toggleForm={toggleCreateBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={""}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormBajasLaboralesEmpleados>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormBajasLaboralesEmpleados
          toggleForm={toggleUpdateBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={rowSelected}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormBajasLaboralesEmpleados>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormBajasLaboralesEmpleados
          toggleForm={toggleViewUniqueBajaLaboralEmpleadoForm}
          bajaLaboralEmpleadoDataForm={rowSelected}
          formUpdateTrigger={bajaLaboralEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormBajasLaboralesEmpleados>
      </>
    );
  } else {
    return renderTableBajaLaboralEmpleado();
  }
}
