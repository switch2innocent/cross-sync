<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>

    <!-- Bootstrap Links -->
    <link rel="stylesheet" href="assets/plugins/bootstrap.min.css">
    <link rel="stylesheet" href="assets/plugins/toastr/toastr.min.css">
    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">

</head>

<body>

    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4 border p-4 shadow-lg mt-5">
                <a href="index.php" id="backLogin"><i class="fas fa-arrow-circle-left fa-2x"></i></a>
                <div class="text-center">
                    <i class="fas fa-lock fa-5x d-block mb-3"></i>
                    <h2 class="mt-4">Retrieve Password</h2>
                    <p>Enter your IGC email address, we will send a password resetting link to you.</p>
                </div>
                <form action="">
                    <div class="form-group position-relative mt-4">
                        <input type="email" class="form-control pl-5" placeholder="IGC Email Address" id="email">
                        <i class="fas fa-envelope position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%);"></i>
                    </div>
                    <button class="btn btn-primary w-100" type="submit" id="retrieve">Retrieve</button>
                </form>
            </div>
        </div>
    </div>

    <!-- loader -->
    <div id="loading-screen" style="display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: rgba(255, 255, 255, 0.8); z-index: 9999; text-align: center; padding-top: 20%;">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <!-- jQuery library -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <script src="assets/plugins/popper.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/script/forgot_pass.script.js"></script>
    <script src="assets/plugins/toastr/toastr.min.js"></script>
    <script src="assets/plugins/sweetalert2@11.js"></script>

</body>

</html>