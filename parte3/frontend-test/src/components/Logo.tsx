import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Typography from "@mui/material/Typography";

type LogoProps = {
  mobile?: boolean;
};

const StyledLink = styled(Link)`
  color: inherit;
`;

function Logo({ mobile = false }: LogoProps) {
  if (mobile) {
    return (
      <Typography
        variant="h6"
        component={StyledLink}
        to="/"
        sx={{
          display: {
            letterSpacing: "0.15em",
            fontWeight: "bold",
          },
        }}
      >
        GRUPOSAPP
      </Typography>
    );
  }

  return (
    <Typography
      variant="h6"
      component={StyledLink}
      to="/"
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
