import React, { useContext, useState } from "react";
import CaContext from "../context/contractapp/CaContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeeAdd() {
  const context = useContext(CaContext);
  const { addEmployee } = context;
  const [employee, setEmployee] = useState({
    name: "",
    aadhar: "",
    account: "",
    ifsc: "",
    esic: "",
    epf: "",
    sex: "",
    birthdate: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(employee);
      toast.success("Employee successfully saved", {
        theme: "dark",
        hideProgressBar: true,
      });
      setEmployee({
        name: "",
        aadhar: "",
        account: "",
        ifsc: "",
        esic: "",
        epf: "",
        sex: "",
        birthdate: "",
      });
    } catch (e) {
      toast.error(`Employee addition failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };
  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="card mb-3">
        <h5 className="card-header card text-center">Add Employee</h5>
        <div className="card-body">
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-5 mb-3">
              <label
                htmlFor="name"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Name :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className=" form-control form-control-sm"
                  id="name"
                  name="name"
                  onChange={onChange}
                  required
                  value={employee.name}
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Aadhar Card :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="aadhar"
                  name="aadhar"
                  onChange={onChange}
                  required
                  maxLength="12"
                  minLength="12"
                  value={employee.aadhar}
                  pattern="[0-9]+"
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Account Number :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className=" form-control form-control-sm "
                  id="account"
                  name="account"
                  required
                  onChange={onChange}
                  maxLength="20"
                  minLength="3"
                  value={employee.account}
                  pattern="[0-9]+"
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                IFSC Code :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="ifsc"
                  name="ifsc"
                  onChange={onChange}
                  maxLength="25"
                  minLength="3"
                  value={employee.ifsc}
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Esic Number :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className=" form-control form-control-sm "
                  id="esic"
                  name="esic"
                  onChange={onChange}
                  value={employee.esic}
                  maxLength="25"
                  minLength="3"
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                EPF Number :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="epf"
                  name="epf"
                  onChange={onChange}
                  value={employee.epf}
                  maxLength="25"
                  minLength="3"
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Sex :
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  id="sex"
                  name="sex"
                  onChange={onChange}
                  value={employee.sex}
                >
                  <option defaultValue>Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Birth Date :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="birthdate"
                  name="birthdate"
                  onChange={onChange}
                  value={employee.birthdate}
                />
              </div>
            </div>
            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Upload Aadhar :
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control form-control-sm"
                  id="aadharfile"
                  name="aadharfile"
                  type="file"
                />
              </div>

              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Upload Passbook :
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control form-control-sm"
                  id="passbook"
                  name="passbook"
                  type="file"
                />
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="submit">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
