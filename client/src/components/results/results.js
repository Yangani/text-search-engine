import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Results = ({ searchResults }) => {
  const time = searchResults.reduce(
    (total, result) => total + (result.time || 0),
    0
  );
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        marginTop: 3,
      }}
    >
      <>
        {searchResults.length > 0 &&
          searchResults.map((result) => (
            <ListItem
              button
              divider
              sx={{
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <ListItemText
                primary={`${result.name}.txt`}
                sx={{ width: "75%" }}
              />
              <ListItemText
                secondary={`${result.matches} matches`}
                sx={{ width: "25%" }}
              />
            </ListItem>
          ))}
      </>
      <>
        {searchResults.length > 0 && (
          <ListItem
            sx={{
              width: "100%",
              color: "#757575",
              marginTop: 1,
            }}
          >
            Elapsed time {Math.round(time)} ms
          </ListItem>
        )}
      </>
    </List>
  );
};

export default Results;
