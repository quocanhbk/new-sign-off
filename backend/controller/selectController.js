const {
  Approval,
  Advisor,
  Approver,
  Observator,
  ApprovalDocument,
  ReferenceDoc,
} = require("../models/allModels");

const SelectApproval = async () => {
    const Select =  Approval.findAll();
    return Select
};
console.log("All users:", JSON.stringify(SelectApproval, null, 2))
module.exports = {SelectApproval}
