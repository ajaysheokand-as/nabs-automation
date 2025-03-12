import { Dashboard } from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Gstin } from "./pages/Gstin";
import { IncomeTax } from "./pages/IncomeTax";
import { Tds } from "./pages/Tds";
import { ComingSoon } from "./pages/ComingSoon";
import { Notice } from "./pages/Notice";
import { Clients } from "./pages/Clients";
import { ClientView } from "./pages/ClientView";
import { Eproceedings } from "./pages/income-tax/Eproceedings";
import { EPForm } from "./pages/income-tax/EPForm";
import { GSTLayout } from "./layouts/GSTLayout";
import { IncomeTaxLayout } from "./layouts/IncomeTaxLayout";
import { TDSLayout } from "./layouts/TDSLayout";
import { MainLayout } from "./layouts/MainLayout";
import Error404 from "./pages/Error404";
import { ServiceType } from "./utils/enums";
import { GSTNoticeDetails } from "./pages/gst/GSTNoticeDetails";
import { ResponseOutstandings } from "./pages/income-tax/RODemands";
import { GSTNoticeList } from "./pages/gst/GstNoticesList";
import { TDSNoticeList } from "./pages/tds/TDSNoticesList";
import { GSTAdditionalNoticesList } from "./pages/gst/GSTAdditionalNoticesList";
import AddEproceedingForm from "./components/AddEproceedingForm";
import AddResponseOutstandingsForm from "./components/AddResponseOutstandingsForm";
import AddGSTNoticeForm from "./components/AddGSTNoticeForm";
import AddAdditionalNoticeForm from "./components/AddAdditionalNoticeForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Route>

        <Route path={`/${ServiceType.GSTIN}`} element={<GSTLayout />}>
          <Route index element={<Gstin serviceType={ServiceType.GSTIN} />} />

          <Route
            path="clients"
            element={<Clients serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="client-view/:cliendId"
            element={<ClientView serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="clients/:clientId"
            element={<ClientView serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="eproceedings/:clientId"
            element={<Eproceedings serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="eproceeding-details"
            element={<EPForm serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="notices"
            element={<GSTNoticeList serviceType={ServiceType.GSTIN} />}
          />

          <Route
            path="notices/:clientId"
            element={<GSTNoticeList serviceType={ServiceType.GSTIN} />}
          />

          <Route
            path="add-notices/:clientId"
            element={<AddGSTNoticeForm serviceType={ServiceType.GSTIN} />}
          />
          <Route
            path="additional-notices/:clientId"
            element={
              <GSTAdditionalNoticesList serviceType={ServiceType.GSTIN} />
            }
          />
          <Route
            path="add-additional-notices/:clientId"
            element={
              <AddAdditionalNoticeForm serviceType={ServiceType.GSTIN} />
            }
          />
          <Route
            path="notice-details"
            element={<EPForm serviceType={ServiceType.GSTIN} />}
          />
        </Route>

        <Route
          path={`/${ServiceType.INCOME_TAX}`}
          element={<IncomeTaxLayout />}
        >
          <Route
            index
            element={<IncomeTax serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="notice"
            element={<Notice serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="clients"
            element={<Clients serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="client-view/:clientId"
            element={<ClientView serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="eproceedings/:clientId"
            element={<Eproceedings serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="notices"
            element={<Eproceedings serviceType={ServiceType.INCOME_TAX} />}
          />

          <Route
            path="add-eproceedings/:clientId"
            element={
              <AddEproceedingForm serviceType={ServiceType.INCOME_TAX} />
            }
          />
          <Route
            path="eproceeding-details"
            element={<EPForm serviceType={ServiceType.INCOME_TAX} />}
          />
          <Route
            path="responseoutstandings/:clientId"
            element={
              <ResponseOutstandings serviceType={ServiceType.INCOME_TAX} />
            }
          />

          <Route
            path="add-responseoutstandings/:clientId"
            element={
              <AddResponseOutstandingsForm
                serviceType={ServiceType.INCOME_TAX}
              />
            }
          />

          <Route
            path="responseoutstandings-details"
            element={<EPForm serviceType={ServiceType.INCOME_TAX} />}
          />
        </Route>

        <Route path={`/${ServiceType.TDS}`} element={<TDSLayout />}>
          <Route index element={<Tds serviceType={ServiceType.TDS} />} />
          {/* <Route
            path="notice"
            element={<Notice serviceType={ServiceType.TDS} />}
          /> */}
          <Route
            path="clients"
            element={<Clients serviceType={ServiceType.TDS} />}
          />
          <Route
            path="client-view/:clientId"
            element={<ClientView serviceType={ServiceType.TDS} />}
          />
          <Route
            path="eproceedings/:clientId"
            element={<Eproceedings serviceType={ServiceType.TDS} />}
          />
          <Route
            path="eproceeding-details"
            element={<EPForm serviceType={ServiceType.TDS} />}
          />
          <Route
            path="notice"
            element={<TDSNoticeList serviceType={ServiceType.TDS} />}
          />

          <Route
            path="notices/:clientId"
            element={<TDSNoticeList serviceType={ServiceType.TDS} />}
          />
          <Route
            path="notice-details"
            element={<EPForm serviceType={ServiceType.TDS} />}
          />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
