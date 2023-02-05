import React, { useContext, useEffect, useState } from "react";
import CaContext from "../context/contractapp/CaContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";

export default function WorkGrid(props) {
  let emptyWork = {
    _id: "",
    name: "",
    division: "",
    allotedDate: "",
    fdrBankGuaranteeNo: "",
    guaranteeAmount: "",
    estimatedCost: "",
    contractorCost: "",
    acceptedCost: "",
    percentageTender: "",
    timeAllowed: "",
  };

  const [deleteWorkDialog, setDeleteWorkDialog] = useState(false);
  const [work, setWork] = useState(emptyWork);
  const [selectedWorks, setSelectedWorks] = useState(null);
  const [deleteWorksDialog, setDeleteWorksDialog] = useState(false);

  const context = useContext(CaContext);
  const { works, deleteWork, deleteWorks, getWorks } = context;

  useEffect(() => {
    getWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = "Search";
  const navigate = useNavigate();
  const addNewWork = () => {
    navigate("/addwork");
  };

  const editWork = (rowData) => {
    navigate("/addWork", { state: rowData });
  };

  const confirmDeleteWork = (work) => {
    setWork(work);
    setDeleteWorkDialog(true);
  };

  const hideDeleteWorkDialog = () => {
    setDeleteWorkDialog(false);
  };

  const hideDeleteWorksDialog = () => {
    setDeleteWorksDialog(false);
  };

  const deleteW = async (e) => {
    try {
      await deleteWork(work);
      setDeleteWorkDialog(false);
      toast.success("Work successfully deleted", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      toast.error(`Work deletion failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const deleteSelectedWorks = async (e) => {
    try {
      await deleteWorks(selectedWorks);
      setDeleteWorksDialog(false);
      setSelectedWorks(null);
      toast.success("Works successfully deleted", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      toast.error(`Works deletion failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };
  const confirmDeleteSelected = () => {
    setDeleteWorksDialog(true);
  };

  const deleteWorkDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteWorkDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteW}
      />
    </React.Fragment>
  );

  const deleteWorksDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteWorksDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedWorks}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New Work"
          icon="pi pi-plus"
          className="p-button-success mr-2 p-button-sm"
          onClick={addNewWork}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          onClick={confirmDeleteSelected}
          disabled={!selectedWorks || !selectedWorks.length}
        />
      </React.Fragment>
    );
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const exportExcel = () => {
    const exportWorks = works.map((row) => ({
      Name: row.name,
      Division: row.division,
      Allotment_Date: row.allotedDate,
      FDR_Bank_Guarantee_Account_No: row.fdrBankGuaranteeNo,
      Guarantee_Amount: row.guaranteeAmount,
      Estimated_Cost: row.estimatedCost,
      Contractor_Cost: row.contractorCost,
      Accepted_Cost: row.acceptedCost,
      Percentage_Cost: row.percentageTender,
      Time_Allowed: row.timeAllowed,
    }));

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportWorks);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "Works");
    });
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help p-button-sm"
          onClick={exportExcel}
        />
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-raised p-button-warning mr-2 p-button-sm"
          onClick={() => editWork(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-raised p-button-danger p-button-sm"
          onClick={() => confirmDeleteWork(rowData)}
        />
      </React.Fragment>
    );
  };

  const formatDate = (rowData) => {
    if (rowData["allottedDate"]) {
      return rowData["allottedDate"].substring(
        0,
        rowData["allottedDate"].indexOf("T")
      );
    }
  };

  const filtersWork = {
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    division: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  };

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="card">
        <Toolbar
          className="mb-3"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
          style={{ height: "80px" }}
        ></Toolbar>
        <DataTable
          value={works}
          header="Works"
          showGridlines
          stripedRows
          size="small"
          sortField="name"
          sortOrder={1}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          emptyMessage="No Work found."
          filters={filtersWork}
          filterDisplay="row"
          selection={selectedWorks}
          onSelectionChange={(e) => setSelectedWorks(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="division"
            header="Division"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="allotedDate"
            body={formatDate}
            header="Allotment Date"
            sortable
          />
          <Column field="estimatedCost" header="Estimated Cost" sortable />
          <Column field="contractorCost" header="Contractor Cost" sortable />
          <Column field="acceptedCost" header="Accepted Cost" sortable />
          <Column
            field="percentageTender"
            header="Percentage of tender"
            sortable
          />
          <Column field="timeAllowed" header="Time Allowed" sortable />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Actions"
            style={{ width: "8rem" }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={deleteWorkDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteWorkDialogFooter}
        onHide={hideDeleteWorkDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete this Work ?</span>}
        </div>
      </Dialog>
      <Dialog
        visible={deleteWorksDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteWorksDialogFooter}
        onHide={hideDeleteWorksDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete the selected Works?</span>}
        </div>
      </Dialog>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
