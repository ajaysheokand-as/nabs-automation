import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { MainLayout } from '../../layouts/MainLayout';
import { Table } from '../../components/Table';
import { Header } from '../../components/Header';
import { columns, data } from '../../utils/constants';
import { postData } from '../../api/apiService';
export const Eproceedings = () => {
        const navigate = useNavigate();
        const [ePdataList, setEPDataList] = useState([]);
        const eProceedingsList = async () =>{
            const data = await postData('fin_buddy.api.e_proceeding_list',
                {
                    "start":0,
                    "page_length":20,
                    "search_query": "" //search_query can handle global seach, you can search with proceeding_name, client, notice_din and id. also there is search support for creation date use this format for date search : 'YYYY-MM-DD to YYYY-MM-DD'.
                }
            )
            setEPDataList(data?.result?.records)
            console.log("data=>", data)
        }

        useEffect(()=>{
            eProceedingsList();
        },[])

        const columns = [
            { label: "ID", key: "id" },
            { label: "Name", key: "proceeding_name" },
            { label: "Assessment Year", key: "assessment_year" },
            { label: "Notice Sent Date", key: "notice_sent_date" },
            { label: "Staus", key: "proceeding_status" },
            { label: "Due Date", key: "response_due_date" },
        ];
    
  return (
    <MainLayout>
        <Header title="E-Proceedings" navigate={() => navigate(-1)}/>
            <Table columns={columns} data={ePdataList} itemsPerPage={10} rowRedirection={"/eproceeding-details"}/>
    </MainLayout>
  )
}
