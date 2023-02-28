import {
  CircularProgress,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Fragment } from "react";
import { useReduxSelector } from "../../store/selectors";
import {
  getErrorMsg,
  getLoadingState,
  getSelectedBook,
} from "../../store/selectors/book-search-result.selectors";
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
  const selectedBook = useReduxSelector(getSelectedBook);
  const status = useReduxSelector(getLoadingState);
  const errorMsg = useReduxSelector(getErrorMsg);

  if (status === "loading") {
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

  if (status === "error") {
    return (
      <Layout>
        <Navigation />
        <Grid container justifyContent="center">
          <Typography variant="h4">{errorMsg}</Typography>
        </Grid>
      </Layout>
    );
  }

  return (
    <Fragment>
      <Navigation />
      <Grid container justifyContent="center">
        <img
          src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}.jpg`}
          alt={selectedBook.title}
          className={classes.coverImage}
          style={{
            background: selectedBook.cover_i ? "#FFF" : "#DEDEDE",
          }}
        />
      </Grid>
      <Grid container justifyContent="center">
        <List>
          <ListItem className={classes.listItem}>
            <Typography variant={"h3"}>{selectedBook?.title}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Typography variant={"h4"}>
              by {selectedBook?.author_name?.[0]}
            </Typography>
          </ListItem>
          {selectedBook.description ? (
            <ListItem className={classes.listItem}>
              <Typography variant={"h6"}>
                <strong>Plot : </strong>{" "}
                {selectedBook?.description?.value ?? selectedBook?.description}
              </Typography>
            </ListItem>
          ) : (
            <>
              <ListItem className={classes.listItem}>
                <Typography variant={"h6"}>
                  First published on :{" "}
                  {selectedBook?.created
                    ? new Date(
                        selectedBook?.created?.value
                      ).toLocaleDateString()
                    : "Not available"}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Typography variant={"h6"}>
                  Last modified on :{" "}
                  {selectedBook?.last_modified
                    ? new Date(
                        selectedBook?.last_modified?.value
                      ).toLocaleDateString()
                    : "Not available"}
                </Typography>
              </ListItem>
            </>
          )}
        </List>
      </Grid>
    </Fragment>
  );
}
