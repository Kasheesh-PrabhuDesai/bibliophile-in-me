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
    <Grid container justifyContent="center" className={classes.container}>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Search Again
      </Button>
    </Grid>
  );
}
