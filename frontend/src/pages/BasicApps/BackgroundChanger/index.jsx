import { useState } from "react"


export default function BackgroundChanger() {
    const [color, setColor] = useState("black")
    const updateColor = color => setColor(color)

    return (
        <div id="bg-changer" className="content">
            <div className="main" style={{ backgroundColor: color }}>
                <Palette updateColor={updateColor} />
            </div>
        </div>
    )
}


function Palette({ updateColor }) {
    return <div className="palette">
        <Button color="red" onClick={() => updateColor("red")} />
        <Button color="green" onClick={() => updateColor("green")} />
        <Button color="blue" onClick={() => updateColor("blue")} />
        <Button color="olive" onClick={() => updateColor("olive")} />
        <Button color="grey" onClick={() => updateColor("grey")} />
        <Button color="yellow" textColor="black" onClick={() => updateColor("yellow")} />
        <Button color="pink" textColor="black" onClick={() => updateColor("pink")} />
        <Button color="purple" onClick={() => updateColor("purple")} />
        <Button color="lavender" textColor="balck" onClick={() => updateColor("lavender")} />
        <Button color="white" textColor="black" onClick={() => updateColor("white")} />
        <Button onClick={() => updateColor("black")} />
    </div>
}

function Button({ color = "black", textColor = "white", onClick }) {
    return (
        <button
            style={{
                backgroundColor: color,
                color: textColor
            }}
            onClick={onClick}
        >
            {color.toUpperCase()}
        </button>
    )
}
