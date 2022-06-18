$(() => {
    $("#watch").hide()

    window.addEventListener("message", function (event) {
        if (event.data.watch != undefined) {
            let status = event.data.watch
            if (status) {
                $("#watch").show(100)
                $(".time").show(100)
                //
                $("#passaport").hide();
                $("#music").hide();
                $("#gps").hide();
                $("#settings").hide();
            } else {
                $("#watch").hide(100)
                $("#content").hide();
                $(".time").hide()
            }
        }

        /* TIME */
        $(".time").html(+event.data.hour + "<p>" + event.data.minute);

        /* TITLE */
        $(".timev2").html(+event.data.hour + ":" + event.data.minute);

        /* ACTIVITY */
        $("#life").html("");
        var life = new ProgressBar.Circle('#life', {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#FD08AB',
            trailColor: '#340914',
            trailWidth: 1,
            svgStyle: null
        });
        life.animate(event.data.life / 100);

        $("#hunger").html("");
        var hunger = new ProgressBar.Circle('#hunger', {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#9BFF04',
            trailColor: '#2C4204',
            trailWidth: 1,
            svgStyle: null
        });
        hunger.animate(event.data.hunger);


        $("#thirst").html("");
        var thirst = new ProgressBar.Circle('#thirst', {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#1AD5DE',
            trailColor: '#133D3C',
            trailWidth: 1,
            svgStyle: null
        });
        thirst.animate(event.data.thirst);

        /* PASSAPORT */
        $("#li1").html("<i class='fas fa-user'></i> " + event.data.name + " " + event.data.firsname + "</li>");
        $("#li2").html("<i class='fas fa-id-card-alt'></i> ID: " + event.data.user_id + "</li>");
        $("#li3").html("<i class='far fa-id-card'></i> " + event.data.registration + "</li>");
        $("#li4").html("<i class='fas fa-briefcase'></i> " + event.data.job + "</li>");
        $("#li5").html("<i class='fas fa-car'></i> " + event.data.cnh + "</li>");
        $("#li6").html("<i class='fas fa-mobile-alt'></i> " + event.data.phone + "</li>");

        /* MUSIC */
        getTime(event.data.total, event.data.played);
    })
})

function time() {
    $(".time").hide()
    $("#content").show()
    $("#activity").show()
}

/* ACTIVITY */
function activity() {
    $("#passaport").hide()
    $("#music").hide()
    $("#gps").hide()
    $("#settings").hide()
    //
    $("#activity").show()
}

/* PASSAPORT */
function passaport() {
    $("#activity").hide()
    $("#music").hide()
    $("#gps").hide()
    $("#settings").hide()
    //
    $("#passaport").show()

}

/* MUSIC */
function music() {
    $("#activity").hide()
    $("#passaport").hide()
    $("#gps").hide()
    $("#settings").hide()
    //
    $("#music").show()
}

function player() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'play'
    }));
}

function pause() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'pause'
    }));
}

function stopMusic() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'stop'
    }));
}

function less() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'volume-'
    }));
}

function plus() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'volume+'
    }));
}

function timeplay() {
    $.post('https://GENESEEWatch/action', JSON.stringify({
        action: 'timeplay'
    }));
}

function getTime(totaltime, timeplayed) {
    if (totaltime != undefined && timeplayed != undefined) {
        if (secondsToHms(timeplayed) > secondsToHms(totaltime)) {
            timeplayed = timeplayed - 1
        }
        document.getElementById("timeplay").innerHTML = secondsToHms(timeplayed) + " / " + secondsToHms(totaltime);
    } else {
        document.getElementById("timeplay").innerHTML = "0:00 / 0:00"
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "0:";
    var sDisplay = "00"
    if (s > 0) {
        sDisplay = s
        if (s < 10) {
            sDisplay = "0" + s
        }
    }
    return (hDisplay + mDisplay + sDisplay);
}

/* GPS */
function gps() {
    $("#activity").hide()
    $("#passaport").hide()
    $("#music").hide()
    $("#settings").hide()
    //
    $("#gps").show()
}

function gpsshow() {
    $.post('https://GENESEEWatch/GPS', JSON.stringify({
        action: 'acessar'
    }));
}

/* SETTINGS */
function settings() {
    $("#activity").hide()
    $("#passaport").hide()
    $("#music").hide()
    $("#gps").hide()
    //
    $("#settings").show()
}

const colours = [{ // Vermelho
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch_red.png)',
        background: 'linear-gradient(180deg, #990000 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    },
    { // Verde
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch_green.png)',
        background: 'linear-gradient(180deg, #004C00 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    }, { // Azul
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch_blue.png)',
        background: 'linear-gradient(180deg, #000099 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    }, { // Branco
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch_white.png)',
        background: 'linear-gradient(180deg, #999999 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    }, { // Ouro
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch_gold.png)',
        background: 'linear-gradient(180deg, #998100 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    }, { // Cinza
        width: '195px',
        height: '303px',
        right: '5vh',
        bottom: '5vh',
        backgroundimg: 'url(img/case/watch.png)',
        background: 'linear-gradient(180deg, #333333 0%, rgba(49, 49, 49, 0.1) 83.33%, rgba(49, 49, 49, 0) 100%)',
    }

]

let selectedColor = 0;

function changecase() {

    let style = colours[selectedColor];

    $("#watch").css("width", style.width)
    $("#watch").css("height", style.height)
    $("#watch").css("right", style.right)
    $("#watch").css("bottom", style.bottom)
    $("#watch").css("background", style.backgroundimg)
    $("#watch").css("background-size", "cover")
    $("#watch").css("z-index", "999")

    //

    $(".menu").css("background", style.background)

    //

    $(".passaport").css("background", style.background)
    $(".navplayer").css("background", style.background)

    //

    $(".gps").css("background", style.background)

    style = nextcolor()
}

function nextcolor() {
    selectedColor++;
    if (selectedColor >= colours.length) selectedColor = 0
    return colours[selectedColor]
}


/* NUI */
document.onkeyup = function (data) {
    if (data.which == 27) {
        $.post('https://GENESEEWatch/action', JSON.stringify({
            action: 'CloseNUI'
        }));
    }
}