import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Grupo, Usuario } from "../types";
import data from "../data/grupos.json";

type EstadoType = {
  grupos: Grupo[];
  estaCarregando: boolean;
  erro: string;
};

const enum REDUCER_ACTION_TYPE {
  CARREGANDO = "carregando",
  GRUPOS_CARREGADO = "grupos/carregado",
  REJEITADO = "rejeitado",
}

type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: Grupo[] | string;
};

type ChildrenType = {
  children?: ReactElement | undefined;
};

type UseGruposType = {
  state: EstadoType;
  ids: number[];
  totalGrupos: number;
  totalUsuarios: number;
  busca: <T>(
    nomeUsuario: string,
    callback: (gruposSelecionados: Grupo[]) => T
  ) => T;
  getGrupoPorId: (id: number) => Grupo | null;
};

const estadoInicial: EstadoType = {
  grupos: [],
  estaCarregando: false,
  erro: "",
};

function reducer(state: EstadoType, action: ReducerActionType): EstadoType {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CARREGANDO:
      return { ...state, estaCarregando: true, erro: "" };
    case REDUCER_ACTION_TYPE.GRUPOS_CARREGADO:
      return {
        ...state,
        grupos: action.payload as Grupo[],
        estaCarregando: false,
      };
    case REDUCER_ACTION_TYPE.REJEITADO:
      return {
        ...state,
        estaCarregando: false,
        erro: action.payload as string,
      };
    default:
      throw new Error("Acao desconhecida");
  }
}

async function carregaGrupos(): Promise<Grupo[]> {
  // Simulando uma resposta do servidor
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.grupos);
    }, 300);
  });
}

function buscarPorId(grupos: Grupo[], id: number): Grupo | null {
  for (const grupo of grupos) {
    if (grupo.idGrupo === id) return grupo;
    if (grupo.subGrupos) {
      const subGrupo = buscarPorId(grupo.subGrupos, id);
      if (subGrupo) return subGrupo;
    }
  }

  return null;
}

function getIds(grupos: Grupo[]): number[] {
  const gruposString = JSON.stringify(grupos);

  const regexpIdGrupos = /"idGrupo":(\d+)/gm;
  const regexNumero = /\d+/g;

  const ids = gruposString
    .match(regexpIdGrupos)
    ?.flatMap((idGrupo) => idGrupo.match(regexNumero))
    .filter((n) => n !== null)
    .map((id) => parseInt(id || "-1"));

  return ids ? ids : [];
}

function getTotalGrupos(grupos: Grupo[]): number {
  if (!grupos.length) return 0;

  let total = 0;
  grupos.forEach((grupo) => {
    if (grupo.subGrupos) total += 1 + getTotalGrupos(grupo.subGrupos);
    total += 1;
  });

  return total;
}

function getTotalUsuarios(grupos: Grupo[]): number {
  if (!grupos.length) return 0;

  let total = 0;
  grupos.forEach((grupo) => {
    if (grupo.usuarios) total += grupo.usuarios.length;
    if (grupo.subGrupos) total += getTotalUsuarios(grupo.subGrupos);
  });

  return total;
}

const estadoInicialContext: UseGruposType = {
  state: estadoInicial,
  ids: [],
  totalGrupos: 0,
  totalUsuarios: 0,
  busca: <T,>(
    nomeUsuario: string,
    callback: (gruposSelecionados: Grupo[]) => T
  ): T => {
    return callback([]);
  },
  getGrupoPorId: (id: number) => null,
};

const GruposContext = createContext<UseGruposType>(estadoInicialContext);

export function GruposProvider({ children }: ChildrenType): ReactElement {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const { grupos } = state;

  const ids = getIds(grupos);
  const totalGrupos = getTotalGrupos(grupos);
  const totalUsuarios = getTotalUsuarios(grupos);

  useEffect(() => {
    const fetchGrupos = async () => {
      dispatch({ type: REDUCER_ACTION_TYPE.CARREGANDO });
      try {
        const grupos = await carregaGrupos();
        dispatch({
          type: REDUCER_ACTION_TYPE.GRUPOS_CARREGADO,
          payload: grupos,
        });
      } catch {
        dispatch({
          type: REDUCER_ACTION_TYPE.REJEITADO,
          payload: "Houve um problema para carregar os dados...",
        });
      }
    };
    fetchGrupos();
  }, []);

  const busca = useCallback(
    <T,>(
      nomeUsuario: string,
      callback: (gruposSelecionados: Grupo[]) => T
    ): T => {
      const grupoTemUsuario = (grupo: Grupo, nomeUsuario: string): boolean => {
        return grupo.usuarios
          ? grupo.usuarios.some((usuario: Usuario) =>
              usuario.nome.toLowerCase().includes(nomeUsuario.toLowerCase())
            )
          : false;
      };
      const buscaRecursiva = (grupos: Grupo[]): Grupo[] => {
        const gruposSelecionados = grupos.reduce((acc, grupo): Grupo[] => {
          if (grupoTemUsuario(grupo, nomeUsuario)) {
            return grupo.subGrupos
              ? [...acc, grupo].concat(buscaRecursiva(grupo.subGrupos))
              : [...acc, grupo];
          }

          return grupo.subGrupos
            ? acc.concat(buscaRecursiva(grupo.subGrupos))
            : acc;
        }, [] as Grupo[]);

        return gruposSelecionados;
      };

      return callback(buscaRecursiva(grupos));
    },
    [grupos]
  );

  const getGrupoPorId = useCallback(
    (id: number): Grupo | null => {
      return buscarPorId(grupos, id);
    },
    [grupos]
  );

  return (
    <GruposContext.Provider
      value={{
        state,
        ids,
        totalGrupos,
        totalUsuarios,
        busca,
        getGrupoPorId,
      }}
    >
      {children}
    </GruposContext.Provider>
  );
}

export function useGrupos(): UseGruposType {
  const context = useContext(GruposContext);
  return context;
}
