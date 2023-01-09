import CaContext from "./CaContext";
const state = {
  devloper: "Pankaj",
  email: "pankaj5090@gmail.com",
};
const CaState = (props) => {
  return (
    <CaContext.Provider value={state}>{props.children}</CaContext.Provider>
  );
};

export default CaState;
