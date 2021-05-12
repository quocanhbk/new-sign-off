const sequelize = require('../connectionDB/connectionDB')
const { Model, DataTypes } = require('sequelize')

// call function if have change database

// examples
class Approval extends Model {}
Approval.init({
    approvalID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      approval_title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      approval_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      approval_priority: {
          type: DataTypes.STRING,
          allowNull: false
      },
      approval_deadline: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date()
      },
      approval_related: {
          type: DataTypes.STRING,
          allowNull: true,
      },
},{
    sequelize,
    modelName: 'Approval'
})
console.log(Approval === sequelize.models.Approval);
sequelize.models.modelName