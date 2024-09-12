import { useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast"


export default function RandomPasswordGenerator() {
    const [password, setPassword] = useState("")
    const [inputDetails, setInputDetails] = useState({
        length: 8,
        includeNumbers: false,
        includeSpecialChars: false
    })

    const coptToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => toast.success("Password copied!"), console.error);
    }

    const changeHandler = ({ name, value }) => {
        setInputDetails({ ...inputDetails, [name]: value })
    }

    useEffect(() => {
        generatePassword()
    }, [inputDetails])


    const generatePassword = () => {
        let nums = "0123456789"
        let specChars = "!@#$%^&*()"
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

        let password = chars[Math.floor(Math.random() * chars.length)]
        if (inputDetails.includeNumbers) {
            chars += nums
            password += nums[Math.floor(Math.random() * nums.length)]
        }

        if (inputDetails.includeSpecialChars) {
            chars += specChars
            password += specChars[Math.floor(Math.random() * specChars.length)]
        }

        while (password.length < inputDetails.length) {
            password += chars[Math.floor(Math.random() * chars.length)]
        }
        setPassword(password)
    }


    return (
        <div id="random-password" className="content">
            <div className="main">
                <div className="input-section">
                    <input type="text" value={password} onChange={e => setPassword(password)} placeholder="Testing" />
                    <button onClick={coptToClipboard}>Copy</button>
                </div>
                <div className="options">
                    <div>
                        <input type="range" id="length" min={8} max={20} value={inputDetails.length} onChange={e => changeHandler({ name: "length", value: e.target.value })} />
                        <label className="ml-2" htmlFor="length">Length({inputDetails.length})</label>
                    </div>

                    <div>
                        <input type="checkbox" id="includeNumbers" checked={inputDetails.includeNumbers} onChange={e => changeHandler({ name: "includeNumbers", value: e.target.checked })} />
                        <label className="ml-2" htmlFor="includeNumbers">Numbers</label>
                    </div>

                    <div>
                        <input type="checkbox" id="specialChars" checked={inputDetails.includeSpecialChars} onChange={e => changeHandler({ name: "includeSpecialChars", value: e.target.checked })} />
                        <label className="ml-2" htmlFor="specialChars">Special Characters</label>
                    </div>
                </div>
            </div>
        </div>
    )
}