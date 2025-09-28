import type { FC } from 'react';

interface PageSeoProps {
  description?: string | null;
  title?: string;
  type?: string;
}

export const PageMeta: FC<PageSeoProps> = (props) => {
  const { description, title, type = 'Book Tracker' } = props;

  const t = `${title ? `${title} |` : ''} Book Tracker`;

  return (
    <>
      <title>{t}</title>
      <meta content={t} property="og:title" />
      {description && <meta content={description} property="og:description" />}
      <meta content={type} property="og:type" />
      <meta content="Word Flow" property="og:site_name" />
    </>
  );
};
