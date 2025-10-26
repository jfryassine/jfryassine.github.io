import React from 'react';
import { Instagram, LinkedIn, GitHub } from '@material-ui/icons';
import './footer.scss';

const Footer: React.FC = () => {
  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-right">
          <a href="https://www.instagram.com/jfryassine/" target="_blank" rel="noopener noreferrer">
            <Instagram className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/jaafaryassine/" target="_blank" rel="noopener noreferrer">
            <LinkedIn className="icon" />
          </a>
          <a href="https://github.com/jfryassine" target="_blank" rel="noopener noreferrer">
            <GitHub className="icon" />
          </a>
        </div>

        <div className="footer-left">
          <p className="footer-links">
            <a className="link-1" href="#top" onClick={handleScrollToTop}>
              jy.
            </a>
          </p>

          <p>All Images &copy; 2019-2022 Jaafar Yassine</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
