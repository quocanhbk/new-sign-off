const express = require("express");
const router = express.Router();
const { SelectListApproval } = require("../controller/searchController");

// select list search
router.get("/:email", async (req, res) => {
  const email = await req.params.email
  SelectListApproval(email)
    .then((results) => {
      res.json(results)
    })
    .catch(err => {
      console.error(err)
      res.json({_isGet: false})
    })
});

// get details content approlval flow
// router.get('/details/:approvalID', (req, res) => {
//   const { approvalID } = req.params.approvalID
//   GetDetailsApproval(approvalID)
//     .then((results) => {
//       res.json(results)
//     })
//     .catch(err => {
//       console.error(err)
//       res.json({_isGet: false})
//     })
// })


module.exports = router;
