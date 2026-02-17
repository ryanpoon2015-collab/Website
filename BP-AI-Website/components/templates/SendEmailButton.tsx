interface SendEmailButtonProps {
  children: React.ReactNode;
  email: string;
  subject: string;
  body: string;
}

const SendEmailButton: React.FC<SendEmailButtonProps> = ({
  children,
  email,
  subject,
  body,
}) => {
  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`}
    >
      {children}
    </a>
  );
};

export default SendEmailButton;
