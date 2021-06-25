import {PDFDocument, rgb} from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import axios from 'axios'
import getConfig from './getConfig'


export const getFile = async (fileId) => {
    const config = await getConfig()
    const {data: {downloadUrl: file}} = await axios.get("/api/v1/files/" + fileId, config)
    return file
}

export const downloadForm = async (name, fileId, fields) => {
    const file = await getFile(fileId)
    const existingPdf = await axios.get(file, {responseType: 'arraybuffer'})
    const pdfDoc = await PDFDocument.load(existingPdf.data)
    const fontBytes = await axios.get("https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff", {responseType: 'arraybuffer'})

    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)
    const pages = pdfDoc.getPages()
    const {width, height} = pages[0].getSize()

    fields.forEach(field => {
        let pctPage = 100 / pages.length
        let pageOfField = Math.floor(field.position.Y / pctPage)
        let relativeY = field.position.Y - pctPage*pageOfField
        
        pages[pageOfField].drawText(field.content, {
            x: field.position.X * width / 100,
            y: height - relativeY * height * pages.length / 100 -10,
            font: customFont,
            size: 12,
            color: rgb(0,0,0)
        })
    });

    const pdfBytes = await pdfDoc.save()


    console.log("PDFBYTE", pdfBytes)
    const blob = new Blob([pdfBytes], {type: "application/pdf"})

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob)
    link.download=`${name}.pdf`
    link.click()
}