import React, { useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table';

export const EPForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        proceedingName: 'Adjustment u/s 143(1)(a)',
        assessmentYear: '2018-19',
        client: 'IN-TAX-CLT-00029',
        responseDueDate: '03-10-2019',
        noticeSentDate: '03-09-2019',
        documentReference: '',
        noticeID: '',
        noticeSection: '',
        documentID: '',
        taxPayerName: '',
        department: '',
        status: '',
        remarks: '',
        file: null,
        response:"",
        userInput:""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const data = [
        { file_name: "file_name 1", file: "file", id: "ID", },
        { file_name: "file_name 2", file: "file", id: "ID", },
        { file_name: "file_name 3", file: "file", id: "ID", },

    ];

    const columns = [
        { label: "File Name", key: "file_name" },
        { label: "File", key: "file" },

    ];

    return (
        <MainLayout>
            <Header title="Details" navigate={() => navigate(-1)} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Tax Notice Form</h2>

                    {/* Group 1 - Notice Details */}
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Notice Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Proceeding Name</label>
                                <input type="text" name="noticeID" value={formData.noticeID} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Assessment Year</label>
                                <input type="text" name="noticeSection" value={formData.noticeSection} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Financial Year</label>
                                <input type="text" name="documentReference" value={formData.documentReference} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Client</label>
                                <input type="date" name="responseDueDate" value={formData.responseDueDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Proceeding Status</label>
                                <input type="date" name="noticeSentDate" value={formData.noticeSentDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                    </div>

                    {/* Group 2 - Taxpayer Information */}
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Notice Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Notice/ Communication Reference ID</label>
                                <input type="text" name="client" value={formData.client} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Notice Section</label>
                                <input type="text" name="taxPayerName" value={formData.taxPayerName} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Document reference ID</label>
                                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <div className="grid grid-cols-2 gap-4">


                            <div>
                                <label className="block text-gray-700 font-medium">Response Due Date</label>
                                <input type="date" name="responseDueDate" value={formData.responseDueDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Notice Sent Date</label>
                                <input type="date" name="noticeSentDate" value={formData.noticeSentDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                    {/* Group 3 - Document Information */}
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Documents </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex justify-between items-center">
                                    <label className="block text-gray-700 font-medium">Notice/ Communication Reference ID</label>
                                    <a
                                        href="http://34.132.54.218/private/files/19060089176-AADxxxxx9K-G22%20(3).pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-md"
                                    >
                                        View
                                    </a>
                                </div>
                                <input type="text" name="proceedingName" value={formData.proceedingName} disabled className="w-full p-2 border rounded-md bg-gray-100" />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Upload Document</label>
                                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md cursor-pointer" />
                                {formData.file && <p className="mt-2 text-sm text-gray-600">Selected File: {formData.file.name}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Previous Replies </h3>
                        <Table columns={columns} data={data} itemsPerPage={10} isPagination={0} />
                    </div>
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">User Input </h3>
                        <div>
                            {/* <label className="block text-gray-700 font-medium">User Input</label> */}
                            <textarea
                                name="userInput"
                                value={formData.userInput}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                rows={4} // Adjust rows as needed
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Other Document</label>
                            <Table columns={columns} data={data} itemsPerPage={10} isPagination={0} />
                        </div>

                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mask Data</label>
                        <div className="flex flex-wrap gap-4">
                            {["Name", "Email", "Phone", "Address", "Date of Birth", "PAN", "Aadhaar"].map((item, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="maskData"
                                        value={item.toLowerCase().replace(/\s/g, "_")}
                                        className="rounded"
                                        checked = {1}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                        <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="maskData"
                                        value="1"
                                        className="rounded"
                                        // checked = {1}
                                    />
                                    <span>Send your data to AI Model for response generation?</span>
                                </label>
                    </div>
                    <div className="mb-6 border-b border-gray-300 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Response Message</h3>
                        <div>
                            {/* <label className="block text-gray-700 font-medium">User Input</label> */}
                            <textarea
                                name="response"
                                value={formData.response}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                rows={4} // Adjust rows as needed
                            />
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
