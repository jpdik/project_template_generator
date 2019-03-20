#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const fse = require("fs-extra");

const args = process.argv;
create = args.indexOf("--create")
remove = args.indexOf("--remove")

if (create > -1) {
  if(args[create+1]){
    fse.copy(`${args[create+1]}`, `${__dirname}/templates/${args[create+1]}`, err => {
      if (err) {
        console.error(`O diretório \'${args[create+1]}\' não existe ou está malformado.`);
      } else {
        console.log(`O template \'${args[create+1]}\' foi criado com sucesso!`);
      }
    });
  }
}
else if(remove > -1){
  if (!fs.existsSync(`${__dirname}/templates/${args[remove+1]}`)) {
    return console.error(`O template \'${args[remove+1]}\' não existe.`);
  }

  fse.remove(`${__dirname}/templates/${args[remove+1]}`, err => {
    if (err) return console.error(err);

    console.log(`O template \'${args[remove+1]}\' foi removido com sucesso!`);
  });
}
else{
  const CHOICES = fs.readdirSync(`${__dirname}/templates`);
  
  const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'Qual template de projeto você quer gerar?',
      choices: CHOICES
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Nome do Projeto:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'O nome do projeto só pode possuir letras, números, underscores e hashes.';
      }
    }
  ];
  
  
  const CURR_DIR = process.cwd();
  
  inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    
    createDirectoryContents(templatePath, projectName);
  });
  
  function createDirectoryContents (templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);
    
    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;
      
      // get stats about the current file
      const stats = fs.statSync(origFilePath);
      
      if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
        
        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    });
  }
}