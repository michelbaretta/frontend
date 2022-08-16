import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <div className="search__div">
      <form className="search-box" onSubmit={submitHandler}>
        <input
          className="search-input"
          type="text"
          name="q"
          id="q"
          placeholder="Search Here..."
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="search-btn" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
}
