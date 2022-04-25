export default function (date){
    return new Date(date).getDate()+ " th " + new Date(date).toLocaleString("default", {month: "long"})+ ", "  +new Date(date).getFullYear()
}