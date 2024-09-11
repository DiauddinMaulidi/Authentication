import { DataTypes } from "sequelize";
import sequelize from "./utils/db.js";
import { enkrip } from "./utils/bcrypt.js";

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            // msg: "Email sudah digunakan, silahkan ganti yang lain",
        },
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', enkrip(value));
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
    }
},
    {
        timestamps: false,
        tableName: 'login'
    });

// sequelize.sync()

export default User;