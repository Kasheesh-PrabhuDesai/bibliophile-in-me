import { Button, createStyles, Grid, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      margin: theme.spacing(2),
    },
  })
);

export default function Navigation() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent="flex-start"
      className={classes.container}
      spacing={2}
    >
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Search Again
        </Button>
      </Grid>
    </Grid>
  );
}
