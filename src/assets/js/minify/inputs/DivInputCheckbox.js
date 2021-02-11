class DivInputCheckbox extends InputMultipleValue{async getValue(){const ret=[];const inputs=this.input.find('input:checked').toArray();for(const value of inputs){const input=InputFactory.getInstance($(value),this.params);ret.push(await input.getValue())}
    return ret}
    getValueGrid(){const ret=[];this.input.find('input:checked').each((k,v)=>{const input=InputFactory.getInstance($(v),this.params);ret.push(input.getValueGrid())});return ret.join(', ')}
    setValue(value){this.input.find(`input[value="${value}"]`).prop('checked',!0)}}