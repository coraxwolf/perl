import Link from 'next/link';


export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        <h1 className="text-5xl font-heading ml-2">
          EO Query Tool
        </h1>
      </div>
      <ul className="flex">
        <li className="nav-links px-4 cursor-pointer capitalized font-heading hover:scale-105 duration-200">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-links px-4 cursor-pointer capitalized font-heading hover:scale-105 duration-200">
          <Link href="/query">Query Import</Link>
        </li>
        <li className="nav-links px-4 cursor-pointer capitalized font-heading hover:scale-105 duration-200">
          <Link href="/courses">Course Listings</Link>
        </li>
      </ul>
    </nav>
  );
};
