let targetId;
let checkdelete = true;

$(document).ready(function () {
    $('#close').on('click', function () {
        $('#container').removeClass('active');
        window.location.reload();
    });
    $('#container2').empty();

    getMessages();

})

function getMessages() {
    $('#cards-box').empty();
    $.ajax({
        type: "GET",
        url: "/api/memos",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let title = message['title'];
                let id = message['id'];
                let username = message['username'];
                let contents = message['contents'];
                let modifiedAt = message['modifiedAt'];
                addHTML(title,id, username, contents, modifiedAt);
            }
        }
    });
}

function addHTML(title,id, username, contents, modifiedAt) {
    let tempHtml = makeMessage(title, id, username, contents, modifiedAt);
    $('#cards-box').append(tempHtml);
}
function showMemo(id){
    $.ajax({
        type:"GET",
        url:`/api/memos/${id}`,
        success:function (response){
            let memo = response;
            let title = memo['title'];
            let id = memo['id'];
            let username = memo['username'];
            let contents = memo['contents'];
            let modifiedAt = memo['modifiedAt'];
            // let tempHtml = makeMessage2(title, id,username,contents,modifiedAt);
            $('#container2').append(`        <div class="popup" style="height: 400px; width: 500px;">
            <button id="close2" class="close" onclick="$('#container2').empty().removeClass('active');">
                X
            </button>
            <div class="metadata" style="margin-bottom: 10px;">
                            <div id="showtitle" style="font-size:25px; font-weight:bold; color :black; margin-bottom: 10px;">${title}</div>
                            <div id="${id}-username" class="username" style="margin-right: 15px;">
                                ${username}
                            </div>
                            <div class="date">
                                ${modifiedAt}
                            </div>
                        </div>
                        <!-- contents ??????/?????? ??????-->
                        <div class="contents">
                            <div id="${id}-contents" class="text" style="height: 400px; width: 350px;">
                                ${contents}
                            </div>
                            <div id="${id}-editarea" class="edit">
                                <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
        </div>`)
        }
    })
    $('#container2').addClass('active');
}

function makeMessage(title,id, username, contents, modifiedAt) {
    return `<div class="card" style="box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);">
                        <!-- date/username ?????? -->
                        <div class="metadata" style="margin-bottom: 10px;">
                            <div id="showtitle" style="font-size:18px; font-weight:bold; color :black;">${title}</div>
                            <div id="${id}-username" class="username" style="margin-right: 15px;">
                                ${username}
                            </div>
                            <div class="date">
                                ${modifiedAt}
                            </div>
                        </div>
                        <!-- contents ??????/?????? ??????-->
                        <div class="contents">
                            <div id="${id}-contents" class="text" style="display: inline-block; width: 500px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${contents}
                            </div>
                            <div id="${id}-editarea" class="edit">
                                <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <!-- ?????? ??????-->
                        <div class="footer">
                            <img id="${id}-plus" class="icon-plus" src="images/plus.png" alt="" onclick="showMemo('${id}')" style="     cursor: pointer;
     position: absolute;
     bottom: 14px;
     right: 100px;
     width: 18px;
     height: 18px;">                            
                            <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                            <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="passwordToDelete('${id}')">
                            <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                        </div>
                    </div>`;
}

function isValidContents(contents) {
    if (contents == '') {
        alert('????????? ??????????????????');
        return false;
    }
    if (contents.trim().length > 300) {
        alert('?????? ?????? 300??? ????????? ??????????????????');
        return false;
    }
    return true;
}
function isValidPassword(password){
    if(password == null){
        alert('??????????????? ??????????????????');
        return false;
    }
}
function isValidTitle(title) {
    if (title == '') {
        alert('????????? ??????????????????');
        return false;
    }
    if (title.trim().length > 15) {
        alert('????????? 15??? ????????? ??????????????????');
        return false;
    }
    return true;
}
function isvalidName(username){
    if(username=''){
        alert('??????????????? ??????????????????');
        return false;
    }
    if (username.trim().length > 8) {
        alert('????????? 8??? ????????? ??????????????????');
        return false;
    }
}

function writePost() {
    let contents = $('#contents').val();
    let pass = $('#password').val();
    let title = $('#title').val();
    let username = $('#username').val();
    if (isValidContents(contents) == false|| isValidPassword(pass)==false||isValidTitle(title)==false||isvalidName(username)==false) {
        return;
    }


    let data = {'title' : title, 'username': username, 'contents': contents, 'password':pass};

    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('???????????? ??????????????? ?????????????????????.');
            window.location.reload();
        }
    });
}
function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

function submitEdit(id) {

    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    if (isValidContents(contents) == false) {
        return;
    }
    let data = {'username': username, 'contents': contents};

    $.ajax({
        type: "PUT",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('????????? ????????? ?????????????????????.');
            window.location.reload();
        }
    });
}
function editPost(id) {
    targetId = id; // ??????????????? ????????? id?????? ??????????????????.
    checkdelete = false;    //???????????? ??????????????? ??????
    $('#container').addClass('active'); // ??????????????? ?????????.
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function (response) {
            alert('????????? ????????? ?????????????????????.');
            window.location.reload();
        }
    })
}
function passwordToDelete(id){
    targetId = id;
    checkdelete = true;
    $('#container').addClass('active');
}

function checkPassword(){

    let password = $('#setpassword').val();
    $.ajax({
        type :"GET",
        url:`/api/memos/password/${targetId}`,
        success:function(response){
            if(password==response){
                alert('??????????????? ???????????????.')
                if(checkdelete == true){
                    deleteOne(targetId)
                }
                else{$('#container').removeClass('active');}
            }
            else{alert('??????????????? ???????????????!.')
                window.location.reload();
            }
        }
    })
}