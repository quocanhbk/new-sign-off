const {
  Approval,
  Participants,
  ApprovalDocument,
  ReferenceDoc,
  Comment,
  History,
} = require("../models/allModels");

// insert primary infoapprovalID: {
const InsertApproval = async (
  approvalID,
  createByName,
  createByEmail,
  createPosition,
  approval_title,
  approval_description,
  approval_type,
  approval_priority,
  approval_deadline,
  approval_related,
  processName,
  createAt,
  approvalStatus
) => {
  await Approval.create({
    approvalID: approvalID,
    createByName: createByName,
    createByEmail: createByEmail,
    createPosition: createPosition,
    approval_title: approval_title,
    approval_description: approval_description,
    approval_type: approval_type,
    approval_priority: approval_priority,
    approval_deadline: approval_deadline,
    approval_related: approval_related,
    processName: processName,
    createAt: createAt,
    approvalStatus: approvalStatus,
  });
};

// insert participants
const InsertParticipant = async (
  approvalID,
  paticipantName,
  paticipantEmail,
  paticipantPosition,
  paticipantType,
  _isApproval,
  paticipantStatus
) => {
  await Participants.create({
    approvalID: approvalID,
    paticipantName: paticipantName,
    paticipantEmail: paticipantEmail,
    paticipantPosition: paticipantPosition,
    paticipantType: paticipantType,
    _isApproval: _isApproval,
    paticipantStatus: paticipantStatus,
  });
};

const InsertApprovalDocument = async (
  approvalID,
  attachment,
  nameDocument,
  requestAt,
  description,
  valueExclVAT,
  VAT,
  totalPay
) => {
  await ApprovalDocument.create({
    approvalID,
    attachment,
    nameDocument,
    requestAt,
    description,
    valueExclVAT,
    VAT,
    totalPay,
  });
};

const InsertReferenceDoc = async (approvalID, attachment, nameDocument) => {
  await ReferenceDoc.create({
    approvalID,
    attachment,
    nameDocument,
  });
};

const InsertComments = async (
  approvalID,
  commentBy,
  commentByEmail,
  commentAt,
  commentContent
) => {
  await Comment.create({
    approvalID,
    commentBy,
    commentByEmail,
    commentAt,
    commentContent,
  });
};

const InsertHistory = async (
  approvalID,
  historyBy,
  historyByEmail,
  historyAction,
  historyContent,
  historyAt
) => {
  await History.create({
    approvalID,
    historyBy,
    historyByEmail,
    historyAction,
    historyContent,
    historyAt,
  });
};

module.exports = {
  InsertApproval,
  InsertParticipant,
  InsertApprovalDocument,
  InsertReferenceDoc,
  InsertComments,
  InsertHistory,
};
