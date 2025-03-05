import { FaSync } from "react-icons/fa";

export const API_BASE_URL = "http://localhost:4000/api/v1";
// export const API_BASE_URL = "http://192.168.1.52:4000/api/v1";

export const PATHS = {
  HOME: "/",
};

export const data = [
        { client: "Client 1", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 2", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 3", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 4", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 5", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 6", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 7", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 8", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 9", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 10", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 11", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 12", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 13", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 14", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },
        { client: "Client 15", status: 1, username: "user-name", password: "**********", id: "ID", action: <FaSync /> },

    ];

 export   const columns = [
        { label: "Client", key: "client_name" },
        { label: "Disabled", key: "disabled" },
        { label: "Username", key: "username" },
        { label: "Password", key: "password" },
        { label: "ID", key: "id" },
        { label: "Last Sync", key: "last_income_tax_sync" },
        // { label: "Action", key: "action" },
    ];