import { useState, useEffect } from "react";

const useSearch = (data, searchFields) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
     
      const filtered = data.filter((item) =>
        searchFields.some((field) => {
          return String(item.user[field]).toLowerCase().includes(query);
        }
          
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
