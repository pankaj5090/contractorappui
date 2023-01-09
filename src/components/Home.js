import React from "react";
import EmployeeGrid from "./Employee_Grid";
import EmployeeSearch from "./Employee_Search";

export default function Home() {
  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <EmployeeSearch />
      <EmployeeGrid />
    </div>
  );
}
