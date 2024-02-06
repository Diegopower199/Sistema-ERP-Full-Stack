export const API_URL = `http://${process.env.NEXT_PUBLIC_WEB_SERVER}:${process.env.NEXT_PUBLIC_WEB_PORT}/#/api/`;

export const RESEND_API_KEY = `${process.env.NEXT_PUBLIC_RESEND_API_KEY}`;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export const LOCALIZED_COLUMN_MENU_TEXTS = {
  columnMenuUnsort: "No Sort",
  columnMenuSortAsc: "Sort Ascending",
  columnMenuSortDesc: "Sort Descending",
  columnMenuFilter: "Filter",
  columnMenuHideColumn: "Hide Column",
  columnMenuShowColumns: "Show Columns",
};
