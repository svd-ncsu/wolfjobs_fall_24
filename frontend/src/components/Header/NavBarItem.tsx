import { Link } from "react-router-dom";

const NavBarItem = (props: { link: string; text: string }) => {
  const { link, text } = props;

  return (
    <li>
      <Link
        to={link}
        className="hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg px-3 py-2 border border-transparent hover:border-blue-500"
      >
        {text}
      </Link>
    </li>
  );
};

export default NavBarItem;

