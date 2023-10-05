let top=$('.top')
let iBackTop=$('<i>')
iBackTop.addClass("fa-solid fa-chevron-left backFromEdit") 
$('.top h1').remove()
top.prepend(iBackTop)
$(".top .backFromEdit").click(function(){
    if(window.location.pathname.endsWith("/newStory.html"))
    {
        window.location.href="/admin/addStory.html"

    }else  if(window.location.pathname.endsWith("/editStory.html"))
    {
        window.location.href="/admin/myStory.html"

    }else  if(window.location.pathname.endsWith("/editChap.html"))
    {
        let url=new URL(window.location.href)
        let storyId=url.searchParams.get('storyId')
       
        
        window.location.href="/admin/listChap.html?id="+storyId

    }
})