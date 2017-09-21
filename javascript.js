$(document).ready(function() {

    // load user data
    var user;
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
    })

    //if user role is admin - gets the administrator btn
    $.get('main.php', function (admin) {
        if (admin !== "") {
            $('.navbar-nav').append(admin);
        }
    })

    loadCounters()
    getCourses();
    getStudents();
    addCourseClickInfo();
    addStudentClickInfo();

    // load form
    $('.add-btn').on('click',function () {
        clearSelected();
        var headline = $(this).parent().find('ul').attr('class').replace('list','').trim();
        if (headline === 'courses') {
            $('.info').load('form/form-courses.html');
        } else {
            $('.info').load('form/form-students.html');
        }
        setTimeout(function(){
            $('.form-container').ready(function () {
                fileUpload();
                insertNew(headline);
                headline = fLetterUpperCase(headline);
                $('.info-container').text('Add to '+headline);
                showCancel();
            })
        }, 300);

    })


    //return to school view
    $('.school').click(function () {
        $('.courses').parent().fadeIn();
        $('.students').parent().fadeIn();
        $('.users').parent().fadeOut();
    })

    //load admin panel
    setTimeout(function () {
        $("#administrator-btn").click(function () {
            var cont = $('.students').parent().parent();
            if($('.users').length === 0 ) {
                var userBox = cont.find('.students').parent().clone();

                userBox.find('label').attr('class', 'users-container');
                userBox.find('label').text('Users');
                userBox.css('position','absolute');
                userBox.find('ul').attr('class', 'users list');
                userBox.find('ul').html("");
                $('.row').find('.students').parent().fadeOut();
                $('.row').find('.courses').parent().fadeOut();
                cont.find('.info-container').parent().before(userBox);

                getUsers();
            } else {
                $('.users').parent().fadeIn();
                $('.courses').parent().fadeOut();
                $('.students').parent().fadeOut();
            }

        });
    },200);

    // cancel form and return to main
    $('#cancel').click(function () {
        loadCounters();
        reloadData();
        $(this).attr('class','');
        $(this).parent().find('label').text('info');
    })

    //
    $('.user-name').click(function () {
        $('#popup-layover').slideDown();
        $('#navbar').toggleClass('blur');
        $('.container').toggleClass('blur');
    })
    $('.close').click(function () {
        $('#popup-layover').slideUp();
        $('#navbar').toggleClass('blur');
        $('.container').toggleClass('blur');
    })

    var c = document.getElementById("close-Canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#D77400";
    ctx.moveTo(0,0)
    ctx.lineTo(100,100);
    ctx.lineTo(100,0);
    ctx.fill();

    var c = document.getElementById("edit-Canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#D77400";
    ctx.moveTo(0,100)
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
        $('#cancel').remove();

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
                        console.log(php_script_response);
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
                phone.attr('class',"student-phone student-phone-info offset-3 col-6");
                phone.attr('style',"font-size: 14px;");
                var email = $(this).find('.student-email').clone()
                email.attr('class',"student-email student-email-info offset-3 col-6");
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
                    loadUpdateFormEvent()
                });
            });
        }, 500)

    }       // load student info
    function deleteItem() {
        $('.course-delete').click(function () {
            var name = $(this).closest('.info-con').find('h4').text();
            var table = $(this).attr('class').replace("-delete info-btn","s");
            $.post('actions/delete.php',{ table: table, name: name } , function (data) {
                $('.selected').text(data);
                $('.selected').fadeOut(1000);
            })
        })
    }                // delete item
    function insertNew(string) {
        $('#insert-'+string).on('click', function () {
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
                            console.log(result);
                            reloadData();
                            loadCounters();
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
                            console.log(result);
                            reloadData();
                            loadCounters();
                        }
                    })
                }
            }
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
                    "                            <span class='users-role col-3'>" + users[i]['role'] + "</span>\n" +
                    "                            <img class='users-img col-4' src='" + users[i]['image'] + "'>\n" +
                    "                            <div class='users-description col-8'><span class='users-phone'>" + users[i]['phone'] + "</span><span class='users-email'>" + users[i]['email'] + "</span></div>\n" +
                    "                    </li>";
                $('.users').append(singleuser);
            }
            ;
            $('.students-container').text("Students (" + users.length + ")");


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
            ;
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
                    "                            <span class='course-name col-sm-12 col-md-6'>" + courses[i]['name'] + "</span>\n" +
                    "                            <span class='course-img col-sm-12 col-md-6' style=\"background-image: \n" +
                    "                                   url('" + courses[i]['image'] + "');\">\n" +
                    "                                   </span> " +
                    "                            <p class='course-description'>"+ courses[i]['description'] +"</p>\n" +
                    "                            <span class='course-ID'>"+ courses[i]['ID'] +"</span>\n"
                "                    </li>";

                $('.courses').append(singleCourse);
            }
            ;
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
            } else {
                $('.info').load('form/update-students.html');
                var name = $('.student-name-info').text();
                var phone = $('.student-phone-info').text();
                var email = $('.student-email-info').text();
                var src = $('.student-img-info').find('img').attr('src');
                var ID = $('.student-ID-info').text();
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
                })
                updateItem(headline);
            }, 300);

        })
    }
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
                            console.log(result);
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
                        image: image
                    };
                    $.ajax({
                        url: 'actions/update.php', //targets the insert data file
                        data: dataToInsert,
                        type: 'post',
                        success: function (result) {
                            console.log(result);

                            endOfEdit(result);
                        }
                    })
                }
            }
        });

    }
    function endOfEdit(string) {
        var box = $('#info-box')
        setTimeout(function () {
            $('#info-box').addClass('flip');
            box.html("<img src='images/success.png' width='60%'><div></div>");
            // box.find('div').text(string);
        },500);
        setTimeout(function () {
            reloadData();
            loadCounters()
            box.removeClass('flip');

        },3000);

    }
});
