import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

type GrupoNaoEncontradoProps = {
  id: string | undefined;
};

function GrupoNaoEncontrado({ id }: GrupoNaoEncontradoProps) {
  return (
    <Typography
      variant="h5"
      component="h1"
      fontWeight={500}
      noWrap={false}
      textAlign="center"
      color="var(--bluish-grey)"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontStyle: "italic",
      }}
    >
      <ErrorIcon color="primary" sx={{ fontSize: 42, marginBottom: 2 }} />
      Grupo com id {id} não encontrado
    </Typography>
  );
}

export default GrupoNaoEncontrado;
