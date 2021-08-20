const Footer = () => {
  const date = new Date();

  return (
    <footer className="text-center py-8 text-gray-500">&copy; {date.getUTCFullYear()} Created by Raydium Labs</footer>
  );
};

export default Footer;
