import Typography from "@mui/material/Typography";

type LogoProps = {
  mobile?: boolean;
};

function Logo({ mobile = false }: LogoProps) {
  if (mobile) {
    return (
      <Typography
        variant="h6"
        sx={{ my: 2, letterSpacing: "0.15em", fontWeight: "bold" }}
      >
        GRUPOSAPP
      </Typography>
    );
  }

  return (
    <Typography
      variant="h6"
      component="div"
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          sm: "block",
          letterSpacing: "0.2em",
          fontWeight: "bold",
        },
      }}
    >
      GRUPOSAPP
    </Typography>
  );
}

export default Logo;
