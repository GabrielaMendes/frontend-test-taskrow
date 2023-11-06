> [Teste frontend](readme.md)

# Parte 3 - Frameworks

Para esta parte vamos avaliar sua familiaridade com bibliotecas e frameworks.

## 3.1 - Aplicação React

Construa uma aplicação React (em complemento ao React pode utilizar Material UI ou alguma outra lib de componentes que tenha familiaridade, ou mesmo não utilizar nenhuma), com as seguintes características:

- Menu superior com os links "Grupos" apontando para `/grupos`, "Cadastro" apontando para `/cadastro` e "Home" apontando para `/`;
- Rota `/` é livre, pode conter somente um texto de apresentação ou algum recurso que você queira apresentar;
- Rota `/grupos` deve ter duas colunas:
- a primeira deve apresentar uma lista de grupos, identada mostrando a estrutura de grupos do arquivo grupos.json, respeitando a estrutura hierarquica. Cada item deve ser clicável e apontar para uma rota `/grupos/:id`, onde `:id` é o id do grupo clicado;
- no topo da coluna da esquerda deve haver a opção de buscar um grupo digitando parte do nome de um usuário. Ao digitar os grupos que possuam tal usuário devem ficar destacado de alguma forma (bold, cor de fundo, etc). Para implementar essa busca você pode utilizar o código implementado na parte1;
- ao clicar em um item da esquerda a segunda coluna deve apresentar os detalhes do grupo, mostrando o nome do grupo e a lista de usuários que pertencem a ele;
- Rota `/cadastro` deve conter um formulário com os campos "Nome", "Email" e "Número XPTO", todos obrigatórios. Ao clicar em "Cadastrar" deve ser feita a validação dos campos onde:
  - Nome deve ser preenchido com ao menos 3 caracteres;
  - Email deve ser preenchido com um email válido;
  - Número XPTO deve ser preenchido com um número no formato 9999-9, e deve ser um número válido segundo as regras do algoritmo da parte1 do teste;
  - Caso todas os campos sejam válidos você pode apresentar um "alert" ou qualquer recurso do framework que você esteja utilizando;

## 3.2 - Considerações

- Você pode utilizar qualquer biblioteca ou framework que desejar, mas deve utilizar React;
- Não é obrigatório, mas React Router torna essa tarefa mais fácil;
- Ao entregar o teste, crie uma pasta chamada `parte3` e coloque todos os arquivos necessários para a aplicação rodar, inclusive os que eventualmente tenham sido implementados nas partes 1 e 2;