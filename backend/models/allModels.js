const { DataTypes } = require("sequelize");
const database = require("../connectionDB/connectionDB");

// approval models
const Approval = database.define("approvalInfo", {
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
    defaultValue: database.NOW,
  },
  approval_related: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  processName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approvalStatus: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
});

// models paticipants
const Participants = database.define("participants",{
  approvalID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  paricipantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  participantEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  participantPosition: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Staff"
  }, 
  participantType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  _isApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  participantStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

const ApprovalDocument = database.define("approval_document", {
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
    defaultValue: database.NOW,
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

const ReferenceDoc = database.define("refernce_doc", {
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
  }
});

const Comment = database.define("comments",{
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
    defaultValue: database.NOW
  },
  commentContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})

const History = database.define("approvalHistory",{
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
    defaultValue: database.NOW
  }
})

// ------------------------create table--------------------------
Approval.sync();
Participants.sync();
ApprovalDocument.sync();
ReferenceDoc.sync();
Comment.sync();
History.sync()

module.exports = { Approval, Participants, ApprovalDocument, ReferenceDoc, Comment, History };
