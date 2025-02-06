$(document).ready(function () {

    // Loader page
    $('#backLogin').click(function (e) {
        e.preventDefault();
        $('#loading-screen').fadeIn(500, function () {
            window.location.href = 'index.php';
        });
    });

    $('#reset').on('click', function (e) {
        e.preventDefault();

        var password = $('#password').val();
        var conpassword = $('#conpassword').val();
        var id = location.search.split('id=')[1];

        if (!password || !conpassword) {

            toastr["error"]("Please fill in all fields.", "ERROR");

        } else if (password !== conpassword) {

            toastr["error"]("Password do not match. Please try again.", "ERROR");

        } else {
            $.ajax({
                type: 'POST',
                url: 'controls/change_password.ctrl.php',
                data: { password: password, id: id },
                success: function (r) {
                    if (r > 0) {
                        console.log(r);
                        Swal.fire({
                            title: "Success!",
                            text: "",
                            text: "Your password has been successfully reset. Please login with your new password.",
                            icon: "success",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#007bff",
                        }).then(function () {
                            window.location.href = 'index.php';
                        });

                    } else {
                        toastr["error"]("Failed to reset password.", "ERROR");
                    }
                }

            });
        }

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