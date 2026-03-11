import { useAppStore } from "../store/appStore";

function NavBar() {
  const user = useAppStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const logout = useAppStore((state) => state.logout);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  return (
    <nav>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}> Toggle Theme</button>
      {user ? (
        <>
          <span>Hi, {user}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span> Guest</span>
      )}
    </nav>
  );
}

export default NavBar;
