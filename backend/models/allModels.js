const { DataTypes } = require("sequelize");
const init = require("../connectionDB/connectionDB");

// approval models
const Approval = init.define("approvalInfo", {
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
  createPosition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approval_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approval_description: {
    type: DataTypes.TEXT,
    allowNull: true
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

// models paticipants
const Participants = init.define("participants",{
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  paticipantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paticipantEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paticipantPosition: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Staff"
  }, 
  paticipantType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  _isApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  paticipantStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

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
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  valueExclVAT: {
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

const ReferenceDoc = init.define("refernce_doc", {
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
  createAt: {
    type: DataTypes.DATE,
    defaultValue: init.DATE
  }
});

const Comment = init.define("comments",{
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false
  },
  commentBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentByEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentAt: {
    type: DataTypes.DATE,
    defaultValue: init.NOW
  },
  commentContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})

const History = init.define("history",{
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false
  },
  historyBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  historyByEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  historyAction: {
    type: DataTypes.STRING,
    allowNull: false
  },
  historyContent: {
    type: DataTypes.STRING,
  },
  historyAt: {
    type: DataTypes.DATE,
    defaultValue: init.NOW
  }
})

// ------------------------create table--------------------------
// Approval.sync();
// Participants.sync();
// ApprovalDocument.sync();
// ReferenceDoc.sync();
// Comment.sync();
// History.sync()

module.exports = { Approval, Participants, ApprovalDocument, ReferenceDoc, Comment, History };
