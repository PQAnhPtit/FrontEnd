let navbar = document.getElementById('navbar');
let lastScrollTop =  document.documentElement.scrollTop;
let st;



function navbar_open() {
    var x = document.getElementById("myAccordion");
    if (x.style.display === 'none') {
      x.style.display = 'block';
      if (document.getElementById("navbtn_menu")) {
        document.getElementById("navbtn_menu").getElementsByTagName("i")[0].style.display = "none";
        document.getElementById("navbtn_menu").getElementsByTagName("i")[1].style.display = "inline";
      }
    } else {
      x.style.display = 'none';
      if (document.getElementById("navbtn_menu")) {
        document.getElementById("navbtn_menu").getElementsByTagName("i")[0].style.display = "inline";
        document.getElementById("navbtn_menu").getElementsByTagName("i")[1].style.display = "none";
      }
    }
  }
  function navbar_close() {
    document.getElementById("myAccordion").style.display = "none";
  }
  function open_xs_menu(x) {
    if (document.getElementById("sectionxs_" + x).innerHTML == "") {
      document.getElementById("sectionxs_" + x).innerHTML = document.getElementById("nav_" + x).innerHTML;
    } else {
      document.getElementById("sectionxs_" + x).innerHTML = "";
    }
  }
  function navbar_open_nav(x) {
    if (document.getElementById("nav_" + x).style.display == "block") {
      navbar_close_nav(x);
    } else {
    
      document.getElementById("nav_" + x).style.display = "block";
      if (document.getElementById("navbtn_" + x)) {
        document.getElementById("navbtn_" + x).getElementsByTagName("i")[0].style.display = "none";
        document.getElementById("navbtn_" + x).getElementsByTagName("i")[1].style.display = "inline";
        document.getElementById("navbtn_" + x).classList.add("mystyle");
      } 
      if (x == "search") {
        if (document.getElementById("gsc-i-id1")) {document.getElementById("gsc-i-id1").focus(); }
      }
    }
  }
  function navbar_close_all_nav() {
    navbar_close_nav("menus");
  
    navbar_close();
  }
  function navbar_close_nav(x) {
    document.getElementById("nav_" + x).style.display = "none";
    if (document.getElementById("navbtn_" + x)) {
      document.getElementById("navbtn_" + x).getElementsByTagName("i")[0].style.display = "inline";
      document.getElementById("navbtn_" + x).getElementsByTagName("i")[1].style.display = "none";
      document.getElementById("navbtn_" + x).classList.remove("mystyle");
    }
  }
  
(()=> {
  
    window.addEventListener('scroll', function () {
        if(window.innerWidth > 700) {
            st = window.pageYOffset || document.documentElement.scrollTop;
           
            if (st > lastScrollTop){
                navbar.style.top = '-75px';
            } 
            else { 
                navbar.style.top = '0px';
            }
           
            lastScrollTop = st <= 0 ? 0 : st;
        }
    });
  })();