const data = [
    {id: 1, title: "Thanh toán mua PS5 phục vụ công việc", running: true},
    {id: 2, title: "Thanh toán tiền điện nước", running: false},
    {id: 3, title: "Khen thưởng 1 chầu buffet", running: true},
    {id: 4, title: "Thanh toán tiền đi du lịch Vũng Tàu", running: false}
]
export const userList = [
    {id: 'quocanh', name: "La Quoc Anh"},
    {id: 'kimson', name: "Ngo Kim Son"},
    {id: 'hoangvu', name: "Le Hoang Vu"},
    {id: 'thachthao', name: "Tran Thach Thao"},
    {id: 'hoangtan', name: "Nguyen Hoang Tan"},
    {id: 'thuanquan', name: "Van Thuan Quan"}
]
export const dynamicFormList = [
    {id: 'sleep', name: 'Go To Sleep Form', linkPath: '/', fields: [
      {id: "tts", name: "Time to sleep", defaultValue: "Ten PM", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238}
    ]},
    {id: 'travel', name: 'Travel Plan', linkPath: '/', fields: [
      {id: "des", name: "Destination", defaultValue: "", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238}
    ]},
    {id: 'office', name: 'Buying Office Utility', linkPath: '/', fields: [
      {id: "date", name: "Date", defaultValue: "", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238},
      {id: "price", name: "Price", defaultValue: "", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238}
    ]},
    {id: 'eat', name: 'Eating Plan', linkPath: '/', fields: [
      {id: "food", name: "Food", defaultValue: "Chicken", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238},
      {id: "price", name: "Price", defaultValue: "", required: true, x: 1.000, y: 2.382, width: 2.282, height: 1.238}
    ]}
]
export const checkListData = [
    {
        id: 1,
        name: "Thư đề nghị thanh toán",
        defaultAttachments: [
            {
                name: "FirstAttachment.pdf", 
                fields: [
                    {name: "Date of request very", value: "31/02/2020"},
                    {name: "Description", value: "I don't know what to describe"},
                    {name: "VAT", value: "170,000,000 vnd"},
                ]
            },
            {
                name: "SecondAttachment.pdf", 
                fields: [
                    {name: "Money: ", value: "$100,000,000"},
                    {name: "Note", value: "Big money"},
                ]
            },
        ]
    },
    {
        id: 2,
        name: "Hóa đơn",
        defaultAttachments: []
    },
    {
        id: 3,
        name: "Biên bản quyết toán",
        defaultAttachments: [
            {
                name: "Procedure.pdf",
                fields: [
                    {name: "Moneyyy:", value: ""},
                    {name: "Creator", value: ""}
                ]
            }
        ]
    }
]
export const emptyChecklistData = [
    {id: 1, name: "checklist item 1", defaultAttachments: []},
    {id: 2, name: "checklist 2 item", defaultAttachments: []},
    {id: 3, name: "3 checklist item", defaultAttachments: []}
]
export default data