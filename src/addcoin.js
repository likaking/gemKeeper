import React, {Suspense, useState,useEffect,useRef} from 'react';
import styles from '../styles/Home.module.css'
import Home from '../pages/index.js'
import {data1} from '../pages/index.js'
import axios from 'axios'
import {FaBell} from 'react-icons/fa'


  

export function AddCrypto({activeCoins,buy,setBuy,setActiveCoins,currency,speech,quickData,setQuickData,setCoinArr,setRunOrStop,searchGems,setSearchGems,priceAlertzPing,setPriceAlertzPing,openPriceALertsModal,setOpenPriceALertsModal}){
const [coinAlreadyExistError,setCoinAlreadyExistError] = useState('')
const coinIsExitingErr = useRef(null)
const [addNewCoin, setAddNewCoin] = useState('')
const [addNewCoinData, setAddNewCoinData] = useState([])
const [currencyxe, setCurrencyxe] = useState('usd')
const addCoinError = useRef(null)
const addCoinInput = useRef(null)
const netWorkErr = useRef(null)
const textArea  = useRef(null)
const priceAlertz = useRef(null)
const addCoinContainer = useRef(null)
const addCoinForm = useRef(null)
const addUrCoin = useRef(null)



const addCoin = (coin)=>{
    var coin_Lcase = coin.id.toLowerCase()
    var ansa = activeCoins.find((coinName)=>{return coinName.id === coin_Lcase })
    if(ansa === undefined && buy.indexOf(coin.id) === -1){
    setActiveCoins([...activeCoins,coin]);
    setBuy([...buy,coin.id]);
    }
    else{
    coinIsExitingErr.current.style.display = 'block'
    return false
    }
    }
  
    const showNetWorkErr = ()=>{
      netWorkErr.current.style.display = 'block'
    }
    const hideNetWorkErr = ()=>{
      netWorkErr.current.style.display = 'none'
    }
    
    const grab = (e)=>{
      
        e.preventDefault()
        
        hideShowAddCoinErr();
        if(addCoinInput.current.value === ''){
          setAddNewCoin('')
          setAddNewCoinData([])
          addCoinError.current.style.display = 'block'
          return false
        }
        
        else{
        const grabUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&symbols=${addNewCoin}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
     
        axios.get(grabUrl).then((res)=>{setAddNewCoinData([...res.data])}).catch((err)=>{showNetWorkErr()})
        }
        };

       const hideShowAddCoinErr = ()=>{
        if(addNewCoin){
        if(addCoinInput.current.value.length > 0 ){
          addCoinError.current.style.display = 'none'
        }
        }
        };

       const hideAddCoinErr = ()=>{
          addCoinError.current.style.display = 'none'
        };
    
useEffect(()=>{      
const hideShowNotes = ()=>{

  if(addNewCoinData.length > 0 && addNewCoin.length > 0 && addCoinInput.current.value !== ''){
    //textArea.current.style.display = 'block'
    priceAlertz.current.style.display = 'block'
    addCoinContainer.current.style.display = 'block'
	addCoinForm.current.style.display = 'block'
  }
  else{
    //textArea.current.style.display = 'none'
    priceAlertz.current.style.display = 'none'
    addCoinContainer.current.style.display = 'none'
    //textArea.current.value = ' '
    priceAlertz.current.value = ' '
	addCoinForm.current.style.display = 'none'
	setSearchGems('');
	addUrCoin.current = ''
  }
}
hideShowNotes()
},[addNewCoinData,addNewCoin])


return(
<>
<div className={styles.main_cmv_contianer}>
 
  <div className={styles.cmv_device_contianer}>
  <div className={styles.cmv_device_inputnBtn_container}>
  <div className={styles.main_cmv_totalGems}>Total:{' '}{activeCoins? activeCoins.length : null}{activeCoins.length > 1? ' gems' : ' gem'} {' '} | <span onClick = {()=>{setOpenPriceALertsModal(true)}} style={{cursor:'pointer'}} >Price Alertz {priceAlertzPing.length} </span> </div>
  <form>
  <div className={styles.cmv_device_search_cont}>
  <input placeholder = 'Search gems' type= 'text' name = 'search' className={styles.cmv_device_search}  onChange={(e)=>{setSearchGems(e.target.value)}} />
  </div>
  </form>
  
  <form onSubmit={grab}>
  <input placeholder = 'Add gems' type= 'text' name = 'addCoin' className={styles.cmv_device_input} value = {addNewCoin} ref = {addCoinInput} onChange = {(e)=>{setAddNewCoin(e.target.value.toLocaleLowerCase())}}  onFocus = {()=> {coinIsExitingErr.current.style.display = 'block'? coinIsExitingErr.current.style.display = 'none' : ''; addCoinError.current.style.display = 'block'? addCoinError.current.style.display = 'none' : '';hideNetWorkErr()}}/>
  <input className={styles.cmv_device_grabBtn} type='submit' value={'grab'} onClick = {hideNetWorkErr}  />
  </form>
  </div>
 <div className={styles.addCoin_contianerM} ref={addCoinContainer} >
  <div style={{cursor:'pointer'}} >
 {
  addNewCoinData.length > 0 && addCoinInput.current.value !== '' && addNewCoinData.map((coin,i) =>
   i < 1 &&
    <div key = {coin.id+i} ref = {addUrCoin} className={styles.cmv_device_addCoinResult} onClick = {()=>{addCoin({id:coin.id,current_price:'',symbol:coin.symbol,name:coin.name,image:coin.image,price_change_24h:'',ath:coin.ath,atl:coin.atl,total_volume:'',vip:false,note:textArea.current.value,priceAlertz_active:priceAlertz.current.value.length === 0 ? false : true,priceAlertz:Number(priceAlertz.current.value),market_cap:coin.market_cap,market_cap_rank:''}); setAddNewCoinData([])}}><img src = {coin.image} alt = {coin.name}  className={styles.cmv_device_result_img}/><div>{coin.name}</div><div className={styles.cmv_device_addCoinResult_click} >click 2 add</div></div>
 )
 }
 </div>
 <div ref={addCoinForm} style={{display:'none'}} >
 <form >
 <textarea placeholder="Add Note..." className={styles.cmv_device_addNote} ref= {textArea}></textarea >
 <input type = 'number'  placeholder='Add Price alert!'  className={styles.cmv_device_priceAlertz} ref= {priceAlertz}  />
 </form>
 </div>
 </div>
  <div className={styles.cmv_device_grabBtn_errorContainer} ref = {addCoinError}>
  <p className={styles.cmv_device_grabBtn_error} >Please add a text to the input field</p>
  </div>
  <div className={styles.cmv_device_grabBtn_coinsExisterror} ref = {coinIsExitingErr}>
<p className={styles.cmv_device_grabBtn_error} >This crypto has already been added</p>
</div>

<div className={styles.cmv_device_grabBtn_coinsExisterror} ref = {netWorkErr}>
<p className={styles.cmv_device_grabBtn_error} >Can't fetch data</p>
</div>
  </div>
  </div>

</>
)

}