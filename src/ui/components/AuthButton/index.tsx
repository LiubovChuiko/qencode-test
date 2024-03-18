import  './authButton.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  auth: string;
  label: string;
  onClick?: () => void;
}

export default function AuthButton(props: ButtonProps) {
  const {auth, label, onClick} = props;

  return (
    <div className="authButton">
    <button type="button" onClick={onClick} className={auth}>
      <span>{label}</span>
    </button>
    </div>
  );
}
