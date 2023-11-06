import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { validaNumeroXpto } from "../utils/numeroXpto";
import { TextMaskCustom } from "../components/TextMaskCustom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AlertaSucesso from "../components/AlertaSucesso";

function Cadastro() {
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      xpto: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .max(100, "Nome muito longo")
        .required("Preenchimento obrigatório"),
      email: Yup.string()
        .email("E-mail inválido")
        .max(100, "Email muito longo")
        .required("Preenchimento obrigatório"),
      xpto: Yup.string()
        .transform((value) => value.replace("-", ""))
        .length(5, "Deve conter exatamente 5 dígitos")
        .required("Preenchimento obrigatório")
        .test({
          name: "is-valid-xpto",
          test(value, ctx) {
            if (!validaNumeroXpto(parseInt(value)))
              return ctx.createError({ message: "Número inválido" });
            return true;
          },
        }),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setShowSuccess(true);
      resetForm();
    },
  });

  return (
    <>
      <Box maxWidth={600} width="100%" marginBottom={1}>
        <AlertaSucesso
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </Box>

      <Paper elevation={2} sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            name="nome"
            label="Nome"
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />

          <TextField
            fullWidth
            name="email"
            label="E-mail"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <TextField
            fullWidth
            name="xpto"
            label="Número XPTO"
            error={formik.touched.xpto && Boolean(formik.errors.xpto)}
            helperText={formik.touched.xpto && formik.errors.xpto}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.xpto}
            InputProps={{
              inputComponent: TextMaskCustom as any,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            sx={{ marginTop: 4, alignSelf: "end" }}
          >
            Cadastrar
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default Cadastro;
