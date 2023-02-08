import CaContext from "./CaContext";
import { useState } from "react";

const CaState = (props) => {
  const host = "http://localhost:5000";
  const [employees, setEmployees] = useState([]);
  const [works, setWorks] = useState([]);

  const getEmployees = async () => {
    const response = await fetch(`${host}/api/employee/get`, {
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
    const response = await fetch(`${host}/api/employee/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEmployee.name,
        aadhar: newEmployee.aadhar,
        account: newEmployee.account,
        ifsc: newEmployee.ifsc,
        esic: newEmployee.esic,
        epf: newEmployee.epf,
        sex: newEmployee.sex,
        birthdate: newEmployee.birthdate,
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

  //edit employee
  const updateEmployee = async (newEmployee) => {
    /* code to call api */
    const response = await fetch(`${host}/api/employee/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newEmployee.id,
        name: newEmployee.name,
        aadhar: newEmployee.aadhar,
        account: newEmployee.account,
        ifsc: newEmployee.ifsc,
        esic: newEmployee.esic,
        epf: newEmployee.epf,
        sex: newEmployee.sex,
        birthdate: newEmployee.birthdate,
      }),
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

  //delete employee
  const deleteEmployee = async (employee) => {
    /* code to call api */
    const response = await fetch(
      `${host}/api/employee/delete/${employee._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(`${host}/api/employee/deleteMany`, {
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
    const response = await fetch(`${host}/api/work/get`, {
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
    const response = await fetch(`${host}/api/work/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newWork,
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

  //edit work
  const updateWork = async (newWork) => {
    /* code to call api */
    const response = await fetch(`${host}/api/work/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newWork,
      }),
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

  //delete work
  const deleteWork = async (work) => {
    /* code to call api */
    const response = await fetch(`${host}/api/work/delete/${work._id}`, {
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
    const response = await fetch(`${host}/api/work/deleteMany`, {
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
    const response = await fetch(`${host}/api/work/employeeadd`, {
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
    const response = await fetch(`${host}/api/work/employeedelete`, {
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
    const response = await fetch(`${host}/api/work/employeeupdate`, {
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
      }}
    >
      {props.children}
    </CaContext.Provider>
  );
};

export default CaState;
