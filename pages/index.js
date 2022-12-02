import React, {Suspense} from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from "next/link"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {FaBars} from 'react-icons/fa'
import {FaFacebook, FaTwitter, FaTiktok, FaYoutube, FaCopyright, FaArrowUp, FaArrowRight, FaUserFriends,FaShoppingBasket,FaHamburger} from 'react-icons/fa'
import { useState,useEffect,useRef } from 'react';
import axios from 'axios'
import Header from './header/header.js';
import { useReducer } from "react";
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'
import {DisplayCoin} from '../src/displayCoin.js'
import {Currencies} from '../src/currencies.js'
import UpdateCoinInfo from '../src/updateCoinInfo.js'
import InfoModal from '../src/InfoModal.js'
import AddPriceAlertz from '../src/priceAlertz.js'
import DisplayPriceAlertz from '../src/showPriceAlerts.js'


const Footer = React.lazy(()=> import('./footer/footer.js'))

const myGems = [ {
        "id": "bitcoin-cash",
        "symbol": "bch",
        "name": "Bitcoin Cash",
        "image": "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492",
        "current_price":'',
        "market_cap":'',
        "market_cap_rank": 33,
        "fully_diluted_valuation": 2609054837,
        "total_volume": '',
        "high_24h": 125.19,
        "low_24h": 122.89,
        "price_change_24h": '',
        "price_change_percentage_24h": 0.66197,
        "market_cap_change_24h": 18220323,
        "market_cap_change_percentage_24h": 0.76885,
        "circulating_supply": 19220937.3966509,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": '',
        "ath_change_percentage": -96.71813,
        "ath_date": "2017-12-20T00:00:00.000Z",
        "atl": '',
        "atl_change_percentage": 61.49492,
        "atl_date": "2018-12-16T00:00:00.000Z",
        "roi": null,
        "last_updated": "2022-11-05T22:30:30.181Z",
        "vip":true,
        'note':'This coin Bch will hit',
		'priceAlertz_active':true,
        'priceAlertz':80.28
      },
      {
        "id": "tezos",
        "symbol": "xtz",
        "name": "Tezos",
        "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862",
        "current_price":'',
        "market_cap": '',
        "market_cap_rank": 47,
        "fully_diluted_valuation": null,
        "total_volume": '',
        "high_24h": 1.47,
        "low_24h": 1.43,
        "price_change_24h": '',
        "price_change_percentage_24h": 1.48455,
        "market_cap_change_24h": 23630324,
        "market_cap_change_percentage_24h": 1.82795,
        "circulating_supply": 907157159.543823,
        "total_supply": null,
        "max_supply": null,
        "ath":'',
        "ath_change_percentage": -84.08124,
        "ath_date": "2021-10-04T00:41:18.025Z",
        "atl":'',
        "atl_change_percentage": 314.05517,
        "atl_date": "2018-12-07T00:00:00.000Z",
        "roi": {
          "times": 2.0801935605371806,
          "currency": "usd",
          "percentage": 208.0193560537181
        },
        "last_updated": "2022-11-05T22:31:17.993Z",
        "vip":true,
        'note':'This coin Tezos will hit',
		'priceAlertz_active':true,
        'priceAlertz':Number(0.50).toFixed(2)
      },
      {
        "id": "eos",
        "symbol": "eos",
        "name": "EOS",
        "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481",
        "current_price":'',
        "market_cap": '',
        "market_cap_rank": 52,
        "fully_diluted_valuation": null,
        "total_volume": '',
        "high_24h": 1.21,
        "low_24h": 1.18,
        "price_change_24h": '',
        "price_change_percentage_24h": -1.47378,
        "market_cap_change_24h": -16403108.934966087,
        "market_cap_change_percentage_24h": -1.35553,
        "circulating_supply": 1014258230.9114,
        "total_supply": null,
        "max_supply": null,
        "ath": '',
        "ath_change_percentage": -94.81967,
        "ath_date": "2018-04-29T07:50:33.540Z",
        "atl": '',
        "atl_change_percentage": 134.17987,
        "atl_date": "2017-10-23T00:00:00.000Z",
        "roi": {
          "times": 0.19072813928015456,
          "currency": "usd",
          "percentage": 19.072813928015453
        },
        "last_updated": "2022-11-05T22:31:34.385Z",
        "vip":false,
        'note':'This coin EOS will hit',
		'priceAlertz_active':true,
        'priceAlertz':Number(0.60).toFixed(2)
      },
  
      {
        "id": "aptos",
        "symbol": "apt",
        "name": "Aptos",
        "image": "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png?1666839629",
        "current_price":'',
        "market_cap": '',
        "market_cap_rank": 56,
        "fully_diluted_valuation": 7812035168,
        "total_volume": '',
        "high_24h": 7.97,
        "low_24h": 7.54,
        "price_change_24h": '',
        "price_change_percentage_24h": 2.91646,
        "market_cap_change_24h": 26812041,
        "market_cap_change_percentage_24h": 2.71431,
        "circulating_supply": 130000000,
        "total_supply": 1000935772.48,
        "max_supply": null,
        "ath": '',
        "ath_change_percentage": -43.1181,
        "ath_date": "2022-10-19T01:03:53.771Z",
        "atl": '',
        "atl_change_percentage": 16.01609,
        "atl_date": "2022-10-19T03:53:04.558Z",
        "roi": null,
        "last_updated": "2022-11-05T22:31:32.315Z",
        "vip":false,
        'note':'This coin Aptos will hit',
		'priceAlertz_active':false,
        'priceAlertz':1
      },
      {
        "id": "jasmycoin",
        "symbol": "jasmy",
        "name": "JasmyCoin",
        "image": "https://assets.coingecko.com/coins/images/13876/large/JASMY200x200.jpg?1612473259",
        "current_price":'',
        "market_cap": '',
        "market_cap_rank": 594,
        "fully_diluted_valuation": null,
        "total_volume": '',
        "high_24h": 0.00627352,
        "low_24h": 0.00587206,
        "price_change_24h": '',
        "price_change_percentage_24h": '',
        "market_cap_change_24h": 61499,
        "market_cap_change_percentage_24h": 0.21481,
        "circulating_supply": 4754930780,
        "total_supply": 50000000000,
        "max_supply": null,
        "ath": '',
        "ath_change_percentage": -99.87401,
        "ath_date": "2021-02-16T03:53:32.207Z",
        "atl": '',
        "atl_change_percentage": 43.60141,
        "atl_date": "2022-10-23T01:09:15.249Z",
        "roi": null,
        "last_updated": "2022-11-05T22:31:32.891Z",
        "vip":false,
        'note':'This coin Jasmy will hit',
        'priceAlertz':Number(0.00110).toPrecision(10),
		'priceAlertz_active':false
      },
      {
        "id": "burger-swap",
        "symbol": "burger",
        "name": "BurgerCities",
        "image": "https://assets.coingecko.com/coins/images/12563/large/burger.png?1600786553",
        "current_price":'',
        "market_cap": '',
        "market_cap_rank": null,
        "fully_diluted_valuation": 24332892,
        "total_volume": '',
        "high_24h": 0.894937,
        "low_24h": 0.867242,
        "price_change_24h": '',
        "price_change_percentage_24h": -0.21522,
        "market_cap_change_24h": 0,
        "market_cap_change_percentage_24h": 0,
        "circulating_supply": 0,
        "total_supply": 28000000,
        "max_supply": 28000000,
        "ath": '',
        "ath_change_percentage": -96.84745,
        "ath_date": "2021-05-03T01:14:17.638Z",
        "atl": '',
        "atl_change_percentage": 188.6616,
        "atl_date": "2022-05-12T07:20:44.524Z",
        "roi": null,
        "last_updated": "2022-11-05T22:31:21.823Z",
        "vip":true,
        'note':'This coin Burger Swap will hit',
		'priceAlertz_active':false,
        'priceAlertz':''
      }]
	  
	  const myPriceAlertz = [{
    "id": "tezos",
    "symbol": "xtz",
    "name": "Tezos",
    "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862",
    "current_price":'',
    "market_cap": '',
    "market_cap_rank": 47,
    "fully_diluted_valuation": null,
    "total_volume": '',
    "high_24h": 1.47,
    "low_24h": 1.43,
    "price_change_24h": '',
    "price_change_percentage_24h": 1.48455,
    "market_cap_change_24h": 23630324,
    "market_cap_change_percentage_24h": 1.82795,
    "circulating_supply": 907157159.543823,
    "total_supply": null,
    "max_supply": null,
    "ath":'',
    "ath_change_percentage": -84.08124,
    "ath_date": "2021-10-04T00:41:18.025Z",
    "atl":'',
    "atl_change_percentage": 314.05517,
    "atl_date": "2018-12-07T00:00:00.000Z",
    "roi": {
      "times": 2.0801935605371806,
      "currency": "usd",
      "percentage": 208.0193560537181
    },
    "last_updated": "2022-11-05T22:31:17.993Z",
    "vip":true,
    'note':'This coin Tezos will hit',
'priceAlertz_active':true,
    'priceAlertz':Number(1.20).toFixed(2)
  },
  {
    "id": "eos",
    "symbol": "eos",
    "name": "EOS",
    "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481",
    "current_price":'',
    "market_cap": '',
    "market_cap_rank": 52,
    "fully_diluted_valuation": null,
    "total_volume": '',
    "high_24h": 1.21,
    "low_24h": 1.18,
    "price_change_24h": '',
    "price_change_percentage_24h": -1.47378,
    "market_cap_change_24h": -16403108.934966087,
    "market_cap_change_percentage_24h": -1.35553,
    "circulating_supply": 1014258230.9114,
    "total_supply": null,
    "max_supply": null,
    "ath": '',
    "ath_change_percentage": -94.81967,
    "ath_date": "2018-04-29T07:50:33.540Z",
    "atl": '',
    "atl_change_percentage": 134.17987,
    "atl_date": "2017-10-23T00:00:00.000Z",
    "roi": {
      "times": 0.19072813928015456,
      "currency": "usd",
      "percentage": 19.072813928015453
    },
    "last_updated": "2022-11-05T22:31:34.385Z",
    "vip":false,
    'note':'This coin EOS will hit',
    'priceAlertz_active':true,
    'priceAlertz':0.60
  },

  {
    "id": "aptos",
    "symbol": "apt",
    "name": "Aptos",
    "image": "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png?1666839629",
    "current_price":'',
    "market_cap": '',
    "market_cap_rank": 56,
    "fully_diluted_valuation": 7812035168,
    "total_volume": '',
    "high_24h": 7.97,
    "low_24h": 7.54,
    "price_change_24h": '',
    "price_change_percentage_24h": 2.91646,
    "market_cap_change_24h": 26812041,
    "market_cap_change_percentage_24h": 2.71431,
    "circulating_supply": 130000000,
    "total_supply": 1000935772.48,
    "max_supply": null,
    "ath": '',
    "ath_change_percentage": -43.1181,
    "ath_date": "2022-10-19T01:03:53.771Z",
    "atl": '',
    "atl_change_percentage": 16.01609,
    "atl_date": "2022-10-19T03:53:04.558Z",
    "roi": null,
    "last_updated": "2022-11-05T22:31:32.315Z",
    "vip":false,
    'note':'This coin Aptos will hit',
    'priceAlertz_active':true,
    'priceAlertz':Number(5.70).toFixed(2)
  },

  {
    "id": "burger-swap",
    "symbol": "burger",
    "name": "BurgerCities",
    "image": "https://assets.coingecko.com/coins/images/12563/large/burger.png?1600786553",
    "current_price":'',
    "market_cap": '',
    "market_cap_rank": null,
    "fully_diluted_valuation": 24332892,
    "total_volume": '',
    "high_24h": 0.894937,
    "low_24h": 0.867242,
    "price_change_24h": '',
    "price_change_percentage_24h": -0.21522,
    "market_cap_change_24h": 0,
    "market_cap_change_percentage_24h": 0,
    "circulating_supply": 0,
    "total_supply": 28000000,
    "max_supply": 28000000,
    "ath": '',
    "ath_change_percentage": -96.84745,
    "ath_date": "2021-05-03T01:14:17.638Z",
    "atl": '',
    "atl_change_percentage": 188.6616,
    "atl_date": "2022-05-12T07:20:44.524Z",
    "roi": null,
    "last_updated": "2022-11-05T22:31:21.823Z",
    "vip":true,
    'note':'This coin Burger Swap will hit',
    'priceAlertz_active':true,
    'priceAlertz':Number(0.70).toFixed(2)
  }]



