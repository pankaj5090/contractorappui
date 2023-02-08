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

export default function EmployeeGrid(props) {
  let emptyEmployee = {
    _id: "",
    name: "",
    aadhar: "",
    account: "",
    ifsc: "",
    esic: "",
    epf: "",
    sex: "",
    birthdate: "",
  };

  const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
  const [employee, setEmployee] = useState(emptyEmployee);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);

  const context = useContext(CaContext);
  const { employees, deleteEmployee, deleteEmployees, getEmployees } = context;

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = "Search";
  const navigate = useNavigate();
  const addNewEmployee = () => {
    navigate("/addemployee");
  };

  const editEmployee = (rowData) => {
    navigate("/addemployee", { state: rowData });
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployee(employee);
    setDeleteEmployeeDialog(true);
  };

  const hideDeleteEmployeeDialog = () => {
    setDeleteEmployeeDialog(false);
  };

  const hideDeleteEmployeesDialog = () => {
    setDeleteEmployeesDialog(false);
  };

  const deleteEmp = async (e) => {
    try {
      await deleteEmployee(employee);
      setDeleteEmployeeDialog(false);
      toast.success("Employee successfully deleted", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      setDeleteEmployeeDialog(false);
      toast.error(`Employee deletion failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const deleteSelectedEmployees = async (e) => {
    try {
      await deleteEmployees(selectedEmployees);
      setDeleteEmployeesDialog(false);
      setSelectedEmployees(null);
      toast.success("Employees successfully deleted", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      toast.error(`Employees deletion failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };
  const confirmDeleteSelected = () => {
    setDeleteEmployeesDialog(true);
  };

  const deleteEmployeeDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteEmployeeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteEmp}
      />
    </React.Fragment>
  );

  const deleteEmployeesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteEmployeesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedEmployees}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New Employee"
          icon="pi pi-plus"
          className="p-button-success mr-2 p-button-sm"
          onClick={addNewEmployee}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          onClick={confirmDeleteSelected}
          disabled={!selectedEmployees || !selectedEmployees.length}
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
    const exportEmployees = employees.map((row) => ({
      Name: row.name,
      Aadhar_Card: row.aadharCardNumber,
      AccountNumber: row.accountNumber,
      Ifsc_Code: row.ifscCode,
      Esic_Number: row.esicNumber,
      Epf_Number: row.epfNumber,
      Sex: row.sex,
      Birthdate: row.birthDate,
    }));

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportEmployees);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "Employees");
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
          onClick={() => editEmployee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-raised p-button-danger p-button-sm"
          onClick={() => confirmDeleteEmployee(rowData)}
        />
      </React.Fragment>
    );
  };

  const formatDate = (rowData) => {
    if (rowData["birthDate"]) {
      return new Date(
        rowData["birthDate"].substring(0, rowData["birthDate"].indexOf("T"))
      )
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");
    }
  };

  const filtersEmployee = {
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    aadharCardNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    accountNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ifscCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sex: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
          value={employees}
          header="Employees"
          showGridlines
          stripedRows
          size="small"
          sortField="updatedDate"
          sortOrder={-1}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          emptyMessage="No Employee found."
          filters={filtersEmployee}
          filterDisplay="row"
          selection={selectedEmployees}
          onSelectionChange={(e) => setSelectedEmployees(e.value)}
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
            field="aadharCardNumber"
            header="Aadhar Card"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="accountNumber"
            header="Account No"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="ifscCode"
            header="IFSC Code"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="sex"
            header="Sex"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="birthDate"
            body={formatDate}
            header="Birth Date"
            style={{ width: "10%" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Actions"
            style={{ width: "8rem" }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={deleteEmployeeDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteEmployeeDialogFooter}
        onHide={hideDeleteEmployeeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete this employee ?</span>}
        </div>
      </Dialog>
      <Dialog
        visible={deleteEmployeesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteEmployeesDialogFooter}
        onHide={hideDeleteEmployeesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete the selected Employees?</span>}
        </div>
      </Dialog>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
