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
import { Modal } from "antd";
import Link from "next/link";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import { getAllNominasEmpleados } from "@/services/NominaEmpleadoService";
import FormNominasEmpleados from "./FormNominasEmpleados";

export default function NominasEmpleados() {
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
      field: "year",
      headerName: "Año",
      width: 180,
      editable: false,
    },
    {
      field: "mes",
      headerName: "Mes",
      width: 180,
      editable: false,
    },
    {
      field: "tipo_nomina",
      headerName: "Tipo nomina",
      width: 180,
      editable: false,
    },
    {
      field: "salario_base",
      headerName: " Salario base",
      width: 180,
      editable: false,
    },
    {
      field: "deducciones",
      headerName: "Deducciones",
      width: 180,
      editable: false,
    },
    {
      field: "bonificacion",
      headerName: "Bonificacion",
      width: 180,
      editable: false,
    },
    {
      field: "salario_bruto",
      headerName: "Salario bruto",
      width: 180,
      editable: false,
    },
    {
      field: "irpf",
      headerName: "IRPF",
      width: 180,
      editable: false,
    },
    {
      field: "seguridad_social",
      headerName: "Seguridad social",
      width: 180,
      editable: false,
    },
    {
      field: "anticipos",
      headerName: "Anticipos",
      width: 180,
      editable: false,
    },
    {
      field: "salario_neto",
      headerName: "Salario neto",
      width: 180,
      editable: false,
    },
    {
      field: "cuenta_bancaria",
      headerName: "Cuenta bancaria",
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

  const fetchGetAllNominasEmpleados = async () => {
    try {
      setTableLoading(true);
      const responseReadAllNominasEmpleados = await getAllNominasEmpleados();
      if (responseReadAllNominasEmpleados.status === 200) {
        const nominasEmpleadosMap = responseReadAllNominasEmpleados.data.map(
          (nominasEmpleado) => {
            return {
              id: nominasEmpleado.id_nomina_empleado,
              year: nominasEmpleado.year,
              mes: nominasEmpleado.mes,
              tipo_nomina: nominasEmpleado.tipo_nomina,
              salario_base: nominasEmpleado.salario_base,
              deducciones: nominasEmpleado.deducciones,
              bonificacion: nominasEmpleado.bonificacion,
              salario_bruto: nominasEmpleado.salario_bruto,
              irpf: nominasEmpleado.irpf,
              seguridad_social: nominasEmpleado.seguridad_social,
              anticipos: nominasEmpleado.anticipos,
              salario_neto: nominasEmpleado.salario_neto,
              cuenta_bancaria: nominasEmpleado.cuenta_bancaria,
              id_persona: nominasEmpleado.persona.id_persona,
              dni: nominasEmpleado.persona.dni,
            };
          }
        );
        setRows(nominasEmpleadosMap);
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
      fetchGetAllNominasEmpleados();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (vacacionEmpleadoFormUpdated === true) {
        await fetchGetAllNominasEmpleados();
        setVacacionEmpleadoFormUpdated(false);
      } else if (vacacionEmpleadoDelete === true) {
        await fetchGetAllNominasEmpleados();
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
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleUpdateVacacionEmpleadoForm();
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
          title={`¿Desea eliminar las vacaciones asociadas al DNI ${dniPersonaVacacionEmpleadoSelected} que estan programadas desde el ${fechaInicioAndFinVacacionEmpleadoSelected[0]} hasta el ${fechaInicioAndFinVacacionEmpleadoSelected[1]}?`}
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
        <h1>Nominas Empleados</h1>
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
            Añadir nomina empleado
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
        <FormNominasEmpleados
          toggleForm={toggleCreateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={""}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"create"}
        ></FormNominasEmpleados>
      </>
    );
  } else if (showFormUpdate) {
    return (
      <>
        <FormNominasEmpleados
          toggleForm={toggleUpdateVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"update"}
        ></FormNominasEmpleados>
      </>
    );
  } else if (showFormViewUnique) {
    return (
      <>
        <FormNominasEmpleados
          toggleForm={toggleViewUniqueVacacionEmpleadoForm}
          vacacionEmpleadoDataForm={rowSelected}
          formUpdateTrigger={vacacionEmpleadoFormUpdatedTrigger}
          operationType={"view"}
        ></FormNominasEmpleados>
      </>
    );
  } else {
    return renderTableVacacionEmpleado();
  }
}
