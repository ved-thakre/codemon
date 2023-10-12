export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "15vw",
    minWidth: "5rem",
    borderRadius: "5px",
    color: "#000",
    fontSize: "0.9rem",
    lineHeight: "1.15rem",
    backgroundColor: " rgb(52 211 153)",
    cursor: "pointer",
    border: "none",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "black",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
