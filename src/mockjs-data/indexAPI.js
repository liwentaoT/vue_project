/*
 * @desc: 根据接口文档模拟后台数据接口   生成随机数据+Ajax拦截
 * @Author: Your name
 * @Date:   2020-05-31 13:04:26
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-06-10 10:22:02
 */
import Mock from "mockjs";
console.log("mock导入成功", Mock);

/* 
    1.1 获取轮播图的API地址   
        请求方式 Get     
        请求地址  /api/getlunbo
        参数：null
*/

const {lunboList}=Mock.mock({
    "lunboList":[
        {
            "img":'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
            "url":'https://www.baidu.com/?tn=78040160_5_pg&ch=8'
        },
        {
            "img":'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
            "url":'https://www.baidu.com/?tn=78040160_5_pg&ch=8'
        }
    ]
});
Mock.mock('/api/getlunbo','get',()=>{
    return {
        "status":0,
        "message":lunboList
    }
})

/* 
    1.2 获取图文资讯的API地址   
        请求方式 Get     
        请求地址  /api/getnewslist
        参数：null
*/
const {newList}=Mock.mock({
    "newList|35":[
        {
            "id":'@increment(1)',
            "title":"@ctitle(10)",
            "add_time":"@date(yyyy-MM-dd hh:mm:ss)",
            "zhaiyao":"@csentence(5,30)",
            "click|0-5":2,
            "img_url":"https://img-blog.csdnimg.cn/20190918140012416.png"
        }
    ]
});
Mock.mock('/api/getnewslist','get',()=>{
    return {
        "status":0,
        "message":newList
    }
});

/* 
    1.3 获取图文资讯详情
    请求方式：get
    请求地址：/api/getnew/:newid
    传入参数：id 
    传入参数的url写法：/api/getnew/43
    返回值：对应的图文资讯详情的对象
*/
const {newInfo} = Mock.mock({
    "newInfo|35":[
        {
            "id|+1":1,
            "title":"@ctitle(10)",
            "click|0-5":2,
            "add_time":"@date(yyyy-MM-dd hh:mm:ss)",
            "content":"@cparagraph()"
        }
    ]
});

Mock.mock(/\/api\/getnew/,'get',(options)=>{
    let newInfoObj={};
    let id=getQuery(options.url,"id");    //id(String)
    for(var index in newInfo){
        if(parseInt(id)===newInfo[index].id){
            newInfoObj=newInfo[index]
        }
    }
    // console.log('new is:',newInfoObj)
    return {
        "status":0,
        "message":newInfoObj
    }
});

/* 
    获取评论信息：
    地址：/api/getcomments/:artid?pageindex=1
    方式：get
    传入参数：
        资讯：id
        分页的页码：pageindex
*/
const {commentsList}=Mock.mock({
    "commentsList|53":[
        {
            "user_name":"@cname(true)",
            "add_time":"@date(yyyy-MM-dd hh:mm:ss)",
            "content":"@csentence(5,30)" 
        }
    ]
});
Mock.mock(/\/api\/getcomments/,'get',(options)=>{
    let id=getQuery(options.url,"id");
    let pageindex=getQuery(options.url,"pageindex");
    let pageSize=10;
    let start=(pageindex-1)*pageSize;
    let end=pageindex*pageSize;
    let pageTotle=Math.ceil(commentsList.length/pageSize);
    console.log(start,end,pageTotle);
    const list=pageindex>pageTotle?[]:commentsList.slice(start,end);
    // console.log('list:',list);
    return {
        status:0,
        message:list
    }
});

/* 
    提交评论信息
    地址：/api/postcomment/:artid
    请求方式：Post
    传入的参数：
        artid:资讯id
        content：评论的内容
*/
Mock.mock('/api/postcomment','post',(options)=>{
    console.log("option is",options)
    let body=JSON.parse(options.body)
    console.log("body is",body)
    console.log("old commentsList is",commentsList);
    commentsList.push(Mock.mock({
        "user_name":"匿名用户",
        "add_time":"2020-6-2",
        "content":body.content 
    }));
    console.log("new commentsList is",commentsList);
    return {
        "status":0,
        "message":"评论提交成功"
    }
});

