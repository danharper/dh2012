<?php
if ($_POST) {

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	if ( ! $name)
		its_bad('You must provide a name');
	if ( ! filter_var($email, FILTER_VALIDATE_EMAIL))
		its_bad('You must provide a valid email address');
	if ( ! $message)
		its_bad('You must provide a message');

	$sent = mail(
		'Dan Harper <contact@danharper.me>',
		'Website Contact from "'.$name.'"',
		wordwrap($message, 70),
		'From: system@danharper.me'."\r\n".'Reply-To: '.$email
	);

	if ($sent) {
		mail(
			$name.' <'.$email.'>',
			'Your message to Dan Harper',
			'Your email has been sent, I\'ll be in touch soon. :)'."\n\nYour Message:\n".wordwrap($message, 70),
			'From: noreply@danharper.me'
		);
		its_all_good();
	}
	else {
		its_error();
	}

}
else {
	header('Location: ./#contact');
}

function its_bad($message = 'You must fill in all fields') {
	header('HTTP/1.1 400 Bad Request');
	echo $message;
	die();
}

function its_error($message = 'There was an error sending your message') {
	header('HTTP/1.1 500 Internal Server Error');
	echo $message;
	die();
}

function its_all_good($message = 'Message sent :)') {
	echo $message;
	die();
}