export const API_URL_BACK_END = `http://${process.env.NEXT_PUBLIC_WEB_SERVER}:${process.env.NEXT_PUBLIC_WEB_PORT_BACK_END}/#/api/`;

export const API_URL_EMAIL = `http://${process.env.NEXT_PUBLIC_WEB_SERVER}:${process.env.NEXT_PUBLIC_WEB_PORT_EMAIL}/`

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export const LOCALIZED_COLUMN_MENU_TEXTS = {
  columnMenuUnsort: "No Sort",
  columnMenuSortAsc: "Sort Ascending",
  columnMenuSortDesc: "Sort Descending",
  columnMenuFilter: "Filter",
  columnMenuHideColumn: "Hide Column",
  columnMenuShowColumns: "Show Columns",
};
