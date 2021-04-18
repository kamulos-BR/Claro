module.exports = function (sequelize, DataTypes) {
    const players = sequelize.define('players', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthday: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'players',
        timestamps: false
    });

    return players;
};
