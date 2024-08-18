import { useState } from "react";

export default function BuyTable(props: any) {
    const [loading, setLoading] = useState(true)

    let buyDatas: Array<any> = props.buyDatas;
    if (buyDatas !== undefined) {
        buyDatas.sort((a, b) => b[0] - a[0]);
        if (loading)
            setLoading(false);
    }

    return (
        <div>
            {loading && <p>loading...</p>}
            {!loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Side</th>
                            <th>Price (USDT)</th>
                            <th>Amount (BTC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyDatas.map((buyData, index) => (
                            <tr key={index}>
                                <td style={{ color: "blue" }}>Buy {index + 1}</td>
                                <td>{parseFloat(buyData[0]).toFixed(props.group)}</td>
                                <td>{parseFloat(buyData[1]).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}