import { APILINKstory, APILINKchap } from "./api.js";

document.querySelector(".coverAlertMore").style.display = "none";
let storyIdDelete;
let titleChange
let idChange
let allStory
$(window).ready(() => {
  $(".coverAlertMore").hide();

  $(".btnDelete").click(() => {
    deleteOneStory();
  });

  $(".btnCancel").click(() => {
    $(".coverAlertMore").toggle();
    $(".alertMore").toggleClass("animate-down");
  });
  $(".fa-xmark").click(() => {
    $(".coverAlertMore").toggle();
    $(".alertMore").toggleClass("animate-down");
  });

  let urlStory = APILINKstory + "story";
  $.ajax({
    url: urlStory,
    method: "GET",
    dataType: "json",
    success: (dataAllStorys) => {
      allStory=dataAllStorys
      dataAllStorys.forEach((element) => {
        const divPartMyStory = $("<div>");
        const divInfoOneMystory = $("<div>");
        const divImgMystory = $("<div>");
        const h3InfoOneMystory = $("<h3>");

        const iPartMyStory = $("<i>");
        divPartMyStory.addClass("partMyStory");
        divInfoOneMystory.addClass("infoOneMystory");
        divImgMystory.addClass("imgMystory");
        divImgMystory.css({ backgroundImage: `url(${element.urlImage})` });
        h3InfoOneMystory.text(element.title);
        h3InfoOneMystory.attr("dataid", `${element.storyId}`);
      
        let divMoreContainer=$("<div>")
        let ulMore=$("<ul>")
        let liMoreDele=$("<li>")
        let liMoreEdit=$("<li>")
        let iMoreDele=$("<i>")
        let iMoreEdit=$("<i>")
        divMoreContainer.addClass("moreOneMyStory")
        iMoreDele.addClass("fa-solid fa-trash")
        iMoreEdit.addClass("fa-solid fa-pen-to-square")
        iPartMyStory.addClass("fa-solid fa-caret-down");
        liMoreEdit.append("Chỉnh sửa",iMoreEdit)
        liMoreEdit.addClass("liMoreEdit")
        liMoreDele.append("Xóa",iMoreDele)
        liMoreDele.addClass("liMoreDele")
        liMoreEdit.attr("dataid",`${element.storyId}`)
        
        ulMore.attr("id",`ulMore${element.storyId}`)
        ulMore.addClass("ulMoreMyStory")
        ulMore.append(liMoreEdit  ,liMoreDele)
        ulMore.hide()
        divMoreContainer.append(iPartMyStory,ulMore)
        liMoreDele.attr(
          "dataid",
          `${element.storyId}`
        );
    
        divInfoOneMystory.append(divImgMystory, h3InfoOneMystory);
        divPartMyStory.append(divInfoOneMystory, divMoreContainer);
        $(".container").append(divPartMyStory);
    
        iPartMyStory.attr("dataid",`${ulMore.prop("id")}`)
       
        $(".coverLoader").hide()
      
      });
      // open alert delete story

      callAlertMore();
      closeMore()
      clickH3InfoOneMystory()
      clickLiMoreEdit()
      clickIPartMyStory()
      clickLiMoreDele()

    },
  });
});
function deleteAllChapsOfStory() {
  let urlDelete = APILINKchap + "chap/deleteOfStory/" + storyIdDelete;

  $.ajax({
    url: urlDelete,
    method: "DELETE",
    dataType: "json",
    success: (status) => {
      console.log(status);
      if (status.status == "success") {
        $(".coverLoader").hide()


        location.reload();
        
      }
    },
  });
}
function deleteOneStory() {
  $(".coverLoader").show()

  let urlDelete = APILINKstory + storyIdDelete;
  $.ajax({
    url: urlDelete,
    method: "DELETE",
    dataType: "json",
    success: (status) => {
      console.log(status);
      if (status.status == "success") {
        deleteAllChapsOfStory();
      }
    },
  });
}
function changeTitleAlertMore(storyId) {
  storyIdDelete = storyId;
  allStory.forEach((element)=>{
    if(element.storyId==storyIdDelete)
    {
      $(".alertMore p").text(element.title);
    }
  })
  console.log(storyIdDelete);
 

}
function toAddChap(storyId) {
  
  let new_url = "listChap.html?id=" + storyId;
  window.location.href = new_url;
}
function toEditStory(storyId) {
  
  let new_url = "editStory.html?id=" + storyId;
  window.location.href = new_url;
}
function callAlertMore() {
  $(".liMoreDele").click(() => {
   
    $(".coverAlertMore").toggle();

    $(".alertMore").toggleClass("animate-down");
  });
}
const clickMore = (ulId) => {
        let allU=$(".ulMoreMyStory")
        allU.each((index,element)=>{
          if($(element).attr("id")!=ulId)
          {
            $(element).hide()
          }
        })
  let id="#"+ulId
  $(id).toggle()
}
const closeMore=()=>{
  $(document).click((event)=>{
    if(!$(event.target).is(".ulMoreMyStory")
    &&!$(event.target).is(".fa-caret-down")
    &&!$(".ulMoreMyStory").has(event.target).length)
  {
    $(".ulMoreMyStory").hide()
  }

  })
}
function clickH3InfoOneMystory(){
  $('.infoOneMystory h3').on('click',function(){
    if($(this).attr('dataid'))
    {
      toAddChap($(this).attr('dataid'))
    }
  })

}
function clickLiMoreEdit(){
  $('.moreOneMyStory .ulMoreMyStory .liMoreEdit').on('click',function(){
    if($(this).attr('dataid'))
    {
      toEditStory($(this).attr('dataid'))
    }
  })

}
function clickIPartMyStory(){
  $('.moreOneMyStory .fa-caret-down').on('click',function(){
    if($(this).attr('dataid'))
    {
      clickMore($(this).attr('dataid'))
    }
  })

}
function clickLiMoreDele(){
  $('.moreOneMyStory .ulMoreMyStory .liMoreDele').on('click',function(){
    if($(this).attr('dataid'))
    {
      changeTitleAlertMore($(this).attr('dataid'))
    }
  })

}