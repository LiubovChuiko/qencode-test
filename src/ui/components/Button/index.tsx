import './button.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean;
  label: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const {active, type, label, onClick} = props;

  return (
    <div className="custonButton">
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={active ? 'active' : 'disabled'}>
      <span className={active ? 'active' : 'disabled'}>{label}</span>
    </button>
    </div>
  );
}
