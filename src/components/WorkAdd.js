import React, { useContext, useState, useEffect, useRef } from "react";
import CaContext from "../context/contractapp/CaContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function WorkAdd() {
  const context = useContext(CaContext);
  const location = useLocation();
  const fdrRef = useRef();
  const { addWork, updateWork } = context;
  const [work, setWork] = useState({
    name: "",
    division: "",
    allottedDate: "",
    fdrBankGuaranteeNo: "",
    fdrBankName: "",
    guaranteeAmount: "",
    estimatedCost: "",
    contractorCost: "",
    acceptedCost: "",
    percentageTender: "",
    timeAllowed: "",
    fdrFile: "",
  });

  useEffect(() => {
    if (location.state) {
      var allottedDate = null;
      if (location.state.allottedDate) {
        allottedDate = location.state.allottedDate.substring(
          0,
          location.state.allottedDate.indexOf("T")
        );
      }
      setWork({
        id: location.state._id,
        name: location.state.name,
        division: location.state.division,
        allottedDate: allottedDate,
        fdrBankGuaranteeNo: location.state.fdrBankGuaranteeNo,
        fdrBankName: location.state.fdrBankName,
        guaranteeAmount: location.state.guaranteeAmount,
        estimatedCost: location.state.estimatedCost,
        contractorCost: location.state.contractorCost,
        acceptedCost: location.state.acceptedCost,
        percentageTender: location.state.percentageTender,
        timeAllowed: location.state.timeAllowed,
      });
    }
  }, [location]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state) {
      handleUpdate(work);
    } else {
      handleAdd(work);
    }
  };

  const handleUpdate = async (work) => {
    try {
      await updateWork(work);
      toast.success("Work successfully updated", {
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
    //navigate("/employeegrid");
  };

  const handleAdd = async (work) => {
    try {
      await addWork(work);
      toast.success("Work successfully saved", {
        theme: "dark",
        hideProgressBar: true,
      });
      setWork({
        name: "",
        division: "",
        allottedDate: "",
        fdrBankGuaranteeNo: "",
        fdrBankName: "",
        guaranteeAmount: "",
        estimatedCost: "",
        contractorCost: "",
        acceptedCost: "",
        percentageTender: "",
        timeAllowed: "",
      });
      fdrRef.current.value = "";
    } catch (e) {
      toast.error(`Action failed! ${e.message}`, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };
  const handleUploadFdr = (e) => {
    setWork({ ...work, fdrFile: e.target.files[0] });
  };

  const onChange = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="card mb-3">
        <h5 className="card-header card text-center">Add Work</h5>
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
                  value={work.name}
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Division :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="division"
                  name="division"
                  onChange={onChange}
                  required
                  value={work.division}
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                <span style={{ color: "red" }}>*</span>
                Allotment Date :
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="allottedDate"
                  name="allottedDate"
                  onChange={onChange}
                  required
                  value={work.allottedDate}
                />
              </div>

              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                FDR/Bank Guarantee/Account No :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="fdrBankGuaranteeNo"
                  name="fdrBankGuaranteeNo"
                  onChange={onChange}
                  value={work.fdrBankGuaranteeNo}
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                FDR/Bank Guarantee - Bank Name:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className=" form-control form-control-sm "
                  id="fdrBankName"
                  name="fdrBankName"
                  onChange={onChange}
                  value={work.fdrBankName}
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label-sm text-right fw-bold"
              >
                Guarantee Amount :
              </label>
              <div className="col-sm-4">
                <input
                  type="Number"
                  className="form-control form-control-sm"
                  id="guaranteeAmount"
                  name="guaranteeAmount"
                  onChange={onChange}
                  value={work.guaranteeAmount}
                />
              </div>
            </div>

            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Estimated Cost :
              </label>
              <div className="col-sm-4">
                <input
                  type="Number"
                  className="form-control form-control-sm"
                  id="estimatedCost"
                  name="estimatedCost"
                  onChange={onChange}
                  value={work.estimatedCost}
                />
              </div>

              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Contractor Cost :
              </label>
              <div className="col-sm-4">
                <input
                  type="Number"
                  className="form-control form-control-sm"
                  id="contractorCost"
                  name="contractorCost"
                  onChange={onChange}
                  value={work.contractorCost}
                />
              </div>
            </div>
            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Accepted Cost :
              </label>
              <div className="col-sm-4">
                <input
                  type="Number"
                  className="form-control form-control-sm"
                  id="acceptedCost"
                  name="acceptedCost"
                  onChange={onChange}
                  value={work.acceptedCost}
                />
              </div>

              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Percentage of tender :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="percentageTender"
                  name="percentageTender"
                  onChange={onChange}
                  value={work.percentageTender}
                />
              </div>
            </div>
            <div className="row g-5 mb-3">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Time Allowed :
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="timeAllowed"
                  name="timeAllowed"
                  onChange={onChange}
                  value={work.timeAllowed}
                />
              </div>
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2  col-form-label-sm text-right fw-bold"
              >
                Upload FDR/Bank Guarantee :
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control form-control-sm"
                  id="fdrFile"
                  name="fdrFile"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={fdrRef}
                  onChange={handleUploadFdr}
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
