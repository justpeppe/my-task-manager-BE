'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // Una Task appartiene a un Utente
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    };

  }
  
  // Definizione delle colonne della tabella Task
  Task.init({
    taskId: DataTypes.UUID, // taskId è la chiave primaria
    titolo: DataTypes.STRING, // titolo è una stringa
    descrizione: DataTypes.STRING, // descrizione è una stringa
    svolta: DataTypes.BOOLEAN, // svolta è un booleano (true o false)
    userId: DataTypes.UUID // userId è la chiave esterna
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

