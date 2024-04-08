const SearchResults = (contentData, inputValue) => {
  if (!inputValue) {
    // initial data fetch from json
    return contentData;
  } else {
    // filter data from the search input
    return contentData.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
}

export default SearchResults;