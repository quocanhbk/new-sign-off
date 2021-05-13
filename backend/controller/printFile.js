const htmlToPdf = require('html-pdf-node')
const fs = require('fs')
const path = require('path')

const printFile = (req, res) => {

    htmlToPdf.generatePdf({url: "http://localhost:3000/playground"}, {format: 'A4', path: './file.pdf'}).then(pdfBuffer => {
        console.log("Buffer: ", pdfBuffer)
    })
    res.send("oke")
}

module.exports = printFile