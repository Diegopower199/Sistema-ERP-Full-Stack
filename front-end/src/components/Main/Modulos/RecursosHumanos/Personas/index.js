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
import { deletePersona, getAllPersonas } from "@/services/PersonaService";
import FormPersonas from "./FormPersonas";
import { Modal } from "antd";
import Link from "next/link";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export default function Personas() {
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
  const [showFormPersonaUnique, setShowFormPersonaUnique] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [idPersonaSelected, setIdPersonaSelected] = useState(0);
  const [namePersonaSelected, setNamePersonaSelected] = useState("");

  const [personaDelete, setPersonaDelete] = useState(false);
  const [personaFormUpdated, setPersonaFormUpdated] = useState(false);
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
      field: "numero_empleado",
      headerName: "Numero empleado",
      width: 180,
      editable: false,
    },
    { field: "nombre", headerName: "Nombre", width: 180, editable: false },
    {
      field: "apellidos",
      headerName: "Apellidos",
      width: 180,
      editable: false,
    },
    { field: "genero", headerName: "Genero", width: 130, editable: false },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha nacimiento",
      width: 180,
      editable: false,
    },
    { field: "dni", headerName: "DNI", width: 180, editable: false },
    {
      field: "direccion",
      headerName: "Direccion",
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
      field: "tipo_persona",
      headerName: "Tipo persona",
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

  const fetchGetAllPersonas = async () => {
    try {
      const resultado = await getAllPersonas();
      console.log("Resultado: ", resultado[0]);
      const personasMap = resultado.map((persona) => {
        return {
          id: persona.id_persona,
          numero_empleado: persona.numero_empleado,
          nombre: persona.nombre,
          apellidos: persona.apellidos,
          genero: persona.genero,
          fecha_nacimiento: persona.fecha_nacimiento,
          dni: persona.dni,
          direccion: persona.direccion,
          numero_telefono: persona.numero_telefono,
          correo_electronico: persona.correo_electronico,
          tipo_persona: persona.tipo_persona.tipo_persona,
          id_tipo_persona: persona.tipo_persona.id_tipo_persona,
        };
      });
      setRows(personasMap);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de personas: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllPersonas();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (personaFormUpdated === true) {
        await fetchGetAllPersonas();
        setPersonaFormUpdated(false);
      } else if (personaDelete === true) {
        await fetchGetAllPersonas();
        setPersonaDelete(false);
      }
    };
    fetchData();
  }, [personaFormUpdated, personaDelete]);

  function personaFormUpdatedTrigger() {
    setPersonaFormUpdated(!personaFormUpdated);
  }

  function togglePersonaForm() {
    if (showFormCreate) {
      setShowFormCreate(false);
    }
    if (showFormModify) {
      setShowFormModify(false);
    }
    if (showFormPersonaUnique) {
      setShowFormPersonaUnique(false);
    }
  }

  function toggleEditForm() {
    setShowFormModify(!showFormModify);
  }

  function toggleViewPersonaUniqueForm() {
    setShowFormPersonaUnique(!showFormPersonaUnique);
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
    setIdPersonaSelected(id);
    setNamePersonaSelected(filaSeleccionada.nombre);
    setShowDelete(true);
  };

  const handleVisibilityClick = (id) => () => {
    console.log("Boton para ver una persona");
    const filaSeleccionada = rows.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewPersonaUniqueForm();
  };

  // toggleForm, formFields
  const handleAddClick = () => {
    console.log("Añadir nueva persona");
    setShowFormCreate(true);
  };

  // Handles 'delete' modal ok button
  const handleModalOk = async () => {
    const resultado = await deletePersona(idPersonaSelected);
    if (resultado.status === 200) {
      setPersonaDelete(true);
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
    setShowFormPersonaUnique(false);
    setShowDelete(false);
    setIdPersonaSelected(0);
    setNamePersonaSelected("");
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

  const renderTablePersona = () => {
    // Hacer aqui el deleteModal

    function deleteModal() {
      return (
        <Modal
          title={`¿Eliminar a la siguiente persona ${namePersonaSelected}?`}
          open={showDelete}
          okText="Aceptar"
          onOk={handleModalOk}
          cancelText="Cancelar"
          onCancel={handleModalClose}
          centered
        >
          <p>AAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
        </Modal>
      );
    }

    return (
      <div>
        <h1>Personas</h1>
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
            Añadir persona
          </Button>

          <DataGrid
            rows={rows}
            columns={columns}
            loading={false}
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
        <FormPersonas
          toggleForm={togglePersonaForm}
          personaDataForm={""}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"create"}
        ></FormPersonas>
      </>
    );
  } else if (showFormModify) {
    return (
      <>
        <FormPersonas
          toggleForm={toggleEditForm}
          personaDataForm={rowSelected}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"update"}
        ></FormPersonas>
      </>
    );
  } else if (showFormPersonaUnique) {
    return (
      <>
        <FormPersonas
          toggleForm={toggleViewPersonaUniqueForm}
          personaDataForm={rowSelected}
          formUpdateTrigger={personaFormUpdatedTrigger}
          operationType={"view"}
        ></FormPersonas>
      </>
    );
  } else {
    return renderTablePersona();
  }
}
