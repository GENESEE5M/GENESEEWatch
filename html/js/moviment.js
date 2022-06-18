window.onload = function () {
    Dragable(document.getElementById("watch"));
};

//Adiciona eventos pra navegadores modernos e antigos
function addEvent(el, type, callback) {
    if (el.addEventListener) {
        el.addEventListener(type, callback);
    } else if (el.attachEvent) {
        el.attachEvent("on" + type, callback);
    }
}

function Dragable(el) {
    var isMove = false, //Verifica se esta se movendo
        x = 0,
        y = 0, //Pega as coordenadas do mouse
        xel = 0,
        yel = 0; // ultima posição do elemento

    addEvent(el, "mousedown", function (e) {
        isMove = true;

        el.className += " isMoving";

        x = window.event ? window.event.clientX : e.pageX;
        y = window.event ? window.event.clientY : e.pageY;

        xel = x - el.offsetLeft;
        yel = y - el.offsetTop;
    });

    addEvent(document, "mousemove", function (e) {
        if (isMove) {
            e.preventDefault();

            x = window.event ? window.event.clientX : e.pageX;
            y = window.event ? window.event.clientY : e.pageY;

            el.style.left = (x - xel) + 'px';
            el.style.top = (y - yel) + 'px';
        }
    });

    addEvent(document, "mouseup", function () {
        el.className = String(el.className).replace(/(^|\s)isMoving(\s|$)/g, " ");
        isMove = false;
    });
};