import { Sequelize } from "sequelize";

const sequelize = new Sequelize("jwt", "root", "", {
    host: "localhost",
    dialect: "mysql",
    // logging: (...msg) => console.log(msg)
})

export default sequelize