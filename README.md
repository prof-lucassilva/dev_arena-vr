# Arena VR - Aplicativo de Gerenciamento de Sessões

Este projeto é uma aplicação React que permite a criação e gerenciamento de sessões de realidade virtual para fins educacionais ou de treinamento.

## Funcionalidades

- **Página Inicial**: Apresenta opções para Professor, Aluno e Painel.
- **Área do Professor**: 
  - Login com autenticação.
  - Opções para criar ou entrar em uma sessão.
- **Cadastros**:
  - Criar Objetivos: Permite definir até 3 objetivos com tempos associados.
  - Criar Cards: Interface para criar e gerenciar cards com descrições.
  - Criar Boosts: Permite adicionar perguntas de boost para a sessão.
  - Criar Sessão: (Funcionalidade a ser implementada)
- **Painel**: Exibe um temporizador regressivo baseado nos objetivos definidos.

## Tecnologias Utilizadas

- React
- React Router para navegação
- localStorage para armazenamento de dados local

## Como Iniciar

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Inicie o servidor de desenvolvimento com `npm start`

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia o executor de teste no modo de observação interativo.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.
