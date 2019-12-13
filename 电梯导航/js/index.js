$(function() {
    //显示隐藏电梯
    //刷新页面时也进行一次判断,并非滚动时才判断
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    };
    toggleTool();
    //当点击小li的时候 无需执行页面滚动中给li添加current的操作
    //节流阀 互斥锁 
    var flag = true;
    $(window).scroll(function() {
        toggleTool();
        //页面滚动到某内容区域 电梯current类切换
        //节流阀操作↓↓↓↓↓↓↓↓↓↓↓↓
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
                    flag = true;
                }
            });
        }
    });
    //点击电梯导航页面滚动到相应区域
    $(".fixedtool li").click(function() {
        //选出对应索引号的盒子 他的offset().top
        //节流阀
        flag = false;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //页面动画滚动效果
        $("body,html").stop().animate({
            scrollTop: current,
        });
        //添加current红色bg效果
        $(this).addClass("current").siblings("li").removeClass("current");
    });
})