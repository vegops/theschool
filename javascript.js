var user;
$(document).ready(function() {
    // load user data
    $.get('user.php', function (userData) {
        if (userData === 'no user') {
            window.location.replace("login/login.html");
        } else {
            document.body.style.display = "block";
            user = JSON.parse(userData);
            $('.user-name').text(fLetterUpperCase(user['name']) + ",");
            $('.user-role').text(user['role']);
            $('.user-img').attr("src", user['image']);

            $('#pop-user-name').text(fLetterUpperCase(user['name']));
            $('#pop-user-role').text(user['role']);
            $('#pop-user-phone').text(user['phone']);
            $('#pop-user-email').text(user['email']);
            $('#pop-user-ID').text(user['ID']);
            $('#pop-user-img').attr('src', user['image']);
            switch (user['role']) {
                case 'owner':
                    $('#pop-icon').html('<i class="fa fa-star" aria-hidden="true"></i>');
                    break;
                case 'manager':
                    $('#pop-icon').html('<i class="fa fa-suitcase" aria-hidden="true"></i>');
                    break;
                case 'sales':
                    $('#pop-icon').html('<i class="fa fa-user-circle-o" aria-hidden="true"></i>');
                    break;
            }
        }
    });

    //if user role is admin - gets the administrator btn
    $.get('main.php', function (admin) {
        if (admin !== "") {
            $('.navbar-nav').append(admin);
        }
    });

    loadCounters();
    getCourses();
    getStudents();
    addCourseClickInfo();
    addStudentClickInfo();

    // load form
    function additemBtn() {
        $('.add-btn').click(function () {
            clearSelected();
            var headline = $(this).parent().find('ul').attr('class').replace('list', '').trim();
            if (headline === 'courses') {
                $('.info').load('form/form-courses.html');
            } else if (headline === 'students') {
                $('.info').load('form/form-students.html');
            } else if (headline === 'users') {
                $('.info').load('form/form-users.html');
            }
            setTimeout(function () {
                $('.form-container').ready(function () {
                    fileUpload();
                    insertNew(headline);
                    headline = fLetterUpperCase(headline);
                    $('.info-container').text('Add to ' + headline);
                    showCancel();
                    $('#role-input').click(function () {
                        $(this).val("");
                    });
                })
            }, 300);

        });
    };
    additemBtn();



    //return to school view
    $('.school').click(function () {
        if( $('#none').hasClass('admin-view') ) {
            setTimeout(function () {
                flip($('#left-section'));
                $('#none').removeClass('school-view')
                $('#none').addClass('none');
                $('#left-section').removeClass('none')
            },200);
            flip($('#none'));
        }
    });

    //load admin panel
    setTimeout(function () {
        $("#administrator-btn").click(function (e) {
            if($('#left-section').hasClass('school-view')) {
                flip($('#left-section'));
                setTimeout(function () {
                    $('#left-section').addClass('none');

                    var userBox = '<div class="col-md-6 col-lg-6 left">\n' +
                        '                <label class="users-container">Users</label><span class="add-btn">&#43;</span>\n' +
                        '                <ul class="users list">\n' +
                        '                </ul>\n' +
                        '            </div>\n' +
                        '            <div class="col-md-6 col-lg-6 left">\n' +
                        '                <label class="empty-container">Type of users:</label>\n' +
                        '                <ul class="empty list">\n' +
                        '                   <div class="user-type admin-type"><table class="blueTable">\n' +
                        '<thead>\n' +
                        '<tr>\n' +
                        '<th id="t-head">Sales</th>\n' +
                        '<th>view</th>\n' +
                        '<th>edit</th>\n' +
                        '<th>create</th>\n' +
                        '</tr>\n' +
                        '</thead>\n' +
                        '<tbody>\n' +
                        '<tr>\n' +
                        '<td>Students</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Courses</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&cross;</td>\n' +
                        '<td>&cross;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Admins</td>\n' +
                        '<td>&cross;</td>\n' +
                        '<td>&cross;</td>\n' +
                        '<td>&cross;</td>\n' +
                        '</tr>\n' +
                        '</tbody>\n' +
                        '</table></div>\n'+
                        '                   <div class="user-type manager-type"><table class="blueTable">\n' +
                        '<thead>\n' +
                        '<tr>\n' +
                        '<th id="t-head">Manager</th>' +
                        '<th>view</th>\n' +
                        '<th>edit</th>\n' +
                        '<th>create</th>\n' +
                        '</tr>\n' +
                        '</thead>\n' +
                        '<tbody>\n' +
                        '<tr>\n' +
                        '<td>Students</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Courses</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Admins</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '</tbody>\n' +
                        '</table></div>\n'+
                        '                   <div class="user-type sales-type"><table class="blueTable">\n' +
                        '<thead>\n' +
                        '<tr>\n' +
                        '<th id="t-head">Owner</th>' +
                        '<th>view</th>\n' +
                        '<th>edit</th>\n' +
                        '<th>create</th>\n' +
                        '</tr>\n' +
                        '</thead>\n' +
                        '<tbody>\n' +
                        '<tr>\n' +
                        '<td>Students</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Courses</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Admins</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '<td>&check;</td>\n' +
                        '</tr>\n' +
                        '</tbody>\n' +
                        '</table></div>\n'+
                        '                </ul>\n' +
                        '            </div>';
                    getUsers();
                    $('#none').removeClass('none');
                    $('#none').html(userBox);
                    flip($('#none'));
                    addUserClickInfo();
                    additemBtn();
                },300);


            } else {
                if($('#left-section').hasClass('school-view')) {
                    flip($('#left-section'));
                    setTimeout(function () {
                        flip($('#none'));
                    },300);
                }
            }
        });
    },200);

    // cancel form and return to main
    $('#cancel').click(function () {
        loadCounters();
        reloadData();
        $(this).attr('class','');
        $(this).parent().find('label').text('info');
    });

    //
    $('.user-name').click(function () {
        $('#popup-layover').slideDown();
        $('#navbar').toggleClass('blur');
        $('.container').toggleClass('blur');
        loadUpdateFormEvent();
    });
    $('.close').click(function () {
        $('#popup-layover').slideUp();
        $('#navbar').toggleClass('blur');
        $('.container').toggleClass('blur');
    });

    var c = document.getElementById("close-Canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#D77400";
    ctx.moveTo(0,0);
    ctx.lineTo(100,100);
    ctx.lineTo(100,0);
    ctx.fill();

    var c = document.getElementById("edit-Canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#D77400";
    ctx.moveTo(0,100);
    ctx.lineTo(100,100);
    ctx.lineTo(100,0);
    ctx.fill();



    // all functions
    function fLetterUpperCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }    // first letter upper-case
    function reloadData() {
        getCourses();
        getStudents();
        addCourseClickInfo();
        addStudentClickInfo();
        $('.info-container').text('info');
        $('#cancel').addClass('none');

    }                // reloads all data
    function clearSelected() {
        $( ".selected" ).removeClass( "selected" );
    }             // clears selected items on li
    function showCancel() {
        $('#cancel').attr('class','fa fa-times-circle');
    }                // displays the cancel btn
    function fileUpload() {
        $('#fileToUpload').change(function() {
            $('#upload').css({'color':'#5cb85c','transform':'rotate(360deg)'});
            $('#upload').val('click to upload');
        });
        $('#upload').click(function() {
            var file_data = $('#fileToUpload').prop('files')[0];
            var form_data = new FormData();
            form_data.append('file', file_data);
            $.ajax({
                url: 'uploads/uploads.php', // point to server-side PHP script
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                    if(php_script_response.charAt(0)==='S'){
                        $('#upload-msg').text(php_script_response);
                    } else {
                        var response = JSON.parse(php_script_response);
                        $('#upload-msg').text("");
                        $('#upload-result').attr('src', response[1]);
                        $('#upload').addClass(" uploaded");
                        $('#upload').val('Uploaded!');
                    }
                }
            });
        });
    }                // file upload
    function addCourseClickInfo() {
    setTimeout(function () {
        $(".course").click(function () {
            clearSelected();
            $(this).addClass('selected');
            var courseName = $(this).find('.course-name').text();
            var imgObject = $(this).find('.course-img').clone();
            var description = $(this).find('p').text();
            var ID = $(this).find('.course-ID').text();
            $('.info').load('htmls/course-info.html', function () {
                $(this).closest('.info-outer').find('.info-container').text('Course info');
                $('.course-name-info').text(courseName);
                $('.course-ID-info').text(ID);
                $('.course-img-info').append(imgObject);
                $('.course-description-info').text(description);
                deleteItem();
                showCancel();
                loadUpdateFormEvent()
            });
        });
    }, 500)

}        // load course info

    function addStudentClickInfo() {
        setTimeout(function () {
            $(".student").click(function () {
                clearSelected();
                $(this).addClass('selected');
                var courseName = $(this).find('.student-name').text();
                var imgObject = $(this).find('.student-img').clone();
                imgObject.attr('style','position: absolute;');
                var phone = $(this).find('.student-phone').clone();
                phone.attr('class',"student-phone student-phone-info offset-md-2 col-md-4 offset-3 col-6");
                phone.attr('style',"font-size: 14px;");
                var email = $(this).find('.student-email').clone();
                email.attr('class',"student-email student-email-info offset-md-2 col-md-8 offset-3 col-6");
                email.attr('style',"font-size: 14px;");
                var IDelement = $(this).find('.student-ID').clone();
                IDelement.attr('style','font-size: 14px;');
                IDelement.attr('class','student-ID-info offset-3 col-2');
                $('.info').load('htmls/students-info.html', function () {
                    $(this).closest('.info-outer').find('.info-container').text('Student info');
                    $('.student-name-info').text(courseName);
                    $('.student-img-info').append(imgObject);
                    $('.student-description-info').append(phone);
                    $('.student-description-info').append(IDelement);
                    $('.student-description-info').append(email);
                    deleteItem();
                    showCancel();
                    loadUpdateFormEvent();
                    getAssignedCourses(IDelement.text());
                });
            });
        }, 500)

    }       // load student info

    function addUserClickInfo() {
        setTimeout(function () {
            $(".single-user").click(function () {
                clearSelected();
                $(this).addClass('selected');
                var userName = $(this).find('.users-name').text().replace(",","");
                var userRole = $(this).find('.users-role').text();
                var imgObject = $(this).find('.users-img').clone();
                imgObject.attr('style','position: absolute;');
                var phone = $(this).find('.users-phone').clone();
                phone.attr('class',"users-phone users-phone-info offset-md-2 col-md-4 offset-3 col-6");
                phone.attr('style',"font-size: 14px;");
                var email = $(this).find('.users-email').clone();
                email.attr('class',"users-email users-email-info offset-md-2 col-md-8 offset-3 col-6");
                email.attr('style',"font-size: 14px;");
                var IDelement = $(this).find('.users-ID').clone();
                IDelement.attr('style','font-size: 14px;');
                IDelement.attr('class','users-ID-info offset-3 col-2');
                $('.info').load('htmls/user-info.html', function () {
                    $(this).closest('.info-outer').find('.info-container').text('User info');
                    $('.user-name-info').text(userName);
                    $('.user-role-info').text(userRole);
                    $('.user-img-info').append(imgObject);
                    $('.user-description-info').append(phone);
                    $('.user-description-info').append(IDelement);
                    $('.user-description-info').append(email);
                    deleteItem();
                    showCancel();
                    loadUpdateFormEvent();
                });
            });
        }, 500)

    }       // load user info

    function deleteItem() {
        $('.course-delete').click(function () {
            var name = $(this).closest('.info-con').find('h4').text();
            var table = $(this).attr('class').replace("-delete info-btn delete-btn","s");
            $.post('actions/delete.php',{ table: table, name: name } , function (data) {
                $('.selected').text(data);
                $('.selected').fadeOut(1000);
            })
            endOfEdit('Deleted');
        })
    }                // delete item
    function insertNew(string) {
        $('#insert-'+string).on('click', function () {
            setTimeout(function () {
            $('#upload-msg').text("");
            if(string === "courses") {
                var name = $('#name').val();
                var description = $('#description').val();
                var image = $('#upload-result').attr('src');
                if (name.length === 0 || description.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        list: string,
                        name: name,
                        description: description,
                        image: image
                    };
                    $.ajax({
                        url: 'actions/insert.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            endOfEdit(result);
                        }
                    })
                }
            } else if(string === "students") {
                var name = $('#name').val();
                var phone = $('#phone').val();
                var email = $('#email').val();
                var image = $('#upload-result').attr('src');
                if (name.length === 0 || phone.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if(!/^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/.test(phone)) {
                    $('#upload-msg').text("Phone is incorrect");
                } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    $('#upload-msg').text("E-mail is incorrect");
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        list: string,
                        name: name,
                        phone: phone,
                        email: email,
                        image: image
                    };
                    $.ajax({
                        url: 'actions/insert.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            endOfEdit(result);
                        }
                    })
                }
            } else if(string === "students") {
                var name = $('#name').val();
                var role = $('#role-input').val();
                var phone = $('#phone').val();
                var email = $('#email').val();
                var image = $('#upload-result').attr('src');
                if (name.length === 0 || phone.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if(role === ""){
                    $('#upload-msg').text("Please choose user role");
                } else if(!/^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/.test(phone)) {
                    $('#upload-msg').text("Phone is incorrect");
                } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    $('#upload-msg').text("E-mail is incorrect");
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        list: string,
                        name: name,
                        phone: phone,
                        email: email,
                        image: image,
                        role: role
                    };
                    $.ajax({
                        url: 'actions/insert.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            endOfEdit(result);
                        }
                    })
                }
            }
            },1000);
        });

    }           // adds new item
    function getUsers() {
        $('.users').html("");
        var users;
        $.post('actions/getinfo.php', {list: 'administrator'}, function (data) {
            users = JSON.parse(data);
            for (var i = 0; i < users.length; i++) {
                var singleuser = "<li class='single-user' title='click for more details'>\n" +
                    "                            <span class='users-name col-3'>" + fLetterUpperCase(users[i]['name'])+","+ "</span>\n" +
                    "                            <span class='users-role  offset-2 col-3'>" + users[i]['role'] + "</span>\n" +
                    "                            <img class='users-img col-4' src='" + users[i]['image'] + "'>\n" +
                    "                            <div class='users-description col-8'><span class='users-phone'>" + users[i]['phone'] + "</span><span class='users-ID' style='display: none'>" + users[i]['ID'] + "</span><span class='users-email'>" + users[i]['email'] + "</span></div>\n" +
                    "                    </li>";
                $('.users').append(singleuser);
            }
            $('.users-container').text("Users (" + users.length + ")");
            addUserClickInfo();

        });
    }                  // load users list
    function getStudents() {
        $('.students').html("");
        var students;
        $.post('actions/getinfo.php', {list: 'students'}, function (data) {
            students = JSON.parse(data);
            for (var i = 0; i < students.length; i++) {
                var singlestudent = "<li class='student' title='click for more details'>\n" +
                    "                            <span class='student-name col-8'>" + students[i]['name'] + "</span>\n" +
                    "                            <img class='student-img col-4' src='" + students[i]['image'] + "'>\n" +
                    "                            <div class='student-description col-8'><span class='student-phone'>" + students[i]['phone'] + "</span><span class='student-ID' style='display: none'>" + students[i]['ID'] + "</span> <span class='student-email'>" + students[i]['email'] + "</span></div>\n" +
                    "                    </li>";
                $('.students').append(singlestudent);
            }
            $('.students-container').text("Students (" + students.length + ")");
            $("#students-count").attr("data-to", students.length);
        });
    }               // load students list
    function getCourses() {
        $('.courses').html("");
        var courses;
        $.post('actions/getinfo.php', {list: 'courses'}, function (data) {
            courses = JSON.parse(data);
            for (var i = 0; i < courses.length; i++) {
                var singleCourse = "<li class='course' title='click for full description'>\n" +
                    "                            <span class='course-name col-xs-6 col-sm-6 col-md-6'>" + courses[i]['name'] + "</span>\n" +
                    "                            <span class='course-img col-xs-6 col-sm-6 col-md-6' style=\"background-image: \n" +
                    "                                   url('" + courses[i]['image'] + "');\">\n" +
                    "                                   </span> " +
                    "                            <p class='course-description'>"+ courses[i]['description'] +"</p>\n" +
                    "                            <span class='course-ID'>"+ courses[i]['ID'] +"</span>\n";
                "                    </li>";

                $('.courses').append(singleCourse);
            }
            $('.courses-container').text("Courses (" + courses.length + ")");
            $("#courses-count").attr("data-to", courses.length);
        });
    }                // load courses list
    function loadCounters() {
        $.get('counters/', function (counters) {
            $('.info').html(counters);
        });
    }              // load counters
    function loadUpdateFormEvent() {
        $('.edit-btn').on('click',function () {
            var headline = $(this).attr('class').replace('-edit info-btn edit-btn','s');
            if (headline === 'courses') {
                $('.info').load('form/update-courses.html');
                var name = $('.course-name-info').text();
                var description = $('.course-description-info').text();
                var img = $('.course-img-info').find('span').attr('style');
                var indx1 = img.indexOf("(")+2;
                var indx2 = img.indexOf(")")-1;
                var src = img.substring(indx1,indx2);
                var ID = $('.course-ID-info').text();
            } else if (headline === 'students') {
                $('.info').load('form/update-students.html');
                var name = $('.student-name-info').text();
                var phone = $('.student-phone-info').text();
                var email = $('.student-email-info').text();
                var src = $('.student-img-info').find('img').attr('src');
                var ID = $('.student-ID-info').text();
            } else if (headline === 'users') {
                $('.info').load('form/update-user.html');
                var name = $('.user-name-info').text();
                var phone = $('.users-phone-info').text();
                var email = $('.users-email-info').text();
                var src = $('.user-img-info').find('img').attr('src');
                var ID = $('.users-ID-info').text();
                var role = $('.user-role-info').text();
            } else if (headline === 'selfs') {
            $('.info').load('form/update-user.html');
                $('#popup-layover').slideUp();
                $('#navbar').toggleClass('blur');
                $('.container').toggleClass('blur');

                var name = $('#pop-user-name').text();
                var phone = $('#pop-user-phone').text();
                var email = $('#pop-user-email').text();
                var src = $('#pop-user-img').attr('src');
                var ID = $('#pop-user-ID').text();
                var role = $('#pop-user-role').text();
                headline = 'users';
            }


            setTimeout(function(){
                $('.form-container').ready(function () {
                    fileUpload();
                    headline = fLetterUpperCase(headline);
                    $('.info-container').text('Update '+headline);
                    showCancel();
                    $('#name').val(name);
                    $('#phone').val(phone);
                    $('#email').val(email);

                    $('#description').val(description);
                    $('#upload-result').attr('src',src);
                    $('#ID').val(ID);
                    $('#role-input').val(role);
                    $('#role-input').click(function () {
                        $(this).val("");
                    });
                });
                updateItem(headline);
                getCheckboxs();
            }, 300);

        })
    } // loads the update on click with item values
    function getAssignedCourses(studentID) {
        $.get('lists', function (list) {
            $('.students-course-list').html(list);
            var courses;
            var ID = studentID;
            $.post('actions/assigned-courses.php', {ID: ID}, function (data) {
                if(data==="no result") {
                    $('.lists-title').text("No courses found.");
                } else {
                    courses = JSON.parse(data);
                for( i=0 ; i<courses.length ; i++ ) {
                    var item = '<div id="lists" class="wrapper">\n' +
                        '    <h1 class="title"></h1>\n' +
                        '    <div class="cols">\n' +
                        '        <div class="col" ontouchstart="this.classList.toggle(\'hover\');">\n' +
                        '            <div class="container-list">\n' +
                        '                <div class="front" style="background-image: url(images/magic-book.jpg)">\n' +
                        '                    <div class="inner">\n' +
                        '                        <p class="item-list-title">'+ courses[i]['name'] +'</p>\n' +
                        '                        <span class="item-list-front">'+ courses[i]['ID'] +'</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="back">\n' +
                        '                    <div class="inner">\n' +
                        '                        <p class="item-list-rear">'+ courses[i]['description'] +'</p>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</div>';
                    $('#list-body').append(item);
                }}
            })
        })
    } // loads courses by student ID
    function updateItem(string) {
        $('#update-'+string).on('click', function () {
            $('#upload-msg').text("");
            if(string === "courses") {
                var name = $('#name').val();
                var description = $('#description').val();
                var image = $('#upload-result').attr('src');
                var ID = $('#ID').val();
                if (name.length === 0 || description.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        ID: ID,
                        list: string,
                        name: fLetterUpperCase(name),
                        description: description,
                        image: image
                    };
                    $.ajax({
                        url: 'actions/update.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            endOfEdit(string);
                        }
                    })
                }
            } else if(string === "students") {
                var ID = $('#ID').val();
                var name = $('#name').val();
                var phone = $('#phone').val();
                var email = $('#email').val();
                var image = $('#upload-result').attr('src');
                var courses = [];
                for( i=0 ; i<$('input:checked').length ; i++ ){
                    courses.push($('input:checked')[i].id);
                }

                if (name.length === 0 || phone.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if(!/^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/.test(phone)) {
                    $('#upload-msg').text("Phone is incorrect");
                } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    $('#upload-msg').text("E-mail is incorrect");
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        ID: ID,
                        list: string,
                        name: fLetterUpperCase(name),
                        phone: phone,
                        email: email,
                        image: image,
                        courses: (courses)
                    };
                    $.ajax({
                        url: 'actions/update.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            endOfEdit(result);
                        }
                    })
                }
            } else if(string === "users") {
                var ID = $('#ID').val();
                var name = $('#name').val();
                var phone = $('#phone').val();
                var email = $('#email').val();
                var image = $('#upload-result').attr('src');
                var role = $('#role-input').val();

                if (name.length === 0 || phone.length === 0) {
                    $('#upload-msg').text("Please fill all the fields");
                    $('#upload-msg').css('color', 'red')
                } else if(!/^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/.test(phone)) {
                    $('#upload-msg').text("Phone is incorrect");
                } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    $('#upload-msg').text("E-mail is incorrect");
                } else if (image.length === 0) {
                    $('#upload-msg').text("Please upload your image");
                    $('#upload-msg').css('color', 'yellow')
                } else {
                    var dataToInsert = {
                        ID: ID,
                        list: string,
                        name: fLetterUpperCase(name),
                        phone: phone,
                        email: email,
                        image: image,
                        role: role
                    };
                    $.ajax({
                        url: 'actions/update.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            if(result == "Only 1 Owner is allowed") {
                                $('.form-container').html("Sorry, Only 1 owner is allowed.");
                                console.log(result);
                                setTimeout(function () {
                                    reloadData();
                                    loadCounters();
                                    getUsers();
                                },1500);
                            } else {
                                console.log(result);
                                endOfEdit(result);
                                getUsers();
                            }
                        }
                    })
                }
            }
        });

    } //update item
    function getCheckboxs() {
        var allCourses = "";
        var assigned = "";
        $.get('checkbox', function (checkboxs) {
            $('.available-courses-list').html(checkboxs);
        });

        $.post('actions/getinfo.php', {list: 'courses'}, function (data) {
            allCourses = JSON.parse(data);
            setTimeout(function () {
                var ID = $('#ID').val();
                $.post('actions/assigned-courses.php', {ID: ID}, function (data) {
                    if (data === "no result") {
                        $('.lists-title').text("No courses found.");
                    } else {
                        assigned = JSON.parse(data);
                    }
                    for( i=0 ; i<allCourses.length ; i++ ){
                        for( z=0 ; z<assigned.length ; z++ ) {
                            if( allCourses[i]['ID'] == assigned[z]['ID'] ) {
                                var li = '    <div class="funkyradio">\n' +
                                    '        <div class="funkyradio-info">\n' +
                                    '            <input type="checkbox" name="checkbox" id="'+ allCourses[i]['ID'] +'" checked/>\n' +
                                    '            <label for="'+ allCourses[i]['ID'] +'">'+ allCourses[i]['name'] +'</label>\n' +
                                    '        </div>\n' +
                                    '    </div>';
                                $('#student-courses-list').append(li);
                                allCourses[i] = "";
                            }
                        }
                        if( allCourses[i] != "" ) {
                            var li = '    <div class="funkyradio">\n' +
                                '        <div class="funkyradio-info">\n' +
                                '            <input type="checkbox" name="checkbox" id="' + allCourses[i]['ID'] + '"/>\n' +
                                '            <label for="' + allCourses[i]['ID'] + '">' + allCourses[i]['name'] + '</label>\n' +
                                '        </div>\n' +
                                '    </div>';
                            $('#student-courses-list').append(li);
                        }
                    }

                });
            },500)

        });


    } // loads the checkboxs

    function endOfEdit(string) {
        var box = $('#info-box');
        setTimeout(function () {
            $('#info-box').addClass('flip');
            box.html("<img src='images/success.png' width='60%'><div></div>");
            // box.find('div').text(string);
        },500);
        setTimeout(function () {
            reloadData();
            loadCounters();
            box.removeClass('flip');
        },2000);
    }
    function flip(elemtnt) {
        elemtnt.toggleClass('flip90');
        setTimeout(function () {
            elemtnt.toggleClass('flip90');
        },300)

    }
    function popUpEdit() {
        $

    }
});
