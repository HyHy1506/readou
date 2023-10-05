// const APILINK = 'https://voluminousdistantsubweb.ductran81.repl.co/api/v1/storys/story';
const APILINK="http://localhost:8000/api/v1/storys/story"


function getAllStory()
{
   
   return fetch(APILINK).then(res=>res.json())
}

export {getAllStory};