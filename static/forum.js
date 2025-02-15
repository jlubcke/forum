function start_subscription_refresh() {
    setInterval(update_subscription, 2000);
}

function start_subscription_refresh_subpage() {
    setInterval(update_unread_back_button, 2000);
}

function update_unread_back_button() {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/0/unread_simple/', true);
    request.onload = function () {
        if (request.status === 200) {
            // Something unread
            document.getElementById('navigate-back').className = 'unread';
        }
        else if (request.status === 204) {
            // Everything read
            document.getElementById('navigate-back').className = '';
        }
    }
    request.send();
}

function update_subscription() {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/0/unread/', true);
    request.onload = function () {
        if (request.status === 200) {
            var response = JSON.parse(request.response);
            var has_unread = false;
            for (var menu_item of document.getElementsByTagName('li')) {
                if (response[menu_item.id]) {
                    menu_item.className = 'unread';
                    has_unread = true;
                } else {
                    menu_item.className = '';
                }
            }
            if (has_unread) {
                if (!window.parent.document.title.startsWith('* ')) {
                    window.parent.document.title = '* ' + window.parent.document.title;
                }
                window.document.getElementById('favicon').setAttribute('href', "/static/killing-icon-unread.png");
            }
            else {
                if (window.parent.document.title.startsWith('* ')) {
                    window.parent.document.title = window.parent.document.title.slice(2);
                }
                window.document.getElementById('favicon').setAttribute('href', "/static/killing-icon.png");
            }
        }
    }
    request.send();
}


function onscroll_show_unread() {
    var show_unread_top = false;
    var show_unread_bottom = false;

    for (let unread_item of document.getElementsByClassName('unread')) {
        let position = unread_item.getBoundingClientRect();
        if (position.bottom < 0) {
            show_unread_top = true;
        }
        if (position.top > window.innerHeight) {
            show_unread_bottom = true;
        }

        if (show_unread_top && show_unread_bottom) {
            break;
        }
    }

    if (show_unread_top) {
        document.getElementById('fixed-top-unread').style.display = 'inline';
    }
    else {
        document.getElementById('fixed-top-unread').style.display = 'none';
    }
    if (show_unread_bottom) {
        document.getElementById('fixed-bottom-unread').style.display = 'inline';
    }
    else {
        document.getElementById('fixed-bottom-unread').style.display = 'none';
    }
}
