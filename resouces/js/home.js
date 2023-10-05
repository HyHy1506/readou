import { APILINKstory, APILINKchap } from "./api.js";

function toStory(storyId)
{

    
    let newUrl="/story/story.html?id="+storyId
    window.location.href=newUrl;
}
getAllStory()
function getAllStory()
{
    const container=document.getElementById("container")
    let div_new=""

    fetch(APILINKstory+"story").then(res=>res.json()).then(function(data){
        data.forEach(element => {


            
            let stylePart=""
            
            
                 stylePart+=
                 `style="
                height: 200px;
                min-width: 130px;
                border-radius: 10px;
                 background-image: url(${element.urlImage});
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border: 1px solid black;
                box-shadow: 5px 5px 5px rgba(100, 100, 100, 0.459);
                margin-right: 20px;
                
                 "
                 `
            
            div_new+=`<div class="partHome"   >`
            div_new+=
            `
                <div class="imgHome" ${stylePart}  dataId=${element.storyId}></div>
                <div class="titAndDes">
                <h4 class="titleHome"  dataId=${element.storyId}>${element.title}</h4>
                <p class="descriptionHome">${element.description}</p>
                <p id="${element.storyId}"  class="infoStory"></p>
                </div>
                </div>
            
            `
            
        });
        container.innerHTML=div_new
      
       $(".coverLoader").hide()
       clickImgHome()
        clickH4titleHome()

    })
}
function clickImgHome()
{
    $('.imgHome').on('click',function(){
       toStory($(this).attr('dataId'))
    })
}
function clickH4titleHome()
{
    $('.titleHome').on('click',function(){
        toStory($(this).attr('dataId'))
     })
}