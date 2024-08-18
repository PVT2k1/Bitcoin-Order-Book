import { useState } from "react";

export default function SellTable(props: any) {
    const [loading, setLoading] = useState(true)

    let sellDatas: Array<any> = props.sellDatas;
    if (sellDatas !== undefined) {
        sellDatas.sort((a, b) => b[0] - a[0]);
        if (loading)
            setLoading(false);
    }

    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            {loading && <p>loading...</p>}
            {!loading &&
                <table>
                    <tbody>
                        <tr>
                            <th>Side</th>
                            <th>Price (USDT)</th>
                            <th>Amount (BTC)</th>
                        </tr>

                        {sellDatas.map((sellData, index) => (
                            <tr key={index}>
                                <td style={{color:"green"}}>Sell {index + 1}</td>
                                <td>{parseFloat(sellData[0]).toFixed(props.group)}</td>
                                <td>{parseFloat(sellData[1]).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}