/* 
    图片分类数据
    地址：/api/getimgcategory
    请求方式：get
    传入参数：null

*/
const {categoryList} = Mock.mock({
    "categoryList":[
        {
            "title":"家具生活",
            "id":1
        },
        {
            "title":"摄影设计",
            "id":2
        },
        {
            "title":"动物世界",
            "id":3
        },
        {
            "title":"名牌首饰",
            "id":4
        },
        {
            "title":"气质美女",
            "id":5
        },
        {
            "title":"美食天下",
            "id":6
        }
    ]
});

Mock.mock('/api/getimgcategory','get',()=>{
    return {
        "status":0,
        "message":categoryList
    }
});

/* 
    图片列表数据
    地址：/api/getimages/:cateid
    请求方式：get
    传入参数：cateid：图片的类别
*/
const {imgListId1} = Mock.mock({    //家具生活
    imgListId1:[
        {
            "id":50,
            "title":"简约而不简单的家具组图",
            "img_url":"http://img3.imgtn.bdimg.com/it/u=1953155236,1568453141&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":51,
            "title":"简约而不简单的家具组图",
            "img_url":"https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00090-3673.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":52,
            "title":"简约而不简单的家具组图",
            "img_url":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2988383541,3602583471&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        }
    ]
});
const {imgListId2} = Mock.mock({    //摄影设计
    imgListId2:[
        {
            "id":53,
            "title":"美丽又让人心动的风景图片",
            "img_url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=129886835,168975374&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":54,
            "title":"美丽又让人心动的风景图片",
            "img_url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3645979766,2965107351&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":55,
            "title":"美丽又让人心动的风景图片",
            "img_url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3395409954,3337140561&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        }
    ]
});
const {imgListId3} = Mock.mock({    //动物世界
    imgListId3:[
        {
            "id":56,
            "title":"可爱的阿猫阿狗们",
            "img_url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1255005059,794147214&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":57,
            "title":"可爱的阿猫阿狗们",
            "img_url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611130669,1309094896&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":58,
            "title":"可爱的阿猫阿狗们",
            "img_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1949634109,494152779&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        }
    ]
});
const {imgListId4} = Mock.mock({    //名牌首饰
    imgListId4:[
        {
            "id":59,
            "title":"名牌精美首饰，送给那个他",
            "img_url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2066293556,3575461759&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":60,
            "title":"名牌精美首饰，送给那个他",
            "img_url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1229926852,1902657111&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":61,
            "title":"名牌精美首饰，送给那个他",
            "img_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2003054938,1107075690&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        }
    ]
});
const {imgListId5} = Mock.mock({    //气质美女
    imgListId5:[
        {
            "id":62,
            "title":"有气质且带可爱的美女组图",
            "img_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3645759062,3377925210&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":63,
            "title":"有气质且带可爱的美女组图",
            "img_url":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2655406508,1191616699&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":64,
            "title":"有气质且带可爱的美女组图",
            "img_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3862621379,3037821585&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        }
    ]
});
const {imgListId6} = Mock.mock({    //美食天下
    imgListId6:[
        {
            "id":65,
            "title":"美食的诱惑，舌尖上的中国",
            "img_url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3267951934,2671466638&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":66,
            "title":"美食的诱惑，舌尖上的中国",
            "img_url":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3728416633,1212398771&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
        {
            "id":67,
            "title":"美食的诱惑，舌尖上的中国",
            "img_url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3308479371,4227752264&fm=26&gp=0.jpg",
            "zhaiyao":"@csentence(5,30)"
        },
    ]
});

Mock.mock(/\/api\/getimages/,'get',(options)=>{
    let categoryId=parseInt(getQuery(options.url,"id"));
    let sumData=[];
    switch (categoryId) {
        case 0:
            return {
                "status":0,
                "message":sumData.concat(imgListId1).concat(imgListId2).concat(imgListId3).concat(imgListId4).concat(imgListId5).concat(imgListId6)
            }
        case 1:
            return {
                "status":0,
                "message":imgListId1
            };
            break;
        case 2:
            return {
                "status":0,
                "message":imgListId2
            };
            break;
        case 3:
            return {
                "status":0,
                "message":imgListId3
            };
            break;
        case 4:
            return {
                "status":0,
                "message":imgListId4
            };
            break;
        case 5:
            return {
                "status":0,
                "message":imgListId5
            };
            break;
        case 6:
            return {
                "status":0,
                "message":imgListId6
            };
            break;
        default:
            return {
                "status":1,
                "message":"无数据"
            }
            break;
    }
});


/* 
    图片详情
    地址：/api/getimageInfo/:imgid
    请求方式：get
    传入参数：
        imgid：图片id
*/
const {imageInfo} = Mock.mock({
    imageInfo:[
        {
            id:50,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:51,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:52,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:53,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:54,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:55,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:56,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:57,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:58,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:59,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:60,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:61,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:62,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:63,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:64,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:65,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:66,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        },
        {
            id:67,
            title:"@ctitle",
            "click|0-9999":1,
            add_time:"@datetime()",
            content:"@cparagraph()"
        }
    ]
});
Mock.mock(/\/api\/getimageInfo/,'get',(options)=>{
    console.log("options",options);
    console.log(options.url);
    let imageId=getQuery(options.url,"id");
    console.log("imageid:",imageId);
    let newImageInfo={};
    for(var index in imageInfo){
        if(imageInfo[index].id===parseInt(imageId)){
            newImageInfo=imageInfo[index]
        }
    }
    
    return {
        status:0,
        message:newImageInfo
    }
})

/* 
    图片分享详情中的缩略图数组（商品详情页面中轮播图的API和缩略图共用一个）
    地址：/api/getthumimages/:imgid
    请求方式：get
    传入的参数：
        imgid：图片id
    
*/
const {thumimages} = Mock.mock({
    thumimages:[
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        },
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        },
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        },
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        },
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        },
        {
            src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1610479744,798048036&fm=26&gp=0.jpg"
        }
    ]
});
Mock.mock(/\/api\/getthumimages/,'get',()=>{
    // console.log(options.url);
    // let imageId=getQuery(options.url,"id");
    return {
        status:0,
        message:thumimages
    }
});
/* 
    商品展示
    地址：/api/getgoods?pageindex=number
    请求方式：get
    传入的参数：pageindex  页码
*/
const {goodsList} = Mock.mock({
    goodsList:[
        {
            id:80,
            title:"【24期免息】华为/HUAWEI P40 Pro | 5G徕卡四摄50倍变焦5g手机 智能手机 华为官方旗舰店",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw3.alicdn.com/bao/uploaded/i3/2838892713/O1CN01MDNY9X1Vub8559gdi_!!0-item_pic.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:81,
            title:"【最高降400+24期免息】Huawei/华为Mate30三摄超级快充4000万4G智能手机 mate30 华为官方旗舰店",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw3.alicdn.com/bao/uploaded/i3/2838892713/O1CN01LN1Sf71Vub89yUTL7_!!0-item_pic.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:82,
            title:"现货Huawei/华为 HUAWEI Mate Xs折叠屏手机保时捷5G手机XS二代",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw3.alicdn.com/bao/uploaded/i3/124015445/O1CN01s4EhSr1q5rASKVGL3_!!124015445.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:83,
            title:"华为荣耀X10手机 新品5g智能手机麒麟820",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//img.alicdn.com/img/i3/34403627/O1CN01JFRRxt1cfD8MOPBhh_!!0-saturn_solar.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:84,
            title:"honor/荣耀 荣耀10青春版 全网通4G全面屏麒麟处理器华为新品手机",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw1.alicdn.com/bao/uploaded/i3/3904764968/O1CN01bKUazN1mZOFv3NLwI_!!3904764968.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:85,
            title:"华为HONOR 荣耀9X PRO手机全网通升降式摄像头9x por",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw3.alicdn.com/bao/uploaded/i1/725677994/O1CN01vLE37w28vIkobCyU0_!!0-item_pic.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:86,
            title:"honor/荣耀 荣耀9i 全网通4G华为智能手机全面屏8X 9X 10青春20i",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw2.alicdn.com/bao/uploaded/i1/911781117/O1CN01gqtH3E1K7d0a91ecm_!!911781117.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:87,
            title:"【百亿补贴】正品速发  荣耀/华为Mate 30 (5G)麒麟990智能手机官方旗舰mate30pro P30畅享正品p40pro+定制",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw3.alicdn.com/bao/uploaded/i4/761647182/O1CN01h5e57v22vP94VqNYX_!!0-item_pic.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:88,
            title:"可减450元 华为荣耀30pro 官方旗舰店5G手机",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//img.alicdn.com/img/i4/42409979/O1CN01pMNI0u2NaQwLHoS9N_!!0-saturn_solar.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:89,
            title:"6期免息送扫地机华为HONOR 荣耀X105G版手机",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//img.alicdn.com/img/i1/26731697/O1CN012OP3RX1OPGjA9BMsi_!!0-saturn_solar.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        },
        {
            id:90,
            title:"honor/荣耀 荣耀9i 全网通4G华为智能手机全面屏8X 9X 10青春20i",
            add_time:"@datetime()",
            zhaiyao:"@cparagraph()",
            "click|0-9999":1,
            img_url:"//gw2.alicdn.com/bao/uploaded/i1/911781117/O1CN01gqtH3E1K7d0a91ecm_!!911781117.jpg_210x210.jpg",
            "sell_price|2000-5000":2400,
            "market_price|5000-6000":5400,
            "stock_quantity|50-500":200
        }
        
    ]
})

Mock.mock(/\/api\/getgoods/,'get',(options)=>{
    // console.log(options.url)
    let pageindex=getQuery(options.url,"pageIndex");
    let pageSize=4;
    let start=(pageindex-1)*pageSize;
    let end=pageindex*pageSize;
    let totlePages=Math.ceil(goodsList.length/pageSize);
    let list=pageindex>totlePages?[]:goodsList.slice(start,end);
    // console.log("list:",list)
    return {
        status:0,
        message:list
    }
});

/* 
    商品详情页中轮播图
    地址：/api/getGoodsLunbo/
    请求方式：get
    参数：null
*/
const {goodsLunbo} = Mock.mock({
    goodsLunbo:[
        {
            img_url:"//img.alicdn.com/imgextra/i2/2924891464/O1CN01XurUNy1MgYR7b9bA5_!!2924891464.jpg_1080x1800Q50s50.jpg_.webp"
        },
        {
            img_url:"//img.alicdn.com/imgextra/i4/2924891464/O1CN01WsZOrY1MgYR5ZBvQd_!!2924891464.jpg_1080x1800Q50s50.jpg_.webp"
        },
        {
            img_url:"//img.alicdn.com/imgextra/i1/2616970884/O1CN011m1vLd1IOuiK3q04g_!!0-item_pic.jpg_1080x1800Q50s50.jpg_.webp"
        },
        {
            img_url:"//img.alicdn.com/imgextra/i4/2616970884/O1CN011LWJkI1IOuiJKk7PI_!!2616970884.jpg_1080x1800Q50s50.jpg_.webp"
        }
    ]
});

Mock.mock('/api/getGoodsLunbo',()=>{
    return {
        status:0,
        message:goodsLunbo
    }
});

/* 
    获取商品参数区和价格，标题等数据
    地址：/api/goods/getinfo/:id
    请求方式：get
    传入参数：
        id：商品主键值
*/
const {goodsInfo}=Mock.mock({
    goodsInfo:[
        {
            id:80,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:81,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:82,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:83,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:84,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:85,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:86,
            "title":"@ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:87,
            "title":"ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:88,
            "title":"ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:89,
            "title":"ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
        {
            id:90,
            "title":"ctitle(10,20)",
            add_time:"@date(yyyy-MM-dd hh:mm:ss)",
            goods_no:"@id()",
            "stock_quantity|0-1000":20,
            "market_price|2000-5000":2400,
            "sell_price|1000-2000":1200
        },
    ]
});
Mock.mock(/\/api\/goods\/getinfo/,(options)=>{
    console.log("getgoodsinfo:",options.url)
    let id=getQuery(options.url,"id");
    let list=[];
    goodsInfo.forEach(item=>{
        if(item.id==id){
            list.push(item);
        }
    });
    console.log("list:",list)
    return {
        status:0,
        message:list
    }
});

/* 
    商品图文介绍
    地址：/api/goods/getdesc/:id
    请求方式：get
    传入参数：
        id：商品id

*/
const {goodsDesc} = Mock.mock({
    goodsDesc:[
        {
            title:"华为mate40 5G旗舰机",
            desc:"HUAWEI Mate 30 5G 全网通 8GB+128GB 麒麟990 4000万超感光徕卡三摄（亮黑色）全网通，麒麟990芯片配置，后置5000万像素",
            content:"<p><img src='//img.alicdn.com/imgextra/i2/95894621/O1CN01BCiw9M1k0SoLoou4t_!!95894621.jpg_640x0q80_.webp'/></p><p><img src='//img.alicdn.com/imgextra/i1/2215302589/O1CN01kJPaRs1Uzo19ZnBK0_!!2215302589.jpg_670x670Q90s50.jpg_.webp'/></p><p><img src='//img.alicdn.com/imgextra/i2/2215302589/O1CN011XxKaT1Uzo191WMYU_!!2215302589.jpg_670x670Q90s50.jpg_.webp'/></p><p><img src='//img.alicdn.com/imgextra/i3/2215302589/O1CN012ayNlo1Uzo1BQlBk8_!!2215302589.jpg_670x670Q90s50.jpg_.webp'/></p>"
        }
    ]
}); 
Mock.mock('/api/goods/getdesc',(options)=>{
    return {
        status:0,
        message:goodsDesc
    }
})
/* 
    获取购物车页面数据
    地址：/api/goods/getshopcarlist/:ids
    传入参数：
        ids：商品id字符串，多个id之间逗号分割
*/
const {shopcarList} = Mock.mock({
    shopcarList:[
        {
            cou:1,
            id:80,
            title:"华为荣耀10plus  128G 高配版",
            sell_price:2290,
            thumb_path:"//img.alicdn.com/img/i2/13022581/O1CN01nnMsdD1Uw8qTeXW1X_!!0-saturn_solar.jpg_210x210.jpg"
        },
        {
            cou:2,
            id:81,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:82,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:83,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:84,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:85,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:86,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:87,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:88,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:89,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        },
        {
            cou:1,
            id:90,
            title:"华为honor 荣耀play3e 移动联通",
            sell_price:2300,
            thumb_path:"//gw3.alicdn.com/bao/uploaded/i2/901409638/O1CN01xdp0Qx2L4Ft1jbb2F_!!0-item_pic.jpg_210x210.jpg"
        }
    ]
});
Mock.mock(/\/api\/goods\/getshopcarlist/,(options)=>{
    console.log('getshopcarlist:',options.url);
    console.log(getQuery(options.url,"ids"));
    let idsStr=getQuery(options.url,"ids");
    let newCartList=[];
    let idsArr=idsStr.split(',').map(Number);
    // console.log(idsArr);
    for(let i=0;i<idsArr.length;i++){
       shopcarList.forEach(item=>{
           if(item.id===idsArr[i]){
                newCartList.push(item);
           }
       }); 
    }
    // console.log("newCartList",newCartList)
    return {
        status:0,
        message:newCartList
    }
});
//根据url获取参数   /api/getnew?id=1
var getQuery=function(url,name){
    const index=url.indexOf('?');
    if(index!==-1){
        const queryStrArr=url.substr(index+1).split('&');
        for(var i=0;i<queryStrArr.length;i++){
            const itemArr=queryStrArr[i].split("=");
            if(itemArr[0]===name){
                return itemArr[1]
            }
        }
    }
    return null;
}