import React from 'react'
import {Instagram,LinkedIn,GitHub} from "@material-ui/icons"
import './footer.scss'

export default function Footer() {
    return (
        <div>
            <footer class="footer-distributed">

<div class="footer-right">

  <a href="https://www.instagram.com/jfryassine/" target="_blank" rel="noopener noreferrer"><Instagram className="icon"/></a>
  <a href="https://www.linkedin.com/in/jaafaryassine/" target="_blank" rel="noopener noreferrer"><LinkedIn className="icon"/></a>
  <a href="https://github.com/jfryassine" target="_blank" rel="noopener noreferrer"><GitHub className="icon"/></a>

</div>

<div class="footer-left">

  <p class="footer-links">
    <a class="link-1" href="#main">jy.</a>
  </p>

  <p>Jaafar Yassine &copy; 2021</p>
</div>

</footer>
        </div>
    )
}
