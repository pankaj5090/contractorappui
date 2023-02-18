import React from "react";
import shivaImage from "../images/shiva.jpg";

const About = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "80px" }}
    >
      <div className="card">
        <img
          className="card-img-top"
          src={shivaImage}
          alt="Card cap"
          width="300"
          height="300"
        />
        <div className="card-body">
          <blockquote className="blockquote text-left">
            <footer className="blockquote-footer">
              Developed By : <cite title="Source Title">Pankaj Kumar</cite>
            </footer>
            <footer className="blockquote-footer">
              Contact here :{" "}
              <cite title="Source Title">pankaj5090@gmail.com</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};
export default About;
