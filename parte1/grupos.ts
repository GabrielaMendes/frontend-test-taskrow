import data from "./grupos.json";

type Usuario = {
	idUsuario: number;
	nome: string;
};

type Grupo = {
	idGrupo: number;
	nome: string;
	usuarios?: Usuario[];
	subGrupos?: Grupo[];
};

export class Grupos {
	private grupos: Grupo[] = [];

	constructor() {}

	async carrega(): Promise<string> {
		// Simulando uma resposta do servidor
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.grupos = data.grupos;
				resolve("Grupos carregados");
			}, 300);
		});
	}

	busca<T>(
		nomeUsuario: string,
		callback: (gruposSelecionados: Grupo[]) => T
	): T {
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

		return callback(buscaRecursiva(this.grupos));
	}
}
