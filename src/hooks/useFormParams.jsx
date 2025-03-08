import { useLocation } from "react-router-dom";
import { postData } from "../api/apiService";
import {
  AdditionalGSTNoticeBluePrint,
  EproceedingsFormBlueprint,
  NoticeFormBlueprint,
  ResponseOutstandingFormBlueprint,
  TDSNoticeFormBlueprint,
} from "../utils/constants";

export function useFormParams(serviceType, formType) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getParamsByFormType = (type, variant) => {
    const params = {
      "income-tax": {
        eproceedings: {
          key: "proceedingID",
          value: queryParams.get("proceedingID"),
        },
        responseOutstandings: {
          key: "responseID",
          value: queryParams.get("responseID"),
        },
      },
      gstin: {
        notices: { key: "noticeID", value: queryParams.get("noticeID") },
        additionalNotices: {
          key: "additionalNoticeID",
          value: queryParams.get("additionalNoticeID"),
        },
      },
      tds: {
        tdsNotices: {
          key: "tdsNoticeID",
          value: queryParams.get("tdsNoticeID"),
        },
      },
    };

    return params[type]?.[variant] || null;
  };

  const formParams = getParamsByFormType(serviceType, formType);

  const decodedID = formParams?.value
    ? decodeURIComponent(formParams.value)
    : null;

  const decodedKey = formParams?.key;

  const getFormTitle = (key) => {
    switch (key) {
      case "proceedingID":
        return "Tax Notice Form [ E-Proceedings ] ";
      case "responseID":
        return "Tax Notice Form [ Response Outstandings ] ";
      case "noticeID":
        return "Tax Notice Form [ Notices ] ";
      case "additionalNoticeID":
        return "Tax Notice Form [ Additional Notices ] ";
      case "tdsNoticeID":
        return "Tax Notice Form [ TDS Notices ]";
      default:
        return "Tax Notice Form";
    }
  };

  const getFormApiEndpoint = (key) => {
    switch (key) {
      case "proceedingID":
        return "fin_buddy.api.e_proceeding_details";
      case "responseID":
        return "fin_buddy.api.response_to_outstanding_demand_details";
      case "noticeID":
        return "fin_buddy.api.gst_notice_details";
      case "additionalNoticeID":
        return "fin_buddy.api.gst_additional_notice_details";
      case "tdsNoticeID":
        return "fin_buddy.api.tds_notice_details";
      default:
        return "";
    }
  };

  const getFormType = (key) => {
    switch (key) {
      case "proceedingID":
        return "E Proceeding";
      case "responseID":
        return "Response to Outstanding Demand";
      case "noticeID":
        return "GST Notice And Order";
      case "additionalNoticeID":
        return "GST Additional Notice And Order";
      case "tdsNoticeID":
        return "TDS Notice";
      default:
        return "";
    }
  };

  const getFormDataLabelsBlueprint = (key) => {
    switch (key) {
      case "proceedingID":
        return EproceedingsFormBlueprint;
      case "responseID":
        return ResponseOutstandingFormBlueprint;
      case "noticeID":
        return NoticeFormBlueprint;
      case "additionalNoticeID":
        return AdditionalGSTNoticeBluePrint;
      case "tdsNoticeID":
        return TDSNoticeFormBlueprint;
      default:
        return null;
    }
  };

  const getInitialFormData = (key) => {
    switch (key) {
      case "proceedingID":
        return {
          id: "Adjustment u/s 143(1)(a)-00030",
          client: "IN-TAX-CLT-00029",
          proceeding_name: "Adjustment u/s 143(1)(a)",
          assessment_year: "2019-20",
          financial_year: "",
          proceeding_status: "Active",
          notice_din: "CPC/1920/G22/1967353344",
          response_due_date: "2020-02-13",
          notice_sent_date: "2020-01-14",
          notice_section: "",
          document_reference_id: "",
          response_acknowledgement: "",
          notice_letter:
            "http://34.132.54.218/private/files/19205016735-AADxxxxx9K-G22.pdf",
          user_input: "",
          mask_this_data: "",
          response_message: "",
          is_terms_and_conditions_checked: 0,
          owner: "Administrator",
          modified_by: "Administrator",
          creation: "2025-03-03 17:06:03.290923",
          modified: "2025-03-03 17:06:03.483517",
          replies: [],
          other_documents: [],
        };
      case "responseID":
        return {
          id: "2016201637051613061T-2016",
          client: "IN-TAX-CLT-00029",
          demand_reference_no: "2016201637051613061T",
          assessment_year: "2016",
          outstanding_demand_amount: 144700,
          section_code: "1431a",
          mode_of_service: "-",
          rectification_rights: "CPC",
          response_type: "Disagree with demand(Either in Full or Part)",
          notice_letter: null,
          user_input: null,
          mask_this_data: null,
          is_terms_and_conditions_checked: 0,
          response_message: null,
          owner: "Administrator",
          modified_by: "Administrator",
          creation: "2025-03-04 14:28:37.793125",
          modified: "2025-03-07 15:37:18.266571",
          other_documents: [],
        };
      case "noticeID":
        return {
          id: "GST-NTE-ODR-055",
          client: "GST-CLT-00032",
          notice_id: "12321434",
          issue_date: "2025-03-02",
          issued_by: "system",
          due_date: "2025-03-08",
          type: "Order",
          amount: 20000.0,
          description: "system generated ",
          notice_letter: "",
          owner: "Administrator",
          modified_by: "Administrator",
          creation: "2025-03-05 20:19:49.591005",
          modified: "2025-03-05 20:54:24.409005",
        };
      case "additionalNoticeID":
        return {
          id: "picka0k61f",
          client: "GST-CLT-00032",
          ref_id: "46567890GHHJ76788997",
          type_of_notice: "NoticeSec76",
          date_of_issuance: "2025-03-19",
          description: "Office",
          case_details: "rnhhpcc199",
          owner: "Administrator",
          modified_by: "Administrator",
          creation: "2025-03-08 16:18:16.055987",
          modified: "2025-03-08 16:18:34.571229",
        };
      case "tdsNoticeID":
        return {
          id: "TDS-00279",
          client: "TDS-CLT-00059",
          owner: "Administrator",
          modified_by: "Administrator",
          creation: "2025-03-05 21:08:55.834162",
          modified: "2025-03-08 16:18:59.855603",
          notices: [
            {
              id: "8v78pfrel2",
              financial_year: "2023-24",
              manual_demand: 0.0,
              processed_demand: 64560.0,
              tds_summary_details: "TDS-SMRY-00284",
            },
          ],
        };
      default:
        return {};
    }
  };
  const FormTitle = getFormTitle(decodedKey);
  const FormEndpoint = getFormApiEndpoint(decodedKey);
  const initialFormData = getInitialFormData(decodedKey);
  const FormBlueprint = getFormDataLabelsBlueprint(decodedKey);
  const FormType = getFormType(decodedKey);

  return {
    decodedID,
    decodedKey,
    formParams,
    FormTitle,
    FormEndpoint,
    initialFormData,

    FormBlueprint,
    FormType,
  };
}
