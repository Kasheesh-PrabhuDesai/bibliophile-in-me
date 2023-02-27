import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      minHeight: "100vh",
      backgroundColor: "#F7F8FC",
      justifyContent: "center",
    },
  })
);

export default function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {children}
    </Grid>
  );
}
