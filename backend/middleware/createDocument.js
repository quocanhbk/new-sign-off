const express = require("express");
const router = express.Router();
const {
  InsertApproval,
  InsertParticipant,
} = require("../controller/insertController");

// create approval flow
router.post("/", (req, res) => {
  const {
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
    approvalStatus,
  } = req.body.primary_info;
  const { advisor, approver, observator } = req.body.participan;

  // insert primary info
  InsertApproval(
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
  )
    .then(async () => {
      // insert participants
      advisor.length > 0 && await advisor.map((value) => {
        return InsertParticipant(
          approvalID,
          value.paticipantName,
          value.paticipantEmail,
          value.paticipantPosition,
          "advisor",
          false
        );
      });
      approver.length > 0 && await approver.map((value) => {
        return InsertParticipant(
          approvalID,
          value.paticipantName,
          value.paticipantEmail,
          value.paticipantPosition,
          "approver",
          true
        );
      });
      observator.length > 0 && await observator.map((value) => {
        return InsertParticipant(
          approvalID,
          value.paticipantName,
          value.paticipantEmail,
          value.paticipantPosition,
          "approver",
          false
        );
      });
      res.json({
        _isInsert: true,
      });
    })
    .catch((err) => {
      // error insert primary info
      console.error("error insert primary info", err);
      res.json({
        _isInsert: false,
      });
    });
});

module.exports = router;
