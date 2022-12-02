import React, {Suspense, useState,useEffect,useRef,useLayoutEffect} from 'react';
import Home from '../pages/index.js'
import {data1,Speech} from '../pages/index.js'
import axios from 'axios'
import styles from '../styles/shwPriceAlertzz.module.css'
import {FaCaretDown,FaCaretUp,FaTrashAlt,FaStar,FaInfoCircle,FaWindowClose,FaTimes} from 'react-icons/fa'
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'



export default function ShowPriceAlertz({priceAlertzPing,setPriceAlertzPing,updateArr,setUpdateArr,openPriceALertsModal,setOpenPriceALertsModal,searchGems,setSearchGems,currencySymbol,setCurrencySymbol,activeCoins,setActiveCoins}){
	
const deletePriceAlertIcon = useRef([])

const UpdatePriceAlertStatus = (gemId)=>{
const getGems = activeCoins.map((myGems)=>{
if(myGems.id === gemId){
 return {...myGems,priceAlertz_active:false}
}	
return myGems	
})	
setActiveCoins(getGems)	

}

const deletePriceAlert = async(deleteGem)=>{
	await setPriceAlertzPing((priceAlerts)=> priceAlerts.filter((gem)=>{return gem.id !== deleteGem}))
	UpdatePriceAlertStatus(deleteGem);
	setSearchGems('')
	
}

return (
<>
<div className={openPriceALertsModal? styles.showPriceAlertz_ContianerShow : styles.showPriceAlertz_Contianer} >
<div className={styles.showPriceAlertz_Header}><span>Target Price Alertz :  {priceAlertzPing.length}</span>
<div className={styles.showPriceAlertz_close}><FaTimes onClick = {()=>{setOpenPriceALertsModal(false);setSearchGems('')}}/></div>
</div>
<div  className={styles.showPriceAlertz_ListContainer}  style={{display: priceAlertzPing.length > 0 ? 'block' : 'none'}} >
{
openPriceALertsModal && priceAlertzPing.map((priceAlert,i)=>	
<div className={styles.showPriceAlertz_ListCont_PriceAlertz} onClick={()=>setSearchGems(priceAlert.symbol)} key={priceAlert.name+i} >
<div className={styles.showPriceAlertz_ListCont_PriceAlertz_img}><img src={priceAlert.image} alt={priceAlert.name} /> </div>
<div className={styles.showPriceAlertz_ListCont_PriceAlertz_des}>{priceAlert.name}{' '} has hit your target price of {currencySymbol}{priceAlert.priceAlertz} </div>
<div  className={styles.showPriceAlertz_ListCont_delIcon} ><span ref={(deleteIcon)=> deletePriceAlertIcon.current[i] = deleteIcon} ><FaTrashAlt  onClick={()=>deletePriceAlert(priceAlert.id)} /></span></div>
</div>
)}
</div>
</div>
</>
)
}