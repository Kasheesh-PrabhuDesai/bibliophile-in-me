import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Typography,
  Button,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useReduxSelector } from "../../store/selectors";
import {
  getActivePage,
  getActiveQuery,
  getActiveRange,
  getBooksRange,
  getTotalBooks,
} from "../../store/selectors/book-search-result.selectors";
import {
  $fetchBooksBySearchQuery,
  $fetchSelectedBookDetails,
} from "../../store/thunks/book-search-result.thunk";
import Layout from "../Layout";
import Navigation from "../Navigation";

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      background: "#FFF",
      [theme.breakpoints.down("xs")]: {
        width: "95vw",
      },
      width: "40vw",
      height: 330,
      borderRadius: "12px",
      margin: theme.spacing(1),
    },
    paginationContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "95vw",
      },
      width: "80vw",
      justifyContent: "space-between",
      margin: theme.spacing(1),
    },
    buttons: {
      textTransform: "none",
    },
    text: {
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
      },
    },
  })
);

export default function BooksCards() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const books = useReduxSelector(getBooksRange);
  const activeQuery = useReduxSelector(getActiveQuery);
  const activePage = useReduxSelector(getActivePage);
  const total = useReduxSelector(getTotalBooks);
  const handleLoadNextPage = () => {
    dispatch<any>(
      $fetchBooksBySearchQuery({ query: activeQuery, page: activePage + 1 })
    );
  };
  const handleLoadPrevPage = () => {
    dispatch<any>(
      $fetchBooksBySearchQuery({
        query: activeQuery,
        page: activePage > 1 ? activePage - 1 : 1,
      })
    );
  };
  const handleCheckOutBook = (key: string, authorName: Array<string>) => {
    dispatch<any>($fetchSelectedBookDetails({ key, authorName }));
    navigate("/book-details");
  };
  useEffect(() => {
    setTimeout(() => {
      if (books.length > 0) {
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1500);
  }, [books]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h4">
            Loading data....Please wait <CircularProgress />
          </Typography>
        </Grid>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h3">
            {`No books could be found matching ${activeQuery}. Try searching again!`}
          </Typography>
        </Grid>
      </Layout>
    );
  }

  return (
    <Fragment>
      <Navigation />
      {books.map(book => (
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`}
                  height={300}
                  width={150}
                  alt={book.title}
                  style={{
                    objectFit: "fill",
                    maxWidth: "100%",
                    maxHeight: 300,
                    background: book.cover_i ? "#FFF" : "#DEDEDE",
                    borderRadius: 4,
                  }}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={8}>
                <List>
                  <ListItem>
                    <Typography variant="h6" className={classes.text}>
                      {book.title}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="h6" className={classes.text}>
                      by {book.author_name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        handleCheckOutBook(book.key, book.author_name)
                      }
                    >
                      Check out
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Grid container className={classes.paginationContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadPrevPage}
          disabled={activePage === 1}
          className={classes.buttons}
        >
          Prev Page
        </Button>
        <Typography variant="h6" className={classes.text}>
          Page {activePage} / {Math.floor(total / 20)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadNextPage}
          className={classes.buttons}
        >
          Next Page
        </Button>
      </Grid>
    </Fragment>
  );
}
