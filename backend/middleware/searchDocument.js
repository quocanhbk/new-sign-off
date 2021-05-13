const express = require("express");
const router = express.Router();
const { InsertApproval } = require("../controller/insertController");

router.post("/", (req, res) => {
  const {
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
    approvalStatus,
  } = req.body;

  InsertApproval(
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
  ).then(() => {
      res.json({
          _isInsert: true
      });
  })
  .catch(err => {
      console.error(err)
      res.json({
          _isInsert: false
      })
  })
});

module.exports = router;
