//时间转化
function changtime(time) {
    var fen = Math.floor(time / 60);
    time %= 60
    var miao = parseInt(time);
    if (fen < 10) {
        fen = "0" + fen;
    }
    if (miao < 10) {
        miao = "0" + miao;
    }
    var t = fen + ":" + miao;
    return t;
}
//停止播放按钮
var play = $(".play");
//停止播放改数据
play.click(function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    return false;
})
//改页面
audio.onplay = function () {
    play.addClass("stop");
}
audio.onpause = function () {
    play.removeClass("stop");
}
//音乐播放结束后
audio.onended = function () {
    alert("播放完毕!");
}
//音量和播放进度的拖拽,用的面向对象的方式
var tiao = new Drag($("#tiao1 i"));
tiao.drag();
var vole = new Drag($("#vole1 i"));
vole.drag();
//播放进度的点击
var tw = $(".tiao").width();
var tiao = $("#tiao1");
$(".tiao").click(function (e) {
    if ($(e.target).is("i") || $(e.target).is("span")) {
        return;
    }
    var tleft = e.offsetX;
    audio.currentTime = tleft / tw * audio.duration;
    //tiao.width(tleft);
})
//音乐控制播放进度
audio.ontimeupdate = function () {
    var per = audio.currentTime / audio.duration;
    tiao.width(tw * per);
}
//音量的点击
var volume=audio.volume;
var vw = $(".vole").width();
var vole = $("#vole1");
var vol = $(".vol");
$(".vole").click(function (e) {
    if ($(e.target).is("i") || $(e.target).is("span")) {
        return;
    }
    var vleft = e.offsetX;
    audio.volume = (vleft / vw).toFixed(2);
    //vole.width(vleft);
})
//音量控制音量条
audio.onvolumechange = function () {
    var per = audio.volume;
    vole.width(vw * per);
    if (per == 0) {
        vol.addClass("mute");
    } else {
        vol.removeClass("mute");
        volume=audio.volume;
    }
}
//静音
$(".vol").click(function () {
    console.log(volume);
    if ($(this).hasClass("mute")) {
        audio.volume = volume;
    } else {
        audio.volume = 0;
    }
})
console.log(volume);