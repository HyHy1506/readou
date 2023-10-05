
import { APILINKstory, APILINKchap } from "./api.js";

let storyId;
let chapId;
let idForNewChap = 0;
let val_oneChap;
getQuerystring();
function getQuerystring() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == "storyId") {
      storyId = pair[1];
    }
    if (pair[0] == "chapId") {
      chapId = pair[1];
    }
  }
}
function toListChap() {
  let new_url = "listChap.html?id=" + storyId;
  window.location.href = new_url;
}
editChap();
function editChap() {
  //make part
  const divPart = document.getElementById("part");
  const divPartEditChap = document.createElement("div");
  const formPart = document.createElement("form");
  const btnSubmit = document.createElement("button");
  divPartEditChap.classList.add("partEditChap");
  formPart.setAttribute("id", "form");
  formPart.innerHTML = `
    <form id="form">
        <input type="text" name="image" placeholder="URL ảnh" id="urlImageID">
        <hr>
        <input id="titleId" type="text" name="title" placeholder="Tên chap" required>
        <textarea id="textChapId" name="" id="" cols="30" rows="30" placeholder="Kể câu chuyện của bạn" required></textarea>
       <button type="submit" class="button" ">Xong</button>
    </form>
`;

  divPartEditChap.appendChild(formPart);

  // get one chap
  fetch(APILINKchap + "chap/" + storyId + "_" + chapId)
    .then((res) => res.json())
    .then(function (dataOneChap) {
      fetch(APILINKchap + "chap/story/" + storyId)
        .then((res) => res.json())
        .then((dataToGetIdChap) => {
          // make id for new chap
          if (dataToGetIdChap.length > 0) {
            idForNewChap =
              dataToGetIdChap[parseInt(dataToGetIdChap.length) - 1].chapId + 1;
          } else {
            idForNewChap = 0;
          }
          console.log(idForNewChap);
          //load old data from server
          divPart.appendChild(divPartEditChap);
          const inputUrlImage = document.getElementById("urlImageID");
          const textareaTextChap = document.getElementById("textChapId");
          const inputTitle = document.getElementById("titleId");
          val_oneChap = dataOneChap[0];
          console.log(val_oneChap);
          if (chapId) {
            inputTitle.value = val_oneChap.title;
            inputUrlImage.value = val_oneChap.urlImage;
            textareaTextChap.innerHTML = val_oneChap.textChap.replace(/<br>/g,"\n");
          }
       $(".coverLoader").hide()
       $("form").submit(function (event) {
        event.preventDefault();
      });
      $("#form button").click(saveEditChap)
        });
    });
}


function saveEditChap() {
let titleId='titleId'
let urlImageID= 'urlImageID'
let textChapId='textChapId'
  let isNewData = true;
  // prevent load page

  // check data changed
  const title = document.getElementById(titleId).value;
  const urlImage = document.getElementById(urlImageID).value;
  const textChap1 = document.getElementById(textChapId).value;
  let textChap = textChap1.replace(/\n/g, "<br>");
  if (
    val_oneChap &&
    val_oneChap.title == title &&
    val_oneChap.urlImage == urlImage &&
    val_oneChap.textChap == textChap
  ) {
    isNewData = false;
    console.log("same old data");
  } else {
    isNewData = true;
    console.log("differ data");
  }
  if (title == "") {
    return;
  }
  $(".coverLoader").show()

  // if data changed and have chap id ,mean we edit a chap
  if (chapId && isNewData) {
    fetch(APILINKchap + "chap/edit/" + storyId + "_" + chapId, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storyId: storyId,
        chapId: chapId,
        title: title,
        urlImage: urlImage,
        textChap: textChap,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        $(".coverLoader").hide()


        while (res.status != "success");
        toListChap();
      });
  }
  // make new chap  
  else if (!chapId) {
    fetch(APILINKchap + "chap/new", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storyId: storyId,
        chapId: idForNewChap,
        title: title,
        urlImage: urlImage,
        textChap: textChap,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        $(".coverLoader").hide()

          
        while (res.status != "success");
        toListChap();
      });
  }
  // new data same old data
  else{
    toListChap();
  }
 
}
