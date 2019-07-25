export const sideBar = {
  htmlTag: [`<div class="wrapper">
  <nav id="sidebar" class="active">
      <div class="sidebar-header">
          <h3>changename</h3>
      </div>

      <ul class="list-unstyled components">
          <li>
              <a class="text" [routerLink]="['/']">Home</a>
          </li>
      </ul>
  </nav>
  <div id="content" class="active">
      <a id="nav-toggle"><span></span></a>
  </div>
</div>`],
  css: [`#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
  }

  .text {
    color: white;
  }
  
  #sidebar.active {
    margin-left: -250px;
  }
  
  #sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
  }
  
  #sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
  }
  
  #sidebar ul p {
    color: #fff;
    padding: 10px;
  }
  
  #sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
  }
  
  #sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
  }
  
  #sidebar ul li.active>a,
  a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
  }
  
  
  a[data-toggle="collapse"] {
    position: relative;
  }
  
  
  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
  }
  
  #content {
    width: calc(100% - 250px);
    padding: 40px;
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    right: 0;
  }
  
  #content.active {
    width: 100%;
  }
  
  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
  
  #nav-toggle {
    position: absolute;
  }
  
  #nav-toggle {
    cursor: pointer;
  }
  
  #nav-toggle span,
  #nav-toggle span:before,
  #nav-toggle span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 5px;
    width: 35px;
    background: white;
    position: absolute;
    display: block;
    content: '';
  }
  
  #nav-toggle span:before {
    top: -10px;
  }
  
  #nav-toggle span:after {
    bottom: -10px;
  }
  
  #nav-toggle span,
  #nav-toggle span:before,
  #nav-toggle span:after {
    transition: all 500ms ease-in-out;
  }
  
  #nav-toggle.active span {
    background-color: transparent;
  }
  
  #nav-toggle.active span:before,
  #nav-toggle.active span:after {
    top: 0;
  }
  
  #nav-toggle.active span:before {
    transform: rotate(45deg);
  }
  
  #nav-toggle.active span:after {
    transform: rotate(-45deg);
  }
  
  #nav-toggle.change {
    position: fixed !important;
    float: left;
    z-index: 10000;
    margin-top: 0%;
    margin-left: -7%;
  }
  
  @media only screen and(max-width:600px){
    #nav-toggle.change {
      margin-left: -18%;
      margin-top: -1%;
  }
  }
  
  @media only screen and(min-width:600px){
    #nav-toggle.change {
      margin-left: -12%;
  }
  }
  
  @media only screen and(min-width:767px){
    #nav-toggle.change {
      margin-left: -11%;
      margin-top: -1%;
  }
  }
  
  @media only screen and(min-width:992px){
    #nav-toggle.change {
      margin-left: -8%;
      margin-top: -5px;
  
  }
  }
  
  @media only screen and(min-width:1200px){
    #nav-toggle.change {
      margin-left: -7%;
      margin-top: 0;
  }
  }`],
  script: [
    `<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>`,
    `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>`,
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>`,
    `<script type="text/javascript">
    $(document).ready(function () {
        var el = document.querySelector("#nav-toggle");
        if (el) {
            el.addEventListener("click", function () {
                this.classList.toggle("active");
                this.classList.toggle("change");
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });;
        }
    });
</script>`
  ]
}