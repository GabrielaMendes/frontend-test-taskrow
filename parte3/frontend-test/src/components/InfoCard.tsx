import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type InfoCardProps = {
  icon: ReactElement;
  numero: number;
  label: string;
  to?: string;
};

function InfoCard({ icon, numero, label, to }: InfoCardProps) {
  return (
    <Paper
      elevation={3}
      sx={{ textAlign: "center", paddingY: 2 }}
      component={to ? Link : "div"}
      to={to}
    >
      {icon}
      <Typography variant="h4" component="h3" fontWeight={500}>
        {numero}
      </Typography>
      <Typography variant="body1" component="p" color="primary">
        {label}
      </Typography>
    </Paper>
  );
}

export default InfoCard;
