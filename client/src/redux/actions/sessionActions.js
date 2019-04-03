export const type = {
    set: "SET_CURRENT_USER",
    remove: "REMOVE_CURRENT_USER"
}

export const setCurrentUser = (user) => ({
    type: type.set,
    payload: user
})

export const removeCurrentUser = () => ({
    type: type.remove
})