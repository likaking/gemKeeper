import React, {Suspense, useState,useEffect,useRef,useLayoutEffect} from 'react';
import Home from '../pages/index.js'
import {data1,Speech} from '../pages/index.js'
import axios from 'axios'
import styles from '../styles/Dipped.module.css'
import {FaCaretDown,FaCaretUp,FaTrashAlt,FaStar,FaInfoCircle,FaWindowClose} from 'react-icons/fa'
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'



export function DisplayCoin({activeCoins,buy,setBuy,setActiveCoins,Speech,setQuickData,setCoinArr,currency,searchGems,openModal,setOpenModal,modalSearch,setModalSearch,startModal,setStartModal,index,setIndex,priceAlertzPing,setPriceAlertzPing}){
const deleteIcon = useRef([]);
const infoIconR = useRef([]);
const star = useRef([]);
const [sticky,setSticky] = useState(false)
const [shadow,setShadow] = useState(false)

const [currencyx, setCurrencyx] = useState('$')


const removeAsset = async(asset)=>{
  if(buy.indexOf(asset) !== -1){
  const findIndexOfAsset = buy.indexOf(asset)
  const filtered = new Promise((resolve,reject)=> {resolve(activeCoins.filter((remove)=>{
  return remove.id !== asset 
   }))});
   
  let result = await filtered
  setActiveCoins(result);
  setBuy(buy.filter(del=>  del !== asset));
 
}
else{
    return false
}
}


const container = useRef([])
const containerL = useRef([])
const leftTable = useRef(null)
const rightTable = useRef(null)
const tableHeader = useRef(null)

//leftTable.current? leftTable.current.style.boxShadow = '4px 0px 3px 1px   #aaaaaa' : ''


    const handleShadow = event => {
    if(event.currentTarget.scrollLeft > 5){
        setShadow(true)
    }
    else{
        setShadow(false)
    }

    };

    const hoverIn = (i)=>{
         container.current[i].style.backgroundColor = 'rgba(252, 207, 249, 0.164)'
         containerL.current[i].style.backgroundColor = 'rgba(252, 207, 249, 0.164)'
    }

    const hoverOut = (i)=>{
        container.current[i].style.backgroundColor = 'rgba(213, 236, 236, 0)'
        containerL.current[i].style.backgroundColor = 'rgba(213, 236, 236, 0)'
   }

   const search = activeCoins.filter((item)=>{
    return item.symbol.includes(searchGems.toLowerCase())});

const Vip = (gem)=>{
const getGem = activeCoins.map((coinz)=>{
    if(coinz.id === gem){
        return {...coinz, vip:coinz.vip === true ? false : true}
    }
   return coinz
})

setActiveCoins(getGem)
}

useEffect(() => {
window.addEventListener('scroll', isSticky);
return () => {
window.removeEventListener('scroll', isSticky);
}
})
      
/* Method that will fix header after a specific scrollable */
const isSticky = (e) => {
const scrollTop = window.scrollY;
scrollTop >= 250 ? setSticky(true): setSticky(false);
};
		
useEffect(()=>{
!sticky? tableHeader.current.style.borderBottom = '1px solid  rgba(238, 194, 238)' : tableHeader.current.style.borderBottom = '0px'
	
},[sticky])


return(
<>
<div className={sticky ? styles.isSticky : ''}><div className={styles.tableHeader} ref={tableHeader}><div></div><div >Name</div><div >Price</div> <div >24h P-Ch</div> <div >ATH</div> <div >ATL</div> <div >Volume 24</div><div >Market Cap</div><div></div></div></div>
<div className={styles.dipedCrypto}>


<div className={styles.dipedCrypto_L} ref = {leftTable} id={shadow? styles.dipedCrypto_L_cont : ''}>
<div className={styles.dipedCrypto_HL_name}><div>Name</div></div>
{
    search? search.map((itemz,index)=> 
	<div key={itemz.id+index} ref = {(el)=> containerL.current[index]=el}  onMouseEnter = {()=>hoverIn(index)} onMouseLeave = {()=>hoverOut(index)} 
	className={styles.dipedCrypto_L_container}> <div className={styles.dipedCrypto_L_rank}><div></div> <div></div> <div>{'#'}{itemz.market_cap_rank}</div> </div>    <div className={styles.dipedCrypto_L_Star_container}> <span ref={(el)=> star.current[index] = el} ><FaStar className={styles.dipedCrypto_L_Star} style = {{color:itemz.vip === true ? 'rgb(243, 74, 243)' :'rgb(216, 189, 216)'}}   onClick={()=>{Vip(itemz.id)}} /></span> </div>
    <div className={styles.dipedCrypto_L_img_container}><a href={`https://www.coingecko.com/en/coins/${itemz.id}`} target='_blank' >
    <img src={itemz.image} alt = {itemz.id}  className={styles.dipedCrypto_L_img}  /></a> </div> 
    <div className={styles.dipedCrypto_L_id}><span className={styles.dipedCrypto_L_id_span}><a href={`https://www.coingecko.com/en/coins/${itemz.id}`} target='_blank' >{itemz.id[0].toUpperCase() + itemz.id.slice(1).toLowerCase() }</a></span>{' '}<span className={styles.dipedCrypto_L_symbol}><a href={`https://www.coingecko.com/en/coins/${itemz.id}`} target='_blank' >{itemz.symbol.toUpperCase()}</a> </span> </div> </div>) : null
}
</div>
<div className={styles.dipedCrypto_R} ref={rightTable} onScroll={handleShadow}>
<div className={styles.dipedCrypto_HR}><div className={styles.dipedCrypto_HR_price}>Price</div> <div className={styles.dipedCrypto_HR_priceCh}>24h P-Ch</div> <div className={styles.dipedCrypto_HR_24H}>ATH</div> <div className={styles.dipedCrypto_HR_7dh}>ATL</div> <div className={styles.dipedCrypto_HR_vol}>Volume 24</div> <div className={styles.dipedCrypto_HR_mktCap}>Market Cap</div> <div className={styles.dipedCrypto_HR_delInfo}></div> </div>
{
    search? search.map((itemz,index)=> {
    var realInex = index;
    return (
    <div key={itemz.id+index} ref = {(el)=> container.current[index]=el} className={styles.dipedCrypto_R_container}  onMouseEnter = {()=>hoverIn(index)} onMouseLeave = {()=>hoverOut(index)}  > 
    <div className={styles.dipedCrypto_R_container_price}>{currencyx}{itemz.current_price < 1 &&<span>{itemz.current_price}</span>} {itemz.current_price >= 1 &&<span>{itemz.current_price.toLocaleString()}</span>}</div>  
    <div className={styles.dipedCrypto_R_container_24hPriceChange} style={{color: itemz.price_change_24h.toString().startsWith("-") ?'red' : 'green' }}><FaCaretDown style={{display: itemz.price_change_24h.toString().startsWith("-") ?'block' : 'none' }} /> <FaCaretUp style={{display: itemz.price_change_24h.toString().startsWith("-") ?'none' : 'block' }} />{currencyx}{itemz.price_change_24h < 1 && <span>{Number(itemz.price_change_24h.toString().replace('-','').slice(0,9))}</span>}  {itemz.price_change_24h > 1 &&<span>{parseFloat(itemz.price_change_24h.toString().replace('-',''))}</span>}</div>
    <div className={styles.dipedCrypto_R_container_24hChange}> {currencyx}{itemz.ath >= 1 ? Number(itemz.ath): Number(itemz.ath).toFixed(3)} </div>
    <div className={styles.dipedCrypto_R_container_7d}>{currencyx}{itemz.atl >= 1 ? Number(itemz.atl): Number(itemz.atl).toFixed(3) }</div>
    <div className={styles.dipedCrypto_R_container_volume}>{currencyx}{itemz.total_volume.toLocaleString()}</div>
    <div className={styles.dipedCrypto_R_container_mktCap}>{currencyx}{itemz.market_cap.toLocaleString()}</div>
    <div className={styles.infoIcon}> <FaInfoCircle  onClick={()=>{setOpenModal(true);setModalSearch(itemz.symbol);setStartModal(true);setIndex(realInex)}} />  </div> <div className={styles.deleteIcon}><FaTrashAlt onClick={()=>{removeAsset(itemz.id)}}/> </div>  </div>)}) : null
}
</div>
</div>

</>
)
}