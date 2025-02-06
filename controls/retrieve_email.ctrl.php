<?php

require_once '../config/dbconmain.php';
require_once '../objects/user.obj.php';

$databaseMain = new ConnectionMain();
$dbMain = $databaseMain->connect();

$get_email = new Users($dbMain);

$get_email->email = $_POST['email'];

$get = $get_email->get_emails();
while ($row = $get->fetch(PDO::FETCH_ASSOC)) {
    $firstname = $row['firstname'];
    $id = $row['id'];
}

if ($get) {
    $get_email->email = $_POST['email'];
    $get_id = $get_email->email_by_id();

    echo 1;
    $from = "system.administrator<(it@innogroup.com.ph)>";
    $to = $_POST['email'];

    $subject = "(Cross Sync) User Message";
    $message = '<html>
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                        <div style="background-color: #00C957; padding: 20px; text-align: center; color: white; font-size: 24px; font-weight: bold;">
                            Password Reset Request
                        </div>
                        <div style="max-width: 600px; margin: 20px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                            <h3 style="color: #333; font-size: 18px; margin-bottom: 10px;">Hi ' . htmlspecialchars($firstname) . ',</h3>
                            <p style="color: #555; font-size: 16px; line-height: 1.6;">
                                We received your request to change your password. To reset your password, please click the button below:
                            </p>
                            <a href="https://innogroup.com.ph/cross-sync/recover_pass.view.php?id=' . $id . '" 
                               style="display: inline-block; background-color:rgba(0, 4, 255, 0.81); color: black; padding: 2px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; margin-top: 20px; text-align: center; border: 1px solid black">
                                Click Me!
                            </a>
                            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-top: 20px;">
                                If you did not request this change, please disregard this email.
                            </p>
                            <p style="color: #555; font-size: 16px; line-height: 1.6;">
                                Thank you! <br> Cross-Sync Administrator
                            </p>
                        </div>
                        <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 30px; padding: 20px 0;">
                            <p style="margin: 0;">Cross-Sync (Discrepancy Report) &middot; <a href="http://www.innogroup.com.ph/cross-sync" style="color: #00C957; text-decoration: none;">Innogroup</a></p>
                            <p style="margin: 5px 0 0;">&copy; 2025 Innogroup. All rights reserved.</p>
                        </div>
                    </body>
                </html>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
    $headers .= "From: " . $from . "" . "\r\n";

    echo (mail($to, $subject, $message, $headers)) ? 1 : 0;
} else {
    echo 0;
}