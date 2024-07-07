import React from "react";

// passing text as props
const HighlightText = ({text})=>{
    return (
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
            {" "}
            {text}
        </span>
    )
}

export default HighlightText;

// ye hm bnaye just to see how to use components for small things
// text ko as a props pass kiye and then use kiye in span 