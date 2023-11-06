import Paper from "@mui/material/Paper";
import DebounceInput from "./DebounceInput";
import SearchIcon from "@mui/icons-material/Search";

type BuscaInputType = {
  onBusca: (texto: string) => void;
};

function BuscaInput({ onBusca }: BuscaInputType) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        maxWidth: 400,
        width: "100%",
      }}
    >
      <DebounceInput
        fullWidth
        sx={{ margin: 1 }}
        handleDebounce={onBusca}
        debounceTimeout={300}
        endAdornment={<SearchIcon color="primary" />}
        placeholder="Busque por usuário"
      />
    </Paper>
  );
}

export default BuscaInput;
