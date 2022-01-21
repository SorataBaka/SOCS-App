#! /usr/bin/env node

const fs = require('fs');
const execpath = process.cwd();

const initialize = (type, number, withTemplate) => {
  const assignmentType = type.toUpperCase() == "OLQ"?"OLQ":type.toUpperCase() == "ASG"?"ASG":"QUIZ";
  fs.mkdirSync(`${execpath}/SOCS1 - ${assignmentType}${number}`);

  if(withTemplate) {
    fs.cpSync(`./templates/testcasetemplate.c`, `${execpath}/SOCS1 - ${assignmentType}${number}/A.c`);
  }else{
    fs.cpSync(`./templates/emptytemplate.c`, `${execpath}/SOCS1 - ${assignmentType}${number}/A.c`);
  }
}
const generateWithTemplate = (problemtype) => {
  fs.cpSync(`./templates/testcasetemplate.c`, `${execpath}/${problemtype.toUpperCase()}.c`);
}
const generateWithoutTemplate = (problemtype) => {
  fs.cpSync(`./templates/emptytemplate.c`, `${execpath}/${problemtype.toUpperCase()}.c`);
}

const argv = process.argv;

if(argv[2] == "--h" || argv[2] == "help" || argv[2] === undefined) {
  console.log("Initiating a new project")
  console.log("Usage: socs --init [type] [number] [withTemplate]");
  console.log("\ttype: olq, asg, quiz");
  console.log("\tnumber: The version of the socs assignment");
  console.log("\t\tExample: socs init olq 1");
  console.log("\t\tExample: socs --init asg 2");
  console.log("\twithTemplate: --template or --no-template");
  console.log("\t\t --template: create template testcase file");
  console.log("\t\t --no-template: create empty testcase file");
  console.log("\t\tExample: socs --init quiz 3 --template");
  console.log("\t\tExample: socs --init quiz 3 --no-template");
  console.log("Generating a template file: socs --generate [type]");
  console.log("Usage: socs generate [type] [withTemplate]");
  console.log("\ttype: A, B, C, etc");
  console.log("\twithTemplate: --template or --no-template");
  console.log("\t\t --template: create template testcase file");
  console.log("\t\t --no-template: create empty testcase file");
  console.log("\t\tExample: socs generate A --template");
  console.log("\t\tExample: socs -g A --no-template");

}

if(argv[2] == "--init" || argv[2] == "init"){
  const type = argv[3];
  const number = argv[4];
  const withTemplate = argv[5];
  if(type == undefined || number == undefined) return console.log("Please provide an SOCS type and Version \n Example: \n socs init OLQ 1 --template \n socs --init OLQ 1 --no-template");
  if(withTemplate == "--no-template" || withTemplate == undefined) return initialize(type, number, false);
  if(withTemplate == "--template")return initialize(type, number, true);
}
if(argv[2] == "--g" || argv[2] == "generate"){
  const problemType = argv[3];
  if(!problemType) console.log("Please provide a problem type \n Example: \n socs generate B --template \n socs -g B --no-template");
  if(argv[4] == "--template") return generateWithTemplate(problemType);
  if(argv[4] == "--no-template" || argv[4] == undefined) return generateWithoutTemplate(problemType);
}