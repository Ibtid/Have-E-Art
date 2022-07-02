
export default (contextStore, id) => {
    if(!contextStore.user){
        return false
    }
    if(contextStore.user._id == id){
        return true
    }
    return false
}