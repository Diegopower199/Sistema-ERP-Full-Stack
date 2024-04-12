export const API_URL_BACK_END = `http://${process.env.NEXT_PUBLIC_WEB_SERVER}:${process.env.NEXT_PUBLIC_WEB_PORT_BACK_END}/#/api/`;

export const API_URL_EMAIL = `http://${process.env.NEXT_PUBLIC_WEB_SERVER}:${process.env.NEXT_PUBLIC_WEB_PORT_EMAIL}/`;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export const LOCALIZED_COLUMN_MENU_TEXTS = {
  columnMenuUnsort: "No Sort",
  columnMenuSortAsc: "Sort Ascending",
  columnMenuSortDesc: "Sort Descending",
  columnMenuFilter: "Filter",
  columnMenuHideColumn: "Hide Column",
  columnMenuShowColumns: "Show Columns",
};

export const NOMBRES_MESES = {
  1: { value: 1, label: "Enero" },
  2: { value: 2, label: "Febrero" },
  3: { value: 3, label: "Marzo" },
  4: { value: 4, label: "Abril" },
  5: { value: 5, label: "Mayo" },
  6: { value: 6, label: "Junio" },
  7: { value: 7, label: "Julio" },
  8: { value: 8, label: "Agosto" },
  9: { value: 9, label: "Septiembre" },
  10: { value: 10, label: "Octubre" },
  11: { value: 11, label: "Noviembre" },
  12: { value: 12, label: "Diciembre" },
};
