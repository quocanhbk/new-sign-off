const { DataTypes, INET, INTEGER } = require("sequelize");
const init = require("../connectionDB/connectionDB");

// approval models
const Approval = init.define("approvalInfo", {
  // foreign key: approvalID
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createByName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createByEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approval_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approval_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approval_priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approval_deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: init.NOW,
  },
  approval_related: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  processName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.DATE,
    defaultValue: init.NOW,
  },
  approvalStatus: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
});

const Advisor = init.define("advisor", {
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  advisorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advisorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // position: {
  //   type: INTEGER,
  //   allowNull: true,
  // }
});

const Approver = init.define("approver", {
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  advisorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advisorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Observator = init.define("observator", {
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  advisorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advisorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ApprovalDocument = init.define("approval_document", {
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestAt: {
    type: DataTypes.DATE,
    defaultValue: init.NOW,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  valueVAT: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  VAT: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  totalPay: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const ReferenceDoc = init.define("refernceDoc", {
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// create table
// Approval.sync();
// Advisor.sync();
// Approver.sync();
// Observator.sync();
// ApprovalDocument.sync();
// ReferenceDoc.sync();

module.exports = { Approval, Advisor, Approver, Observator, ApprovalDocument, ReferenceDoc };
