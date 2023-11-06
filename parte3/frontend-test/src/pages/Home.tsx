import { useGrupos } from "../contexts/GruposContext";
import Box from "@mui/material/Box";
import CustomizedLinearProgress from "../components/CustomizedLinearProgress";
import Typography from "@mui/material/Typography";
import Diversity3SharpIcon from "@mui/icons-material/Diversity3Sharp";
import GroupIcon from "@mui/icons-material/Group";
import InfoCard from "../components/InfoCard";

function Home() {
  const { state, totalGrupos, totalUsuarios } = useGrupos();

  if (state.estaCarregando)
    return (
      <Box sx={{ width: "100%" }}>
        <CustomizedLinearProgress />
      </Box>
    );

  return (
    <>
      <Box textAlign="center" marginTop={6} marginBottom={4}>
        <Typography
          component="h1"
          fontSize={{ xs: 28, sm: 56, md: 64 }}
          sx={{
            letterSpacing: "0.2em",
            fontWeight: "bold",
          }}
        >
          GRUPOSAPP
        </Typography>
        <Typography
          variant="overline"
          component="p"
          fontSize={{ xs: 14, sm: 18 }}
          color="var(--bluish-grey)"
        >
          Seu gerenciador de grupos online!
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 150,
          },
        }}
      >
        <InfoCard
          icon={<Diversity3SharpIcon color="primary" sx={{ fontSize: 50 }} />}
          numero={totalGrupos}
          label="grupos"
        />
        <InfoCard
          icon={<GroupIcon color="primary" sx={{ fontSize: 50 }} />}
          numero={totalUsuarios}
          label="usuários"
        />
      </Box>
    </>
  );
}

export default Home;
