import { ReactElement } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type InfoCardProps = {
  icon: ReactElement;
  numero: number;
  label: string;
};

function InfoCard({ icon, numero, label }: InfoCardProps) {
  return (
    <Paper elevation={3} sx={{ textAlign: "center", paddingY: 2 }}>
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
