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

export default function WorkEmployeeGrid(props) {
  let emptyWorkEmployee = {
    workId: "",
    workName: "",
    division: "",
    employeeId: "",
    employeeName: "",
    aadharCardNumber: "",
    accountNumber: "",
    dateFrom: "",
    dateTo: "",
    ifscCode: "",
    epfNumber: "",
    active: "",
  };

  const [deleteWorkEmployeeDialog, setDeleteWorkEmployeeDialog] =
    useState(false);
  const [workEmployees, setWorkEmployees] = useState([]);
  const [workEmployee, setWorkEmployee] = useState(emptyWorkEmployee);
  const [selectedWorkEmployees, setSelectedWorkEmployees] = useState(null);

  const context = useContext(CaContext);
  const { getWorks, getEmployees, deleteWorkEmployee } = context;

  useEffect(() => {
    const fetchData = async () => {
      const empJson = await getEmployees();
      const empObj = createEmpObject(empJson);
      const workJson = await getWorks();
      populateWorkEmployees(workJson, empObj);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createEmpObject = (json) => {
    const empObj = new Map();
    if (json.length >= 0) {
      json.map((emp) => {
        empObj.set(emp._id, emp);
      });
      return empObj;
    }
  };

  const populateWorkEmployees = (workList, empObj) => {
    const workEmps = [];
    if (workList.length > 0) {
      workList.map((work) => {
        if (work.employees && work.employees.length > 0) {
          work.employees.map((obj) => {
            const emp = empObj.get(obj.id);
            var todayDate = new Date().toISOString().slice(0, 10);
            var isActive = "Inactive";
            var dateFrom = formatDate(obj.dateFrom);
            var dateTo = formatDate(obj.dateTo);
            if (
              new Date(todayDate) >= new Date(dateFrom) &&
              new Date(todayDate) <= new Date(dateTo)
            ) {
              isActive = "Active";
            }
            workEmps.push({
              workId: work._id,
              workName: work.name,
              division: work.division,
              employeeId: emp._id,
              employeeName: emp.name,
              aadharCardNumber: emp.aadharCardNumber,
              accountNumber: emp.accountNumber,
              dateFrom: dateFrom,
              dateTo: dateTo,
              ifscCode: emp.ifscCode,
              epfNumber: emp.epfNumber,
              active: isActive,
            });
          });
        }
      });
      setWorkEmployees(workEmps);
    }
  };

  const search = "Search";
  const navigate = useNavigate();
  const addNewWorkEmployee = () => {
    navigate("/addworkemployee");
  };

  const editWorkEmployee = (rowData) => {
    navigate("/editWorkEmployee", { state: rowData });
  };

  const confirmDeleteWorkEmployee = (workEmp) => {
    setWorkEmployee(workEmp);
    setDeleteWorkEmployeeDialog(true);
  };

  const hideDeleteWorkEmployeeDialog = () => {
    setDeleteWorkEmployeeDialog(false);
  };

  const deleteWorkEmp = async (e) => {
    try {
      await deleteWorkEmployee(workEmployee);
      setDeleteWorkEmployeeDialog(false);
      const updatedEmpWork = workEmployees.filter((w) => {
        return workEmployee.employeeId !== w.employeeId;
      });
      setWorkEmployees(updatedEmpWork);
      toast.success("Employee successfully deleted from work", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      toast.error(`Employee deletion from work failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const deleteWorkEmployeeDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteWorkEmployeeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteWorkEmp}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New Employees To Work"
          icon="pi pi-plus"
          className="p-button-success mr-2 p-button-sm"
          onClick={addNewWorkEmployee}
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

        module.default.saveAs(data, fileName + EXCEL_EXTENSION);
      }
    });
  };

  const exportExcel = () => {
    const exportWorkEmployees = workEmployees.map((row) => ({
      Work_Name: row.workName,
      Division: row.division,
      Employee_Name: row.employeeName,
      Aadhar_Card: row.aadharCardNumber,
      AccountNumber: row.accountNumber,
      IfscCode: row.ifscCode,
      EpfNumber: row.epfNumber,
      Date_From: row.dateFrom,
      Date_To: row.dateTo,
      Active_Inactive: row.active,
    }));

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportWorkEmployees);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      var excelFileName =
        "WorkEmployees" + "_" + new Date().toISOString().slice(0, 10);
      saveAsExcelFile(excelBuffer, excelFileName);
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
          onClick={() => editWorkEmployee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-raised p-button-danger p-button-sm"
          onClick={() => confirmDeleteWorkEmployee(rowData)}
        />
      </React.Fragment>
    );
  };

  const formatDate = (stringDate) => {
    if (stringDate) {
      return stringDate.substring(0, stringDate.indexOf("T"));
    }
  };

  const filtersWorkEmployee = {
    workName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    division: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    dateFrom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    dateTo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    employeeName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    aadharCardNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
          value={workEmployees}
          header="Employees To Work"
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
          emptyMessage="No employee added to work."
          filters={filtersWorkEmployee}
          filterDisplay="row"
          selection={selectedWorkEmployees}
          onSelectionChange={(e) => setSelectedWorkEmployees(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="workName"
            header="Work Name"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="division"
            header="division"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="employeeName"
            header="Employee Name"
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
            field="dateFrom"
            header="Date From"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="dateTo"
            header="Date To"
            sortable
            filter
            filterPlaceholder={search}
          />
          <Column
            field="active"
            header="active"
            sortable
            filter
            filterPlaceholder={search}
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
        visible={deleteWorkEmployeeDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteWorkEmployeeDialogFooter}
        onHide={hideDeleteWorkEmployeeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {
            <span>
              Are you sure you want to delete this employee from work ?
            </span>
          }
        </div>
      </Dialog>

      <ToastContainer autoClose={1000} />
    </div>
  );
}
