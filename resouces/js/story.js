
import { APILINKstory, APILINKchap } from "./api.js";
const url = new URL(location.href);
const storyId = url.searchParams.get("id");

function toChap(chapId) {
  let newUrl = "chap/chap.html?storyId=" + storyId + "&chapId=" + chapId;
  window.location.href = newUrl;
}
getAllChapByStoryId();
function getAllChapByStoryId() {
  $(".coverLoader").show();

  fetch(APILINKstory + "story/" + storyId)
    .then((res) => res.json())
    .then((dataStory) => {
      let val_story = dataStory[0];

      const container = document.getElementById("container");
      let div_new = "";
      let ho = "ho";
      div_new += `
    <div class="partStory">
    <div class="storyHead">
    <div class="imgStory" style=" background-image: url(${val_story.urlImage});">

    </div>
    <div class="titleAndBtnStory">
        <h1>${val_story.title}</h1>
            <button id="btnStoryReadStart" class="btnStoryReadStart" >Đọc từ đầu</button>
    </div>

</div>
<hr>
<div class="descriptionStory">
<p>${val_story.description}</p>
</div>
<hr>
<div class="showChapOfStory">
    `;
      fetch(APILINKchap + "chap/story/" + storyId)
        .then((res) => res.json())
        .then(function (data) {
          data.forEach((element) => {
            div_new += `
                <div class="oneChap">
               <p  dataId=${element.chapId}>${element.title}</p>
                </div>
            `;
          });
          div_new += `
        </div>
        </div>
        `;
          container.innerHTML += div_new;
          let btnStoryReadStart = document
            .getElementById("btnStoryReadStart")
            .addEventListener("click", () => {
              toChap(data[0].chapId);
            });
          $(".coverLoader").hide();
          pOneChapClick();
        });
    });
}
function pOneChapClick() {
  $(".oneChap p").on("click", function () {
    if ($(this).attr("dataId")) {
      toChap($(this).attr("dataId"));
    }
  });
}
