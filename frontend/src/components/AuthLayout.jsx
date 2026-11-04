import Footer from './Footer';

export default function AuthLayout({ title, children }) {
  return (
    <div className="app">
      <main className="auth">
        <div className="auth__card">
          <h2>{title}</h2>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
