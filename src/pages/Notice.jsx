import React from 'react'
import { Table } from '../components/Table'
import { MainLayout } from '../layouts/MainLayout';
import { FaRegCalendar, FaRegClock, FaFileAlt } from "react-icons/fa";

export const Notice = () => {
    const data = [
                    { title: "Company 1", count: 1, icon: <FaFileAlt /> },
                    { title: "Company 2", count: 2, icon: <FaRegCalendar /> },
                    { title: "Company 3", count: 3, icon: <FaRegClock /> },
                    { title: "Company 4", count: 4, icon: <FaFileAlt /> },
                    { title: "Company 5", count: 5, icon: <FaFileAlt /> },
                    { title: "Company 6", count: 6, icon: <FaFileAlt /> },
                    { title: "Company 7", count: 7, icon: <FaFileAlt /> },
                    { title: "Company 8", count: 8, icon: <FaRegCalendar /> },
                    { title: "Company 9", count: 9, icon: <FaRegClock /> },
                    { title: "Company 10", count: 10, icon: <FaFileAlt /> },
                    { title: "Company 11", count: 11, icon: <FaFileAlt /> },
                    { title: "Company 12", count: 12, icon: <FaFileAlt /> },
                    { title: "Company 13", count: 13, icon: <FaFileAlt /> },
                    { title: "Company 14", count: 14, icon: <FaRegCalendar /> },
                    { title: "Company 15", count: 15, icon: <FaRegClock /> },
                    { title: "Company 16", count: 16, icon: <FaFileAlt /> },
                    { title: "Company 17", count: 17, icon: <FaFileAlt /> },
                    { title: "Company 18", count: 18, icon: <FaFileAlt /> },
                  ];
                  
                  const columns = [
                    { label: "Title", key: "title" },
                    { label: "Count", key: "count" },
                    { label: "Icon", key: "icon" },
                  ];
  return (
    <MainLayout>
        <Table columns={columns} data={data} itemsPerPage={10} />
    </MainLayout>
  )
}
