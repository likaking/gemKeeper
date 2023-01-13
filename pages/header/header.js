import styles from '/styles/Header.module.css'
import {FaList} from 'react-icons/fa'
import {FaBars} from 'react-icons/fa'
import {FaBattleNet,FaTimes} from 'react-icons/fa'
import { useState,useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {allOurProductsInformation} from '/src/ourProductsMenuInfo.js'
import ProductAds from '/src/ourProdAds.js'




function Navbar(){
  const [toggle, setToggle] = useState(false)
  
  const [toggleOurProducts, setToggleOurProducts] = useState(false)
  
  const [toggleOurProductsMobile, setToggleOurProductsMobile] = useState(false)
  
  const [out, setOut] = useState(false)

  const toggleMenu = ()=> {
    !toggle ? setToggle(true) : setToggle(false);
  }

  const toggleOurProdsSwitch = (e)=> {
	 e.stopPropagation()
    !toggleOurProducts ? setToggleOurProducts(true) : setToggleOurProducts(false); setOut(false);
  }
  
  const toggleOurProdsOffSwitch = ()=> {
    out ? setToggleOurProducts(false) : ''
	setOut(false)
  }

 const  mouseOut = ()=> {
  setOut(true)
  }
  
  const  switchOnOurProdMobile = ()=> {
  setToggleOurProductsMobile(true)
  }
  
  const  switchOffOurProdMobile = ()=> {
  setToggleOurProductsMobile(false)
  }
  
  
  /*
  useEffect(()=>{
  window !== undefined && document.body.addEventListener('click', toggleOurProdsOffSwitch)
  })
  */
  
  
  
return(
<>
<div className={styles.nav_bar}>
<div className={styles.nav_bar__logo}>
<Link href = '/'><img src = {'/logo.png'} alt = 'logo' loading = "" className={styles.nav_bar__logo_icon} /></Link>
</div>

<div className={styles.nav_bar__compName}>
<Link href = '/'>Gem Keeper</Link>
</div>
<div className={styles.nav_bar__wraper} >
<ul className={styles.nav_bar__menu}>
<li ><a href = "#" className={styles.nav_bar__menu_a} onMouseDown = {toggleOurProdsSwitch}  onMouseOut = {mouseOut} >Our Products</a></li>
<li ><a href = "#" className={styles.nav_bar__menu_a} style={{marginLeft:'1rem',marginRight:'1rem'}}>Explore</a></li>
<li><a href = "#" className={styles.nav_bar__menu_a}>Community</a></li>
</ul>
<div className={styles.nav_bar_dropDown_ourProducts}  style={{display: toggleOurProducts ? 'block' : 'none'}} >

<div className={styles.nav_bar_dropDown_ourProducts_container}>

{
toggleOurProducts && allOurProductsInformation.map((ourProdMenu,index)=>
<div className={styles.nav_bar_dropDown_ourProducts_listContainer} key = {ourProdMenu.product_name + index}>
<a href = {ourProdMenu.url} target = '_blank' rel="noreferrer">
<div className={styles.nav_bar_dropDown_ourProducts_img} > <img src = {ourProdMenu.pix} className={styles.nav_bar_dropDown_ourProducts_imgMain} alt = {ourProdMenu.product_name} /> </div>
<div className={styles.nav_bar_dropDown_ourProducts_name}> {ourProdMenu.product_name} </div>
</a>
</div>
)
}
</div>

</div>
</div>


  <div className={styles.nav_bar__mobileBtn} onClick={toggleMenu}><FaBars /></div>
  <div className={styles.nav_Mobilemenu} style={{display : toggle ? 'block' : 'none'}}>
  <div className={styles.nav_ourAmazingProducts}>
  <div  className={styles.nav_ourAmazingProducts_container} >
  <div style={{textAlign:'center',marginBottom:'1.5rem'}}> <span style={{lineHeight:'90%',color:'rgb(192, 37, 192)'}}> OUR AMAZING PRODUCTS </span> </div>
  <div>
  <ProductAds />
  </div>
  </div>
  </div>
  <ul>
  {/*<li><a href = "#" className={styles.nav_bar__menu_aMobile} onClick = {switchOnOurProdMobile} >Our Products</a></li>*/}
  <li><a href = "#" className={styles.nav_bar__menu_aMobile}>Explore</a></li>
  <li><a href = "#" className={styles.nav_bar__menu_aMobile}>Community</a></li>
  </ul>
  </div>

 </div>
</>
)}

export default Navbar;