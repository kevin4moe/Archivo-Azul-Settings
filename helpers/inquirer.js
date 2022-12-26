const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear registro`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar registros`,
      },
      {
        value: "3",
        name: `${"3.".green} Borrar registro`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("________________________\n".green);
  console.log(" Seleccione una opción".white);
  console.log("________________________\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const inquirerPause = async () => {
  const question = {
    type: "input",
    name: "select",
    message: "Presiona enter para continuar",
  };
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listaBorrarTarea = async (tareas) => {
  const opciones = tareas.map((tarea, index) => {
    const { id, desc } = tarea;
    return {
      value: id,
      name: `${(index + 1 + ".").green} ${desc}`,
    };
  });
  opciones.push({
    value: "0",
    name: `${"0.".green} Salir`,
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "¿Qué tarea desea borrar?",
      choices: opciones,
    },
  ];

  const { id } = await inquirer.prompt(question);

  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas) => {
  const opciones = tareas.map((tarea, index) => {
    const { id, desc } = tarea;
    return {
      value: id,
      name: `${(index + 1 + ".").green} ${desc}`,
      checked: true,
    };
  });

  const question = [
    {
      type: "check",
      name: "ids",
      message: "Selecciones",
      choices: opciones,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

module.exports = {
  inquirerMenu,
  inquirerPause,
  leerInput,
  listaBorrarTarea,
  confirm,
  mostrarListadoChecklist,
};