const {
  Approval,
  Participants,
  ApprovalDocument,
  ReferenceDoc,
  Comment,
  History,
} = require("../models/allModels");

// get list search
const SelectListApproval = async (email) => {
  const Select = await Approval.findAll({
    include: {
      model: ApprovalDocument,
      as: "test",
      where: {
        approvalID: email
      }
    }
    // attributes: [
    //   "approvalID",
    //   "createByName",
    //   "createByEmail",
    //   "approval_title",
    //   "approval_priority",
    //   "approval_deadline",
    //   "approvalStatus",
    //   "approval_type",
    // ],
    // where: {
    //   createByEmail: email,
    // },
  });

  return Select;
};

// get details info approval flow
const GetDetailsApproval = async (approvalID) => {
  const getApproval = await Approval.findAll({
    attributes: [
      "createAt",
      "approval_title",
      "approval_type",
      "approval_related",
      "approval_description",
    ],
    where: {
      approvalID: approvalID,
    },
  });
  const getApprovalDocument = await ApprovalDocument.findAll({
    attributes: [
      "attachment",
      "nameDocument",
      "requestAt",
      "description",
      "valueExclVAT",
      "VAT",
      "totalPay",
    ],
    where: {
      approvalID: approvalID,
    },
  });
  const getReferenceDoc = await ReferenceDoc.findAll({
    attributes: ["approvalID", "attachment", "nameDocument"],
    where: {
      approvalID: approvalID,
    },
  });

  const getParticipants = await Participants.findAll({
    attributes: [
      "paticipantName",
      "paticipantEmail",
      "paticipantPosition",
      "paticipantType",
      "_isApproval",
      "paticipantStatus",
    ],
    where: {
      approvalID: approvalID,
    },
  });

  const getComment = await Comment.findAll({
    attributes: ["commentBy", "commentByEmail", "commentAt", "commentContent"],
    where: {
      approvalID: approvalID,
    },
  });

  const getHistory = await History.findAll({
    attributes: [
      "historyBy",
      "historyByEmail",
      "historyAction",
      "historyContent",
      "historyAt",
    ],
    where: {
      approvalID: approvalID,
    },
  });

  return {
    getApproval,
    getApprovalDocument,
    getReferenceDoc,
    getParticipants,
    getComment,
    getHistory,
  };
};

module.exports = { SelectListApproval, GetDetailsApproval };
