import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";


export default function CurrencyConvertorApp() {
    const [from, setFrom] = useState({
        amount: 0,
        currencyType: "inr",
        onAmountChange: value => setFrom(state => ({ ...state, ["amount"]: value })),
        onCurrencyTypeChange: value => setFrom(state => ({ ...state, ["currencyType"]: value }))
    })
    const [to, setTo] = useState({
        amount: 0,
        currencyType: "usd",
        onCurrencyTypeChange: value => setTo(state => ({ ...state, ["currencyType"]: value }))
    })
    const [currencyOptions, setCurrencyOptions] = useState({})

    const swap = () => {
        setTo(state => ({
            ...state,
            ["amount"]: from.amount,
            ["currencyType"]: from.currencyType
        }))
        setFrom(state => ({
            ...state,
            ["amount"]: to.amount,
            ["currencyType"]: to.currencyType
        }))
    }

    useEffect(() => {
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${from.currencyType}.json`)
            .then(res => res.json())
            .then(data => {
                setTo(state => (
                    {
                        ...state,
                        ["amount"]: Number(+from.amount * (data[from.currencyType][state.currencyType] ?? 0)).toFixed(3)
                    })
                )
                setCurrencyOptions(data[from.currencyType] ?? {})
            })
            .catch(err => {
                alert(err.message)
            })
    }, [from.amount, from.currencyType, to.currencyType])

    return (
        <div id="currency-convertor" className="content">
            <div className="main">
                <div className="input-section">
                    <InputBox
                        label="From"
                        amount={from.amount}
                        onAmountChange={from.onAmountChange}
                        currencyType={from.currencyType}
                        onCurrencyTypeChange={from.onCurrencyTypeChange}
                        currencyOptions={Object.entries(currencyOptions)}
                    />
                    <InputBox
                        label="To"
                        amount={to.amount}
                        currencyType={to.currencyType}
                        onCurrencyTypeChange={to.onCurrencyTypeChange}
                        amountChangeDisabled
                        currencyOptions={Object.entries(currencyOptions)}
                    />
                    <button
                        onClick={swap}
                    >Swap</button>
                </div>
                <div className="button-group" >
                    <button>
                        Convert {from.currencyType.toUpperCase()} to {to.currencyType.toUpperCase()}
                    </button>
                </div>
            </div>
        </div>
    );
}