import Typography from "@mui/material/Typography";

type CategoriaProps = {
  label: string;
};

function Categoria({ label }: CategoriaProps) {
  return (
    <Typography
      variant="overline"
      component="h2"
      color="var(--bluish-grey)"
      fontWeight={500}
    >
      {label}
    </Typography>
  );
}

export default Categoria;