export default function Home(setCmvErrorsx={setCmvErrorsx}) {
  const [currency,setCurrency] = useState('USD')
  const [currencySymbol,setCurrencySymbol] = useState('$')
  const [currencyPlural,setCurrencyPlural] = useState('US dollars')
  const [currencySingular,setCurrencySingular] = useState('US dollar')
  const [finalComp, setFinalComp] = useState([])   
  const [coinArr, setCoinArr] = useState([])
  const [info, setInfo] = useState(true)
  const [quickData, setQuickData] = useState(false);
  const [runOrStop,setRunOrStop] = useState(true);
  const [searchGems,setSearchGems] = useState('')
  const [openModal,setOpenModal] = useState(false)
  const [modalSearch,setModalSearch] = useState('')
  const [startModal,setStartModal] = useState(false)
  const [index,setIndex] = useState()
  const [priceAlertzPing,setPriceAlertzPing] = useState(myPriceAlertz)
  const [openPriceALertsModal,setOpenPriceALertsModal] = useState(false)
  const  [activeCoins,setActiveCoins]  = useState(myGems)
  const [buy, setBuy]= useState( ['burger-swap','jasmycoin','tezos','eos','aptos','bitcoin-cash']) 
  const [updateArr, setUpdateArr] = useState([])

  const showCmvErrorsx = (msg)=>{
    cmvErrorsxHolder.current.style.display = 'block';
    setCmvErrorsx(msg)
  }
  
  const hideCmvErrorsx = ()=>{
    setCmvErrorsx('')
    cmvErrorsxHolder.current.style.display = 'none';
  }

  const approvedCurrencies = [
{id:'USD'},
{id:'USD'},
{id:'JPY'},
  ];

const updateCurrenccy = useEffect(()=>{
 const fixCurrency = (currency)=>{
  setCurrency(currency)
 }},[currency])


useEffect(()=>{
const welcome = ()=>{
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLocaleLowerCase()}&ids=${buy.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  axios.get(url).then((res)=>{setUpdateArr(res.data)}).then(()=>{}).catch((err)=> {()=>setCmvErrorsx('No internet connection')})  
}
welcome ()
},[buy,setCmvErrorsx,currency]);


const precompArr = []


 return(
  <>
  <Head>
        <title>Gem Keeper</title>
        <meta name="Gem Keeper" content="Store crypto gems | Monitor crypto gems" />
        <meta name="Crypto Gem Keeper" content="Store crypto gems | Monitor crypto gems" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
  {<Header />}

  <main >

  <div className={styles.cmv_top}></div>
  <div className={styles.cmvBody}>
  
  <AddCrypto activeCoins={activeCoins} buy={buy} setBuy={setBuy} setActiveCoins={setActiveCoins} currency={currency} quickData={quickData} setQuickData={setQuickData} setCoinArr={setCoinArr} setRunOrStop={setRunOrStop} searchGems={searchGems} setSearchGems={setSearchGems} priceAlertzPing={priceAlertzPing} setPriceAlertzPing={setPriceAlertzPing} openPriceALertsModal={openPriceALertsModal} setOpenPriceALertsModal={setOpenPriceALertsModal} />

  <DisplayCoin activeCoins={activeCoins} buy={buy} setBuy={setBuy} setActiveCoins={setActiveCoins} setQuickData={setQuickData} setCoinArr={setCoinArr} currency={currency} searchGems={searchGems} openModal={openModal} setOpenModal={setOpenModal} modalSearch={modalSearch} setModalSearch={setModalSearch} startModal={startModal} setStartModal={setStartModal} index={index} setIndex={setIndex} priceAlertzPing ={priceAlertzPing} setPriceAlertzPing={setPriceAlertzPing} />
   
  <UpdateCoinInfo activeCoins={activeCoins} buy={buy} setBuy={setBuy} setActiveCoins={setActiveCoins} currency={currency} quickData={quickData} setQuickData={setQuickData} setCoinArr={setCoinArr} setRunOrStop={setRunOrStop} searchGems={searchGems} setSearchGems={setSearchGems} updateArr={updateArr} setUpdateArr={setUpdateArr} />
 
  <DisplayPriceAlertz priceAlertzPing ={priceAlertzPing} setPriceAlertzPing={setPriceAlertzPing} updateArr={updateArr} setUpdateArr={setUpdateArr} openPriceALertsModal={openPriceALertsModal} setOpenPriceALertsModal={setOpenPriceALertsModal} searchGems={searchGems} setSearchGems={setSearchGems} currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} activeCoins={activeCoins} setActiveCoins={setActiveCoins} />
  
   <AddPriceAlertz activeCoins={activeCoins} buy={buy} setBuy={setBuy} setActiveCoins={setActiveCoins} setQuickData={setQuickData} setCoinArr={setCoinArr} currency={currency} searchGems={searchGems} openModal={openModal} setOpenModal={setOpenModal} modalSearch={modalSearch} setModalSearch={setModalSearch} startModal={startModal} setStartModal={setStartModal} index={index} setIndex={setIndex} priceAlertzPing ={priceAlertzPing} setPriceAlertzPing={setPriceAlertzPing} updateArr={updateArr} setUpdateArr={setUpdateArr} />

  <InfoModal openModal={openModal} setOpenModal={setOpenModal} activeCoins={activeCoins} setActiveCoins={setActiveCoins} modalSearch={modalSearch} setModalSearch={setModalSearch} currency={currencySymbol} setCurrency={setCurrencySymbol} startModal={startModal} setStartModal={setStartModal} index={index} setIndex={setIndex} />

   </div>
   </main>

   <Footer />
  
   </>
 )
  
  
}


