import React, { useState } from 'react';


export const Search = (props) => {
  const [search, setSearch] = useState("");
  const { handleSearch } = props;
 
  const getLocation = (e) => {
    e.preventDefault();
    const target = e.target;
    console.log(target.location.value);
    console.log("my handle: " + props.handleSearch);
    // props.getSearchHandler(location);
  }

  const handleChange = (e) => {
    
      setSearch(e.target.value);
    
  }

  return (
    <div>
        <div >
            <input 
              value={search}
              type="text" 
              name="location" 
              id="location"
              onChange={handleChange}/>
            <button onClick={() => handleSearch(search)}>Search</button>
        </div>
    </div>
  )
}
