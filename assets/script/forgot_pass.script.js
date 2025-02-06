$(document).ready(function () {

    // Loader page
    $('#backLogin').click(function (e) {
        e.preventDefault();
        $('#loading-screen').fadeIn(500, function () {
            window.location.href = 'index.php';
        });
    });

    //Send Email
    $('#retrieve').on('click', function (e) {
        e.preventDefault();

        var email = $('#email').val();

        var check = email.substring(email.lastIndexOf('@') + 1);

        if (!email) {

            toastr["error"]("Email is required.", "ERROR");
            $('#email').focus();
            return

        } else if (check !== 'innogroup.com.ph' && check !== 'induco.com.ph' && check !== 'citrineland.com.ph' && check !== 'innoland.com.ph' && check !== 'innoprime.com.ph') {

            toastr["error"]("Enter a valid IGC email address. (ex. your_email@innogroup.com.ph).", "ERROR");
            $("#email").focus();

        } else {

            $.ajax({
                type: 'POST',
                url: 'controls/retrieve_email.ctrl.php',
                data: { email: email },
                success: function (r) {
                    console.log(r);
                    if (r > 0) {
                        // alert("sent");
                        // window.location.reload();

                        Swal.fire({
                            title: "Success!",
                            text: "A message has been sent to your IGC email address with instructions to reset your password. Please check your Outlook app.",
                            icon: "success",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#007bff",
                        }).then(function () {
                            window.location.reload();
                        });

                    } else {
                        toastr["error"]("Email not found.", "ERROR");
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