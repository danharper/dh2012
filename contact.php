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
		mail(
			$name.' <'.$email.'>',
			'Your message to Dan Harper',
			'Your email has been sent, I\'ll be in touch soon. :)'."\n\nYour Message:\n".wordwrap($message, 70),
			'From: noreply@danharper.me'
		);
	}
	else {
		echo 'Message Not Sent';
		header('HTTP/1.1 500 Internal Server Error');
	}

}
else {
	header('Location: ./#contact');
}