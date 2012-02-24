<?php
if ($_POST['name']) {

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$sent = mail(
		'Dan Harper <contact@danharper.me>',
		'Website Contact from "'.$name.'"',
		wordwrap($message, 70),
		'From: system@danharper.me'."\r\n".'Reply-To: '.$email
	);

	if ($sent) {
		echo 'Message Sent';
	}
	else {
		echo 'Message Not Sent';
		header('HTTP/1.1 500 Internal Server Error');
	}

}