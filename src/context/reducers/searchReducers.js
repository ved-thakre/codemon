
const searchReducers = (state = null, action) => {
  switch (action.type) {
    case "SET_SEARCH_ACTIONS":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case "SET_SEARCH_ACTIONS_EMPTY":
      return {
        ...state,
        searchTerm: "",
      };

    default:
      return state;
  }
};


export default searchReducers;