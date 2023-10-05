import { APILINKstory, APILINKchap } from "./api.js";


let divDirect = $("<div>");
let directPAddStory = $("<p>");
let directInterup = $("<i>");
let directPListStorys = $("<p>");
let directPListChaps = $("<p>");
let directInterup2 = $("<i>");

directPListChaps.addClass("pDirectListChap")
directPListStorys.text("Danh sách truyện");
directPAddStory.text("Thêm");
divDirect.addClass("directAdd");
directInterup.addClass("fa-solid fa-slash");
directInterup2.addClass("fa-solid fa-slash");

let pathName = window.location.pathname;
if (pathName.endsWith("/addStory.html")) {
  divDirect.append(directPAddStory,directInterup);
}
if (pathName.endsWith("/myStory.html")) {
  divDirect.append(directPAddStory, directInterup, directPListStorys);
}

if (pathName.endsWith("/listChap.html")) {
  divDirect.append(
    directPAddStory,
    directInterup,
    directPListStorys,
    directInterup2,
    directPListChaps
  );
  let url=new URL(window.location.href)
  let storyId=url.searchParams.get('id')
  let urlStory = APILINKstory + "story/"+storyId;
  $.ajax({
    url: urlStory,
    method: "GET",
    dataType: "json",
    success: (dataOneStory) => {
        directPListChaps.text(dataOneStory[0].title)
    }})
    directPListChaps.click(function(){
        window.location.href="/story/story.html?id="+storyId
    })
}
$(".container").prepend(divDirect);
directPAddStory.click(function(){
    window.location.href="addStory.html"
})
directPListStorys.click(function(){
    window.location.href="myStory.html"
})

