export const type = {
    set: "SET_CURRENT_SERVICE_DETAIL"
}

export const setServiceDetails = (payload) => ({
    type: type.set,
    payload
})