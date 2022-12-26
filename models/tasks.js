require("colors");

const Task = require("./task");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor(desc) {
    this._list = {};
  }

  cargarTareasFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  crearTarea(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  borrarTarea(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  listadoCompleto() {
    this.listadoArr.forEach((task, index) => {
      const i = (index + 1 + ".").green;
      const { desc, completadoEn } = task;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${i} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 0;
    this.listadoArr.forEach((task) => {
      const { desc, completadoEn } = task;
      if ((completadoEn != null) == completadas) {
        contador++;
        const estado = completadas ? "Completada".green : "Pendiente".red;

        console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
      }
    });
  }
}

module.exports = Tasks;
