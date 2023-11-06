> [Teste frontend](readme.md)

# Parte 1 - Lógica e JavaScript

Essa parte pode ser implementada prefencialmente com TypeScript. JavaScript também será aceita, mas será um aspecto negativo na avaliação. Se implementar em TypeScript, lembre-se de tipar as entradas e saídas de forma explícita.

## 1.1 - Validação do número XPTO

Inventamos um novo número chamado XPTO. Trata-se de um número de 5 dígitos de 0 a 9, entre 10004 e 99995. Sendo os 4 primeiros dígitos "livres" e o quinto dígito um dígito verificador. O dígito verificador é calculado da seguinte forma:

1) O 1o dígito é multiplicado por 4
2) O 2o dígito é multiplicado por 5
3) O 3o dígito é multiplicado por 6
4) O 4o dígito é multiplicado por 7
5) Da soma destes produtos, é calculado o resto da divisão por 20, a este resto, soma-se 7, e desta soma, calcula-se o resto da divisão por 10. Esse resto é o DV.

Exemplo:
**4638**-7

| 4 | 6 | 3 | 8 |dígitos|
|---|---|---|---|----|
| 4 | 5 | 6 | 7 | * pesos|
|16|30|18|56| = produtos|

Fazendo a soma:

```
6 + 30 + 18 + 56 = 120
```

Calculando o resto da divisão por 20:

```
120 % 20 = 0
```

Somando 7:

```
0 + 7 = 7
```

Calculando o resto da divisão por 10:

```
7 % 10 = 7
```

Logo o DV nesse caso é 7.

Você deve implementar um módulo chamado numeroXpto, exportando as funções calculaDV e validaNumeroXpto. A função calculaDV deve receber uma variável numérica de 4 dígitos e retornar o DV. A função validaNumeroXpto deve receber uma variável numérica de 5 dígitos e retornar true ou false, indicando se o número é um número XPTO válido.

Neste exemplo `calculaDV(4638)` deve retornar `7` e `validaNumeroXpto(46387)` deve retornar `true`, e `validaNumeroXpto(46388)` deve retornar `false`.

## 1.2 - Busca em estrutura de grupos

O arquivo "grupos.json" contem um objeto com a propriedade "grupos", estes são os grupos "raiz" de uma estrutura hierárquica, semelhante à estrutura de pastas de um computador. Cada grupo pode ter "usuarios" e "subGrupos". Os subGrupos são grupos que estão dentro do grupo atual.

Você deve implementar uma classe chamada Grupos. Essa classe deve ter a seguinte características:

- construtor vazio
- método 'carrega' que deve fazer uma chamada server para carregar o arquivo grupos.json (disponível neste repositório). É importante que este método retorne um Promise que seja resolvido quando o arquivo for carregado
- método 'busca' que deve receber um nome de usuário e um callback que será chamado quando a busca for finalizada, o método deve iterar recursivamente sobre a estrutura de grupos e chamar o callback passando um array com os grupos que contenham ao menos um usuário cujo nome contenha a string buscada