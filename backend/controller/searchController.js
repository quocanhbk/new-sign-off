const {
  Approval,
  Paticipants,
  ApprovalDocument,
  ReferenceDoc,
  Comment,
  History,
} = require("../models/allModels");

const SelectListApproval = async (email) => {
  const Select = await Approval.findAll({
    attributes: [
      "approvalID",
      "createByName",
      "createByEmail",
      "approval_title",
      "approval_priority",
      "approval_deadline",
      "approvalStatus",
      "approval_type",
    ],
    where: {
      createByEmail: email,
    },
  });

  return Select;
};

const GetDetailsApproval = async (approvalID) => {
  const getApproval = await Approval.findAll({
    attributes: [
      "createAt",
      "approval_title",
      "approval_type",
      "approval_related",
      "approval_description",
      ""
    ],
    where: {
      approvalID: approvalID,
    },
  });

  return { getApproval };
};

module.exports = { SelectListApproval, GetDetailsApproval };
