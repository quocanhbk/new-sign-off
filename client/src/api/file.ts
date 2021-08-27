import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import QRCode from "qrcode"
import { IField } from "./form"
import Fetcher from "./fetcher"
import axios from "axios"
import { getQRText } from "./request"

const fetcher = new Fetcher("/api/v1/files/")

interface IDownloadFormInput {
    name: string
    file: string
    fields: IField[]
    requestId?: number
    size: number
    position: "left" | "right"
}

export const getFile = async (id: number): Promise<string> => {
    const {
        data: { downloadUrl: file },
    } = await fetcher.GET(id)
    return file
}

export const postFile = async (file: File): Promise<number> => {
    const data = new FormData()
    data.append("file", file, file.name)
    const {
        data: { file_id },
    } = await fetcher.POST("", data)
    return file_id
}

export const deleteFile = async (fileId: number) => {
    await fetcher.DELETE(fileId)
}

export const downloadAttachment = async ({
    name,
    file,
    fields,
    requestId,
}: Omit<IDownloadFormInput, "size" | "position">) => {
    const generateQR = async text => {
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
    const fontBytes = await axios.get("https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff", {
        responseType: "arraybuffer",
    })
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)

    const pages = pdfDoc.getPages()
    const { width, height } = pages[0].getSize()

    //if Request is APPROVED, draw QR code for each page before downloading
    if (requestId) {
        const hashMessage = await getQRText(requestId)
        const qrCodeB64 = await generateQR(hashMessage)
        const embededQR = await pdfDoc.embedPng(qrCodeB64)
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
    fields.forEach(field => {
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

export const downloadStampAttachment = async ({
    name,
    file,
    fields,
    requestId,
    size,
    position,
}: IDownloadFormInput) => {
    const generateQR = async (text: string) => {
        try {
            return await QRCode.toDataURL(text)
        } catch (err) {
            return ""
        }
    }
    // get file from drive
    const fileBuffer = await axios.get(file, { responseType: "arraybuffer" })
    if (fileBuffer.headers["content-type"] !== "application/pdf") {
        const link = document.createElement("a")
        link.href = file
        link.click()
        return
    }
    const pdfDoc = await PDFDocument.load(fileBuffer.data)

    // use this font so it can print Vietnamese characters correctly
    const fontBytes = await axios.get("https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff", {
        responseType: "arraybuffer",
    })
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes.data)

    const pages = pdfDoc.getPages()
    const { width, height } = pages[0].getSize()

    //if Request is APPROVED, draw QR code for each page before downloading
    if (requestId) {
        const hashMessage = await getQRText(requestId)
        const qrCodeB64 = await generateQR(hashMessage)
        const embededQR = await pdfDoc.embedPng(qrCodeB64)
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
    fields.forEach(field => {
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
