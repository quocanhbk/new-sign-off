const express = require("express");
const router = express.Router();
const {
  InsertApproval,
  InsertParticipant,
  InsertApprovalDocument,
  InsertReferenceDoc,
} = require("../controller/createController");

// create appproval documents
router.post("/document", (req, res) => {
  const {
    approvalID,
    attachment,
    nameDocument,
    requestAt,
    description,
    valueExclVAT,
    VAT,
    totalPay,
  } = req.body;
  InsertApprovalDocument(
    approvalID,
    attachment,
    nameDocument,
    requestAt,
    description,
    valueExclVAT,
    VAT,
    totalPay
  )
    .then(() => {
      res.json({
        _isInsert: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        _isInsert: false,
      });
    });
});

router.post("/reference", (req, res) => {
  const { approvalID, attachment, nameDocument } = req.body;
  InsertReferenceDoc(approvalID, attachment, nameDocument)
    .then(() => {
      res.json({
        _isInsert: true
      })
    })
    .catch(err => {
      console.error(err)
      res.json({
        _isInsert: false
      })
    })
});

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
  const { advisor, approver, observator } = req.body.participant;

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
      advisor.length > 0 &&
        (await advisor.map((value) => {
          return InsertParticipant(
            approvalID,
            value.paticipantName,
            value.paticipantEmail,
            value.paticipantPosition,
            "advisor",
            false
          );
        }));
      approver.length > 0 &&
        (await approver.map((value) => {
          return InsertParticipant(
            approvalID,
            value.paticipantName,
            value.paticipantEmail,
            value.paticipantPosition,
            "approver",
            true
          );
        }));
      observator.length > 0 &&
        (await observator.map((value) => {
          return InsertParticipant(
            approvalID,
            value.paticipantName,
            value.paticipantEmail,
            value.paticipantPosition,
            "observator",
            false
          );
        }));
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
