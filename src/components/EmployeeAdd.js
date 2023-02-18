import React, { useContext, useState, useEffect, useRef } from "react";
import CaContext from "../context/contractapp/CaContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeeAdd() {
  const context = useContext(CaContext);
  const location = useLocation();
  const { addEmployee, updateEmployee } = context;
  const aadharRef = useRef();
  const passBookRef = useRef();
  const [employee, setEmployee] = useState({
    name: "",
    aadhar: "",
    account: "",
    ifsc: "",
    esic: "",
    epf: "",
    sex: "",
    birthdate: "",
    aadharFile: "",
    passBookFile: "",
  });

  useEffect(() => {
    if (location.state) {
      var birthdate = null;
      if (location.state.birthDate) {
        birthdate = location.state.birthDate.substring(
          0,
          location.state.birthDate.indexOf("T")
        );
      }
      setEmployee({
        id: location.state._id,
        name: location.state.name,
        aadhar: location.state.aadharCardNumber,
        account: location.state.accountNumber,
        ifsc: location.state.ifscCode,
        esic: location.state.esicNumber,
        epf: location.state.epfNumber,
        sex: location.state.sex,
        birthdate: birthdate,
      });
    }
  }, [location]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.state) {
      handleUpdate(employee);
    } else {
      handleAdd(employee);
    }
  };

  const handleUpdate = async (employee) => {
    try {
      await updateEmployee(employee);

      toast.success("Employee successfully updated", {
        theme: "dark",
        hideProgressBar: true,
      });
      //navigate("/employeegrid");
    } catch (e) {
      toast.error(`Action failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const handleAdd = async (employee) => {
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
      aadharRef.current.value = "";
      passBookRef.current.value = "";
    } catch (e) {
      toast.error(`Action failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const handleUploadAadhar = (e) => {
    setEmployee({ ...employee, aadharFile: e.target.files[0] });
  };

  const handleUploadPassBook = (e) => {
    setEmployee({ ...employee, passBookFile: e.target.files[0] });
  };

  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="card mb-3">
        <h5 className="card-header card text-center">Add Employee</h5>
        <div className="card-body">
          <form
            className="needs-validation"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
                  id="aadharFile"
                  name="aadharFile"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={aadharRef}
                  onChange={handleUploadAadhar}
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
                  id="passBookFile"
                  name="passBookFile"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={passBookRef}
                  onChange={handleUploadPassBook}
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
