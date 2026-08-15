import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User, Github, Linkedin, Mail, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  const handleSignIn = async () => {
    const { signInWithGoogle } = await import('../lib/firebase');
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    const { logOut } = await import('../lib/firebase');
    await logOut();
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-white flex flex-col">
      {/* 🚀 Floating Glass Header */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="glass-header w-full max-w-5xl rounded-[2.5rem] px-6 h-16 flex justify-between items-center shadow-floating">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg sm:text-xl font-black text-primary italic font-headline flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white border-2 border-on-background shadow-neo">
                <Zap className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="hidden sm:inline">TimeComplexityAI</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              {[
                { to: '/time-complexity-calculator', label: 'Time Calculator' },
                { to: '/space-complexity-calculator', label: 'Space Calculator' },
                { to: '/tutorials', label: 'Tutorials' },
                { to: '/inside-math', label: 'Math Lab' },
                { to: '/blog', label: 'Blog' }
              ].map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  end={item.to === '/'}
                  className={({ isActive }) => 
                    `font-headline font-bold text-xs tracking-tight transition-all duration-300 px-3 py-2 rounded-full active:scale-90 ${
                      isActive 
                        ? 'text-primary bg-primary-container/40' 
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-on-surface-variant font-headline font-bold text-xs">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full border-2 border-primary" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="max-w-[80px] truncate">{user.displayName}</span>
                </div>
                <button onClick={handleSignOut} className="bg-surface-container-high text-on-surface p-2 rounded-full font-headline font-bold text-xs hover:bg-error-container hover:text-error transition-all group">
                  <LogOut className="w-4 h-4 group-hover:scale-110" />
                </button>
              </>
            ) : (
              <button 
                onClick={handleSignIn} 
                className="bg-primary text-white px-5 py-2 rounded-full font-headline font-black text-xs hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-on-primary-container shadow-neo flex items-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" /> <span>Login</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow pt-32 pb-12 px-6 max-w-7xl mx-auto w-full mb-20"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="w-full bg-white border-t-2 border-on-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none graph-paper"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-8 lg:col-span-2">
              <Link to="/" className="text-2xl font-black text-primary italic font-headline flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white border-2 border-on-background shadow-neo group-hover:shadow-neo-lg transition-all">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                TimeComplexityAI
              </Link>

              <div className="space-y-6">
                <h4 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant italic">Developed By</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContributorCard 
                    name="Sushant Garg"
                    github="https://github.com/garg-sushant"
                    linkedin="https://www.linkedin.com/in/sushant-garg-4b0a37284/"
                  />
                  <ContributorCard 
                    name="Akshat Aggarwal"
                    github="https://github.com/akshat-chd"
                    linkedin="https://www.linkedin.com/in/akshat-aggarwal-10bbba301/"
                  />
                </div>
              </div>
            </div>

            <FooterList title="Product" items={[
              { to: '/time-complexity-calculator', label: 'Time Calculator' },
              { to: '/space-complexity-calculator', label: 'Space Calculator' },
              { to: '/tutorials', label: 'Tutorials' },
              { to: '/inside-math', label: 'Math Lab' },
              { to: '/blog', label: 'Big O Blog' }
            ]} />

            <div className="space-y-6">
              <h4 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant italic">Stay Notified</h4>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 bg-surface-container-low border-2 border-on-background rounded-2xl font-body font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-neo transition-all"
                />
                <button className="w-full bg-tertiary text-white py-3 rounded-2xl font-headline font-black uppercase text-xs border-2 border-on-background shadow-neo hover:translate-y-1 hover:shadow-none transition-all">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-2 border-on-background/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-on-surface-variant">
            <p>© 2026 TimeComplexityAI. Every line of code tells a story. 📖</p>
            <div className="flex gap-6">
              <Link to="/time-complexity-calculator" className="hover:text-primary transition-colors">Time Calculator</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/tutorials" className="hover:text-primary transition-colors">Tutorials</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContributorCard({ name, github, linkedin }: { name: string, github: string, linkedin: string }) {
  return (
    <div className="space-y-3">
      <div className="font-headline font-black text-base text-on-background uppercase tracking-tight">{name}</div>
      <div className="flex gap-2">
        <SocialButton href={github} icon={<Github className="w-4 h-4" />} color="hover:bg-primary-container" />
        <SocialButton href={linkedin} icon={<Linkedin className="w-4 h-4" />} color="hover:bg-tertiary-container" />
      </div>
    </div>
  );
}

function SocialButton({ href, icon, color }: { href: string, icon: React.ReactNode, color: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`w-8 h-8 bg-white border-2 border-on-background rounded-lg flex items-center justify-center transition-all shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg ${color}`}
    >
      {icon}
    </a>
  );
}

function FooterList({ title, items }: { title: string, items: { to: string, label: string }[] }) {
  return (
    <div className="space-y-6">
      <h4 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant italic">{title}</h4>
      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.label}>
            <Link to={item.to} className="font-body font-bold text-sm text-on-background/70 hover:text-primary flex items-center gap-2 group">
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all transition-transform group-hover:translate-x-1" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
