import Head from "next/head";
const Header = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content="Social Network" />
      <meta name="description" content="Roam around world and share pics" />
    </Head>
  );
};
export default Header;
Header.defaultProps = {
  title: "Travelinsta",
};
