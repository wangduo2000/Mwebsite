const comments = () => {
    return $.ajax({
        type: "POST",
        //url: '/api/position/list',
        url: '/apicenter/kdmkt.do?method=exclusiveVisit&type=MKTEVALUATEDETAIL&token=MjvOJDW5sNMJXg06IsKdl5rdXqyjyIGm&sign=Tg1Xm0jMarket&limit=40',
        success: (result) => {
            console.log(result);
            return result
        }
    })
}
export default {
    comments
}