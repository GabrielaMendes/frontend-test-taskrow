import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import LaunchIcon from "@mui/icons-material/Launch";

function Footer() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        paddingY: 3,
      }}
      elevation={3}
    >
      <Link href="#" rel="noopener" target="_blank" variant="body2">
        Documentação no GitHub
        <LaunchIcon fontSize="inherit" sx={{marginLeft: 0.5}}/>
      </Link>
    </Paper>
  );
}

export default Footer;
