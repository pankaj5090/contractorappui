import CaContext from "./CaContext";
import { useState } from "react";

const CaState = (props) => {
  const host = "http://localhost:5000";
  const employeeInitial = [];
  const [employees, setEmployees] = useState(employeeInitial);

  const getEmployees = async () => {
    const response = await fetch(`${host}/api/employee`, {
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
  };

  //add employee
  const addEmployee = async (newEmployee) => {
    /* code to call api */
    const response = await fetch(`${host}/api/employee`, {
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
      throw new Error(`Request failed: ${response.body.msg}`);
    }
  };

  //edit employee
  const editEmployee = () => {};

  //delete employee
  const deleteEmployee = async (employee) => {
    const newEmployees = employees.filter((emp) => {
      return emp._id !== employee._id;
    });
    setEmployees(newEmployees);
  };

  //delete employee
  const deleteEmployees = async (selectedEmployees) => {
    const emps = employees.filter((val) => !selectedEmployees.includes(val));
    setEmployees(emps);
  };

  return (
    <CaContext.Provider
      value={{
        employees,
        addEmployee,
        editEmployee,
        deleteEmployee,
        deleteEmployees,
        getEmployees,
      }}
    >
      {props.children}
    </CaContext.Provider>
  );
};

export default CaState;
