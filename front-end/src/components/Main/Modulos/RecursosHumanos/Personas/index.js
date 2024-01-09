import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
import { getAllPersonas } from "@/services/PersonaService";

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

  const [rows, setRows] = useState([]);

  async function fetchGetAllPersonas() {
    try {
      const resultado = await getAllPersonas();
      console.log("Resultado: ", resultado[0]);
      const personasMap = resultado.map((persona) => {
        return {
          id: persona.id_persona,
          nombre: persona.nombre,
          apellidos: persona.apellidos,
          genero: persona.genero,
          fecha_nacimiento: persona.fecha_nacimiento,
          dni: persona.dni,
          direccion: persona.direccion,
          numero_telefono: persona.numero_telefono,
          correo_electronico: persona.correo_electronico,
        };
      });
      setRows(personasMap);
    } catch (error) {
      console.error("El error es: ", error);
    }
  }

  useEffect(() => {
    console.log("Pagina de personas: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllPersonas();
    }
  }, [authUser]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleEditClick = (id) => () => {
    console.log("Boton para editar");
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    console.log("Boton para borrar");
    // setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddClick = () => {
    console.log("Añadir nuevo registro");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "nombre", headerName: "Nombre", width: 180, editable: false },
    {
      field: "apellidos",
      headerName: "Apellidos",
      width: 180,
      editable: false,
    },
    { field: "genero", headerName: "Genero", width: 180, editable: false },
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
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

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add record
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
    </Box>
  );
}
