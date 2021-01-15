const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pipipig', 'root', '123456', {
    dialect: 'mysql',
    dialectOptions: {
        // Your mysql2 options here
    }
});

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    // create user
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());

    // Find all users
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));

    // Delete everyone named "Jane"
    await User.destroy({
        where: {
            username: "janedoe"
        }
    });
    console.log("All users:", JSON.stringify(users, null, 2));

    sequelize.close()
})();

