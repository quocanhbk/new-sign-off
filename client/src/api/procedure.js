import axios from 'axios'

export const postProcedure = async (title, description, advisors, approvers, observators) => {
    let res = await axios.post('/api/v1/procedures', {
        title,
        description,
        isActive: true,
        tags: [],
        advisors,
        approvers,
        observators
    })
    if (res.data) {
        let {procedure_id: id} = res.data
        console.log(id)
    }
}