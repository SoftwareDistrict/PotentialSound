import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const Search = ({ tags, currentUser }) => {
  const [setUsers] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [setType] = useState(false);
  const [text, setText] = useState("");
  const [queries] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => data.filter((user) => user !== currentUser))
      .then((users) => {
        setUsers(users);
        setUsernames(users.map((user) => user.username));
      })
      .catch((err) => console.warn("could not get users: ", err));
    setTagNames(tags.map((tag) => tag.tag));
  }, []);

  const suggestionSelected = (value) => {
    queries.push(value);
    setText(queries.join(", "));
    console.info("queries: ", queries);
    setSuggestedUsers([]);
    setSuggestedTags([]);
  };

  const renderSuggestedUsers = () => {
    if (suggestedUsers.length === 0) {
      return null;
    }
    return (
      <ul>
        Users:
        {suggestedUsers.map((user, i) => (
          <li key={i} onClick={() => suggestionSelected(user)}>
            {user}
          </li>
        ))}
      </ul>
    );
  };

  const renderSuggestedTags = () => {
    if (suggestedTags.length === 0) {
      return null;
    }
    return (
      <ul>
        Tags:
        {suggestedTags.map((tag, i) => (
          <li key={i} onClick={() => suggestionSelected(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    );
  };

  const onTextChange = (event) => {
    const value = event.target.value;
    let sortedUserSuggestions = [];
    let sortedTagSuggestions = [];
    if (value.length > 0 || value[value.length - 1] === " ") {
      const regex = new RegExp(`${value}`, "i");
      sortedUserSuggestions = usernames.sort().filter((v) => regex.test(v));
      sortedTagSuggestions = tagNames.sort().filter((v) => regex.test(v));
    }
    setSuggestedUsers(sortedUserSuggestions);
    setSuggestedTags(sortedTagSuggestions);
    setText(value);
    setType(true);
  };

  // const onSearch = async () => {
  // const searchTags = queries.map((q) => tags.filter((tag) => tag.tag === q)).flat();
  // const tagIds = searchTags.map((tag) => tag.id_post);
  // const uniqueTagIds = Array.from(new Set(tagIds));
  // const allTagPosts = await Promise.all(
  //   uniqueTagIds.map(async (id) => {
  //     return await axios
  //       .get(`/searchfeed/${id}`)
  //       .then((posts) => posts.data)
  //       .catch((err) => console.warn("Could not get posts that match your search", err));
  //   })
  // );

  // const searchUsers = queries.map((q) => users.filter((user) => user.username === q)).flat();
  // const userIds = searchUsers.map((user) => user.id);
  // const
  // const allUserPosts = await Promise.all(
  //   userIds.map(async (id) => {
  //     return await axios.get("/")
  //   })
  // );

  // setFeed([allTagPosts.flat(), allUserPosts.flat()].flat());
  // };

  return (
    <div>
      <input
        value={text}
        type="text"
        placeholder="Search"
        style={{
          width: "250px",
          height: "30px",
          fontSize: "14px",
          paddingLeft: "10px",
          marginRight: "5px",
        }}
        onChange={(e) => onTextChange(e)}
      />
      {/* <IconButton onClick={onSearch}> */}
      <SearchOutlinedIcon />
      {/* </IconButton> */}
      {renderSuggestedUsers()}
      {renderSuggestedTags()}
    </div>
  );
};

Search.propTypes = {
  currentUser: PropTypes.object.isRequired,
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
