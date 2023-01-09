import React from "react";

export default function Employee_Search() {
  return (
    <div className="card">
      <div class="card-body">
        <div className="container text-center mb-4 col-md-12">
          <h2>Employee - Search</h2>
        </div>
        <form class="form-inline">
          <div class="row g-3">
            <div class="col-md-1">
              <label for="name" class="col-form-label">
                Name:
              </label>
            </div>
            <div class="col-md-4">
              <input
                class="form-control"
                list="datalistOptions"
                id="namelist"
                placeholder="Type to search..."
              />
              <datalist id="namelist">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
              </datalist>
            </div>

            <div class="col-md-2">
              <label for="aadharcard" class="col-form-label">
                AadharCard Number:
              </label>
            </div>
            <div class="col-md-5">
              <input
                class="form-control"
                list="aadharlist"
                id="aadharcard"
                placeholder="Type to search..."
              />
              <datalist id="aadharlist">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
              </datalist>
            </div>
            <div class="col-12">
              <button type="button" className=" mx-2 btn btn-dark float-end">
                Search
              </button>
              <button type="button" className="btn btn btn-dark float-end">
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
