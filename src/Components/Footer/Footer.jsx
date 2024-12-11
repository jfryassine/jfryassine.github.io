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
    <a class="link-1" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>jy.</a>
  </p>

  <p>All Images &copy; 2019-2022 Jaafar Yassine</p>
</div>

</footer>
        </div>
    )
}
