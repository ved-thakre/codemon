export const SET_SEARCH_ACTIONS = (searchTerm) => {
  return {
    type: "SET_SEARCH_ACTIONS",
    searchTerm: searchTerm,
  };
};

export const SET_SEARCH_ACTIONS_EMPTY = () => {
  return {
    type: "SET_SEARCH_ACTIONS_EMPTY",
  };
};
