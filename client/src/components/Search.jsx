import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const Search = ({ tags, setFeed }) => {
  const [queries, setQueries] = useState([]);

  const onChange = (e) => {
    setQueries(e.target.value.split(" "));
  };

  const onSearch = async () => {
    const searchTags = queries.map((q) => {
      return tags.filter((tag) => tag.tag === q);
    }).flat();
    const ids = searchTags.map((tag) => tag.id_post);
    const finalSearch = Array.from(new Set(ids));
    const allPosts = await Promise.all(finalSearch.map(async (id) => {
      return await axios.get(`/searchfeed/${id}`)
        .then((posts) => posts.data)
        .catch((err) => console.warn("Could not get posts that match your search", err));
    }));
    setFeed(allPosts.flat());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        style={{
          width: "250px",
          height: "30px",
          fontSize: "14px",
          paddingLeft: "10px",
          marginRight: "5px",
        }}
        onChange={(e) => onChange(e)}
      />
      <IconButton onClick={() => onSearch()} >
        <SearchOutlinedIcon />
      </IconButton>
    </div>
  );
};

Search.propTypes = {
  feed: PropTypes.array.isRequired,
  setFeed: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_post: PropTypes.number,
      tag: PropTypes.string,
    })
  ),
};

export default Search;
