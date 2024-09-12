import { useId } from "react"


export default function InputBox({
    label,
    amount = 0,
    onAmountChange,
    amountChangeDisabled = false,
    currencyType = "usd",
    currencyOptions = [],
    onCurrencyTypeChange
}) {
    const id = useId()
    return (
        <div className="input-component">
            <div>
                <label htmlFor={`amount-${id}`}>{label}</label>
                <label htmlFor="">Currency Type</label>
            </div>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={e => onAmountChange && onAmountChange(e.target.value)}
                    disabled={amountChangeDisabled}
                />
                <select
                    value={currencyType}
                    onChange={e => onCurrencyTypeChange && onCurrencyTypeChange(e.target.value)}
                >
                    {
                        currencyOptions.map(([curr, amount], i) => (
                            <option key={`${i}-${id}`} value={curr}>{curr}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}