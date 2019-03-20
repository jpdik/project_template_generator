# Project template generator [![nvm version](https://img.shields.io/badge/version-v1.0.6-blue.svg)](https://www.npmjs.com/package/project_template_generator) ![node](https://img.shields.io/node/v/project_template_generator.svg?color=g)

Pacote npm para instalar projetos baseados em scaffolds.

## Instalação

`npm install -g project_template_generator@latest`

## Uso

Basta rodar na linha de comando:

`generate`

ele irá dar as opções de template:

```
? Qual template de projeto você quer gerar? (Use arrow keys)
❯ react-webpack 
  template2
  template3 
? Nome do Projeto: Projeto_1
```

## Adicionar ou remover outros templates ao projeto

Para adicionar um novo template, basta rodar o comando:

`generate --create [pasta_novo_template]`

Para removê-lo:

`generate --remove [nome_template]`