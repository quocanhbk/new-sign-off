export const priorityList = [
    { id: "Normal", text: "Normal" },
    { id: "Urgent", text: "Urgent" },
]
export const approvalTypeList = [
    { id: "Flexible", text: "Flexible" },
    { id: "Procedure", text: "Procedure" },
]

export interface IProject {
    id: string
    text: string
}
export const projectList: IProject[] = [
    { id: "TTG", text: "TTG - Tap Doan Trung Thuy" },
    { id: "M01", text: "M01 - Lincoln" },
    { id: "V01", text: "V01 - Eden" },
    { id: "M04", text: "M04 - Luminaire" },
    { id: "M02", text: "M02 - Legacy" },
    { id: "R02", text: "R02 - Nam O" },
    { id: "DPX174TH", text: "DPX174TH - 174 Thai Ha" },
    { id: "TNVP", text: "TNVP - 195 Dien Bien Phu" },
    { id: "10B1LTT", text: "10B1LTT - 10B1 Le Thanh Ton" },
    { id: "20NT", text: "20NT - 20 Nui Truc" },
    { id: "LCB", text: "LCB - 22 Le Thanh Ton" },
    { id: "MAB", text: "Miss Ao Dai Building" },
    { id: "EMPIRE", text: "EMPIRE" },
]
export const admins = [
    "4b936fbd-df00-47a5-b9b5-e33fd8be5d59",
    "296ff6ee-5c88-48a1-9f93-b83b8f41cb37",
    "558bd13d-8c3b-4a98-aa0f-5b111a29e174",
    "06bc546a-534f-4587-bb87-9974aa3cce9b",
    "0cc1c98a-3296-4eb7-a30d-917d9c8f8be9",
    "fb1537e0-d8f1-412c-88a2-8af50909b4a9",
    "63e91bb5-27c7-4405-b3a3-cbbe68282e70",
    "a1e42e68-a7ba-4237-abc3-f7f3cab823b3",
]
export const adminEmails = [
    "anh.lq@ttgvn.com",
    "son.nk@ttgvn.com",
    "tan.nh@ttgvn.com",
    "thang.hd@ttgvn.com",
    "lien.nth@ttgvn.com",
    "du.np@ttgvn.com",
    "thuan.pv@ttgvn.com",
    "huong.ntm@ttgvn.com",
]

export const REQUEST_FETCH_RANGE = 10
