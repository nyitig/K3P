const fullaPageTemplate=`
<header id="header" class="column width100">
<section id="header1Lev" class="row">
    <div id="logoCont" class="row alItCent">
        <img class="svgImg marginLeft1" src="/assets/pic/key-outline.svg" width="30" height="30" alt="">
        <h2 id="" class="textUpper turkColor marginLeft1">K3P</h2>
        <div id="searchCont" class="row alItCent marginLeft2">
            <img class="svgImg marginLeft1" src="/assets/pic/search-outline.svg" width="30" height="30" alt="">
            <input type="search" name="searchInput" id="" class="">
        </div>
    </div>
    <div id="toolbarBtn" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img id="toolsArrow" class="svgIcons svgImg" src="/assets/pic/caret-down-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Toolbar</span>
    </div>
    <div id="rPHeadMenuCont" class="">
        <div id="menucont" class="row">
            <div id="profPicCont" class="column">
                <img id="profPic" class="svgImgBrown" src="/assets/pic/person-circle-outline.svg" width="40" height="40" alt="">                        
            </div>
            <ul id="menuUl" class="column marginLeft1">
                <li id="liMenuOne" class="row alItCent cursorPoint">
                    <h3 id="name" class="">Name</h3>
                    <img id="menuArrow" class="marginLeft1 svgImgBrown" src="/assets/pic/caret-down-outline.svg" width="30" height="30" alt="">
                </li>
                <li id="" class="lis cursorPoint">Menu1</li>
                <li id="" class="lis cursorPoint">Menu2</li>
                <li id="" class="lis cursorPoint">Menu3</li>
                <li id="quit" class="lis cursorPoint">Quit</li>
            </ul>
        </div>
    </div>
</section>
<section id="header2Lev" class="row marginTopTwo">
    <div id="" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img class="svgIcons svgImg" src="/assets/pic/add-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Function1</span>
    </div>
    <div id="" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img class="svgIcons svgImg" src="/assets/pic/add-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Function2</span>
    </div>
    <div id="" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img class="svgIcons svgImg" src="/assets/pic/add-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Function3</span>
    </div>
    <div id="" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img class="svgIcons svgImg" src="/assets/pic/add-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Function4</span>
    </div>
    <div id="" class="row alItCent paddingLeftRight btnAll btnWhite marginLeft2">
        <img class="svgIcons svgImg" src="/assets/pic/add-outline.svg" width="30" height="30" alt="">
        <span class="marginLeft1 turkColor">Function5</span>
    </div>
</section>


</header>
<main id="main" class="row width100">
<section id="leftPanel" class="column ">

 </section>
 <section id="centerPanel" class="column active">

 </section>
 <section id="rightPanel" class="column active">

 </section>
 <section id="inputPanel" class="column ">
    <h2>Ez az input section</h2>
 </section>
 <section id="wrongPanel" class="column alItCent">

 </section>
</main>

`
if (sessionStorage.kdbx!=undefined) {
  createFullPage()
}

function createFullPage() {
  const fullPageSect=document.getElementById('fullPageSect')
  fullPageSect.innerHTML=fullaPageTemplate
}