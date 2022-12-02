import React, {Suspense, useState,useEffect,useRef} from 'react';
import Home from '../pages/index.js'
import {data1,Speech} from '../pages/index.js'
import axios from 'axios'
import styles from '../styles/Dipped.module.css'
import {FaCaretDown,FaCaretUp,FaTrashAlt, FaStar} from 'react-icons/fa'
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'



export default function UpdateCoinInfo({activeCoins,buy,setBuy,setActiveCoins,Speech,setQuickData,setCoinArr,currency,searchGems,updateArr,setUpdateArr}){


const updatePriceETC = (coinid,price,pch24,vol24,ath,atl,marketcap,mktCapRank)=>{
    
setActiveCoins(myGemz=>
myGemz.map(gem=>{
if(gem.id === coinid){
return {...gem,current_price:price,price_change_24h:pch24,total_volume:vol24,ath:ath,atl:atl,market_cap:marketcap,market_cap_rank:mktCapRank}
}
return gem
})
)
}

const dispatchProps = ()=>{
updateArr.map((newInfo)=>{
updatePriceETC(newInfo.id,newInfo.current_price,newInfo.price_change_24h,newInfo.total_volume,newInfo.ath,newInfo.atl,newInfo.market_cap,newInfo.market_cap_rank)
})
}

useEffect(()=>{
dispatchProps()   
},[updateArr])

useEffect(()=>{
const currentUpdate = setInterval(()=>{
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLocaleLowerCase()}&ids=${buy.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  
    axios.get(url).then((res)=>{setUpdateArr(res.data)}).then(()=>{}).catch((err)=> {()=>setCmvErrorsx('No internet connection')})
    
  },600000)

  return ()=>{clearInterval(currentUpdate)}
},[])

return(
<>

</>
)
}