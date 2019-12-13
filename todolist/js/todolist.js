$(function() {
    //要将页面中的数据放入本地存储中
    //回车键(13) 利用事件对象.keyCode判断
    //存储数据格式 var todolist = [{title:"xxx", done:false}]
    //页面加载就load一次
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert('请输入您要的操作')
            } else {
                //先读取本地原来存储的数据
                var local = getData();
                //把最新的数据追加给local
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                //将todolist本地存储数据渲染加载到页面中
                load();
                //回车后清空input
                $(this).val("");
            };
        }
    });
    //todolist删除模块
    //因为li里的a是动态生成的 所以使用on 绑定 事件委托
    $("ol,ul").on("click", "a", function() {
        //1、获取本地存储 2、修改数据 3、保存到本地存储 4、重新渲染页面
        //1
        var data = getData();
        //2
        // ele.attr();获取自定义属性
        var index = $(this).attr("id");
        data.splice(index, 1);
        //3
        saveData(data);
        //4
        load();
    });
    //读取本地存储数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            //本地存储里面的格式是字符串格式 我们需要对象格式 所以进行转换
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // todolist正在进行和已完成选项模块
    $("ol,ul").on("click", "input", function() {
        //先获取本地存储的数据 后修改数据 保存到本地 重新渲染页面
        var data = getData();
        //自定义属性获取 ele.attr(),固有属性获取 ele.prop();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        //保存到本地
        saveData(data);
        load();
    });
    //保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };
    //渲染加载数据
    function load() {
        //读取本地数据
        var data = getData();
        //遍历数据
        //遍历之前都要清空ol中的内容
        $("ol").empty();
        $("ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //放入ul和放入ol判断 依据：data[index].done
        $.each(data, function(i, n) {
            //把数据放在P里 i是索引号，n是其中的对象
            //并且将a带有相应索引号的id
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked ='checked'><p>" + n.title + "</p><a href ='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href ='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            };

        });
        //正在进行和已完成事件个数模块 遍历完 done/todoCount计算完毕后生成
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    };
})