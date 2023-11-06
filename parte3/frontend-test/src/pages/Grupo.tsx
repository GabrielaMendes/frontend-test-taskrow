import { useParams } from "react-router-dom";
import { useGrupos } from "../contexts/GruposContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Categoria from "../components/Categoria";
import GrupoNaoEncontrado from "../components/GrupoNaoEncontrado";

function Grupo() {
  const { id } = useParams();

  const { getGrupoPorId } = useGrupos();

  const grupo = id ? getGrupoPorId(Number(id)) : null;

  if (!grupo) return <GrupoNaoEncontrado id={id} />;

  return (
    <>
      <Box marginBottom={2}>
        <Categoria label="grupo" />
        <Typography
          component="h1"
          fontWeight={500}
          color="var(--bluish-grey)"
          sx={{ wordBreak: "break-word", fontSize: { xs: 38, sm: 46 } }}
        >
          {grupo.nome}
        </Typography>
      </Box>

      <Box>
        <Categoria label="usuários" />
        {grupo.usuarios ? (
          <>
            {grupo.usuarios.map((usuario) => (
              <Typography key={usuario.idUsuario} variant="body1" component="p">
                - {usuario.nome}
              </Typography>
            ))}
          </>
        ) : (
          <Typography variant="body1" component="p">
            Grupo sem usuários.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Grupo;
