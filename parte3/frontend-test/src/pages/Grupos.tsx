import { useCallback, useEffect, useState } from "react";
import { Grupo } from "../types";
import { useGrupos } from "../contexts/GruposContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import CustomizedLinearProgress from "../components/CustomizedLinearProgress";
import Typography from "@mui/material/Typography";
import BuscaInput from "../components/BuscaInput";
import Categoria from "../components/Categoria";

function Grupos() {
  const { id } = useParams();
  const { state, busca, ids } = useGrupos();
  const { grupos, estaCarregando } = state;

  const [gruposSelecionados, setGruposSelecionados] = useState<number[]>([]);
  const [expandidos, setExpandidos] = useState<string[]>([]);

  const navigate = useNavigate();

  const expandirArvore = useCallback(() => {
    setExpandidos(ids.map(String));
  }, [ids]);

  useEffect(() => {
    expandirArvore();
  }, [expandirArvore]);

  const toggleItem = (nodeId: string[]) => {
    setExpandidos(nodeId);
  };

  const handleBusca = (texto: string): void => {
    if (texto.trim()) {
      expandirArvore();
      busca(texto, (grupos: Grupo[]) => {
        setGruposSelecionados(grupos.map((grupo) => grupo.idGrupo));
      });
    } else setGruposSelecionados([]);
  };

  const handleGrupoClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    idGrupo: number
  ) => {
    e.preventDefault();
    navigate(`/grupos/${idGrupo}`);
  };

  const renderTree = (grupos: Grupo[]) => (
    <>
      {grupos.map((grupo) => (
        <TreeItem
          key={grupo.idGrupo}
          nodeId={grupo.idGrupo.toString()}
          label={grupo.nome}
          className={
            gruposSelecionados.includes(grupo.idGrupo)
              ? " selecionado"
              : " nao-selecionado"
          }
          onClick={(e) => handleGrupoClick(e, grupo.idGrupo)}
        >
          {Array.isArray(grupo.subGrupos) ? renderTree(grupo.subGrupos) : null}
        </TreeItem>
      ))}
    </>
  );

  if (estaCarregando)
    return (
      <Box sx={{ width: "100%" }}>
        <CustomizedLinearProgress />
      </Box>
    );

  return (
    <>
      <BuscaInput onBusca={handleBusca} />

      <Paper
        elevation={2}
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", sm: 420, md: "auto" },
        }}
      >
        <Box padding={2} maxWidth={300} sx={{ width: { xs: "100%", md: 300 } }}>
          <Categoria label="grupos" />
          <TreeView
            aria-label="arvore de grupos"
            expanded={expandidos}
            onNodeToggle={(e, nodeId) => toggleItem(nodeId)}
            defaultCollapseIcon={<ExpandMoreIcon color="primary" />}
            defaultExpandIcon={<ChevronRightIcon color="primary" />}
          >
            {renderTree(grupos)}
          </TreeView>
        </Box>

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ md: "none" }}
        />

        <Box
          padding={2}
          maxWidth={420}
          sx={{ marginY: { xs: 2, md: 0 }, width: { xs: "100%", md: 420 } }}
        >
          <Outlet />
          {!id && (
            <Typography
              variant="h5"
              component="p"
              fontWeight={500}
              noWrap={false}
              color="var(--bluish-grey)"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontStyle: "italic",
              }}
            >
              Selecione um grupo para ver detalhes
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Grupos;
