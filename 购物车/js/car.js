$(function() {
    //全选,全不选模块
    //把全选按钮checkall的状态复制给3个小checkbox按钮j-checkbox
    //事件使用change 
    //添加背景
    $(".checkall").change(function() {
        //状态:$(this).prop("checked");
        var flag = $(this).prop("checked");
        //上下全选按钮都需要一同赋值,使用并集选择器$("   ,   ")
        $(".j-checkbox, .checkall").prop("checked", flag);
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        };
    });
    //三个小按钮都被选上了，则全选勾上(小复选框被选中的个数=3)
    $(".j-checkbox").change(function() {
        // if (被选中的小复选框个数===3) {
        //     选中全选框
        // } else {
        //     不选中全选框
        // }
        //$(".j-checkbox:checked").length =小复选框被选中个数
        // $(".j-checkbox").length是所有小复选框の个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        };
        //添加bg
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        };

    });
    //增减商品数量模块，申明一个变量 当点击+(increment),让变量++，再赋值给文本框,计算小计
    $(".increment").click(function() {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        //var p = $(this).parent().parent().siblings(".p-price").text();做出的p是带¥的 所以使用 substr(1)截取
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //element.toFixed(2) 保留两位小数
        var price = (p * n).toFixed(2);

        $(this).parents(".p-num").siblings(".p-sum").html('¥' + price);
        getSum();
    });
    //减号模块
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        //如果数量=1则不允许再减
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //element.toFixed(2) 保留两位小数
        var price = (p * n).toFixed(2);

        $(this).parents(".p-num").siblings(".p-sum").html('¥' + price);
        getSum();
    });
    //修改文本框值改变sum
    $(".itxt").change(function() {
        var n = $(this).val();
        //p=当前商品单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html('¥' + price);
        getSum();
    });
    //总额模块
    //打开页面先调用一次
    getSum();
    //change以及click事件都会影响Sum,所以封装sum函数
    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价格
        //计算总件数
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        //计算总价格
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
            //money保留两位小数
        });
        money = money.toFixed(2);
        $(".price-sum em").text("¥" + money);
    };
    //删除商品模块
    //删除商品后面的删除按钮
    $(".p-action a").click(function() {
        //删除当前商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中的商品
    $(".remove-batch").click(function() {
        //选中所有被checked复选框
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //清空购物出，删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });



})