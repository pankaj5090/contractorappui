import React, { useContext, useState, useEffect } from "react";
import CaContext from "../context/contractapp/CaContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Select from "react-select";

export default function WorkEmployeeAdd() {
  const context = useContext(CaContext);
  const { getEmployees, getWorks, addWorkEmployee } = context;

  const [empList, setEmpList] = useState([]);
  const [workList, setWorkList] = useState([]);

  const [selectedWork, setSelectedWork] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  const [employeesAlreadyWorking, setEmployeesAlreadyWorking] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const empJson = await getEmployees();
      populateEmpDropDown(empJson);
      const workJson = await getWorks();
      populateWorkDropDown(workJson);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateEmpDropDown = (json) => {
    const emps = [];
    if (empList.length === 0) {
      json.map((emp) => {
        emps.push({
          value: emp._id,
          label: emp.name + "--" + emp.aadharCardNumber,
        });
        return emps;
      });
      setEmpList(emps);
    }
  };

  const populateWorkDropDown = (json) => {
    const works = [];
    if (empList.length === 0) {
      json.map((work) => {
        works.push({
          value: work._id,
          label: work.name,
        });
        return works;
      });
      setWorkList(works);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var emps = selectedEmployees.map(function (emp) {
        return emp["value"];
      });
      var employeeFound = await addWorkEmployee(
        selectedWork.value,
        emps,
        selectedDateFrom,
        selectedDateTo
      );
      if (employeeFound && employeeFound.length > 0) {
        setEmployeesAlreadyWorking(employeeFound);
        setTableVisible(true);
        toast.error(
          `Employees are already working in some other work for given period. Please check  employees in  below table:`,
          {
            theme: "dark",
            hideProgressBar: true,
            autoClose: 3000,
          }
        );
      } else {
        setTableVisible(false);
        toast.success("Employees with work successfully saved", {
          theme: "dark",
          hideProgressBar: true,
        });

        setSelectedWork(null);
        setSelectedEmployees(null);
        setSelectedDateFrom("");
        setSelectedDateTo("");
      }
    } catch (e) {
      toast.error(`Action failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const onChangeWork = (e) => {
    setSelectedWork(e);
  };
  const onChangeEmployee = (e) => {
    setSelectedEmployees(e);
  };
  const onChangeDateFrom = (e) => {
    setSelectedDateFrom(e.target.value);
  };
  const onChangeDateTo = (e) => {
    setSelectedDateTo(e.target.value);
  };
  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="card mb-3">
        <h5 className="card-header card text-center">Add Employees to work</h5>
        <div className="card-body">
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-5 mb-3">
              <label
                htmlFor="name"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Work Name :
              </label>
              <div className="col-sm-6">
                <Select
                  options={workList}
                  placeholder="Select work"
                  isSearchable={true}
                  name="workName"
                  id="workName"
                  onChange={onChangeWork}
                  value={selectedWork}
                  required
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Employees :
              </label>
              <div className="col-sm-6">
                <Select
                  options={empList}
                  placeholder="Select employees"
                  isSearchable={true}
                  isMulti
                  name="employeeNames"
                  id="employeeNames"
                  onChange={onChangeEmployee}
                  value={selectedEmployees}
                  required
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Date From :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="dateFrom"
                  name="dateFrom"
                  onChange={onChangeDateFrom}
                  required
                  value={selectedDateFrom}
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Date To :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="dateTo"
                  name="dateTo"
                  onChange={onChangeDateTo}
                  required
                  value={selectedDateTo}
                />
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={1000} />

      {tableVisible && (
        <div className="card mb-3">
          <DataTable
            value={employeesAlreadyWorking}
            header="Employees already working on different work"
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
            emptyMessage="No Employee working on different work."
          >
            <Column field="workName" header="Work Name" sortable />
            <Column field="division" header="Division" sortable />
            <Column field="empName" header="Employee Name" sortable />
            <Column field="aadhar" header="Aadhar Card" sortable />
            <Column field="dateFrom" header="From Date" />
            <Column field="dateTo" header="To Date" />
          </DataTable>
        </div>
      )}
    </div>
  );
}
