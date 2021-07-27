import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import axios from "axios"
import getConfig from "./getConfig"
import QRCode from "qrcode"

export const getFile = async (fileId) => {
    const config = await getConfig()
    const {
        data: { downloadUrl: file },
    } = await axios.get("/api/v1/files/" + fileId, config)
    return file
}
export const postFile = async (file) => {
    const config = await getConfig()
    const data = new FormData()
    data.append("file", file, file.name)
    const {
        data: { file_id },
    } = await axios.post("/api/v1/files", data, config)
    return file_id
}

export const downloadForm = async (name, fileId, fields) => {
    const file = await getFile(fileId)
    const existingPdf = await axios.get(file, { responseType: "arraybuffer" })
    const pdfDoc = await PDFDocument.load(existingPdf.data)

    // use this font so it can print Vietnamese characters correctly
    const fontBytes = await axios.get(
        "https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff",
        { responseType: "arraybuffer" }
    )

    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)
    const pages = pdfDoc.getPages()
    const { width, height } = pages[0].getSize()

    fields.forEach((field) => {
        let pctPage = 100 / pages.length
        let pageOfField = Math.floor(field.position.Y / pctPage)
        let relativeY = field.position.Y - pctPage * pageOfField

        pages[pageOfField].drawText(field.content, {
            x: (field.position.X * width) / 100,
            y: height - (relativeY * height * pages.length) / 100 - 10,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 125),
        })
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: "application/pdf" })

    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `${name}.pdf`
    link.click()
}
export const downloadForm2 = async (
    name,
    file,
    fields,
    isApproved = false,
    requestId
) => {
    const getQRText = async (requestId) => {
        const config = await getConfig()
        const res = await axios.get(
            `/api/v1/requests/${requestId}/signed-content`,
            config
        )
        return res.data.text
    }
    const generateQR = async (text) => {
        try {
            return await QRCode.toDataURL(text)
        } catch (err) {
            return ""
        }
    }
    // get file from drive
    const existingPdf = await axios.get(file, { responseType: "arraybuffer" })
    if (existingPdf.headers["content-type"] !== "application/pdf") {
        const link = document.createElement("a")
        link.href = file
        // link.download=`${name}.pdf`
        link.click()
        return
    }
    const pdfDoc = await PDFDocument.load(existingPdf.data)

    // use this font so it can print Vietnamese characters correctly
    const fontBytes = await axios.get(
        "https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff",
        { responseType: "arraybuffer" }
    )
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)

    const pages = pdfDoc.getPages()
    const { width, height } = pages[0].getSize()

    const hashMessage = await getQRText(requestId)
    const qrCodeB64 = await generateQR(hashMessage)
    const embededQR = await pdfDoc.embedPng(qrCodeB64)

    //if Request is APPROVED, draw QR code for each page before downloading
    if (isApproved) {
        for (const page of pages) {
            const { width, height } = page.getSize()
            page.drawImage(embededQR, {
                height: 48,
                width: 48,
                x: width - 48 - 8, // yes I'm not retarded it's just for clarity
                y: height - 48 - 8,
            })
        }
    }

    //draw field
    fields.forEach((field) => {
        let pctPage = 100 / pages.length
        let pageOfField = Math.floor(field.position.Y / pctPage)
        let relativeY = field.position.Y - pctPage * pageOfField

        pages[pageOfField].drawText(field.content, {
            x: (field.position.X * width) / 100,
            y: height - (relativeY * height * pages.length) / 100 - 10,
            font: customFont,
            size: 11,
            color: rgb(0, 0, 0.5),
        })
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: "application/pdf" })

    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `${name}.pdf`
    link.click()
}
// you can change QR code size and position
export const downloadForm3 = async ({
    name,
    file,
    fields,
    isApproved = false,
    requestId,
    size = 48,
    position = "right",
}) => {
    const getQRText = async (requestId) => {
        const config = await getConfig()
        const res = await axios.get(
            `/api/v1/requests/${requestId}/signed-content`,
            config
        )
        return res.data.text
    }
    const generateQR = async (text) => {
        try {
            return await QRCode.toDataURL(text)
        } catch (err) {
            return ""
        }
    }
    // get file from drive
    const existingPdf = await axios.get(file, { responseType: "arraybuffer" })
    if (existingPdf.headers["content-type"] !== "application/pdf") {
        const link = document.createElement("a")
        link.href = file
        // link.download=`${name}.pdf`
        link.click()
        return
    }
    const pdfDoc = await PDFDocument.load(existingPdf.data)

    // use this font so it can print Vietnamese characters correctly
    const fontBytes = await axios.get(
        "https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff",
        { responseType: "arraybuffer" }
    )
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)

    const pages = pdfDoc.getPages()
    const { width, height } = pages[0].getSize()

    const hashMessage = await getQRText(requestId)
    const qrCodeB64 = await generateQR(hashMessage)
    const embededQR = await pdfDoc.embedPng(qrCodeB64)

    //if Request is APPROVED, draw QR code for each page before downloading
    if (isApproved) {
        for (const page of pages) {
            const { width, height } = page.getSize()
            page.drawImage(embededQR, {
                height: size,
                width: size,
                x: position === "left" ? 8 : width - size - 8, // yes I'm not retarded it's just for clarity
                y: height - size - 8,
            })
        }
    }

    //draw field
    fields.forEach((field) => {
        let pctPage = 100 / pages.length
        let pageOfField = Math.floor(field.position.Y / pctPage)
        let relativeY = field.position.Y - pctPage * pageOfField

        pages[pageOfField].drawText(field.content, {
            x: (field.position.X * width) / 100,
            y: height - (relativeY * height * pages.length) / 100 - 10,
            font: customFont,
            size: 11,
            color: rgb(0, 0, 0.5),
        })
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: "application/pdf" })

    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `${name}.pdf`
    link.click()
}
export const deleteFile = async (fileId) => {
    const config = await getConfig()
    axios.delete("/api/v1/files/" + fileId, config)
}
