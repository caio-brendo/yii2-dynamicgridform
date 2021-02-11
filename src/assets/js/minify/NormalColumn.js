class NormalColumn extends ColumnInputtable{async renderContent(values,index){const factory=InputFactory.getInstance(this.input,{baseName:this.templateInputName,index:index,reference:this.inputId});return `<td ${this.cellOptions}>${await this.getText(factory) + await this.getHiddenInput(factory)}</td>`}
    async getText(factory){if(this.textOnInsert){return typeof this.textOnInsert==='function'?this.textOnInsert(this.elementInput):this.textOnInsert}
        return factory.getValueGrid()}
    async getHiddenInput(factory){if(this.valueOnInsert){let val=typeof this.valueOnInsert==='function'?this.valueOnInsert(this.elementInput):this.valueOnInsert;val=Array.isArray(val)?Array.isArray(val):[val];const ret=[];val.forEach((v)=>{ret.push({reference:this.inputId,value:v})})
        return InputHelper.getHiddenInput(this.templateInputName,ret,factory.index)}
        return await factory.getInputHidden()}}