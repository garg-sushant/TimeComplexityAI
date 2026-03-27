import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, logOut } from '../lib/firebase';
import { LogIn, LogOut, User, Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Layout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-white flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b-4 border-on-background shadow-[0_4px_0_rgba(15,23,42,0.05)]">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl sm:text-2xl font-black text-primary italic font-headline flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white border-2 sm:border-4 border-on-background shadow-[2px_2px_0_#0f172a] sm:shadow-[4px_4px_0_#0f172a]">A</div>
              <span className="truncate max-w-[100px] sm:max-w-none">AlgoStory</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${
                    isActive 
                      ? 'text-primary border-b-4 border-primary' 
                      : 'text-on-surface-variant hover:text-primary border-b-4 border-transparent'
                  }`
                }
              >
                Analyzer
              </NavLink>
              <NavLink 
                to="/tutorials" 
                className={({ isActive }) => 
                  `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${
                    isActive 
                      ? 'text-primary border-b-4 border-primary' 
                      : 'text-on-surface-variant hover:text-primary border-b-4 border-transparent'
                  }`
                }
              >
                Tutorials
              </NavLink>
              <NavLink 
                to="/inside-math" 
                className={({ isActive }) => 
                  `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${
                    isActive 
                      ? 'text-primary border-b-4 border-primary' 
                      : 'text-on-surface-variant hover:text-primary border-b-4 border-transparent'
                  }`
                }
              >
                Inside the Math
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-on-surface-variant font-headline font-bold text-xs sm:text-sm">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                  <span className="hidden lg:inline">{user.displayName}</span>
                </div>
                <button onClick={logOut} className="bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-headline font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <button onClick={signInWithGoogle} className="bg-primary text-on-primary px-4 sm:px-8 py-2 sm:py-3 rounded-full font-headline font-bold text-[10px] sm:text-sm hover:scale-105 active:scale-95 transition-all duration-200 border-2 sm:border-4 border-on-primary-container shadow-[3px_3px_0_#064e3b] sm:shadow-[6px_6px_0_#064e3b] flex items-center gap-1 sm:gap-2">
                <LogIn className="w-3 h-3 sm:w-4 sm:h-4" /> <span>Get Started</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-28 pb-12 px-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="w-full mt-32 bg-white border-t-8 border-on-background relative overflow-hidden">
        {/* Decorative Grid Pattern for Footer */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none graph-paper"></div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <Link to="/" className="text-3xl font-black text-primary italic font-headline flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white border-4 border-on-background shadow-[4px_4px_0_#0f172a]">A</div>
                AlgoStory
              </Link>
              <p className="font-body text-on-surface-variant font-bold leading-relaxed max-w-xs">
                Empowering developers to visualize algorithms and master code complexity through the art of storytelling.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/garg-sushant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/sushant-garg-4b0a37284/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-tertiary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://discordapp.com/users/1181611562277011611" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-secondary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]">
                  <Twitter className="w-5 h-5 flex-shrink-0" fill="currentColor" />
                  <span className="sr-only">Discord: sushantgarg.</span>
                </a>
              </div>
            </div>

            {/* Column 2: Product */}
            <div className="space-y-6">
              <h4 className="font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-primary decoration-4 underline-offset-4">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> AI Analyzer</Link></li>
                <li><Link to="/tutorials" className="font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> Knowledge Base</Link></li>
                <li><Link to="/inside-math" className="font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> Complexity Lab</Link></li>
              </ul>
            </div>

            {/* Column 3: Community */}
            <div className="space-y-6">
              <h4 className="font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-secondary decoration-4 underline-offset-4">Community</h4>
              <ul className="space-y-4">
                <li><a href="#" className="font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> Docs</a></li>
                <li><a href="#" className="font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> Open Source</a></li>
                <li><a href="https://discordapp.com/users/1181611562277011611" target="_blank" rel="noopener noreferrer" className="font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" /> Discord (sushantgarg.)</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter/CTA */}
            <div className="space-y-6">
              <h4 className="font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-tertiary decoration-4 underline-offset-4">Stay Notified</h4>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 bg-white border-4 border-on-background rounded-xl font-body font-bold text-sm focus:outline-none focus:ring-4 focus:ring-tertiary/20 shadow-[4px_4px_0_#94a3b8]"
                />
                <button className="mt-4 w-full bg-tertiary text-white py-3 rounded-xl font-headline font-black uppercase text-sm border-4 border-on-background shadow-[4px_4px_0_#4c1d95] hover:translate-y-1 hover:shadow-none transition-all">
                  Join The Story
                </button>
              </div>
              <p className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                <Mail className="w-4 h-4" /> weekly tips on complexity.
              </p>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t-4 border-on-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-on-surface-variant">
            <p>© 2026 AlgoStory. Every line of code tells a story. 📖</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
