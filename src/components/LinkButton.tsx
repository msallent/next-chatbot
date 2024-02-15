import Link from 'next/link';
import classNames from 'classnames';

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: 'small' | 'default';
};

export function LinkButton({ href, children, size = 'default' }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={classNames('rounded-md bg-neutral-950 border border-neutral-800', {
        'py-2 px-4': size === 'default',
        'py-1 px-2': size === 'small',
      })}
    >
      {children}
    </Link>
  );
}
