import Link from 'next/link';
import './custom-link.module.css';

/* eslint-disable-next-line */
export interface CustomLinkProps {
  as: string;
  href: string;
}

export function CustomLink({ as, href, ...props }: CustomLinkProps) {
  return (
    <Link as={as} href={href}>
      <a className="bg-yellow-100" {...props} />
    </Link>
  );
}

export default CustomLink;
