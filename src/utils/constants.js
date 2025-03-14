import { FaSync } from "react-icons/fa";

// export const API_BASE_URL = "http://localhost:4000/api/v1";
// export const API_BASE_URL = "http://192.168.1.52:4000/api/v1";
// export const API_BASE_URL = "http://34.132.54.218/api/method/";
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const PATHS = {
  HOME: "/",
};

export const data = [
  {
    client: "Client 1",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 2",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 3",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 4",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 5",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 6",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 7",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 8",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 9",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 10",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 11",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 12",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 13",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 14",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
  {
    client: "Client 15",
    status: 1,
    username: "user-name",
    password: "**********",
    id: "ID",
    action: <FaSync />,
  },
];

export const columns = [
  { label: "Client", key: "client_name" },
  { label: "Disabled", key: "disabled" },
  { label: "Username", key: "username" },
  { label: "Password", key: "password" },
  { label: "ID", key: "id" },
  { label: "Last Sync", key: "last_income_tax_sync" },
  // { label: "Action", key: "action" },
];

export const ResponseOutstandingFormBlueprint = {
  section1: [
    { label: "Demand Reference Number", name: "demand_reference_no" },
    { label: "Assessment Year", name: "assessment_year" },
    { label: "Section Code", name: "section_code" },
    { label: "Client", name: "client" },
  ],
  section2: [
    { label: "Rectification Rights", name: "rectification_rights" },
    { label: "Mode Of Service ", name: "mode_of_service" },
    { label: "Response Type", name: "response_type" },
    { label: "Outstanding Demand Amount", name: "outstanding_demand_amount" },
  ],
  section3: [],
  section4: [{ label: "Notice ID", name: "id" }],
  section5: [],
};

export const NoticeFormBlueprint = {
  section1: [
    { label: "Client", name: "client" },
    { label: "ID", name: "id" },
    { label: "Amount", name: "amount" },
    { label: "Type", name: "type" },
    { label: "Description", name: "description" },
  ],
  section2: [{ label: "Notice ID", name: "notice_id" }],
  section3: [
    { label: "Issued By", name: "issued_by" },
    { label: "Issued Date", name: "issue_date" },
    { label: "Due Date", name: "due_date" },
  ],
  section4: [{ label: "Notice ID", name: "id" }],
  section5: [],
};

export const TDSNoticeFormBlueprint = {
  section1: [
    { label: "Client", name: "client" },
    { label: "ID", name: "id" },
    { label: "Owner", name: "owner" },
  ],
  section2: [],
  section3: [],
  section4: [{ label: "Notice ID", name: "id" }],
  section5: [{ label: "Notices", name: "notices" }],
};

export const AdditionalGSTNoticeBluePrint = {
  section1: [
    { label: "Client", name: "client" },
    { label: "ID", name: "id" },
    { label: "Ref ID", name: "ref_id" },
    { label: "Description", name: "description" },
    { label: "Case Details", name: "case_details" },
  ],
  section2: [
    { label: "Ref ID", name: "ref_id" },
    { label: "Notice Type", name: "type_of_notice" },
  ],
  section3: [{ label: "Issued Date", name: "date_of_issuance" }],
  section4: [{ label: "Notice ID", name: "id" }],
  section5: [{ label: "Notices", name: "notices" }],
};

export const EproceedingsFormBlueprint = {
  section1: [
    { label: "Proceeding Name", name: "client" },
    { label: "Assessment Year", name: "assessment_year" },
    { label: "Financial Year", name: "financial_year" },
    { label: "Client", name: "client" },
    { label: "Proceeding Status", name: "proceeding_status" },
  ],
  section2: [
    { label: "Notice/ Communication Reference ID", name: "notice_din" },
    { label: "Notice Section", name: "notice_section" },
    { label: "Document reference ID", name: "document_reference_id" },
  ],
  section3: [
    { label: "Response Due Date", name: "response_due_date" },
    { label: "Notice Sent Date", name: "notice_sent_date" },
  ],
  section4: [
    { label: "Notice/ Communication Reference ID", name: "notice_din" },
  ],
  section5: [
    {
      label: "Previous Replies",
      name: "replies",
      sectionHeader: "Previous Replies",
    },
  ],
};
