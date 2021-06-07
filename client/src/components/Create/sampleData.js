export const data = [
    {
      id: 1,
      name: "Name File have field",
    },
    {
      id: 2,
      name: "Name File no field",
    },
  ];
  
export const data2 = [
    {
      id: 1,
      name: "Name File have fieldName File have fieldName File have fieldName File have fieldName File have fieldName File have field",
      data_field: [
        {
          id: 1,
          name: "Date of Request",
          value: "",
        },
        {
          id: 2,
          name: "Description",
          value: "",
        },
  
        {
          id: 3,
          name: "Vat",
          value: "",
        },
        {
          id: 4,
          name: "Value",
          value: "",
        },
      ],
    },
    {
      id: 2,
      name: "Name File no field",
      data_field: [],
    },
  ];
export const procedureList = [
{
    id: 1,
    name: "Đề nghị thanh toán nội bộ",
    approvalDocument: [
        {
          id: 11,
          name_required: 'Thư dề nghị thanh toán nhà thầu Thư dề nghị thanh toán nhà thầu',
          data: [
            {
              id: 111,
              name: "Mau 1",
              file_name: "ahihi.pdf",
              data_field:[
                {
                  id: 1,
                  name: "Date of Request",
                  value: "",
                },
                {
                  id: 2,
                  name: "Description",
                  value: "",
                },
          
                {
                  id: 3,
                  name: "Vat",
                  value: "",
                },
                {
                  id: 4,
                  name: "Value",
                  value: "",
                },
              ],
            },
            {
              id: 112,
              name: "Mau 2",
              file_name: "ahihi.pdf",
              data_field: [],
            },
          ]
        },
        {
          id: 12,
          name_required: 'Thư dề nghị bão lãnh',
          data: [
  
          ]
        },
      ]
    },
    {
      id: 2,
      name: "Đề nghị thanh toán ngoại bộ",
      approvalDocument: [
        {
          id: 21,
          name_required: 'Thu de nghi nha thau',
          data: [
            {
              id: 221,
              file_name: "ahihi.pdf",
              data_field: [],
            },
            {
              id: 222,
              file_name: "ahihi.pdf",
              data_field: [],
            },
          ]
        },
        {
          id: 22,
          name_required: 'Thu de nghi nha thau 222',
          data: [
            {
              id: 221,
              file_name: "ahihi.pdf",
              data_field: [],
            },
          ]
        },
      ]
    },
  ]
export const draft = [
    {
      id: 1,
      name: 'Tờ trình 1',
      created: '15:00 20/04/2021',
      title: 'TT tiền điện',
      type: 'Flexible',
      priority: 'Normal',
      deadline: '22/04/2021'
    },
    {
      id: 2,
      name: 'Tờ trình 2',
      created: '15:00 20/04/2021',
      title: 'TT tiền điện',
      type: 'Flexible',
      priority: 'Normal',
      deadline: '22/04/2021'
    },
    {
      id: 3,
      name: 'Tờ trình 3',
      created: '15:00 20/04/2021',
      title: 'TT tiền điện',
      type: 'Flexible',
      priority: 'Normal',
      deadline: '22/04/2021'
    }
  ]

export const projectList = [
    {id: 'trungthuy', name: 'TTG - Trung Thuy'},
    {id: 'luminaire', name: 'Lancaster Luminaire'},
    {id: 'hcm', name: 'Lancaster Ho Chi Minh'},
    {id: 'hanoi', name: 'Lancaster Ha Noi'},
    {id: 'eden', name: 'Lancaster Eden'},
    {id: 'legacy', name: 'Lancaster Legacy'},
    {id: 'namo', name: 'Lancaster Nam O'}
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
    {id: "tts", name: "Time to sleep", defaultValue: "Ten PM", required: true},
    {id: "dur", name: "Duration", defaultValue: "", required: false}
  ]},
  {id: 'travel', name: 'Travel Plan', linkPath: '/', fields: [
    {id: "des", name: "Destination", defaultValue: "", required: true},
    {id: "bud", name: "Budget", defaultValue: "", required: true},
    {id: "dur", name: "Days", defaultValue: "5", required: false}
  ]}
]