import {
  CircularProgress,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useReduxSelector } from "../../store/selectors";
import { getSelectedBook } from "../../store/selectors/book-search-result.selectors";
import Layout from "../Layout";
import Navigation from "../Navigation";

const useStyles = makeStyles(theme =>
  createStyles({
    coverImage: {
      [theme.breakpoints.down("md")]: {
        width: "80vw",
        height: "80vh",
      },
      width: "40vw",
      height: "80vh",
      objectFit: "fill",
    },
    listItem: {
      display: "flex",
      justifyContent: "center",
      wordBreak: "break-word",
    },
  })
);

export default function BookDetails() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectedBook = useReduxSelector(getSelectedBook);

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(selectedBook).length > 0) {
        setIsLoading(false);
      }
    }, 500);
  }, [selectedBook]);

  if (isLoading) {
    return (
      <Layout>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h4">
            Loading....Please Wait <CircularProgress />
          </Typography>
        </Grid>
      </Layout>
    );
  }

  return (
    <Fragment>
      <Navigation />
      <Grid container justifyContent="center">
        <img
          src={`https://covers.openlibrary.org/b/id/${selectedBook.covers?.[0]}.jpg`}
          alt={selectedBook.title}
          className={classes.coverImage}
          style={{
            background: selectedBook.covers ? "#FFF" : "#DEDEDE",
          }}
        />
      </Grid>
      <Grid container justifyContent="center">
        <List>
          <ListItem className={classes.listItem}>
            <Typography variant={"h3"}>{selectedBook.title}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Typography variant={"h4"}>
              by {selectedBook.author_name[0]}
            </Typography>
          </ListItem>
          {selectedBook.description ? (
            <ListItem className={classes.listItem}>
              <Typography variant={"h6"}>
                <strong>Plot : </strong>{" "}
                {selectedBook.description.value ?? selectedBook.description}
              </Typography>
            </ListItem>
          ) : (
            <>
              <ListItem className={classes.listItem}>
                <Typography variant={"h6"}>
                  First published on :{" "}
                  {new Date(selectedBook.created.value).toLocaleDateString()}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Typography variant={"h6"}>
                  Last modified on :{" "}
                  {new Date(
                    selectedBook.last_modified.value
                  ).toLocaleDateString()}
                </Typography>
              </ListItem>
            </>
          )}
        </List>
      </Grid>
    </Fragment>
  );
}
