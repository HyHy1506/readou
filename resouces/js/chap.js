// const APILINKchap = "http://localhost:8000/api/v1/chaps/";
// const APILINKstory = "http://localhost:8000/api/v1/storys/";
import { APILINKstory, APILINKchap } from "./api.js";
var storyId;
var chapId;

getId();
function getId() {
  let queryParam = location.search.substring(1);
  let arr = queryParam.split("&");

  for (let i = 0; i < arr.length; i++) {
    let pair = arr[i].split("=");
    if (pair[0] == "storyId") {
      storyId = pair[1];
    }
    if (pair[0] == "chapId") {
      chapId = pair[1];
    }
  }
}

const container = document.getElementById("container");
const divChapterNavigation = document.querySelector(".chapterNavigation");
const divShowTextLi = document.querySelector(".showTextLi");
const ul_navi_chaps = document.querySelector(".ul_navi_chaps");
const pOfshowTextLi = document.createElement("p");
const pElement = document.querySelector(".pTitle");
const liEvent = document.querySelectorAll("li");
const divPart = document.querySelector(".part");
ul_navi_chaps.style.display = "none";

getContentChap();
function getContentChap() {
  fetch(APILINKchap + "chap/" + storyId + "_" + chapId) //get one chap
    .then((res) => res.json())
    .then((dataOneChap) => {
      const val_oneChap = dataOneChap[0];
      let contentNextChap;
      pElement.innerHTML = val_oneChap.title;
      fetch(APILINKchap + "chap/story/" + storyId) // get all chaps of storyid
        .then((res) => res.json())
        .then((dataLiChaps) => {
          // make list chap

          for (let i = 0; i < dataLiChaps.length; i++) {
            const liOfUlNavi = document.createElement("li");
            liOfUlNavi.innerHTML = dataLiChaps[i].title;
            onClickLi(liOfUlNavi);
            closeNavi();
            if (val_oneChap.chapId == dataLiChaps[i].chapId) {
              liOfUlNavi.setAttribute("id", "liChosen");
              contentNextChap = dataLiChaps[i + 1];
            } else {
              liOfUlNavi.setAttribute("dataId", dataLiChaps[i].chapId);
            }
            ul_navi_chaps.insertAdjacentElement("beforeend", liOfUlNavi);
          }

          // make comeStory
          fetch(APILINKstory + "story/" + storyId) // get all chaps of storyid
            .then((res) => res.json())
            .then((dataOneStory) => {
              let pComeStoryChap = $("<p>");
              console.log(dataOneStory);
              pComeStoryChap.html(dataOneStory[0].title);
              pComeStoryChap.attr("dataId", storyId);
              $(".comeStory").append(pComeStoryChap);
              clickPComeStoryChap();
            });
          // make part
          console.log(divPart);
          const hPart = document.createElement("h3");
          const divCoverImageChap = document.createElement("div");
          const divImageChap = document.createElement("div");
          const pPart = document.createElement("p");

          hPart.textContent = val_oneChap.title;
          divCoverImageChap.classList.add("coverImageChap");
          divImageChap.classList.add("imageChap");
          divImageChap.style.backgroundImage = `url(${val_oneChap.urlImage})`;
          divCoverImageChap.appendChild(divImageChap);
          pPart.innerHTML = val_oneChap.textChap;
          divPart.insertAdjacentElement("beforeend", hPart);
          if (val_oneChap.urlImage != "") {
            divPart.insertAdjacentElement("beforeend", divCoverImageChap);
          }
          divPart.insertAdjacentElement("beforeend", pPart);
          //make button
          const divBtnNextChap = document.createElement("div");
          const btnNextChap = document.createElement("button");
          if (contentNextChap) {
            btnNextChap.setAttribute(
              "dataId",
              `${contentNextChap.chapId}`
            );
          }

          btnNextChap.innerHTML = "Phần tiếp theo";
          divBtnNextChap.classList.add("btnNextChap");
          if (contentNextChap) {
            divBtnNextChap.appendChild(btnNextChap);
          } else {
            const h3Done = document.createElement("h3");
            h3Done.textContent = "Bạn đã hoàn thành bộ truyện";
            divBtnNextChap.appendChild(h3Done);
          }
          container.insertAdjacentElement("beforeend", divBtnNextChap);
          $(".coverLoader").hide();
          clickliOfUlNavi();
 clickBtnNextChap() 

        });
    });
}
//close navi
function closeNavi() {
  document.addEventListener("click", (event) => {
    if (
      !event.target.isEqualNode(divShowTextLi) &&
      !event.target.isEqualNode(ul_navi_chaps) &&
      !divChapterNavigation.contains(event.target)
    ) {
      ul_navi_chaps.style.display = "none";
    }
  });
}

// chose one li
divShowTextLi.addEventListener("click", () => {
  if (
    ul_navi_chaps.style.display == "none" ||
    ul_navi_chaps.style.display == ""
  ) {
    console.log(ul_navi_chaps);
    ul_navi_chaps.style.display = "block";
  } else {
    ul_navi_chaps.style.display = "none";
  }
  liEvent.forEach((element) => {
    onClickLi(element);
  });
});
function toChap(idOfChap) {
  window.location.href = `chap.html?storyId=${storyId}&chapId=${idOfChap}`;
}
function onClickLi(element) {
  element.addEventListener("click", () => {
    pElement.innerHTML = element.textContent;
    ul_navi_chaps.style.display = "none";
  });
}
const toStory = (sId) => {
  window.location.href = "/story/story.html?id=" + sId;
};
function clickliOfUlNavi() {
  $(".ul_navi_chaps li").on("click", function () {
    if ($(this).attr("dataId")) {
      toChap($(this).attr("dataId"));
    }
  });
}
function clickPComeStoryChap() {
  $(".comeStory p").on("click", function () {
    if ($(this).attr("dataId")) {
      toStory($(this).attr("dataId"));
    }
  });
}
function clickBtnNextChap() {
  $(".btnNextChap button").on("click", function () {
    if ($(this).attr("dataId")) {
      toChap($(this).attr("dataId"));
    }
  });
}