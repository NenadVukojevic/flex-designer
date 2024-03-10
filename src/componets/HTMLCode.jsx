import React, { useEffect, useState } from 'react'

const HTMLCode = ({ source }) => {
    const [copied, setCopied] = useState(false);

    const [code, setCode] = useState('');

    
    

    
    useEffect(() => {
        const renderElements = (source, parent) => {
            var rendered = ''
            const found = source.filter((element) => element.parent === parent);
            console.log(parent, found);
            if (found.length > 0) {
                found.forEach(element => {
                    rendered += `<${element.type} 
                        id=${element.id} 
                        class="el_${element.id}"
                        > 
                    ${element.value}\n`;
                    console.log(element.parent, typeof(element.parent));
                    rendered += renderElements(source, element.id);
                    rendered += `</${element.type} >
                    \n`
                });
            }
            return rendered;
        }
        setCopied(false);
        setCode(renderElements(source, 0));

    }, [source]);
    
    /*
        const code = source.map((element) => (
                `<${element.type} id=${element.id} >`
               // `</${element.type}`
        ));
    
    */

    const copyContent = async () => {
        var cssElement = document.getElementById("html").innerText;
        await navigator.clipboard.writeText(cssElement);
        setCopied(true);
    }

    return (
        <div className='htmlCode'>
            <div className='codeHeader'>
                <div className='codeHeaderTitle'>html</div>
                <div className='codeHeaderButton' onClick={copyContent}>{copied ? 'copied' : 'copy'}</div>
            </div>
            <pre id="html">{code}</pre>
        </div>
    )
}

export default HTMLCode