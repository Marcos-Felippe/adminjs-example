import Sequelize, { Model } from 'sequelize';
import { createPasswordHash, checkPassword } from '../services/auth';

class User extends Model {
  static init(sequelize) {
    super.init({

      // Campos virtuais não existem no banco mas somente na memoria da classe, são uteis para utilizarmos regras de negócio neles
      initials: {
        type: Sequelize.VIRTUAL,

        // Pega o name do user e armazena as iniciais neste campo virtual
        get() {
          const match = this.name.split(" ");

          if(match.lenght > 1) {
            return `${match[0][0]}${match[match.lenght - 1][0]}}`;
          } else {
            return match[0][0];
          }
        }
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      roles: Sequelize.ENUM("admin", "manager", "developer"),
      status: Sequelize.ENUM("active", "archived"),
    },
    {
      sequelize,
      name:{
        singular: "user",
        plural: "users",
      }
    });

    // Configurando um hook para antes do salvamento criar um hash da senha para armazena-lo
    this.addHook('beforeSave', async (user) => {
      if(user.password) {
        console.log(this.password);
        user.password_hash = await createPasswordHash(user.password);
      }
    });
  }
  
  static associate(models) {
    this.hasMany(models.Project);
    this.hasMany(models.Task);
  }

  // Criando um metodo para chamar a checagem da senha
  checkPassword(password) {
    return checkPassword(this, password);
  }
}

export default User;