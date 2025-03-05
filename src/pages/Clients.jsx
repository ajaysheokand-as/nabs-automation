import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { MainLayout } from '../layouts/MainLayout';
import { FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header';
import { postData } from '../api/apiService';
import axios from 'axios';

export const Clients = () => {
    const [clientsData, setClientsData] = useState([]);
    const getClientsData = async () =>{
        const data = await postData("fin_buddy.api.income_tax_client_list",
            {
                "start":0,
                "page_length":20,
                "search_query": ""
            }
        );
        setClientsData(data?.result?.records)
        console.log("data=>", data)
    }
    useEffect( () =>{
        getClientsData();
    },[])
    const navigate = useNavigate();
    const data = [
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

    const columns = [
        { label: "Client", key: "client_name" },
        // { label: "Disabled", key: "disabled" },
        { label: "Username", key: "username" },
        // { label: "Password", key: "password" },
        { label: "ID", key: "id" },
        { label: "Last Sync", key: "last_income_tax_sync" },
        // { label: "Action", key: "action" },
    ];
    return (
        <MainLayout>
            <Header title="All Clients" navigate={() => navigate(-1)}/>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        Add Client
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        Import Client
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        Download Template
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
                        Sync All
                    </button>
                </div>
            <Table columns={columns} data={clientsData} itemsPerPage={10} rowRedirection={'/client-view'} />
        </MainLayout>
    )
}
