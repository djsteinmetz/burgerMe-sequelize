// I'm confident that I'm not setting up these var's/constructors correctly.
module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: DataTypes.STRING,
        devoured: DataTypes.BOOLEAN
    });
    Burger.associate = function (models) {
        models.Burger.hasMany(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Burger;
};