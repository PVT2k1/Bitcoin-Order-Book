'use client'

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import BuyTable from "@/components/buy.table";
import SellTable from "@/components/sell.table";
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Home() {
  const depthOption = [15, 30, 50, 100];
  const groupOption = [0, 1, 2];

  const [depth, setDepth] = useState(depthOption[0]);
  const [group, setGroup] = useState(groupOption[0]);
  const [orderBookData, setOrderBookData] = useState(Object());
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }, [])

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/depth?limit=${depth}&symbol=BTCUSDT`);

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const resData = await res.json();
        setOrderBookData(resData);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    getData();
  }, [depth, time]);

  return (
    <div className={styles.main}>
      <div className={styles.setting}>
        <div style={{display: "flex", gap: "10px"}}>
          <h2>Order book</h2>
          <i className="bi bi-dash-lg" style={{marginTop: "25px"}}></i>
          <h4 style={{paddingTop: "4px"}}>BTC/USDT</h4>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <label style={{paddingRight: "15px"}}>Depth:</label>
          <select value={depth} onChange={(e) => setDepth(Number(e.target.value))}>
            {depthOption.map((depth, index) => (
              <option value={depth} key={index}>{depth}</option>
            ))}
          </select>
          <label style={{paddingLeft: "60px", paddingRight: "15px"}}>Group:</label>
          <select value={group} onChange={(e) => setGroup(Number(e.target.value))}>
            {groupOption.map((group, index) => (
              <option value={group} key={index}>{group} decimals</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.table}>
        <BuyTable buyDatas={orderBookData["bids"]} group={group} />
        <SellTable sellDatas={orderBookData["asks"]} group={group} />
      </div>
    </div>
  );
}
