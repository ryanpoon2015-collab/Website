import yagmail


class YaGmail: # Class to send emails using Yagmail
    def __init__(
        self, sender: str, password: str, receiver: str, subject: str, content: str
    ): # Initialize email parameters
        yag = yagmail.SMTP(sender, password)
        yag.send(to=receiver, subject=subject, contents=content) # Send the email
