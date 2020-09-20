import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { IconButton, Grid, TextField } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { searchStyles, white } from "../styles/styles.js";
import "regenerator-runtime/runtime";

const Search = ({ tags, setSearchFeed, setSearched }) => {
  const val = useRef();
  const [users, setUsers] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [tagNames] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [queries, setQueries] = useState([]);
  const classes = searchStyles();

  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
        setUsernames(data.map((user) => user.username));
      })
      .catch((err) => console.warn("could not get users: ", err));
    tags.forEach((tag) => {
      if (!tagNames.includes(tag.tag)) {
        tagNames.push(tag.tag);
      }
    });
  }, [tags]);

  const suggestionSelected = (value) => {
    queries.push(value);
    val.current.value = "";
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
    let value = event.target.value;
    let sortedUserSuggestions = [];
    let sortedTagSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      sortedUserSuggestions = usernames
        .sort()
        .filter((v) => regex.test(v))
        .filter((username) => !queries.includes(username));
      sortedTagSuggestions = tagNames
        .sort()
        .filter((v) => regex.test(v))
        .filter((tag) => !queries.includes(tag));
    }
    setSuggestedUsers(sortedUserSuggestions);
    setSuggestedTags(sortedTagSuggestions);
  };

  const onSearch = async () => {
    const searchTags = queries.map((q) => tags.filter((tag) => tag.tag === q)).flat();
    const tagIds = searchTags.map((tag) => tag.id_post);
    const uniqueTagIds = Array.from(new Set(tagIds));
    const allTagPosts = await Promise.all(
      uniqueTagIds.map(async (id) => {
        return await axios
          .get(`/searchfeed/${id}`)
          .then((posts) => posts.data)
          .catch((err) => console.warn("Could not get posts that match your search tag", err));
      })
    );

    const searchUsers = queries.map((q) => users.filter((user) => user.username === q)).flat();
    const userIds = searchUsers.map((user) => user.id);
    const uniqueUserIds = Array.from(new Set(userIds));
    const allUserPosts = await Promise.all(
      uniqueUserIds.map(async (id) => {
        return await axios
          .get(`/searchfeedbyuser/${id}`)
          .then((posts) => posts.data)
          .catch((err) => console.warn("Could not get posts that match your search user", err));
      })
    );

    const allPosts = [allTagPosts.flat(), allUserPosts.flat()].flat();
    const postIds = allPosts.map((post) => post.id);
    const uniquePostIds = Array.from(new Set(postIds));
    const finalSearch = await Promise.all(
      uniquePostIds.map(async (id) => {
        return await axios
          .get(`/searchfeed/${id}`)
          .then((posts) => posts.data)
          .catch((err) => console.warn("Could not get posts that match your search tag", err));
      })
    );

    setSearchFeed(finalSearch.flat());
    setQueries([]);
    setSearched(true);
  };

  return (
    <div>
      <div className={classes.queryDisplay}>{queries.join(", ")}</div>
      <Grid container justify="center" alignItems="center" direction="row">
        <TextField
          inputRef={val}
          type="text"
          placeholder="Search"
          className={classes.input}
          onChange={(e) => onTextChange(e)}
        />
        <IconButton onClick={onSearch} className={classes.button}>
          <SearchOutlinedIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        style={{ color: white }}
      >
        <div>
          <Grid container justify="flex-start" alignItems="flex-start" direction="column">
            {renderSuggestedUsers()}
          </Grid>
        </div>
        <div style={{ marginLeft: 20 }}>
          <Grid container justify="flex-start" alignItems="flex-start" direction="column">
            {renderSuggestedTags()}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

Search.propTypes = {
  setSearchFeed: PropTypes.func.isRequired,
  setSearched: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_post: PropTypes.number,
      tag: PropTypes.string,
    })
  ),
};

export default Search;
