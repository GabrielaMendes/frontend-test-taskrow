export type Usuario = {
  idUsuario: number;
  nome: string;
};

export type Grupo = {
  idGrupo: number;
  nome: string;
  usuarios?: Usuario[];
  subGrupos?: Grupo[];
};
