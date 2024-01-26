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
import FormVacacionesEmpleados from "./FormVacacionesEmpleados";
import { Modal } from "antd";
import Link from "next/link";
import {
  deleteVacacionEmpleado,
  getAllVacacionesEmpleados,
} from "@/services/VacacionEmpleadoService";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export default function VacacionesEmpleados() {
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
  const [showFormModify, setShowFormModify] = useState(false);
  const [showFormVacacionEmpleadoUnique, setShowFormVacacionEmpleadoUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [idVacacionEmpleadoSelected, setIdVacacionEmpleadoSelected] =
    useState(0);
  const [dniPersonaVacacionEmpleado, setDniPersonaVacacionEmpleado] =
    useState("");
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
    { field: "id", headerName: "ID", width: 85, editable: false },
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
      field: "dias_restantes",
      headerName: "Dias restantes",
      width: 180,
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
            onClick={handleVisibilityClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
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
      const resultado = await getAllVacacionesEmpleados();
      const vacacionesEmpleadosMap = resultado.map((vacacionEmpleado) => {
        return {
          id: vacacionEmpleado.id_vacacion_empleado,
          fecha_inicio: vacacionEmpleado.fecha_inicio,
          fecha_fin: vacacionEmpleado.fecha_fin,
          dias_solicitados: vacacionEmpleado.dias_solicitados,
          dias_disfrutados: vacacionEmpleado.dias_disfrutados,
          dias_restantes: vacacionEmpleado.dias_restantes,
          comentarios: vacacionEmpleado.comentarios,
          id_persona: vacacionEmpleado.persona.id_persona,
          dni: vacacionEmpleado.persona.dni,
          tipo_estado: vacacionEmpleado.tipo_estado.tipo_estado,
          id_tipo_estado: vacacionEmpleado.tipo_estado.id_tipo_estado,
        };
      });
      setRows(vacacionesEmpleadosMap);
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

  function toggleVacacionEmpleadoForm() {
    if (showFormCreate) {
      setShowFormCreate(false);
    }
    if (showFormModify) {
      setShowFormModify(false);
    }
    if (showFormVacacionEmpleadoUnique) {
      setShowFormVacacionEmpleadoUnique(false);
    }
  }

  function toggleEditForm() {
    setShowFormModify(!showFormModify);
  }

  function toggleViewVacacionEmpleadoUniqueForm() {
    setShowFormVacacionEmpleadoUnique(!showFormVacacionEmpleadoUnique);
  }

  const handleEditClick = (id) => () => {
    console.log("Boton para editar");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleEditForm();
  };

  const handleDeleteClick = (id) => () => {
    console.log("ID:", id);
    const filaSeleccionada = rows.find((row) => row.id === id);
    console.log("Boton para borrar: ", filaSeleccionada);
    setIdVacacionEmpleadoSelected(id);

    setDniPersonaVacacionEmpleado(filaSeleccionada.dni);
    setFechaInicioAndFinVacacionEmpleadoSelected([
      filaSeleccionada.fecha_inicio,
      filaSeleccionada.fecha_fin,
    ]);
    setShowDelete(true);
    // setRows(rows.filter((row) => row.id !== id));
  };

  const handleVisibilityClick = (id) => () => {
    console.log("Boton para ver una persona");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewVacacionEmpleadoUniqueForm();
  };

  // toggleForm, formFields
  const handleAddClick = () => {
    console.log("Añadir nueva vacacion empleado");
    setShowFormCreate(true);
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const resultado = await deleteVacacionEmpleado(idVacacionEmpleadoSelected);
    if (resultado.status === 200) {
      setVacacionEmpleadoDelete(true);
    }
    // console.log("Resultado delete: ", resultado);
    resetStates();
  };

  const handleModalClose = () => {
    resetStates();
  };

  function resetStates() {
    setShowFormCreate(false);
    setShowFormModify(false);
    setShowFormVacacionEmpleadoUnique(false);
    setShowDelete(false);
    setIdVacacionEmpleadoSelected(0);
    setDniPersonaVacacionEmpleado("");
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
    // Hacer aqui el deleteModal

    function deleteModal() {
      return (
        <Modal
          title={`¿Desea eliminar las vacaciones asociadas al DNI ${dniPersonaVacacionEmpleado} que estan programadas desde el ${fechaInicioAndFinVacacionEmpleadoSelected[0]} hasta el ${fechaInicioAndFinVacacionEmpleadoSelected[1]}?`}
          open={showDelete}
          okText="Aceptar"
          onOk={handleModalOk}
          cancelText="Cancelar"
          onCancel={handleModalClose}
          centered
        ></Modal>
      );
    }

    return (
      <div>
        <h1>Vacaciones Empleados</h1>
        <h2>
          <Link href={"/recursos-humanos"}>Menu Recursos humanos</Link>
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
            onClick={handleAddClick}
          >
            Añadir vacacion empleado
          </Button>

          <DataGrid
            rows={rows}
            columns={columns}
            loading={tableLoading}
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
        <FormVacacionesEmpleados
          toggleForm={toggleVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={""}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormVacacionesEmpleados>
      </>
    );
  } else if (showFormModify) {
    return (
      <>
        <FormVacacionesEmpleados
          toggleForm={toggleEditForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormVacacionesEmpleados>
      </>
    );
  } else if (showFormVacacionEmpleadoUnique) {
    return (
      <>
        <FormVacacionesEmpleados
          toggleForm={toggleViewVacacionEmpleadoUniqueForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormVacacionesEmpleados>
      </>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
