/**
 * Created by Administrator on 2017/7/12.
 */
$(document).ready(function () {

    $("html").niceScroll();
    marked.setOptions({
        gfm: true
    });
    var pagename = "";
    //var pagename = GetQueryString("page") ? GetQueryString("page") : "" ;
    $.ajax({
        url: "news/newsList.md",
        success: function (data) {
            $(".markdown-list-body,.markdown-list-more-show").html(marked(data));
            //$(".markdown-list-body a").attr("target","#markdown-content-body");
            $(".markdown-list-body a,.markdown-list-more-show a").click(function(){
                pagename = $(this).attr("href").replace("#","");
                $.ajax({
                    url: "news/"+pagename+".md",
                    success: function (data2) {
                        $(".markdown-content-body").html(marked(data2));
                        $(".markdown-content-body a").attr("target","_blank");
                    }
                });
            });
            $(".markdown-list-more-show a").click(function(){
                $(".markdown-list-more-body").removeClass("show").addClass("hide");
            });
        }
    });

    if(!pagename){
        pagename = "2017-02-09";
    }
    $.ajax({
        url: "news/"+pagename+".md",
        success: function (data2) {
            $(".markdown-content-body").html(marked(data2));
            $(".markdown-content-body a").attr("target","_blank");
        }
    });

    $("#news-edit-link").attr("href","https://github.com/jusfoun-FE/jusfoun-FE.github.io/blob/master/news/"+pagename+".md");

    $(".markdown-list-more-btn").click(function(){
        $(".markdown-list-more-body").removeClass("hide").addClass("show");
    });

    $(".markdown-list-more-close-btn").click(function(){
        $(this).parent().removeClass("show").addClass("hide");
    });
});

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
