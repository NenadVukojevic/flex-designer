import React, { useEffect, useState } from 'react'

const CSSCode = ({ source }) => {

    const [copied, setCopied] = useState(false);

    const [camelCase, setCamelCase] = useState(true);

    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    useEffect(() => {
        setCopied(false);
    }, [source])

    const beautifyProperties = (properties) => {
        var beautified = '';
        for (var property in properties) {
            if(camelCase){
                beautified += property + ':' + properties[property] + '; \n';
            }
            else{
                beautified += camelToSnakeCase(property) + ':' + properties[property] + '; \n';
            }
        }
        return beautified;
    }

    const code = source.map((element) => (
        <p key={element.id}>
            .el_{element.id}
            {'{'}
            <br />
            {

                beautifyProperties(element.style)

                //JSON.stringify(element.style, null, 4)
            }
            {'}'}
            <br />
        </p>
    ));



    const copyContent = async () => {
        var cssElement = document.getElementById("css").innerText;
        await navigator.clipboard.writeText(cssElement);
        setCopied(true);
    }

    return (
        <div className='htmlCode'>
            <div className='codeHeader'>
                <div className='codeHeaderTitle'>css</div>
                <div className='switchCase'
                    onClick={() => setCamelCase(!camelCase)}
                >{camelCase ? 'camel' : 'snake'}</div>
                <div className='codeHeaderButton' onClick={copyContent}>{copied ? 'copied' : 'copy'}</div>
            </div>
            <pre id="css">{code}</pre>
        </div>
    )
}

export default CSSCode