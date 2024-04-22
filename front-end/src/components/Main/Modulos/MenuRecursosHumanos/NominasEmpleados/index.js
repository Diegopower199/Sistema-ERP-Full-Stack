import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarExportContainer,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import * as Antd from "antd";
import Link from "next/link";
import {
  LOCALIZED_COLUMN_MENU_TEXTS,
  NOMBRES_MESES,
  PAGE_SIZE_OPTIONS,
} from "@/utils/constants";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import ServerConnectionError from "@/components/UtilsComponents/ServerConnectionError";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import {
  generateNominasEmpleados,
  getAllNominasEmpleados,
} from "@/services/NominaEmpleadoService";
import FormNominasEmpleados from "./FormNominasEmpleados";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

let funcionalidadDisponible = false;
let mensajeFuncionalidad =
  "Lo sentimos, parece que esta función no está disponible en este momento. Estamos trabajando para resolverlo tan pronto como sea posible. Agradecemos tu comprensión.";

export default function NominasEmpleados() {
  const { authUser, permisosUser } = useAuth();

  const router = useRouter();

  const [showModalGenerate, setShowModalGenerate] = useState(false);
  const [showFormViewUnique, setShowFormViewUnique] = useState(false);
  const [cancelOrExitClicked, setCancelOrExitClicked] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);

  const [nominaEmpleadoFormUpdated, setNominaEmpleadoFormUpdated] =
    useState(false);

  const [nominaEmpleadoGenerateUpdated, setNominaEmpleadoGenerateUpdated] =
    useState(false);

  const [
    contadorNominasEmpleadosGeneradas,
    setContadorNominasEmpleadosGeneradas,
  ] = useState(0);
  const [
    cargandoInformacionNominasEmpleados,
    setCargandoInformacionNominasEmpleados,
  ] = useState(false);
  const [
    aceptarBotonParaVerResultadosNominasEmpleados,
    setAceptarBotonParaVerResultadosNominasEmpleados,
  ] = useState(false);

  const [backendError, setBackendError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendOrDDBBConnectionError, setBackendOrDDBBConnectionError] =
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
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "year",
      headerName: "Año",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "mes",
      headerName: "Mes",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "tipo_nomina",
      headerName: "Tipo nómina",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "salario_base",
      headerName: " Salario base",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "deducciones",
      headerName: "Deducciones",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "bonificacion",
      headerName: "Bonificación",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "salario_bruto",
      headerName: "Salario bruto",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "irpf",
      headerName: "IRPF",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "seguridad_social",
      headerName: "Seguridad social",
      width: 190,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "anticipos",
      headerName: "Anticipos",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "salario_neto",
      headerName: "Salario neto",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "cuenta_bancaria",
      headerName: "Cuenta bancaria",
      width: 280,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "personaInfo",
      headerName: "Datos de la persona",
      width: 280,
      headerClassName: "custom-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Visibility"
            onClick={handleViewUniqueClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    setBackendOrDDBBConnectionError(true);
    setErrorMessage(errorMessage);
  }

  const fetchGetAllNominasEmpleadosAndHandleErrors = async () => {
    try {
      setTableLoading(true);
      const responseGetAllNominasEmpleados = await getAllNominasEmpleados();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllNominasEmpleados
      );

      if (errorHandlingInfo.noContent) {
        setDataSource([]);
        setTableLoading(false);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllNominasEmpleados.errorMessage
        );
        setTableLoading(false);
        return false;
      }

      const nominasEmpleadosMap = responseGetAllNominasEmpleados.data.map(
        (nominaEmpleado) => {
          const { nombre, apellidos, dni } = nominaEmpleado.persona;

          return {
            id: nominaEmpleado.id_nomina_empleado,
            year: nominaEmpleado.year,
            mes: NOMBRES_MESES[nominaEmpleado.mes].label,
            tipo_nomina: nominaEmpleado.tipo_nomina,
            salario_base: nominaEmpleado.salario_base,
            deducciones: nominaEmpleado.deducciones,
            bonificacion: nominaEmpleado.bonificacion,
            salario_bruto: nominaEmpleado.salario_bruto,
            irpf: nominaEmpleado.irpf,
            seguridad_social: nominaEmpleado.seguridad_social,
            anticipos: nominaEmpleado.anticipos,
            salario_neto: nominaEmpleado.salario_neto,
            cuenta_bancaria: nominaEmpleado.cuenta_bancaria,
            id_persona: nominaEmpleado.persona.id_persona,
            personaInfo: `${nombre + " " + apellidos} - ${dni}`,
          };
        }
      );

      setDataSource(nominasEmpleadosMap);
      setTableLoading(false);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchGetAllNominasEmpleadosAndHandleErrors();
    }
  }, [authUser]);

  useEffect(() => {
    if (
      nominaEmpleadoFormUpdated ||
      nominaEmpleadoGenerateUpdated ||
      cancelOrExitClicked
    ) {
      fetchGetAllNominasEmpleadosAndHandleErrors();
      setNominaEmpleadoFormUpdated(false);
      setNominaEmpleadoGenerateUpdated(false);
      setCancelOrExitClicked(false);
    }
  }, [
    nominaEmpleadoFormUpdated,
    nominaEmpleadoGenerateUpdated,
    cancelOrExitClicked,
  ]);

  function nominaEmpleadoGenerateUpdatedTrigger() {
    setNominaEmpleadoGenerateUpdated(!nominaEmpleadoGenerateUpdated);
  }

  function nominaEmpleadoFormUpdatedTrigger() {
    setNominaEmpleadoFormUpdated(!nominaEmpleadoFormUpdated);
  }

  function nominaEmpleadoFormClickCancelOrExitTrigger() {
    setCancelOrExitClicked(!cancelOrExitClicked);
  }

  function toggleGenerateNominasEmpleadosModal() {
    setShowModalGenerate(!showModalGenerate);
  }

  function toggleViewUniqueNominaEmpleadoForm() {
    setShowFormViewUnique(!showFormViewUnique);
  }

  const handleGenerateClick = async () => {
    toggleGenerateNominasEmpleadosModal();
    setCargandoInformacionNominasEmpleados(true);

    try {
      if (funcionalidadDisponible) {
        const responseGenerateNominasEmpleados =
          await generateNominasEmpleados(); // No esta hecha la funcion

        errorHandlingInfo = checkResponseForErrors(
          responseGenerateNominasEmpleados
        );

        if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseGenerateNominasEmpleados.errorMessage
          );
          return;
        }

        setContadorNominasEmpleadosGeneradas(
          responseGenerateNominasEmpleados.data
        );
      }

      setCargandoInformacionNominasEmpleados(false);
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const handleViewUniqueClick = (id) => () => {
    const filaSeleccionada = dataSource.find((row) => row.id === id);
    setRowSelected(filaSeleccionada);
    toggleViewUniqueNominaEmpleadoForm();
  };

  const handleModalGenerateNominasEmpleadosOk = () => {
    resetStates();
    nominaEmpleadoGenerateUpdatedTrigger();
  };

  const handleModalClose = () => {
    resetStates();
  };

  function resetStates() {
    setShowModalGenerate(false);
    setShowFormViewUnique(false);

    setContadorNominasEmpleadosGeneradas(0);
    setCargandoInformacionNominasEmpleados(false);
    setAceptarBotonParaVerResultadosNominasEmpleados(false);
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
          const filename = "NominasEmpleados.json";
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
          const filename = "NominasEmpleados.csv";
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

  const renderTableNominaEmpleado = () => {
    function generateNominasEmpleadosModal() {
      if (!funcionalidadDisponible) {
        return (
          <Antd.Modal
            title={``}
            open={showModalGenerate}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={handleModalClose}
            centered
          >{mensajeFuncionalidad}</Antd.Modal>
        );
      } else {
        if (!aceptarBotonParaVerResultadosNominasEmpleados) {
          return (
            <Antd.Modal
              title={`Generando nóminas...`}
              open={showModalGenerate}
              okButtonProps={{ style: { display: "none" } }}
              cancelButtonProps={{ style: { display: "none" } }}
              onCancel={handleModalClose}
              centered
            >
              <Antd.Form style={{ marginTop: "5%" }}>
                {!cargandoInformacionNominasEmpleados && (
                  <div>
                    <Antd.Button
                      onClick={() =>
                        setAceptarBotonParaVerResultadosNominasEmpleados(true)
                      }
                    >
                      {"Ver los resultados"}
                    </Antd.Button>
                  </div>
                )}
              </Antd.Form>
            </Antd.Modal>
          );
        } else if (aceptarBotonParaVerResultadosNominasEmpleados) {
          return (
            <Antd.Modal
              title={`Resultados nóminas empleados generadas`}
              open={showModalGenerate}
              okText="Aceptar"
              onOk={handleModalGenerateNominasEmpleadosOk}
              cancelText="Cancelar"
              cancelButtonProps={{ style: { display: "none" } }}
              onCancel={handleModalClose}
              centered
            >
              <div>
                <Antd.Form style={{ marginTop: "5%" }}>
                  <p>
                    Nóminas totales generadas:{" "}
                    {contadorNominasEmpleadosGeneradas}
                  </p>
                </Antd.Form>
              </div>
            </Antd.Modal>
          );
        }
      }
    }

    return (
      <div>
        <Header />
        <h1>Nóminas Empleados</h1>
        <h2>
          <Link href={"/menu-recursos-humanos"}>Menú Recursos humanos</Link>
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
            "& .custom-header": {
              backgroundColor: "#e0e7fa",
              color: "#333",
              fontWeight: "bold",
              fontFamily: "fangsong",
              borderBottom: "2px solid #ccc",
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ccc",
              borderRight: "1px solid #ccc",
            },
          }}
        >
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleGenerateClick}
          >
            Generar nóminas
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

          {showModalGenerate && generateNominasEmpleadosModal()}
        </Box>
        <Footer />
      </div>
    );
  };

  if (backendOrDDBBConnectionError) {
    return (
      <div>
        <ServerConnectionError message={errorMessage} />
      </div>
    );
  } else if (showFormViewUnique) {
    return (
      <div>
        <FormNominasEmpleados
          toggleForm={toggleViewUniqueNominaEmpleadoForm}
          nominaEmpleadoDataForm={rowSelected}
          formUpdateTrigger={nominaEmpleadoFormUpdatedTrigger}
          cancelOrExitClickTrigger={nominaEmpleadoFormClickCancelOrExitTrigger}
          operationType={"view"}
          triggerBackendOrDDBBConnectionError={setBackendOrDDBBConnectionError}
          triggerErrorMessage={setErrorMessage}
        ></FormNominasEmpleados>
      </div>
    );
  } else {
    return renderTableNominaEmpleado();
  }
}
