$(document).ready(function () {

    // For login
    $('#btnLogin').on('click', function (event) {
        event.preventDefault();

        var uname = $("#txtUsername").val();
        var pass = $("#txtPassword").val();

        var appendData = 'username=' + uname + '&password=' + pass;

        // Check if the username && password is empty
        if (uname === "") {

            toastr["error"]("Username is required.", "ERROR");
            $('#txtUsername').focus();
            return;

        } else if (pass === "") {

            toastr["error"]("Password is required.", "ERROR");
            $('#txtPassword').focus();
            return;

        } else {

            $.ajax({
                type: 'POST',
                url: 'controls/login_user.ctrl.php',
                data: appendData,
                success: function (response) {
                    console.log(response);
                    if (response > 0) {

                        $.ajax({
                            type: 'POST',
                            url: 'controls/check_user_access.ctrl.php',
                            success: function (result) {
                                if (result > 0) {

                                    // alert('Login successfully');
                                    Swal.fire({
                                        title: "Success!",
                                        text: "Login successfully!",
                                        icon: "success",
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        confirmButtonColor: "#007bff",
                                    }).then(function () {
                                        window.location.href = 'upload.view.php';
                                    });

                                } else {
                                    toastr["error"]("Account is not yet activated. Please contact the administrator.", "Error");
                                }
                            }
                        });

                    } else {

                        toastr["error"]("Incorrect username & password.", "ERROR");

                    }
                }
            });

        }
    });

    // Show pass
    $('#customCheck').on('change', function () {
        var passField = $('#txtPassword');
        if ($(this).is(':checked')) {
            passField.attr('type', 'text');
        } else {
            passField.attr('type', 'password');
        }
    });

    // Loader page
    $('.fade-link').click(function (e) {
        e.preventDefault();
        var linkLocation = this.href;
        $('#loading-screen').fadeIn(500, function () {
            window.location = linkLocation;
        });
    });

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
});