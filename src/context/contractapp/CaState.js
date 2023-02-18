import CaContext from "./CaContext";
import { useState } from "react";

const CaState = (props) => {
  const host = process.env.REACT_APP_SERVER_URL;
  const [employees, setEmployees] = useState([]);
  const [works, setWorks] = useState([]);

  const getEmployees = async () => {
    const response = await fetch(`${host}/employee/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const json = await response.json();
    setEmployees(json);
    return json;
  };

  //add employee
  const addEmployee = async (newEmployee) => {
    /* code to call api */
    const formData = new FormData();
    formData.append("name", newEmployee.name);
    formData.append("aadhar", newEmployee.aadhar);
    formData.append("account", newEmployee.account);
    formData.append("ifsc", newEmployee.ifsc);
    formData.append("esic", newEmployee.esic);
    formData.append("epf", newEmployee.epf);
    formData.append("sex", newEmployee.sex);
    formData.append("birthdate", newEmployee.birthdate);
    formData.append("aadharFile", newEmployee.aadharFile);
    formData.append("passBookFile", newEmployee.passBookFile);
    const response = await fetch(`${host}/employee/add`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var multerError = jsonResponse.multerError;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      if (multerError) {
        errormessages = errormessages.concat(multerError + " ");
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  //edit employee
  const updateEmployee = async (newEmployee) => {
    /* code to call api */
    const formData = new FormData();
    formData.append("id", newEmployee.id);
    formData.append("name", newEmployee.name);
    formData.append("aadhar", newEmployee.aadhar);
    formData.append("account", newEmployee.account);
    formData.append("ifsc", newEmployee.ifsc);
    formData.append("esic", newEmployee.esic);
    formData.append("epf", newEmployee.epf);
    formData.append("sex", newEmployee.sex);
    formData.append(
      "birthdate",
      null != newEmployee.birthdate ? newEmployee.birthdate : ""
    );
    formData.append("aadharFile", newEmployee.aadharFile);
    formData.append("passBookFile", newEmployee.passBookFile);
    const response = await fetch(`${host}/employee/update`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var multerError = jsonResponse.multerError;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      if (multerError) {
        errormessages = errormessages.concat(multerError + " ");
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };
  //delete employee
  const deleteEmployee = async (employee) => {
    /* code to call api */
    const response = await fetch(`${host}/employee/delete/${employee._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        console.log(errorlist);
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    } else {
      const updatedEmployees = employees.filter((emp) => {
        return employee._id !== emp._id;
      });
      setEmployees(updatedEmployees);
    }
  };

  //delete multiple employees
  const deleteEmployees = async (selectedEmployees) => {
    /* code to call api */
    let ids = selectedEmployees.map((emp) => emp._id);
    const response = await fetch(`${host}/employee/deleteMany`, {
      method: "POST",
      body: JSON.stringify({ ids: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;

      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        console.log(errorlist);
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    } else {
      const emps = employees.filter((val) => !selectedEmployees.includes(val));
      setEmployees(emps);
    }
  };

  ////Work functions

  const getWorks = async () => {
    const response = await fetch(`${host}/work/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const json = await response.json();
    setWorks(json);
    return json;
  };

  //add work
  const addWork = async (newWork) => {
    /* code to call api */
    const formData = new FormData();
    console.log(newWork.name);
    formData.append("name", newWork.name);
    formData.append("division", newWork.division);
    formData.append("allottedDate", newWork.allottedDate);
    formData.append("fdrBankGuaranteeNo", newWork.fdrBankGuaranteeNo);
    formData.append("fdrBankName", newWork.fdrBankName);
    formData.append("guaranteeAmount", newWork.guaranteeAmount);
    formData.append("estimatedCost", newWork.estimatedCost);
    formData.append("contractorCost", newWork.contractorCost);
    formData.append("acceptedCost", newWork.acceptedCost);
    formData.append("percentageTender", newWork.percentageTender);
    formData.append("timeAllowed", newWork.timeAllowed);
    formData.append("fdrFile", newWork.fdrFile);

    const response = await fetch(`${host}/work/add`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var multerError = jsonResponse.multerError;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      if (multerError) {
        errormessages = errormessages.concat(multerError + " ");
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  //edit work
  const updateWork = async (newWork) => {
    /* code to call api */
    const formData = new FormData();
    formData.append("id", newWork.id);
    formData.append("name", newWork.name);
    formData.append("division", newWork.division);
    formData.append("allottedDate", newWork.allottedDate);
    formData.append("fdrBankGuaranteeNo", newWork.fdrBankGuaranteeNo);
    formData.append("fdrBankName", newWork.fdrBankName);
    formData.append("guaranteeAmount", newWork.guaranteeAmount);
    formData.append("estimatedCost", newWork.estimatedCost);
    formData.append("contractorCost", newWork.contractorCost);
    formData.append("acceptedCost", newWork.acceptedCost);
    formData.append("percentageTender", newWork.percentageTender);
    formData.append("timeAllowed", newWork.timeAllowed);
    formData.append("fdrFile", newWork.fdrFile);

    const response = await fetch(`${host}/work/update`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var multerError = jsonResponse.multerError;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      if (multerError) {
        errormessages = errormessages.concat(multerError + " ");
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  //delete work
  const deleteWork = async (work) => {
    /* code to call api */
    const response = await fetch(`${host}/work/delete/${work._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    } else {
      const updatedWorks = works.filter((w) => {
        return work._id !== w._id;
      });
      setWorks(updatedWorks);
    }
  };

  //delete multiple works
  const deleteWorks = async (selectedWorks) => {
    /* code to call api */
    let ids = selectedWorks.map((w) => w._id);
    const response = await fetch(`${host}/work/deleteMany`, {
      method: "POST",
      body: JSON.stringify({ ids: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    } else {
      const ws = works.filter((val) => !selectedWorks.includes(val));
      setWorks(ws);
    }
  };

  // Employees to Work
  const addWorkEmployee = async (
    selectedWork,
    selectedEmployees,
    selectedDateFrom,
    selectedDateTo
  ) => {
    const response = await fetch(`${host}/work/employeeadd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workId: selectedWork,
        employees: selectedEmployees,
        dateFrom: selectedDateFrom,
        dateTo: selectedDateTo,
      }),
    });

    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var employeeFound = jsonResponse.employeeFound;
      if (employeeFound && employeeFound.length > 0) {
        console.log(employeeFound);
        return employeeFound;
      }
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  //delete employee
  const deleteWorkEmployee = async (workEmployee) => {
    /* code to call api */
    const response = await fetch(`${host}/work/employeedelete`, {
      method: "POST",
      body: JSON.stringify({
        workId: workEmployee.workId,
        empId: workEmployee.empIdWithWork,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  //edit work
  const updateWorkEmployee = async (newWorkEmployee) => {
    /* code to call api */
    const response = await fetch(`${host}/work/employeeupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workId: newWorkEmployee.workId,
        employeeId: newWorkEmployee.employeeId,
        dateFrom: newWorkEmployee.dateFrom,
        dateTo: newWorkEmployee.dateTo,
        empIdWithWork: newWorkEmployee.empIdWithWork,
      }),
    });
    if (response.status !== 200) {
      const jsonResponse = await response.json();
      var errors = jsonResponse.errors;
      var errorlist = jsonResponse.errorlist;
      var errormessages = "";
      if (errors) {
        errors.map((e) => {
          errormessages = errormessages.concat(e.msg + " ");
          return errormessages;
        });
      }

      if (errorlist) {
        errorlist.forEach(function (error) {
          errormessages = errormessages.concat(error + " ");
        });
      }
      throw new Error(`Request failed: ${errormessages}`);
    }
  };

  const fetchImage = async (fileName, path) => {
    const response = await fetch(`${host}${path}${fileName}`);
    if (response.status !== 200) {
      throw new Error(`Image Not found: ${response.status}`);
    }
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  };

  return (
    <CaContext.Provider
      value={{
        //employee
        employees,
        addEmployee,
        deleteEmployee,
        deleteEmployees,
        getEmployees,
        updateEmployee,
        //work
        works,
        addWork,
        deleteWork,
        deleteWorks,
        getWorks,
        updateWork,

        //add employee to work
        addWorkEmployee,
        deleteWorkEmployee,
        updateWorkEmployee,

        //fetch image
        fetchImage,
      }}
    >
      {props.children}
    </CaContext.Provider>
  );
};

export default CaState;
