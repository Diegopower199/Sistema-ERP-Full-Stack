import React, { useEffect, useState } from "react";
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
import { getAllPersonas } from "@/services/personaService";
import { getAllUsuarios } from "@/services/usuarioService";

const initialRows = [
  {
    id: 1,
    name: "q",
    age: 25,
    joinDate: new Date(2023, 11, 29),
    role: "ROL 1",
  },
  {
    id: 2,
    name: "b",
    age: 36,
    joinDate: new Date(2023, 11, 29),
    role: "ROL 1",
  },
  {
    id: 3,
    name: "c",
    age: 19,
    joinDate: new Date(2023, 11, 29),
    role: "ROL 1",
  },
  {
    id: 4,
    name: "d",
    age: 28,
    joinDate: new Date(2023, 11, 29),
    role: "ROL 1",
  },
  {
    id: 5,
    name: "e",
    age: 23,
    joinDate: new Date(2023, 11, 29),
    role: "ROL 1",
  },
];

function AddNewRegistrer() {
  const handleClick = () => {
    console.log("Añadir nuevo registro");
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState(initialRows);

  const fetchGetAllPersonas = async () => {
    try {
      const resultado = await getAllUsuarios();
      console.log("Resultado: ", resultado[0]);
      const a = resultado.map( (persona) => {
        return {
          id: persona.id_usuario,
          nombre_usuario: persona.nombre_usuario,
        }
      });
      setRows(a)
      const initialRows = [
        {
          id: 1,
          name: "q",
          age: 25,
          joinDate: new Date(2023, 11, 29),
          role: "ROL 1",
        },
      ];
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchGetAllPersonas();
  }, []); // Se ejecuta solo al montar el componente

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

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "nombre_usuario", headerName: "Nombre usuario", width: 180, editable: false },
    
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
      <DataGrid
        rows={rows}
        columns={columns}
        loading={false}
        checkboxSelection
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        slots={{
          toolbar: AddNewRegistrer,
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}
