const list = () => {
    return $.ajax({
      type:"POST",
      //url: '/api/position/list',
      url: '/apicenter/kdmkt.do?method=queryMyMkt&latitude=40.11639&longitude=116.25135',
      success: (result) => {
        console.log(result);
        return result
      }
    })
  }
  export default {
    list
  }


  //https://m.kuaidi100.com/apicenter/kdmkt.do?method=queryMyMkt&latitude=40.11639&longitude=116.25135&addressinfo="北京市昌平区沙河镇沙河二毛生活小区北京科技职业学院"&orderSource=""&sortval=all&token=""&platform="MWWW"
