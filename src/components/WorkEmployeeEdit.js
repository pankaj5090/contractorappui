import React, { useContext, useState, useEffect } from "react";
import CaContext from "../context/contractapp/CaContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function WorkEmployeeEdit() {
  const context = useContext(CaContext);
  const location = useLocation();
  const { updateWorkEmployee } = context;
  const navigate = useNavigate();
  const [workEmployee, setWorkEmployee] = useState({
    workId: "",
    workName: "",
    employeeId: "",
    employeeName: "",
    dateFrom: "",
    dateTo: "",
    aadharCardNumber: "",
  });

  useEffect(() => {
    if (location.state) {
      setWorkEmployee({
        workId: location.state.workId,
        workName: location.state.workName,
        employeeId: location.state.employeeId,
        employeeName: location.state.employeeName,
        dateFrom: location.state.dateFrom,
        dateTo: location.state.dateTo,
        aadharCarNumber: location.state.aadharCardNumber,
      });
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(workEmployee);
  };

  const handleUpdate = async (workEmployee) => {
    try {
      await updateWorkEmployee(workEmployee);

      toast.success("Employee to work successfully updated", {
        theme: "dark",
        hideProgressBar: true,
      });
    } catch (e) {
      toast.error(`Action failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const onChange = (e) => {
    setWorkEmployee({ ...workEmployee, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="card mb-3">
        <h5 className="card-header card text-center">
          Update Employee To Work
        </h5>
        <div className="card-body">
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-5 mb-3">
              <label
                htmlFor="workName"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Work Name :
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className=" form-control form-control-sm"
                  id="workName"
                  name="workName"
                  onChange={onChange}
                  required
                  value={workEmployee.workName}
                  disabled
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="employeeName"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Employee Name :
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="employeeName"
                  name="employeeName"
                  onChange={onChange}
                  required
                  value={
                    workEmployee.employeeName +
                    " - " +
                    workEmployee.aadharCarNumber
                  }
                  disabled
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="dateFrom"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Date From :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className=" form-control form-control-sm "
                  id="dateFrom"
                  name="dateFrom"
                  onChange={onChange}
                  value={workEmployee.dateFrom}
                />
              </div>
              <label
                htmlFor="dateTo"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Date To :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className=" form-control form-control-sm "
                  id="dateTo"
                  name="dateTo"
                  onChange={onChange}
                  value={workEmployee.dateTo}
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
    </div>
  );
}
