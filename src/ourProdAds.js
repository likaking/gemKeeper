import React, {Suspense,useRef,useState,useEffect} from 'react'
import styles from '../styles/ProdsAds.module.css'
import {allOurProductsInformation} from '../src/ourProductsMenuInfo.js'



export default function ProductAds(){
	
const imageHolderFX = useRef([])

const scaleImageHover = (number)=>{

imageHolderFX.current[number].style.scale = '1.3'	
	
}

const scaleImageMouseOut = (number)=>{

imageHolderFX.current[number].style.scale = '1.1'	
	
}

return(
<>
<div>
<div className={styles.nav_bar_dropDown_ourProducts_container}>

{
allOurProductsInformation.map((ourProdMenu,index)=>
<div className={styles.nav_bar_dropDown_ourProducts_listContainer} key = {ourProdMenu.product_name + index} onMouseOver = {()=>scaleImageHover(index)} onMouseOut = {()=> scaleImageMouseOut(index)} >
<a href = {ourProdMenu.url} target = '_blank' rel="noreferrer">
<div className={styles.nav_bar_dropDown_ourProducts_img} ref = {(img)=>imageHolderFX.current[index] = img} > <img src = {ourProdMenu.pix} className={styles.nav_bar_dropDown_ourProducts_imgMain} alt = {ourProdMenu.product_name} /> </div>
<div className={styles.nav_bar_dropDown_ourProducts_name}> {ourProdMenu.product_name} </div>
</a>
</div>
)
}
</div>
</div>
</>
)
}