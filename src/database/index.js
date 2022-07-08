import sequelize from "sequelize";

import config from "../config/database";

import User from "../models/user";
import Projetc from "../models/project";
import Task from "../models/task";

const models = [User, Projetc, Task];

class Database {
    constructor() {
        this.connection = new sequelize(config);
        this.init();
        this.associate();
    }

    // Inicializando os models
    init() {
        models.forEach((model) => model.init(this.connection));
    }

    // Criando a associação dos models caso houver
    associate() {
        models.forEach((model) => {
            if(model.associate) {
                model.associate(this.connection.models);
            }
        })
    }
}

export default new Database();