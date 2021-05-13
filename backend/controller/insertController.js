const {
  Approval,
  Advisor,
  Approver,
  Observator,
  ApprovalDocument,
  ReferenceDoc,
} = require("../models/allModels");

// insert primary info
const InsertApproval = async (
  approvalID,
  createByName,
  createByEmail,
  approval_title,
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
    approval_title: approval_title,
    approval_type: approval_type,
    approval_priority: approval_priority,
    approval_deadline: approval_deadline,
    approval_related: approval_related,
    processName: processName,
    createAt: createAt,
    approvalStatus: approvalStatus,
  });
};

// insert advisor
const InsertAdvisor = async (approvalID, advisorEmail, advisorName) => {
  await Advisor.create({
    approvalID: approvalID,
    advisorEmail: advisorEmail,
    advisorName: advisorName,
  });
};

// insert approver
const InsertApprover = async (approvalID, advisorEmail, advisorName) => {
  await Approver.create({
    approvalID: approvalID,
    advisorEmail: advisorEmail,
    advisorName: advisorName,
  });
};

// insert Observator
const InsertObservator = async (approvalID, advisorEmail, advisorName) => {
  await Observator.create({
    approvalID: approvalID,
    advisorEmail: advisorEmail,
    advisorName: advisorName,
  });
};

// insert ApprovalDocument
const InsertApprovalDocument = async (
  approvalID,
  attachment,
  nameDocument,
  requestAt,
  description,
  valueVAT,
  VAT,
  totalPay
) => {
  await ApprovalDocument.create({
    approvalID: approvalID,
    attachment: attachment,
    nameDocument: nameDocument,
    requestAt: requestAt,
    description: description,
    valueVAT: valueVAT,
    VAT: VAT,
    totalPay: totalPay,
  });
};

// insert ReferenceDoc
const InsertReferenceDoc = async (approvalID, attachment, nameDocument) => {
  await ReferenceDoc.create({
    approvalID: approvalID,
    attachment: attachment,
    nameDocument: nameDocument,
  });
};

module.exports = {
  InsertApproval,
  InsertAdvisor,
  InsertApprover,
  InsertObservator,
  InsertApprovalDocument,
  InsertReferenceDoc,
};
