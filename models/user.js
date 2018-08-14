module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
    });
    User.associate = function (models) {
        models.User.belongsTo(models.Burger, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return User;
};