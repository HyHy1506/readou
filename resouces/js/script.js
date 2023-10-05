import { APILINKstory,APILINKchap } from "./api.js";

var isHoveredLiSearch = false;
function toLogin() {
  window.location.href = "/admin/login.html";
}
function toHome() {
  window.location.href = "/";
}
//Head
const head = document.querySelector(".top");
const h1Head = document.createElement("h1");
const iTotUser = document.createElement("i");
const iTotSearch = document.createElement("i");
const formSearch = document.createElement("form");
const inputSearch = document.createElement("input");
inputSearch.setAttribute("placeholder", "Tìm Kiếm ...");
inputSearch.setAttribute("type", "search");
inputSearch.setAttribute("name", "valueSearch");
inputSearch.setAttribute("autocomplete","off")
inputSearch.classList.add("inputSearch");
formSearch.style.display = "none";
formSearch.classList.add("formSearch");
formSearch.appendChild(inputSearch);
h1Head.textContent = "Readou";
iTotUser.classList.add("fa-solid", "fa-arrow-up-from-bracket");
iTotSearch.classList.add("fa-solid", "fa-magnifying-glass");
head.insertAdjacentElement("beforeend", h1Head);
head.insertAdjacentElement("beforeend", iTotUser);
head.insertAdjacentElement("beforeend", iTotSearch);
head.insertAdjacentElement("beforeend", formSearch);
LargeScreen();

$(window).on("resize", () => {
  LargeScreen();
});

//bot
const bot = document.querySelector(".bot");
const h1Bot = document.createElement("h1");
const h4Bot = document.createElement("h4");
const pBot = document.createElement("p");
h1Bot.textContent = "Readou";
h4Bot.textContent = "Emai: xuanduc11062004@gmail.com";
pBot.textContent = `Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. 
Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào 
trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào. 
Khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.`;
bot.insertAdjacentElement("beforeend", h1Bot);
bot.insertAdjacentElement("beforeend", h4Bot);
bot.insertAdjacentElement("beforeend", pBot);
let divLoad = document.createElement("div");
divLoad.classList.add("coverLoader");
divLoad.innerHTML = `
                <div class="loader"></div>
`;
document.querySelector("body").insertAdjacentElement("afterbegin", divLoad);
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector(".coverLoader").style.visibility = "visible";
  }


};
function toggleSearch() {
  $(".formSearch").toggle();
  console.log('nho')

}
function startSearch() {
  console.log("search");
}
function LargeScreen() {
  if ($(window).width() >= 800) {
    $(".formSearch").show();
  } 
  $(".fa-magnifying-glass").click(() => {
    if ($(window).width() >= 800) {
      startSearch();
    } else {
      toggleSearch();
    }
  });
}

getAllDataToSearch();

function getAllDataToSearch() {
  let urlGetAllDataToSearch = APILINKstory + "story";
  $.ajax({
    url: urlGetAllDataToSearch,
    method: "GET",
    dataType: "json",
    success: (dataAllStory) => {
      let divCoverSearchUl = $("<div>");
      let ulSearchResult = $("<ul>");
      divCoverSearchUl.addClass("divCoverSearchUl");

      dataAllStory.forEach((element) => {
        let liSearchResult = $("<li>");
        liSearchResult.attr("id",element.storyId)
        liSearchResult.html(element.title);
        ulSearchResult.append(liSearchResult);
      });
      ulSearchResult.hide()
      divCoverSearchUl.html(ulSearchResult);
    
      $(".formSearch").append(divCoverSearchUl);
  
      
      
      $('.inputSearch').keyup(()=>{
        let valSearch=$('.inputSearch').val().toUpperCase()
        let allLiResult=$('.divCoverSearchUl ul li')
        allLiResult.each(function(){
          let match=$(this).text().toUpperCase()
          if(match.indexOf(valSearch)>-1)
          {
            $(this).show()
          }else{
            $(this).hide()

          }
        })
      })
      liHover()
      liClick()

    },
  });
}

$('.inputSearch').focus(function(){
  $(".divCoverSearchUl ul").show()
})
$('.inputSearch').blur(function(){

  if(isHoveredLiSearch)
  {
  $(".divCoverSearchUl ul").show()

  }else{
  $(".divCoverSearchUl ul").hide()

  }
})

function liHover(){
  $('.divCoverSearchUl ul li').on('mouseenter', function () {
    isHoveredLiSearch = true;
  
  }).on('mouseleave', function () {
    isHoveredLiSearch = false;
  
  });
}
function liClick(){
  $(' .divCoverSearchUl ul li').on('click', function () {
    toStory($(this).attr('id'))
    
  });
}
function toStory(sId)
{
  window.location.href='/story/story.html?id='+sId
}
$('.formSearch').on('submit',function(event){
toHome()
})
$('.top h1').click(function(){
  toHome()
})
$('.fa-arrow-up-from-bracket').click(function(){
  toLogin()
})