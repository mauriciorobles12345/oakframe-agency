export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-orange-300/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-black font-black text-xs">O</span>
          <span className="text-white font-semibold tracking-tight text-sm">
            Oakframe<span className="text-orange-400"> Studio</span>
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-orange-100/40">
          {['Work', 'Services', 'Process', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-orange-300 transition-colors duration-200">{l}</a>
          ))}
        </nav>
        <p className="text-orange-100/30 text-xs">© {year} Oakframe Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
