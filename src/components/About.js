import React, { useContext } from "react";
import CaContext from "../context/contractapp/CaContext";

const About = () => {
  const cactx = useContext(CaContext);
  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <h3> Developed By : {cactx.devloper}</h3>
      <h3> Email : {cactx.email}</h3>
    </div>
  );
};
export default About;
