class Column{constructor(config){this.options=config.options}
    async renderContent(row,index){throw new Error("Method 'renderContent()' must be implemented.")}
    get cellOptions(){const options=this.options;return Object.keys(options).reduce((accumulator,currentValue)=>accumulator+=`${currentValue}="${options[currentValue]}" `,'').trim()}}