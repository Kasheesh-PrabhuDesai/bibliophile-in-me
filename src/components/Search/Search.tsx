import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { $fetchBooksBySearchQuery } from "../../store/thunks/book-search-result.thunk";

const useStyles = makeStyles(theme =>
  createStyles({
    searchBox: {
      width: "85%",
      background: "#FFF",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    searchButton: {
      margin: theme.spacing(3),
      textTransform: "none",
    },
  })
);

export default function Search() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>("");
  const handleSearch = async () => {
    if (text !== "") {
      dispatch($fetchBooksBySearchQuery({ page: 1, query: text }));
      navigate("/book-search-results");
    }
  };

  return (
    <Grid container className={classes.container}>
      <TextField
        variant="outlined"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a book name"
        className={classes.searchBox}
        required
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className={classes.searchButton}
        type="submit"
      >
        Search 🔍
      </Button>
    </Grid>
  );
}
