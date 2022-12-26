require("colors");
require("dotenv").config();

const { saveFile, readFile } = require("./helpers/saveFile");
const {
  inquirerMenu,
  inquirerPause,
  leerInput,
  listaBorrarTarea,
  confirm,
} = require("./helpers/inquirer");
const Logs = require("./models/logs");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Logs();

  const tareasDB = readFile();

  if (tareasDB) {
    tareas.loadLogsFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // Crear registro
        const desc = await leerInput("Descripción:");
        tareas.createLog(desc);
        console.log(desc);
        tareas.updateLog(tareas.listArr[tareas.listArr.length - 1].id, 1);
        break;
      case "2": // Mostrar la lista del registro
        tareas.listComplete();
        break;
      case "3": // Borrar una registro especifico
        const id = await listaBorrarTarea(tareas.listArr);
        if (id !== "0") {
          const ok = await confirm("¿Estás seguro?");
          if (ok) {
            tareas.deleteLog(id);
            console.log(`Se ha borrado la tarea seleccionada`);
          } else {
            console.log(`No se ha borrado ninguna tarea`);
          }
        }
        break;
    }

    saveFile(tareas.listArr);

    await inquirerPause();
  } while (opt !== "0");
};

main();
