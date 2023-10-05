import { APILINKstory, APILINKchap } from "./api.js";

const url = new URL(location.href);
const storyId = url.searchParams.get("id");
let chapId;
document.querySelector(".coverAlertMore").style.display = "none";

$(window).ready(() => {
  $(".coverAlertMore").hide();

  $(".btnDelete").click(() => {
    deleteOneChap();
  });

  $(".btnCancel").click(() => {
    $(".coverAlertMore").toggle();
    $(".alertMore").toggleClass("animate-down");
  });
  $(".fa-xmark").click(() => {
    $(".coverAlertMore").toggle();
    $(".alertMore").toggleClass("animate-down");
  });
  $(".btnListChapforNewPart").click(() => {
    toEditChap("");
  });

  let urlGetChaps = APILINKchap + "chap/story/" + storyId;
  $.ajax({
    url: urlGetChaps,
    method: "GET",
    dataType: "json",
    success: (res) => {
      res.forEach((element) => {
        const divPartListChap = $("<div>");
        const h3PartListChap = $("<h3>");
        const iPartListChap = $("<i>");
        divPartListChap.addClass("partListChap");
        h3PartListChap.html(element.title);
        h3PartListChap.attr("dataId", `${element.chapId}`);
        iPartListChap.addClass("fa-solid fa-eraser");
        iPartListChap.attr("dataId_title", `${element.title}`);
        iPartListChap.attr("dataId_cId", `${element.chapId}`);

        divPartListChap.append(h3PartListChap, iPartListChap);
        $(".container").append(divPartListChap);
      });
      callAlertMore();
      $(".coverLoader").hide();
      clickH3PartListChap();
      clickIPartListChap();
    },
  });
});

function deleteOneChap() {
  $(".coverLoader").fadeIn(1000);

  let urlDelete = APILINKchap + "chap/edit/" + storyId + "_" + chapId;
  $.ajax({
    url: urlDelete,
    method: "DELETE",
    dataType: "json",
    success: (status) => {
      console.log(status);
      if (status.status == "success") {
        $(".coverLoader").fadeOut(1000);

        location.reload();
      }
    },
  });
}
function changeTitleAlertMore(tit, cId) {
  $(".alertMore p").text(tit);
  chapId = cId;
}
function toEditChap(cId) {
  let new_url = "editChap.html?chapId=" + cId + "&storyId=" + storyId;
  window.location.href = new_url;
}
function callAlertMore() {
  $(".fa-eraser").click(() => {
    console.log("click");
    $(".coverAlertMore").toggle();

    $(".alertMore").toggleClass("animate-down");
  });
}

function clickH3PartListChap() {
  $(".partListChap h3").on("click", function () {
    if ($(this).attr("dataId")) {
      toEditChap($(this).attr("dataId"));
    }
  });
}
function clickIPartListChap() {
  $(".partListChap i").on("click", function () {
    if ($(this).attr("dataId_title") && $(this).attr("dataid_cid")) {
      changeTitleAlertMore(
        $(this).attr("dataId_title"),
        $(this).attr("dataid_cid")
      );
    }
  });
}
